import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Produtos from './pages/Produtos';
import Itens from './pages/Itens';
import Carrinhos from './pages/Carrinhos';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const App = () => {
    return (
        <Router>
            {/* Barra Superior */}
            <AppBar position="static" sx={{ backgroundColor: '#2E7D32', boxShadow: 3 }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'white' }}>
                        Desafio Fullstack
                    </Typography>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                        sx={{
                            fontWeight: 'bold',
                            textTransform: 'none',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#1B5E20', // Verde mais escuro no hover
                                color: '#E0E0E0', // Cinza claro no hover
                            },
                        }}
                    >
                        Produtos
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/itens"
                        sx={{
                            fontWeight: 'bold',
                            textTransform: 'none',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#1B5E20', // Verde mais escuro no hover
                                color: '#E0E0E0', // Cinza claro no hover
                            },
                        }}
                    >
                        Itens
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/carrinhos"
                        sx={{
                            fontWeight: 'bold',
                            textTransform: 'none',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#1B5E20', // Verde mais escuro no hover
                                color: '#E0E0E0', // Cinza claro no hover
                            },
                        }}
                    >
                        Carrinhos
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Conteúdo Central */}
            <Routes>
                <Route path="/" element={<Produtos />} />
                <Route path="/itens" element={<Itens />} />
                <Route path="/carrinhos" element={<Carrinhos />} />
            </Routes>
        </Router>
    );
};

export default App;