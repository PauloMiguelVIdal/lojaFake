import React, { useState, useEffect } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Grid,
} from "@mui/material";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://fakestoreapi.com/users')
            .then(response => console.log(response.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setToken(null);

        const credentials = {
            username: email,
            password: password,
        };

        const loginUser = (username, password) => {
            const stored = JSON.parse(localStorage.getItem("fakeUser"));
            if (stored && stored.username === username && stored.password === password) {
                localStorage.setItem("authToken", "fake-token");
                setToken("fake-token");
                return true;
            }
            return false;
        };

        if (loginUser(email, password)) {
            console.log("Login local bem-sucedido.");
            setTimeout(() => {
                navigate("/");
            }, 1000);
            return;
        }

        try {
            const response = await axios.post(
                "https://fakestoreapi.com/auth/login",
                credentials
            );
            const apiToken = response.data.token;
            setToken(apiToken);
            localStorage.setItem("authToken", apiToken);
        } catch (err) {
            setError("Falha no login. Verifique suas credenciais.");
            console.error(err);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #350973, #6411D9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
            }}
        >
            <Navbar />
            <Container maxWidth="sm">
                <Box
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: 4,
                        p: 5,
                        boxShadow: '0 4px 20px rgba(100, 17, 217, 0.3)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4" fontWeight="bold" color="white" gutterBottom>
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Usuário"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{
                                        input: { color: 'white' },
                                        label: { color: '#cfc6f8' }, // cinza claro
                                        '& label.Mui-focused': {
                                            color: '#cfc6f8',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#9a6ef0',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#cfc6f8', // cinza claro no hover
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#9a6ef0', // roxo claro no foco
                                            },
                                        },
                                    }}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{
                                        input: { color: 'white' },
                                        label: { color: '#cfc6f8' },
                                        '& label.Mui-focused': {
                                            color: '#cfc6f8',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#9a6ef0',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#cfc6f8',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#9a6ef0',
                                            },
                                        },
                                    }}
                                />

                            </Grid>
                        </Grid>
                        {error && (
                            <Typography color="error" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                        {token && (
                            <Typography sx={{ mt: 2, color: '#00e676' }}>
                                Usuário logado com sucesso!
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: '#6411D9',
                                fontWeight: 'bold',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#350973',
                                },
                            }}
                        >
                            Login
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            component={RouterLink}
                            to="/Register"
                            sx={{
                                mt: 1,
                                borderColor: '#ff9800',           // Laranja
                                color: '#ff9800',                 // Texto laranja
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#ff9800',     // Fundo laranja no hover
                                    color: '#fff',                  // Texto branco
                                    borderColor: '#ff9800',
                                },
                            }}
                        >
                            Registrar
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
