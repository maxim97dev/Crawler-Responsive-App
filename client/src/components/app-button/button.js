import React, {useEffect, useState} from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";

export default function BasicButtons({ form, run, disableField, runCheck }) {
    const [disabled, setDisabled] = useState(false);
    const validateUrl = /^(?:http|https)?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

    useEffect(() => {
        setDisabled(!validateUrl.test(form.url) || run);
    })

    const disablePropButton = (e) => {
        disableField(e);
    }

    const startCrawl = async () => {
        console.log(form.url);
        try {
            const response = await fetch('http://localhost:5000/api/start', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
                body: JSON.stringify({ url: form.url, pattern: form.pattern })
            });
            runCheck(true);

            return await response.json();
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

            runCheck(false);

            return await response.json();
        } catch (error) {
            //Handle errors
        }
    };

    return (
        <Stack component={Paper} spacing={2} sx={{ mt: 2, p: 2 }} justifyContent="center" direction="row">
            <Button
                disabled={disabled}
                onClick={() => {
                    disablePropButton(true);
                    startCrawl();

                }}
                variant="contained"
                color="success">Start</Button>
            <Button
                disabled={!run}
                onClick={() => {
                    disablePropButton(false);
                    stopCrawl();
                }}
                variant="contained"
                color="error">Stop</Button>
        </Stack>
    );
}