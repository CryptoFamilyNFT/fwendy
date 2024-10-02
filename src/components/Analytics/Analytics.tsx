import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Tooltip } from '@mui/material';
import { customColors } from '../../theme/Theme';
import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

const Analytics: React.FC = () => {
    const [metrics, setMetrics] = useState<any[]>([]);

    useEffect(() => {
        const handleMetric = (metric: any) => {
            setMetrics((prevMetrics) => [...prevMetrics, metric]);
        };

        getCLS(handleMetric);
        getFID(handleMetric);
        getLCP(handleMetric);
        getFCP(handleMetric);
        getTTFB(handleMetric);
    }, []);

    const metricDescriptions: { [key: string]: string } = {
        CLS: 'Cumulative Layout Shift',
        FID: 'First Input Delay',
        LCP: 'Largest Contentful Paint',
        FCP: 'First Contentful Paint',
        TTFB: 'Time to First Byte'
    };

    return (
        <Box sx={(theme) => ({
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0, 0.2)' : 'rgba(0,0,0, 0.2)',
            height: 'auto',
            backgroundSize: "cover",
            border: theme.palette.mode === 'light' ? `2px solid ${customColors.primaryDark}` : `2px solid ${customColors.primary}`,
            borderRadius: theme.spacing(1),
            marginTop: 15,
            boxShadow: theme.palette.mode === 'light' ? '0 0 1px rgba(85, 166, 246, 0.1),1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)' : '0 0 1px rgba(85, 166, 246, 0.1),1px 1.5px 2px -1px rgba(85, 166, 246, 0.15),4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)',
            alignItems: 'center',
            gap: 10,
            position: 'relative',
            padding: 2,
            display: 'flex',
            flexDirection: 'row',
            overflowY: 'auto',
        })}>
            <div style={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(5px)',
                zIndex: 0,
                borderRadius: 10,
            }}></div>
            <Box sx={{ zIndex: 1 }}>
                <Typography variant="h4" gutterBottom>Analytics</Typography>
                <List>
                    {metrics.map((metric, index) => (
                        <Tooltip key={index} title={metricDescriptions[metric.name] || 'No description available'}>
                            <ListItem>
                                <ListItemText color="primary" primary={`${metric.name}: ${metric.value}`} />
                            </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default Analytics;
