import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function BasicTextFields( { changeProp } ) {

    const handlePropChange = (e) => {
        changeProp(e);
    }

    const limit = [
        {
            value: 10,
            label: '10',
        },
        {
            value: 20,
            label: '20',
        },
        {
            value: 30,
            label: '30',
        },
        {
            value: 50,
            label: '50',
        },
    ];

    return (
        <Box
            component="form"
            sx={{
                mt: 4,
                '& > :not(style)': {m: 0, width: '100%', maxWidth: '100%'},
            }}
            noValidate
            autoComplete="off"
        >
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid xs={12} sm={4} md={5}>
                    <TextField
                        fullWidth
                        onChange={handlePropChange}
                        id="outlined-basic"
                        type="text"
                        name="url"
                        label="Ex. https://example.com"
                        variant="outlined"
                        helperText="Please enter URL"
                    />
                </Grid>
                <Grid xs={12} sm={4} md={5}>
                    <TextField
                        fullWidth
                        onChange={handlePropChange}
                        id="outlined-basic"
                        type="text"
                        name="pattern"
                        label="ex. sort=|set_filter="
                        variant="outlined"
                        helperText="Enter exclude pattern"
                    />
                </Grid>
                <Grid xs={12} sm={4} md={2}>
                    <TextField
                        id="outlined-select-currency"
                        label="Pages per minutes"
                        helperText="Please select value"
                        select
                        name="limit"
                        defaultValue="20"
                        fullWidth
                        onChange={handlePropChange}
                    >
                        {limit.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
        </Box>

    );
}