import React, { useEffect, useState } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { red } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function BasicTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        setInterval(() => {
            fetch('http://localhost:5000/api/getData')
                .then(response => response.json())
                .then(data => {
                    setData(data);



                    console.log("Result:", data);
                }).catch(err => {
                console.log(err);
                setData([]);
            })
        }, 4000);

    }, []);

    return (


        <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>URL</TableCell>
                        <TableCell align="right">ClientWidth</TableCell>
                        <TableCell align="right">ScrollWidth</TableCell>
                        <TableCell align="right">ShiftWidth</TableCell>
                        <TableCell align="right">Responsive</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.url}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.url}
                            </TableCell>
                            <TableCell align="right">{row.dimensions.widthClient}</TableCell>
                            <TableCell align="right">{row.dimensions.scrollWidth}</TableCell>
                            <TableCell align="right">{row.dimensions.widthClient - row.dimensions.scrollWidth}</TableCell>
                            <TableCell align="right">{row.dimensions.responsiveCheck ? <CheckCircleIcon color="success" /> : <HighlightOffIcon color="error" />}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
