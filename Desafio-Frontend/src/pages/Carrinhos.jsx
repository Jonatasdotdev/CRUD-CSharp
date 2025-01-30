import React, { useEffect, useState } from 'react';
import {
    Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, TextField, Select, MenuItem, InputLabel, FormControl, Typography,
    AppBar, Toolbar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import api from '../services/api';

const Carrinhos = () => {
    const [carrinhos, setCarrinhos] = useState([]);
    const [itens, setItens] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [newCarrinhoId, setNewCarrinhoId] = useState('');

    const fetchData = async () => {
        const [carrinhosResponse, itensResponse] = await Promise.all([
            api.get('/api/Carrinho'),
            api.get('/api/Item'),
        ]);
        setCarrinhos(carrinhosResponse.data);
        setItens(itensResponse.data);
    };

    const handleAddItem = async (carrinhoId) => {
        const itemId = selectedItems[carrinhoId];
        if (!itemId) {
            alert("Selecione um item para adicionar.");
            return;
        }

        try {
            await api.post(`/api/Carrinho/${carrinhoId}/itens`, itemId, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSelectedItems({
                ...selectedItems,
                [carrinhoId]: ''
            });
            fetchData();
        } catch (error) {
            console.error("Erro ao adicionar item:", error.response?.data || error.message);
        }
    };

    const handleRemoveItem = async (carrinhoId, itemId) => {
        await api.delete(`/api/Carrinho/${carrinhoId}/itens/${itemId}`);
        fetchData();
    };

    const handleDeleteCarrinho = async (carrinhoId) => {
        try {
            await api.delete(`/api/Carrinho/${carrinhoId}`);
            fetchData(); // Atualiza a lista de carrinhos após a exclusão
        } catch (error) {
            console.error("Erro ao excluir carrinho:", error.response?.data || error.message);
        }
    };

    const handleCreateCarrinho = async () => {
        try {
            await api.post('/api/Carrinho', {});
            fetchData();
            setOpenCreateDialog(false);
        } catch (error) {
            console.error("Erro ao criar carrinho:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredCarrinhos = carrinhos.filter(carrinho =>
        carrinho.id.toString().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#121212', color: 'white' }}>
            <AppBar position="static" sx={{ backgroundColor: '#1F1B24', boxShadow: 3 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Gerenciamento de Carrinhos
                    </Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Buscar Carrinho"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            width: '300px',
                            backgroundColor: '#333',
                            borderRadius: 1,
                            input: { color: 'white' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#B0B0B0' },
                                '&:hover fieldset': { borderColor: '#E0E0E0' },
                            },
                            '& .MuiInputLabel-root': { color: '#B0B0B0' },
                            marginLeft: '20px'
                        }}
                    />
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ ml: 2 }}
                        onClick={() => setOpenCreateDialog(true)}
                    >
                        Criar Carrinho
                    </Button>
                </Toolbar>
            </AppBar>

            <Container sx={{ flexGrow: 1, mt: 4, maxWidth: '1200px', ml: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#E0E0E0' }}>
                    Carrinhos
                </Typography>

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
                                                    {itemCarrinho.item.produto.nome} - {itemCarrinho.item.quantidade} {itemCarrinho.item.unidadeMedida}
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        size="small"
                                                        sx={{ ml: 2 }}
                                                        onClick={() => handleRemoveItem(carrinho.id, itemCarrinho.itemId)}
                                                    >
                                                        Remover
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                    <TableCell>
                                        <FormControl fullWidth sx={{ backgroundColor: '#333', borderRadius: 1, mb: 2 }}>
                                            <InputLabel sx={{ color: '#B0B0B0' }}>Item</InputLabel>
                                            <Select
                                                value={selectedItems[carrinho.id] || ''}
                                                onChange={(e) => setSelectedItems({
                                                    ...selectedItems,
                                                    [carrinho.id]: e.target.value
                                                })}
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
                                            sx={{ backgroundColor: '#388E3C', '&:hover': { backgroundColor: '#2E7D32' }, color: 'white', mb: 2 }}
                                        >
                                            Adicionar Item
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteCarrinho(carrinho.id)}
                                            variant="contained"
                                            fullWidth
                                            color="error"
                                            sx={{ backgroundColor: '#d32f2f', '&:hover': { backgroundColor: '#b71c1c' }, color: 'white' }}
                                        >
                                            Excluir Carrinho
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            {/* Diálogo para criar novo carrinho */}
            <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
                <DialogTitle>Criar Novo Carrinho</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="ID do Carrinho"
                        type="number"
                        fullWidth
                        value={newCarrinhoId}
                        onChange={(e) => setNewCarrinhoId(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCreateDialog(false)}>Cancelar</Button>
                    <Button onClick={handleCreateCarrinho}>Criar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Carrinhos;