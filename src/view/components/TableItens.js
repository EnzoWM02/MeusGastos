import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import FilterDialog from './FilterDialog';
import ItensRow from '../components/ItensRow';
import Tooltip from '@mui/material/Tooltip';
import { useCookies } from "react-cookie";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button } from 'reactstrap';
import './TableItens.css';
import axios from 'axios';

const TableItens = () => {

    const [itens, setItens] = useState([]);
    const [total, setTotal] = useState(0);
    const [anchorElFilter, setAnchorElFilter] = useState(false);

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);

    const [filter, setFilter] = useState({});

    const openFilter = !!anchorElFilter;
    const handleClickFilter = (event) => {
        setAnchorElFilter(event.currentTarget);
    };
    const handleCloseFilter = () => {
        setAnchorElFilter(null);
    };

    const deleteLast = async () => {
        try {
            console.log(cookies.last);
            let url = process.env.REACT_APP_API_URL_GASTOS + '/' + cookies.last;
            await axios.delete(url);
        } catch (e) {
            toast.error("O último gasto já foi removido");
        }
    }

    const toGo = async () => {
        navigate('/home/new');
    }

    const applyFilter = (filter) => {
        setFilter(filter);
    }

    async function fetchItensAxios() {
        try {
            let { data: response } = await axios.get(process.env.REACT_APP_API_URL_GASTOS);
            if (typeof(filter.dateValueMin) !== 'undefined') {
            response = response.filter((item) => {
               return item.item_date >= new Date(filter.dateValueMin).toISOString()
               && item.item_date <= new Date(filter.dateValueMax).toISOString() ? true : false;
            })
        }
            setItens(response);

            let total = 0;

            response.forEach(function(item) {
                if (item.user_id == cookies.userid) {
                    total += item.value;
                }
            })

            setTotal(total);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchItensAxios();
    }, [filter]);

    return (

            <div className="outside">
                <div className="TableItens">
                    <Button className="createButton filledButtonCreate" variant="contained" onClick={toGo}>
                        Cadastrar novo item
                    </Button>
                    <Tooltip title="Desfazer último">
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="events-menu"
                            sx={{ mr: 2 }}
                            id="events-button"
                            className="returnIcon"
                            onClick={deleteLast}
                        >
                            <KeyboardReturnIcon style={{ color: '#ffffff' }}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Filtrar itens">
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="filter-menu"
                            sx={{ mr: 2 }}
                            id="filter-button"
                            className="filterIcon"
                            aria-controls={openFilter ? 'filter-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openFilter ? 'true' : undefined}
                            onClick={handleClickFilter}
                        >
                            <FilterListIcon style={{ color: '#ffffff' }}/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="filter-menu"
                        className="filter"
                        anchorEl={anchorElFilter}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} //Faz sair do meio do icone
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                        open={openFilter}
                        onClose={handleCloseFilter}
                        PaperProps={{sx:{backgroundColor:'transparent', borderRadius: '20px'}}}  //Desgraça de paper, foi horrivel de achar esse props até na API       
                        MenuListProps={{          
                            sx:{
                                backgroundImage: 'linear-gradient(#5b467e, #2E2944)',
                                border: 'solid 2px #483C6C',
                                borderRadius: '20px',
                                backgroundColor: 'black'
                            },                 
                                'aria-labelledby': 'filter-button'
                        }}
                    >
                        <FilterDialog filter={filter} applyFilter={applyFilter} handleCloseFilter={handleCloseFilter} />
                    </Menu>
                    <TableContainer sx={{borderRadius: '10px'}}/*component={Paper}*/>
                        <Table sx={{ minWidth: 650, borderRadius: '20px', backgroundImage: 'inherit', boxShadow:'none' }} aria-label="simple table">
                            <TableHead sx={{backgroundColor: '#1E1C2C'}}>
                                <TableRow sx={{}}>
                                    <TableCell><b>Nome</b></TableCell>
                                    <TableCell align="left"><b>Descrição</b></TableCell>
                                    <TableCell align="left"><b>Data</b></TableCell>
                                    <TableCell align="right"><b>Valor</b></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {itens.map(function (key, index) {
                                    if (itens[index].user_id == cookies.userid) {
                                        return <ItensRow key={index} item={itens[index]} fetchItensAxios={fetchItensAxios} />;
                                    }
                                })}
                                <TableRow
                                    key={total}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">

                                    </TableCell>
                                    <TableCell align="left"><b></b></TableCell>
                                    <TableCell align="left"><b>Total</b></TableCell>
                                    <TableCell align="right"><b>{total}</b></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>


    );
};

export default TableItens;