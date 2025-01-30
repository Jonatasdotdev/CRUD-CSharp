import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, AppBar, Toolbar, IconButton, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import api from '../services/api';

const Dashboard = () => {
    const [counts, setCounts] = useState({ produtos: 0, itens: 0, carrinhos: 0 });
    const [searchTerm, setSearchTerm] = useState('');

    const fetchCounts = async () => {
        const [produtosResponse, itensResponse, carrinhosResponse] = await Promise.all([
            api.get('/api/Produto'),
            api.get('/api/Item'),
            api.get('/api/Carrinho'),
        ]);
        setCounts({
            produtos: produtosResponse.data.length,
            itens: itensResponse.data.length,
            carrinhos: carrinhosResponse.data.length,
        });
    };

    useEffect(() => {
        fetchCounts();
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
                        Dashboard
                    </Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            width: '300px',
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
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 3 }}>
                <Grid container spacing={3} sx={{ maxWidth: '1200px' }}>
                    {/* Card de Produtos */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#272727', color: 'white', borderRadius: 2, boxShadow: 3 }}>
                            <Typography variant="h6" sx={{ color: '#E0E0E0' }}>
                                Produtos
                            </Typography>
                            <Typography variant="h4" sx={{ color: '#4CAF50', mt: 2 }}>
                                {counts.produtos}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Card de Itens */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#272727', color: 'white', borderRadius: 2, boxShadow: 3 }}>
                            <Typography variant="h6" sx={{ color: '#E0E0E0' }}>
                                Itens
                            </Typography>
                            <Typography variant="h4" sx={{ color: '#2196F3', mt: 2 }}>
                                {counts.itens}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Card de Carrinhos */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#272727', color: 'white', borderRadius: 2, boxShadow: 3 }}>
                            <Typography variant="h6" sx={{ color: '#E0E0E0' }}>
                                Carrinhos
                            </Typography>
                            <Typography variant="h4" sx={{ color: '#FF9800', mt: 2 }}>
                                {counts.carrinhos}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Dashboard;
