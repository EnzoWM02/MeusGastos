import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopMenuBar from "./TopMenuBar";
import {Button} from "reactstrap";
import TextField from "@mui/material/TextField";
import "./NewGastos.css"
import { toastContainer, toast } from 'react-toastify';
import {useNavigate, useParams} from "react-router-dom";
import { useCookies } from 'react-cookie';

const NewGastos = () => {

    const { id } = useParams();
    const [fieldValues, setFieldValues] = useState({});

    const [cookies, setCookie] = useCookies(['user']);

    const navigate = useNavigate();

    const backToMain = async () => {
        navigate('/home')
    }

    const newGasto = async () => {
        let name = fieldValues.name;
        let description = fieldValues.description;
        let value = fieldValues.value;
        try {
                if (!id) {
                    const data = await axios.post(process.env.REACT_APP_API_URL_GASTOS, {name, description, value});
                    setCookie('last', data.data.id, { path: '/', maxAge:'360000'});
                } else {
                    let url = process.env.REACT_APP_API_URL_GASTOS + '/' + id;
                    console.log(id);
                    await axios.put(url, {name, description, value});
                }                
                navigate('/home');
            } catch (e) {
                toast.error("Os campos não foram corretamente preenchidos");
                console.log (e);
            }
    }

    return (
        
            <div className="card ngcard">
                {console.log(id)}
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
    );

}

export default NewGastos