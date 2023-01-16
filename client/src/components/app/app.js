import { useState } from "react";

import Container from '@mui/material/Container';
import ButtonAppBar from '../app-bar/header';
import BasicButtons from "../app-button/button";
import BasicTextFields from "../app-form/form";
import BasicTable from "../app-table/table2";

export default function App() {
    const [details, setDetails] = useState({
        url: '',
        pattern: '',
        limit: '20'
    });

    const handlePropChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => {
            return {...prev, [name]: value}
        })
    }

    return (
        <div className="App">
            <ButtonAppBar />
            <Container maxWidth="lg">
                <BasicButtons details={details} />
                <BasicTextFields changeProp={handlePropChange} />
            </Container>
            <Container maxWidth="lg">
                <BasicTable  />
            </Container>
        </div>
    );
}