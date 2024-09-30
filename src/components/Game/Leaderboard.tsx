import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Typography } from '@mui/material';
import { customColors } from '../../theme/Theme';

const Leaderboard = () => {

    function createData(
        username: string,
        address: string,
        score: number,
        dwiamonds: number,
    ) {
        return { username, address, score, dwiamonds };
    }

    const rows = [
        createData('Fwozen ywoghurt', 'ABd2...23eV', 12, 2),
        createData('Fwiki', 'CC2s...12aQ', 7, 1),
        createData('DarthRadorShit', '9Ps2...0GG1', 5, 0),
        createData('FwiedSolana', '7L4r...98SS', 2, 0),
    ];

    return (
        <div style={{alignItems: 'center'}}>
            <Typography variant="h4" sx={(theme) => ({color: theme.palette.mode === 'dark' ? customColors.primary : customColors.primaryDark})}  gutterBottom>
                LEADERBOARD
            </Typography>
            <TableContainer component={Paper} sx={(theme) => ({ border: `2px solid ${theme.palette.mode === 'light' ? customColors.primary : customColors.primaryDark}`})}>
                <Table sx={{ minWidth: 350, minHeight: 400 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Leaderboard (User)
                            </TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Score</TableCell>
                            <TableCell align="center">Dwiamonds</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.username}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.username}
                                </TableCell>
                                <TableCell align="center">{row.address}</TableCell>
                                <TableCell align="center">{row.score}</TableCell>
                                <TableCell align="center">{row.dwiamonds}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
};

export default Leaderboard;