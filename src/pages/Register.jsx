import React, { useState } from "react";
import {
    Button,
    Container,
    TextField,
    Typography,
    Box,
    Grid,
    useTheme,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../components/Footer";

function Register() {
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const theme = useTheme();

    const registerUser = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const user = {
            email,
            username,
            password,
            name: {
                firstname,
                lastname: lastName,
            },
            cart: {
                products: [],
                total: 0,
            },
        };

        try {
            localStorage.setItem("fakeUser", JSON.stringify(user));
            setSuccess("Usuário registrado com sucesso!");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (err) {
            console.error("Erro ao registrar usuário localmente:", err);
            setError("Erro ao registrar. Tente novamente.");
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
                            Cadastrar-se
                        </Typography>
                        <Box component="form" onSubmit={registerUser} sx={{ mt: 3, width: "100%" }}>
                        <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="firstname"
                                        label="Nome"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        sx={inputStyles}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastname"
                                        label="Sobrenome"
                                        value={lastName}
                                        onChange={(e) => setLastname(e.target.value)}
                                        sx={inputStyles}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Usuário"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        sx={inputStyles}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        type="email"
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
                            {success && (
                                <Typography sx={{ mt: 2, color: "#00e676", fontSize: "0.9rem" }}>
                                    {success}
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
                                Registrar
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined"
                                component={RouterLink}
                                to="/Login"
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
                                Voltar ao Login
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

export default Register;
