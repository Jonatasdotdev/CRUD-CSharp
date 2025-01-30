import React, { useEffect, useState } from 'react';
import {
    Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, TextField, Select, MenuItem, InputLabel, FormControl, Grid, Typography,
    AppBar, Toolbar, IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import api from '../services/api';

const Itens = () => {
    const [itens, setItens] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [produtoId, setProdutoId] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [unidadeMedida, setUnidadeMedida] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de busca

    // Buscar itens e produtos
    const fetchData = async () => {
        const [itensResponse, produtosResponse] = await Promise.all([
            api.get('/api/Item'),
            api.get('/api/Produto'),
        ]);
        setItens(itensResponse.data);
        setProdutos(produtosResponse.data);
    };

    // Cadastrar item
    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/api/Item', { produtoId, quantidade, unidadeMedida });
        setProdutoId('');
        setQuantidade('');
        setUnidadeMedida('');
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filtrar os itens com base no termo de busca
    const filteredItens = itens.filter(item =>
        item.produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#121212', color: 'white' }}>

            {/* Barra Superior */}
            <AppBar position="static" sx={{ backgroundColor: '#1F1B24', boxShadow: 3 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Gerenciamento de Itens
                    </Typography>
                    {/* Barra de Pesquisa Alinhada */}
                    <TextField
                        variant="outlined"
                        placeholder="Buscar Item"
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
                    Itens
                </Typography>

                {/* Campo de Busca */}
                {/* O campo de busca agora está na barra superior, então não há necessidade de outro campo aqui. */}

                {/* Formulário */}
                <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, backgroundColor: '#272727' }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth sx={{ backgroundColor: '#333', borderRadius: 1 }}>
                                    <InputLabel sx={{ color: '#B0B0B0' }}>Produto</InputLabel>
                                    <Select
                                        value={produtoId}
                                        onChange={(e) => setProdutoId(e.target.value)}
                                        required
                                        sx={{ color: 'white' }}
                                    >
                                        {produtos.map((produto) => (
                                            <MenuItem key={produto.id} value={produto.id}>
                                                {produto.nome}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Quantidade"
                                    variant="outlined"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(e.target.value)}
                                    required
                                    sx={{ backgroundColor: '#333', borderRadius: 1, input: { color: 'white' }, label: { color: '#B0B0B0' } }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Unidade de Medida"
                                    variant="outlined"
                                    value={unidadeMedida}
                                    onChange={(e) => setUnidadeMedida(e.target.value)}
                                    required
                                    sx={{ backgroundColor: '#333', borderRadius: 1, input: { color: 'white' }, label: { color: '#B0B0B0' } }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{ backgroundColor: '#388E3C', '&:hover': { backgroundColor: '#2E7D32' }, color: 'white' }}
                                >
                                    Adicionar
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>

                {/* Tabela de Itens */}
                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: '#272727' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#1F1B24' }}>
                                <TableCell sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>ID</TableCell>
                                <TableCell sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>Produto</TableCell>
                                <TableCell sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>Quantidade</TableCell>
                                <TableCell sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>Unidade de Medida</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredItens.map((item) => (
                                <TableRow key={item.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#333' }, '&:hover': { backgroundColor: '#444' } }}>
                                    <TableCell sx={{ color: 'white' }}>{item.id}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.produto.nome}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.quantidade}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.unidadeMedida}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};

export default Itens;
