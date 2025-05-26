import React, { use, useState } from "react";
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
import { Link } from "react-router-dom";
import { useEffect } from "react";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

useEffect(() => {
    axios.get('https://fakestoreapi.com/users')
    .then(response => console.log(response.data));
}, []);

const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setToken(null);

        const credentials = {
            username: email,      
            password: password,
        };

        try {
            const response = await axios.post(
                "https://fakestoreapi.com/auth/login",
                credentials
            );
            setToken(response.data.token);
            console.log("Token recebido:", response.data.token);
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
                                Token recebido: {token}
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
                        <Button>
                    <Link onClick={()=>(navigate("/Register"))} style={{ textDecoration: 'none' }}>
                        Register
                    </Link>
                </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default Login;
