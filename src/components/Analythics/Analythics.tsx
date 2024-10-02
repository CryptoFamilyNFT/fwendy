import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { customColors } from '../../theme/Theme';
import ReactGA from 'react-ga4';

const Analytics: React.FC = () => {
    const [metrics, setMetrics] = useState<any[]>([]);

    useEffect(() => {
        // Initialize Google Analytics
        ReactGA.initialize('G-FN9YNE5EZE');

        const fetchMetrics = async () => {
            try {
                // Manually fetch metrics using ReactGA
                const activeUsers = await ReactGA.gtag('event', 'fetch', {
                    event_category: 'activeUsers',
                });
                const pageViews7d = await ReactGA.gtag('event', 'fetch', {
                    event_category: 'screenPageViews',
                    event_label: '7daysAgo',
                });
                const pageViews31d = await ReactGA.gtag('event', 'fetch', {
                    event_category: 'screenPageViews',
                    event_label: '30daysAgo',
                });

                console.log('Active Users:', activeUsers);
                console.log('Page Views (7d):', pageViews7d);
                console.log('Page Views (31d):', pageViews31d);

                setMetrics([
                    { name: 'Active Users', value: activeUsers },
                    { name: 'Page Views (7d)', value: pageViews7d },
                    { name: 'Page Views (31d)', value: pageViews31d },
                ]);
            } catch (error) {
                console.error('Failed to fetch metrics', error);
            }
        };

        fetchMetrics();
    }, []);

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
                <Typography variant="h4" gutterBottom></Typography>
                    Analytics
                <List>
                    {metrics.map((metric, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`${metric.name}: ${metric.value}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default Analytics;
