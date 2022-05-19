import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopMenuBar from "../components/TopMenuBar";
import {Button} from "reactstrap";
import Input from '@mui/material/Input';
import TextField from "@mui/material/TextField";
import "./NewGastos.css"
import { toastContainer, toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";

const NewGastos = () => {

    const [fieldValues, setFieldValues] = useState({});

    const navigate = useNavigate();

    const backToMain = async () => {
        navigate('/MainView')
    }

    const newGasto = async () => {
        let name = fieldValues.name;
        let description = fieldValues.description;
        let value = fieldValues.value;
        try {
                const data = await axios.post(process.env.REACT_APP_API_URL_GASTOS, {name, description, value});
                console.log(data);
                navigate('/mainView');
            } catch (e) {
                toast.error("Os campos não foram corretamente preenchidos");
                console.log (e);
            }
    }

    return (
        <div className="defaultBackground mainViewBackground">
            <div className="PageHeader">
                <TopMenuBar/>
            </div>
            <div className="card ngcard">
                <h2>Cadastrar novo gasto</h2>
                <TextField
                    className="textField"
                    id="name"
                    label="Nome"
                    variant="outlined"
                    type="text"
                    onChange={(e) => {
                        setFieldValues({ ...fieldValues, name: e.target.value });
                    }}
                />
                <TextField
                    className="textField"
                    id="description"
                    label="Descrição"
                    variant="outlined"
                    type="text"
                    onChange={(e) => {
                        setFieldValues({ ...fieldValues, description: e.target.value });
                    }}
                />
                <TextField
                    className="textField"
                    id="value"
                    label="Valor"
                    variant="outlined"
                    Input type="number"
                    onChange={(e) => {
                        setFieldValues({ ...fieldValues, value: e.target.value });
                    }}
                />
                <Button className="filledButton" variant="contained" onClick={newGasto}>
                    Cadastrar
                </Button>
                    <Button className="signupButton outlinedButton" variant="outlined" onClick={backToMain}>
                        Voltar
                    </Button>
            </div>
        </div>
    );

}

export default NewGastos
