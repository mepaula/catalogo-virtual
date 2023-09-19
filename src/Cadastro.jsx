import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MenuResponsivo from './components/MenuResponsivo';

function Cadastro() {

    const [telefone, setTelefone] = useState("");
    const [nome, setNome] = useState("");
    const [CPF, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [cadastro, setCadastro] = useState(false);
    const [erro, setErro] = useState(false);

    function Cadastrar(evento) {
        evento.preventDefault();
        fetch(process.env.REACT_APP_BACKEND + "users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    nome: nome,
                    cpf: CPF,
                    telefone: telefone,
                    senha: senha
                }
            )
        })
            .then((resposta) => resposta.json())
            .then((json) => {

                if (json.cpf) {
                    setCadastro(true);
                    setErro(false);
                } else {
                    setErro(true);
                    setCadastro(false);
                }
            })
            .catch((erro) => { setErro(true) })
    }

    useEffect(() => {

        setNome("");
        setCpf("");
        setTelefone("");
        setSenha("");
        //setCadastro( false );

    }, [cadastro]);

    return (
        <>
            <MenuResponsivo />

            <Container component="section" maxWidth="xs">
                <Box sx={{
                    mt: 10,
                    backgroundColor: "#9003fc",
                    padding: "50px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Typography component="h1" variant='h4'>Cadastrar</Typography>

                    {erro && (<Alert severity="warning" sx={{ mt: 2, mb: 2 }} >Desculpe, tente novamente</Alert>)}
                    {cadastro && (<Alert severity="success" sx={{ mt: 2, mb: 2 }} >Obrigado por se cadastrar</Alert>)}

                    <Box component="form" onSubmit={Cadastrar}>
                        <TextField
                            type="text"
                            label="Nome"
                            variant="filled"
                            margin="normal"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            type="text"
                            label="Telefone"
                            variant="filled"
                            margin="normal"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            type="cpf"
                            label="CPF"
                            variant="filled"
                            margin="normal"
                            value={CPF}
                            onChange={(e) => setCpf(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            type="password"
                            label="Senha"
                            variant="filled"
                            margin="normal"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            fullWidth
                        />
                        <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2, mb: 2 }}>Entar</Button>
                    </Box>
                </Box>
            </Container>
        </>

    )
}

export default Cadastro;