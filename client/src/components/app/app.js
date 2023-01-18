import { useState } from "react";

import Container from '@mui/material/Container';
import ButtonAppBar from '../app-bar/header';
import BasicButtons from "../app-button/button";
import BasicTextFields from "../app-form/form";
import BasicTable from "../app-table/table2";

export default function App() {
    const [form, setForm] = useState({
        url: '',
        pattern: '',
        limit: '20'
    });

    const [isDisabled, setDisabled] = useState(false);
    const [run, setRun] = useState(false);

    const handlePropChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
            return {...prev, [name]: value }
        })
    }

    const disablePropButton = (e) => {
        setDisabled(e);
    }

    const checkPropRun = (e) => {
        setRun(e);
    }

    return (
        <div className="App">
            <ButtonAppBar />
            <Container maxWidth="lg">
                <BasicButtons form={form} run={run} runCheck={checkPropRun} disableField={disablePropButton} />
                <BasicTextFields isDisabled={isDisabled} changeProp={handlePropChange} />
            </Container>
            <Container maxWidth="lg">
                <BasicTable  />
            </Container>
        </div>
    );
}