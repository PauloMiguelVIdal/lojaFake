import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Grid,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../components/Footer";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setToken(null);

        const credentials = {
            username: email,
            password,
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
            setToken("fake-token");
            setTimeout(() => {
                navigate("/");
            }, 1000);
            return;
        }

        try {
            const response = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();

            if (data.token) {
                localStorage.setItem("authToken", data.token);
                setToken(data.token);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                throw new Error("Token não retornado");
            }
        } catch (err) {
            console.error("Erro no login:", err);
            setError("Falha no login. Verifique suas credenciais.");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                background: "linear-gradient(135deg, #350973, #6411D9)",
            }}
        >
            <Navbar />
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2,
                    py: { xs: 4, sm: 8 },
                }}
            >
                <Container maxWidth="sm">
                    <Box
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                            borderRadius: 4,
                            p: { xs: 3, sm: 5 },
                            boxShadow: "0 4px 20px rgba(100, 17, 217, 0.3)",
                            backdropFilter: "blur(10px)",
                            color: "white",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            color="white"
                            gutterBottom
                            sx={{
                                fontSize: { xs: "1.8rem", sm: "2.125rem" },
                                textAlign: "center",
                            }}
                        >
                            Login
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Usuário"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        sx={inputStyles}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="password"
                                        label="Senha"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        sx={inputStyles}
                                    />
                                </Grid>
                            </Grid>

                            {error && (
                                <Typography color="error" sx={{ mt: 2, fontSize: "0.9rem" }}>
                                    {error}
                                </Typography>
                            )}
                            {token && (
                                <Typography sx={{ mt: 2, color: "#00e676", fontSize: "0.9rem" }}>
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
                                    backgroundColor: "#6411D9",
                                    fontWeight: "bold",
                                    color: "#fff",
                                    fontSize: { xs: "0.9rem", sm: "1rem" },
                                    "&:hover": {
                                        backgroundColor: "#350973",
                                    },
                                }}
                            >
                                Entrar
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined"
                                component={RouterLink}
                                to="/Register"
                                sx={{
                                    borderColor: "#ff9800",
                                    color: "#ff9800",
                                    fontWeight: "bold",
                                    fontSize: { xs: "0.9rem", sm: "1rem" },
                                    "&:hover": {
                                        backgroundColor: "#ff9800",
                                        color: "#fff",
                                        borderColor: "#ff9800",
                                    },
                                }}
                            >
                                Criar Conta
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </Box>
    );
}

const inputStyles = {
    input: { color: "white" },
    label: { color: "#cfc6f8" },
    "& label.Mui-focused": {
        color: "#cfc6f8",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#9a6ef0",
        },
        "&:hover fieldset": {
            borderColor: "#cfc6f8",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#9a6ef0",
        },
    },
};

export default Login;
