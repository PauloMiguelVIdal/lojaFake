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
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';

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

        // Primeiro, tenta login local
        const loginUser = (username, password) => {
            const stored = JSON.parse(localStorage.getItem("fakeUser"));
            if (stored && stored.username === username && stored.password === password) {
                localStorage.setItem("authToken", "fake-token");
                setToken("fake-token");
                return true;
            }
            return false;
        };

        // Se login local funcionar, pula o login na API
        if (loginUser(email, password)) {
            console.log("Login local bem-sucedido.");
            setTimeout(() => {
                navigate("/"); // Redireciona após registro
            }, 1000);
            return;
        }

        // Tenta login via API externa (Fake Store)
        try {
            const response = await axios.post(
                "https://fakestoreapi.com/auth/login",
                credentials
            );
            const apiToken = response.data.token;
            setToken(apiToken);
            localStorage.setItem("authToken", apiToken);
            console.log("Token recebido:", apiToken);
            // Redireciona após login, se desejar
            // navigate("/dashboard");
        } catch (err) {
            setError("Falha no login. Verifique suas credenciais.");
            console.error(err);
        }

    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-white">
            <Navbar />
            <Container maxWidth="sm">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" className="text-black" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Username"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        {error && (
                            <Typography color="error" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                        {token && (
                            <Typography color="success.main" sx={{ mt: 2 }}>
                                Usuário logado com sucesso!
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            component={RouterLink}
                            to="/Register"
                            sx={{ mt: 1 }}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default Login;
