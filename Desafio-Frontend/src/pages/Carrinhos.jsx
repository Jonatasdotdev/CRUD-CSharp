import React, { useEffect, useState } from 'react';
import {
    Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, TextField, Select, MenuItem, InputLabel, FormControl, Grid, Typography,
    AppBar, Toolbar, IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import api from '../services/api';

const Carrinhos = () => {
    const [carrinhos, setCarrinhos] = useState([]);
    const [itens, setItens] = useState([]);
    const [itemId, setItemId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Buscar carrinhos e itens
    const fetchData = async () => {
        const [carrinhosResponse, itensResponse] = await Promise.all([
            api.get('/api/Carrinho'),
            api.get('/api/Item'),
        ]);
        setCarrinhos(carrinhosResponse.data);
        setItens(itensResponse.data);
    };

    // Filtrar carrinhos
    const filteredCarrinhos = carrinhos.filter(carrinho =>
        carrinho.id.toString().includes(searchTerm.toLowerCase())
    );

    // Adicionar item ao carrinho
    const handleAddItem = async (carrinhoId) => {
        await api.post('/api/Carrinho/AddItem', { carrinhoId, itemId });
        setItemId('');
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#121212', color: 'white' }}>

            {/* Barra Superior */}
            <AppBar position="static" sx={{ backgroundColor: '#1F1B24', boxShadow: 3 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Gerenciamento de Carrinhos
                    </Typography>
                    {/* Barra de Pesquisa Alinhada */}
                    <TextField
                        variant="outlined"
                        placeholder="Buscar Carrinho"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            width: '300px',
                            height: '60px',
                            backgroundColor: '#333',
                            borderRadius: 1,
                            input: { color: 'white' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#B0B0B0',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#E0E0E0',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#B0B0B0',
                            },
                            marginLeft: '20px'
                        }}
                    />
                </Toolbar>
            </AppBar>

            {/* Conteúdo Central */}
            <Container sx={{ flexGrow: 1, mt: 4, maxWidth: '1200px', ml: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#E0E0E0' }}>
                    Carrinhos
                </Typography>

                {/* Tabela de Carrinhos */}
                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: '#272727' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#1F1B24' }}>
                                <TableCell sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>ID</TableCell>
                                <TableCell sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>Itens</TableCell>
                                <TableCell sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCarrinhos.map((carrinho) => (
                                <TableRow key={carrinho.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#333' }, '&:hover': { backgroundColor: '#444' } }}>
                                    <TableCell sx={{ color: 'white' }}>{carrinho.id}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>
                                        <ul>
                                            {carrinho.itensCarrinho.map((itemCarrinho) => (
                                                <li key={itemCarrinho.itemId}>
                                                    {itemCarrinho.item.nome} - {itemCarrinho.item.quantidade} {itemCarrinho.item.unidadeMedida}
                                                </li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                    <TableCell>
                                        <FormControl fullWidth sx={{ backgroundColor: '#333', borderRadius: 1, mb: 2 }}>
                                            <InputLabel sx={{ color: '#B0B0B0' }}>Item</InputLabel>
                                            <Select
                                                value={itemId}
                                                onChange={(e) => setItemId(e.target.value)}
                                                sx={{ color: 'white' }}
                                            >
                                                {itens.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.produto.nome} - {item.quantidade} {item.unidadeMedida}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Button
                                            onClick={() => handleAddItem(carrinho.id)}
                                            variant="contained"
                                            fullWidth
                                            sx={{ backgroundColor: '#388E3C', '&:hover': { backgroundColor: '#2E7D32' }, color: 'white' }}
                                        >
                                            Adicionar Item
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};

export default Carrinhos;
