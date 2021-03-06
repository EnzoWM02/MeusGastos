import React, { useState } from 'react';
import './Signup.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [fieldValues, setFieldValues] = useState({});
    const [errorsPassword, setErrorsPassword] = useState({});
    const [errorsEmail, setErrorsEmail] = useState({});
    const [helperPassword, setHelperPassword] = useState({});
    const [helperEmail, setHelperEmail] = useState({});

    const navigate = useNavigate();

    const backToLogin = async () => {
        navigate('/login');
    }

    const createUser = async (event) => {
        event.preventDefault();
        const validPassword = validatePassword();
        const validEmail = validateEmail();

        if (validEmail && validPassword) {
            try {
                let email = fieldValues.email;
                let password = fieldValues.password;
                await axios.post(process.env.REACT_APP_API_URL_USER, {email, password});
                toast.success('Usuário criado com sucesso!');
                navigate('/login');
            } catch (e) {
                console.log('err', { e });
                console.error(e);
                if (e.response?.data.error.status === 409) {
                    toast.error(e.response?.data.message);
                } else {
                    toast.error('Erro ao criar usuário!');
                }
            }
        } else {
            return false;
        }
    };

    const validatePassword = () => {
        if (
            fieldValues.password === fieldValues.passwordConfirm &&
            fieldValues.password !== ''
        ) {
            setHelperPassword({ password: '' });
            setErrorsPassword({
                ...errorsPassword,
                password: false,
                passwordConfirm: false,
            });
            return true;
        } else {
            setHelperPassword({ password: 'As senhas digitadas não coincidem' });
            setErrorsPassword({
                ...errorsPassword,
                password: true,
                passwordConfirm: true,
            });
            console.log('senhas não valido');
            return false;
        }
    };

    const validateEmail = () => {
        let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
        if (!regex.test(fieldValues.email)) {
            setErrorsEmail({ ...errorsEmail, email: true });
            setHelperEmail({ email: 'O e-mail digitado não é válido' });
            console.log('email não valido');
            return false;
        } else {
            setErrorsEmail({ ...errorsEmail, email: false });
            setHelperEmail({ email: '' });
            return true;
        }
    };

    return (
        <div className="Signup defaultBackground">
            <form onSubmit={createUser}>
                <div className="card">
                    <h3>Cadastro</h3>
                    <TextField
                        id="email"
                        label="E-mail"
                        variant="outlined"
                        name="email"
                        onChange={(e) => {
                            setFieldValues({ ...fieldValues, email: e.target.value });
                        }}
                        error={errorsEmail.email}
                        helperText={helperEmail.email}
                    />
                    <TextField
                        id="password"
                        label="Senha"
                        name="password"
                        variant="outlined"
                        type="password"
                        error={errorsPassword.password}
                        helperText={helperPassword.password}
                        onChange={(e) => {
                            setFieldValues({ ...fieldValues, password: e.target.value });
                        }}
                    />
                    <TextField
                        id="passwordConfirm"
                        label="Confirme sua senha"
                        name="password"
                        variant="outlined"
                        type="password"
                        error={errorsPassword.passwordConfirm}
                        onChange={(e) => {
                            setFieldValues({
                                ...fieldValues,
                                passwordConfirm: e.target.value,
                            });
                        }}
                    />
                    <Button className="filledButton botaoSignup" variant="contained" type="submit">
                        Cadastrar
                    </Button>
                        <Button className="outlinedButton botaoSignup" variant="outlined" onClick={backToLogin}>
                            Voltar para Login
                        </Button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
