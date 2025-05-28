import { Button, Container, TextField, Typography, Box, Grid } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";

function Register() {
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
    
        // Cria o objeto completo do usuário com carrinho incluso
        const user = {
            email: email,
            username: username,
            password: password,
            name: {
                firstname: firstname,
                lastname: lastName,
            },
            cart: {
                products: [],
                total: 0
            }
        };
    
        try {
            // Armazena localmente o usuário completo como "fakeUser"
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
        <>
            <Navbar />
            <div className="w-full h-screen flex items-center justify-center bg-white">
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
                            Register
                        </Typography>
                        <Box component="form" onSubmit={registerUser} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="firstname"
                                        label="First Name"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastname"
                                        label="Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
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
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        type="password"
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
                            {success && (
                                <Typography color="success.main" sx={{ mt: 2 }}>
                                    {success}
                                </Typography>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Register
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </div>
        </>
    );
}

export default Register;

               
