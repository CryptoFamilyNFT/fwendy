import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  Slider,
  Tooltip,
  Drawer,
  Divider,
  MenuItem,
  Toolbar,
  AppBar,
} from '@mui/material';
import {
  Twitter as TwitterIcon,
  Telegram as TelegramIcon,
  TextFields as TextFieldsIcon,
  Brush as BrushIcon,
  Crop as CropIcon,
  UploadFile as UploadFileIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Delete as DeleteIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  FormatBold as FormatBoldIcon,
  BorderColor as BorderColorIcon,
  Save as SaveIcon,
  Download as DownloadIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import html2canvas from 'html2canvas';
import { Rnd } from 'react-rnd';

interface Meme {
  id: number;
  name: string;
  url: string;
}

interface Layer {
  id: number;
  type: 'image' | 'text' | 'drawing';
  imgUrl?: string;
  text?: string;
  color?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  locked: boolean;
  opacity: number;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  borderColor?: 'black' | 'white';
}

const Memer: React.FC = () => {
  const [allMemeImgs, setAllMemeImgs] = useState<Meme[]>([]);
  const [selectedImg, setSelectedImg] = useState<string>('');
  const [layers, setLayers] = useState<Layer[]>([]);
  const [nextLayerId, setNextLayerId] = useState(1);
  const [baseImgSize, setBaseImgSize] = useState<{ width: number; height: number }>({ width: 300, height: 300 });
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [exportSettingsOpen, setExportSettingsOpen] = useState(false);
  const memeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchMemes = async () => {
      const response = await fetch('https://api.imgflip.com/get_memes');
      const content = await response.json();
      setAllMemeImgs(content.data.memes);
      if (content.data.memes.length > 0) {
        setSelectedImg(content.data.memes[0].url);
      }
    };
    fetchMemes();
  }, []);

  const addLayer = (type: 'image' | 'text' | 'drawing', imgUrl?: string) => {
    const newLayer: Layer = {
      id: nextLayerId,
      type: type,
      imgUrl: imgUrl,
      x: 50,
      y: 50,
      width: 200,
      height: 200,
      visible: true,
      locked: false,
      opacity: 1,
      color: '#000000',
      fontSize: 16,
      fontWeight: 'normal',
      borderColor: 'black',
    };
    setLayers([...layers, newLayer]);
    setNextLayerId(nextLayerId + 1);
  };

  const updateLayer = (id: number, updates: Partial<Layer>) => {
    setLayers(layers.map(layer => (layer.id === id ? { ...layer, ...updates } : layer)));
  };

  const deleteLayer = (id: number) => {
    setLayers(layers.filter(layer => layer.id !== id));
  };

  const moveLayer = (id: number, direction: 'up' | 'down') => {
    const index = layers.findIndex(layer => layer.id === id);
    if (index < 0) return;

    const newLayers = [...layers];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < layers.length) {
      const [movedLayer] = newLayers.splice(index, 1);
      newLayers.splice(targetIndex, 0, movedLayer);
      setLayers(newLayers);
    }
  };

  const toggleLayerVisibility = (id: number) => {
    updateLayer(id, { visible: !layers.find(layer => layer.id === id)?.visible });
  };

  const toggleLayerLock = (id: number) => {
    updateLayer(id, { locked: !layers.find(layer => layer.id === id)?.locked });
  };

  const handleDownload = async () => {
    if (memeRef.current) {
      const canvas = await html2canvas(memeRef.current);
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'meme.png';
      link.click();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          setBaseImgSize({ width: img.width, height: img.height });
          setSelectedImg(img.src);
          setLayers([]);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectTemplate = (url: string) => {
    const img = new Image();
    img.src = url;
    const lay: Layer = {
      id: 0,
      type: 'image',
      width: img.width,
      height: img.height,
      opacity: 1,
      locked: false,
      visible: true, 
      x: 50,
      y: 50
    };
    img.onload = () => {
      setBaseImgSize({ width: img.width, height: img.height });
      setSelectedImg(url);
      setLayers([lay]);
    };
  };

  const handleDraw = () => {
    addLayer('drawing');
  };

  const handleAddText = () => {
    const newLayer: Layer = {
      id: nextLayerId,
      type: 'text',
      text: 'New Text',
      x: 50,
      y: 50,
      width: 200,
      height: 50,
      visible: true,
      locked: false,
      opacity: 1,
      color: '#000000',
      fontSize: 16,
      fontWeight: 'normal',
      borderColor: 'black',
    };
    setLayers([...layers, newLayer]);
    setNextLayerId(nextLayerId + 1);
  };

  const handleCrop = () => {
    addLayer('image');
  };

  const handleOpacityChange = (id: number, value: number) => {
    updateLayer(id, { opacity: value });
  };

  const handleTextColorChange = (id: number, color: string) => {
    updateLayer(id, { color: color });
  };

  const handleFontSizeChange = (id: number, size: number) => {
    updateLayer(id, { fontSize: size });
  };

  const handleFontWeightChange = (id: number) => {
    const layer = layers.find(l => l.id === id);
    const newWeight = layer?.fontWeight === 'normal' ? 'bold' : 'normal';
    updateLayer(id, { fontWeight: newWeight });
  };

  const handleBorderColorChange = (id: number) => {
    const layer = layers.find(l => l.id === id);
    const newColor = layer?.borderColor === 'black' ? 'white' : 'black';
    updateLayer(id, { borderColor: newColor });
  };

  const handleNewImageLayer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        addLayer('image', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleExportSettingsToggle = () => {
    setExportSettingsOpen(!exportSettingsOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', bgcolor: '#333' }}>
      {/* Sidebar */}
      <Drawer
        variant="persistent"
        open={drawerOpen}
        sx={(theme) => ({
          mt: 15,
          width: drawerOpen ? 320 : 10,
          height: 600,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            mt: 14,
            width: drawerOpen ? 320 : 10,
            height: 600,
            boxSizing: 'border-box',
            bgcolor: '#222',
            color: '#fff',
            borderRight: `2px solid ${theme.palette.primary.dark}`,
            borderRadius: '10px',
          },
        })}
      >
        <Divider />
        {drawerOpen && (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Popular Memes</Typography>
            <Grid container spacing={1} sx={{ maxHeight: '600px', overflowY: 'auto' }}>
              {allMemeImgs.slice(0, 12).map((meme) => (
                <Grid item xs={6} key={meme.id}>
                  <img
                    src={meme.url}
                    alt={meme.name}
                    style={{ width: '100%', cursor: 'pointer' }}
                    onClick={() => handleSelectTemplate(meme.url)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Drawer>

      {/* Meme Editor */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
          bgcolor: '#333',
          mt: 14,
          height: 500,
          width: 500,
        }}
      >
        <Box
          ref={memeRef}
          sx={{
            position: 'relative',
            width: baseImgSize.width,
            height: baseImgSize.height,
            backgroundImage: `url(${selectedImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {layers.map((layer) =>
            layer.type === 'text' ? (
              <Rnd
                key={layer.id}
                size={{ width: layer.width, height: layer.height }}
                position={{ x: layer.x, y: layer.y }}
                onDragStop={(e, d) => updateLayer(layer.id, { x: d.x, y: d.y })}
                onResizeStop={(e, direction, ref, delta, position) => {
                  updateLayer(layer.id, {
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                    ...position,
                  });
                }}
                disableDragging={layer.locked}
                enableResizing={!layer.locked}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    color: layer.color,
                    fontSize: layer.fontSize,
                    fontWeight: layer.fontWeight,
                    textAlign: 'center',
                    lineHeight: 1.2,
                    opacity: layer.opacity,
                    display: layer.visible ? 'block' : 'none',
                    border: `1px dashed ${layer.borderColor}`,
                  }}
                  contentEditable={!layer.locked}
                  suppressContentEditableWarning
                  onBlur={(e) => updateLayer(layer.id, { text: e.currentTarget.textContent || '' })}
                >
                  {layer.text}
                </Box>
              </Rnd>
            ) : layer.type === 'image' ? (
              <Rnd
                key={layer.id}
                size={{ width: layer.width, height: layer.height }}
                position={{ x: layer.x, y: layer.y }}
                onDragStop={(e, d) => updateLayer(layer.id, { x: d.x, y: d.y })}
                onResizeStop={(e, direction, ref, delta, position) => {
                  updateLayer(layer.id, {
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                    ...position,
                  });
                }}
                disableDragging={layer.locked}
                enableResizing={!layer.locked}
              >
                <img
                  src={layer.imgUrl}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    opacity: layer.opacity,
                    display: layer.visible ? 'block' : 'none',
                    border: `1px dashed ${layer.borderColor}`,
                  }}
                />
              </Rnd>
            ) : layer.type === 'drawing' ? (
              <Rnd
                key={layer.id}
                size={{ width: layer.width, height: layer.height }}
                position={{ x: layer.x, y: layer.y }}
                onDragStop={(e, d) => updateLayer(layer.id, { x: d.x, y: d.y })}
                onResizeStop={(e, direction, ref, delta, position) => {
                  updateLayer(layer.id, {
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                    ...position,
                  });
                }}
                disableDragging={layer.locked}
                enableResizing={!layer.locked}
              >
                <canvas
                  style={{
                    width: '100%',
                    height: '100%',
                    opacity: layer.opacity,
                    display: layer.visible ? 'block' : 'none',
                    border: `1px dashed ${layer.borderColor}`,
                  }}
                />
              </Rnd>
            ) : null
          )}
        </Box>
        <Drawer
          variant="persistent"
          anchor="right"
          open
          sx={{
            mt: 15,
            width: drawerOpen ? 320 : 10,
            height: 600,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              mt: 14,
              width: drawerOpen ? 320 : 10,
              height: 600,
              boxSizing: 'border-box',
              bgcolor: '#222',
              color: '#fff',
              borderLeft: `2px solid ${'black'}`,
              borderRadius: '10px',
            },
          }}
        >
          <Divider />
          <Toolbar>
            <Typography variant="h6">Layers</Typography>
          </Toolbar>
          <Divider />
          {layers.map((layer) => (
            <Box key={layer.id} sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
              <Tooltip title={layer.visible ? 'Hide Layer' : 'Show Layer'}>
                <IconButton onClick={() => toggleLayerVisibility(layer.id)} sx={{ color: '#fff' }}>
                  {layer.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title={layer.locked ? 'Unlock Layer' : 'Lock Layer'}>
                <IconButton onClick={() => toggleLayerLock(layer.id)} sx={{ color: '#fff' }}>
                  {layer.locked ? <LockIcon /> : <LockOpenIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Move Layer Up">
                <IconButton onClick={() => moveLayer(layer.id, 'up')} sx={{ color: '#fff' }}>
                  <ArrowUpwardIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Move Layer Down">
                <IconButton onClick={() => moveLayer(layer.id, 'down')} sx={{ color: '#fff' }}>
                  <ArrowDownwardIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Layer">
                <IconButton onClick={() => deleteLayer(layer.id)} sx={{ color: '#fff' }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Typography sx={{ flexGrow: 1 }}>{`Layer ${layer.id}`}</Typography>
            </Box>
          ))}
          <Divider />
        </Drawer>
      </Box>
      <Box sx={{
        position: 'absolute', display: 'flex', width: '100%', bottom: 2, boxShadow: 0,
        selfAlign: 'center',
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mb: 2,
        height: 70
      }}>
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              minHeight: 60,
              maxHeight: 70,
              border: theme.palette.mode === 'light' ? `2px solid ${theme.palette.primary.light}` : `2px solid ${theme.palette.primary.dark}`,
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-10px',
                px: 0,
              }}
            >
              {/*<img
                                src={
                                    LOGO
                                }
                                style={logoStyle}
                                alt="logo of ethercode"
                            />*/}
              <Box sx={{ display: { xs: 'none', md: 'flex', gap: 5 } }}>
                <Button
                  startIcon={<TextFieldsIcon />}
                  fullWidth
                  variant="contained"
                  onClick={handleAddText}
                  size='small'
                >
                  Text
                </Button>
                <Button
                  startIcon={<BrushIcon />}
                  fullWidth
                  variant="contained"
                  onClick={handleDraw}
                  size='small'

                >
                  Draw
                </Button>
                <Button
                  startIcon={<UploadFileIcon />}
                  fullWidth
                  variant="contained"
                  component="label"
                  sx={{ mt: 0 }}
                  size='small'

                >
                  Layer
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleNewImageLayer}
                  />
                </Button>
              </Box>
              <Divider />
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 1,
                alignItems: 'center',
              }}
            >
              <Button
                startIcon={<SaveIcon />}
                fullWidth
                variant="contained"
                onClick={handleDownload}
              >
                Save
              </Button>
              <Button
                startIcon={<DownloadIcon />}
                fullWidth
                variant="contained"
                onClick={handleExportSettingsToggle}
              >
                Export
              </Button>
              {/** user section **/}
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
            </Box>
          </Toolbar>
        </Container>
      </Box>
    </Box>
  );
};

export default Memer;
