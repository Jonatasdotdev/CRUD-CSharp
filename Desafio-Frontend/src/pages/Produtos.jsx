import React, { useEffect, useState } from 'react';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Typography,
    Box,
    Grid,
    AppBar,
    Toolbar,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import api from '../services/api';

const Produtos = () => {
    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProdutos = async () => {
        const response = await api.get('/api/Produto');
        setProdutos(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/api/Produto', { nome });
        setNome('');
        fetchProdutos();
    };

    const filteredProdutos = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchProdutos();
    }, []);

    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#121212', color: 'white' }}>
            {/* Barra Superior */}
            <AppBar position="static" sx={{ backgroundColor: '#1F1B24', boxShadow: 3 }}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Sistema de Produtos
                    </Typography>
                    {/* Barra de Pesquisa Alinhada */}
                    <TextField
                        variant="outlined"
                        placeholder="Buscar Produto"
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


            {/* Conteúdo Principal */}
            <Container sx={{ flexGrow: 1, mt: 4, maxWidth: '1200px', ml: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#E0E0E0' }}>
                    Produtos
                </Typography>

                {/* Formulário de Cadastro */}
                <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, backgroundColor: '#272727' }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    fullWidth
                                    label="Nome do Produto"
                                    variant="outlined"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                    sx={{ backgroundColor: '#333', borderRadius: 1, input: { color: 'white' }, label: { color: '#B0B0B0' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{ backgroundColor: '#388E3C', '&:hover': { backgroundColor: '#2E7D32' }, color: 'white' }}
                                >
                                    Adicionar Produto
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>

                {/* Tabela de Produtos */}
                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: '#272727' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#1F1B24' }}>
                                <TableCell sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>ID</TableCell>
                                <TableCell sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>Nome</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProdutos.map((produto) => (
                                <TableRow key={produto.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#333' }, '&:hover': { backgroundColor: '#444' } }}>
                                    <TableCell sx={{ color: 'white' }}>{produto.id}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{produto.nome}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};

export default Produtos;
