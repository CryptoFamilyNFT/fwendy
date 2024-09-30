import * as React from 'react';
import { PaletteMode, useMediaQuery, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';

interface ToggleColorModeProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export default function ToggleColorMode({
  mode,
  toggleColorMode,
}: ToggleColorModeProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <IconButton
      onClick={toggleColorMode}
      color="primary"
      aria-label="Theme toggle button"
      size="small"
    >
      {mode === 'dark' ? (
        isMobile ? <WbSunnyRoundedIcon color="secondary" fontSize="small" /> : <WbSunnyRoundedIcon color="primary" fontSize="small" />
      ) : (
        isMobile ? <ModeNightRoundedIcon color="primary" fontSize="small" /> : <ModeNightRoundedIcon color="secondary" fontSize="small" />
      )}
    </IconButton>
  );
}