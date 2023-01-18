import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const columns = [
    {   field: 'id',
        headerName: 'ID',
        width: 40
    },
    {
        field: 'url',
        headerName: 'URL',
        flex: 1,
        minWidth: 300
    },
    {
        field: 'clientWidth',
        headerName: 'Client Width',
        type: 'number',
        align: 'center'
    },
    {
        field: 'scrollWidth',
        headerName: 'Scroll Width',
        type: 'number',
        align: 'center'
    },
    {
        field: 'responsive',
        headerName: 'Responsive Check',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        align: 'center',
        headerAlign: 'center',
        flex: 0.3,
        renderCell: ({ value }) => {
            return (value) ? <CheckCircleIcon color="success" /> : <HighlightOffIcon color="error" />
        }
    },
];

export default function DataGridDemo() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        setInterval(() => {
            fetch('http://localhost:5000/api/getData')
                .then(response => response.json())
                .then(rows => {
                    setRows(rows);
                    console.log('Update table');
                }).catch(err => {
                console.log(err);
                setRows([]);
            })
        }, 4000);
    }, []);

    return (
        <Box sx={{ height: 600, width: '100%', mt: 4 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    );
}