import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './ItensRow.css';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';

const ItensRow = ({item, fetchItensAxios}) => {

    const confirm = useConfirm();
    const navigate = useNavigate();

    //this method defines properties for the dialog
    const handleDelete = () => {
        confirm({ 
            title: 'Você tem certeza?',
            description: '',
            confirmationText: 'Sim',
            cancellationText: 'Não',
            dialogProps: {
                sx:{width: '20%', left: '40%'},
                PaperProps:{sx:{backgroundImage: 'linear-gradient(#5b467e, #2E2944)', borderRadius: '20px'}}
            },
            titleProps: {
                sx: {color: 'white'}
            },
            confirmationButtonProps: {
                sx: {
                    backgroundImage: 'linear-gradient(to bottom right, #AB66D0, #cf58b5)',
                    borderRadius: '20px', 
                    color: 'white',
                    "&:hover": {
                        backgroundImage: 'linear-gradient(to bottom right, #cf58b5, #AB66D0)',
                        color: 'black'
                    }
                }
            },
            cancellationButtonProps: {
                sx: {
                    backgroundImage: 'linear-gradient(to bottom right, #AB66D0, #cf58b5)',
                    marginRight: '5px',
                    borderRadius: '20px', 
                    color: 'white',
                    "&:hover": {
                        backgroundImage: 'linear-gradient(to bottom right, #cf58b5, #AB66D0)',
                        color: 'black'
                    }
                }
            }

        })
          .then(() => { deleteRow() })
          .catch(() => { /* ... */ });
      };

        const deleteRow = async () => {
            let url = process.env.REACT_APP_API_URL_GASTOS + '/' + item.id;
            await axios.delete(url); 
            fetchItensAxios();
        }

        const editRow = async () => {
            navigate(`/home/new/${item.id}`);
        }

        return (
            <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row" className="lineNome">
                    {item.name}
                </TableCell>
                <TableCell align="right" className="line">{item.description}</TableCell>
                <TableCell align="right" className="line">{item.item_date.substring(0,10)}</TableCell>
                <TableCell align="right" className="lineNome">{item.value}</TableCell>
                <TableCell align="right" className="lineIcons">
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="events-menu"
                        sx={{ mr: 2 }}
                        id="events-button"
                        className="lineIcons"
                        onClick={editRow}
                    >
                        <EditIcon />
                    </IconButton>
                </TableCell>
                <TableCell align="right" className="lineIcons">
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="events-menu"
                        sx={{ mr: 2 }}
                        id="events-button"
                        className="lineIcons"
                        onClick={handleDelete}
                    >
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        );

}

export default ItensRow