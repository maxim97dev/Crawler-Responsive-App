import React, {useEffect, useState} from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";

export default function BasicButtons({ details }) {
    const [disabled, setDisabled] = useState(false);
    const validateUrl = /^(?:)(http|https)?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;


    useEffect(() => {
        console.log('useEffect');

        // (!validateUrl.test(details.url) && disabled) ? setDisabled(false) : setDisabled(true);
        console.log(!validateUrl.test(details.url));
        console.log(disabled);
        // setDisabled(!validateUrl.test(details.url));
    }, [disabled]);

    const startCrawl = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/start', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
                body: JSON.stringify({ url: details.url, pattern: details.pattern })
            });
            const result = await response.json();

            // setDisabled(true);

            return result;
        } catch (error) {
            //Handle errors
        }
    };

    const stopCrawl = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/abort', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Credentials': 'true'
                }
            });

            return await response.json();
        } catch (error) {
            //Handle errors
        }
    };

    const colorButton = (!disabled) ? 'success' : 'error';

    return (
        <Stack component={Paper} spacing={2} sx={{ mt: 2, p: 2 }} justifyContent="center" direction="row">
            <Button
                disabled={disabled}
                onClick={() => {
                    startCrawl();
                }}
                variant="contained"
                color={colorButton}>Start</Button>
            <Button onClick={() => stopCrawl()} variant="contained" color="error">Stop</Button>
        </Stack>
    );
}