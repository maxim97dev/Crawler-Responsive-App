import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function BasicTextFields( { changeProp, isDisabled } ) {

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

    const handlePropChange = (e) => {
        changeProp(e);
    }

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
            <Grid  container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid xs={12} sm={4} md={5}>
                    <TextField
                        id="outlined-basic"
                        label="Ex. https://example.com"
                        helperText="Please enter URL"
                        onChange={handlePropChange}
                        disabled={isDisabled}
                        type="text"
                        name="url"
                        fullWidth
                        variant="outlined"

                    />
                </Grid>
                <Grid xs={12} sm={4} md={5}>
                    <TextField
                        id="outlined-basic"
                        label="ex. sort=|set_filter="
                        helperText="Enter exclude pattern"
                        onChange={handlePropChange}
                        disabled={isDisabled}
                        type="text"
                        name="pattern"
                        fullWidth
                        variant="outlined"

                    />
                </Grid>
                <Grid xs={12} sm={4} md={2}>
                    <TextField
                        id="outlined-select-currency"
                        label="Pages per minutes"
                        helperText="Please select value"
                        onChange={handlePropChange}
                        disabled={isDisabled}
                        select
                        name="limit"
                        defaultValue="20"
                        fullWidth
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