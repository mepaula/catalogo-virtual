import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

function Filme() {

    const[ titulo, setTitulo ] = useState( "" );
    const[ descricao, setDescricao ] = useState( "" );
    const[ ano, setAno ] = useState( "" );
    const[ duracao, setDuracao] = useState( "" );
    const[ categoria, setCategoria ] = useState( "" );
    const[ filme, setFilme ] = useState( "" );
    const[ erro, setErro ] = useState( false );
    const[ capa, setCapa ] = useState( "" );

    function Assistir( evento )
    {
        evento.preventDefault();
        fetch( process.env.REACT_APP_BACKEND + "filmes",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    titulo: titulo,
                    descricao: descricao,
                    ano: ano,
                    duracao: duracao,
                    categoria: categoria,
                    capa: capa
                }
            )
        } )
        .then( (resposta) => resposta.json() )
        .then( ( json ) => { 

            if( json._id ) {
                setFilme( true );
                setErro( false );
            } else {
                setErro( true );
                setFilme( false );
            }
        })
        .catch( ( erro ) => { setErro( true ) } )
    }

    useEffect( () => {

        setTitulo( "" );
        setDescricao( "" );
        setAno( "" );
        setDuracao( "" );
        setCategoria( "" );
        setCapa( "" );

    }, [ Filme ] );

       
    return (

    <Container component="section" maxWidth="xs">
        <Box sx={{
            mt: 10,
            backgroundColor: "#a7f",
            padding: "50px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
         }}>
             <Typography component="h1" variant='h6'> Cadastro de Filmes</Typography>

             { erro && ( <Alert severity="warning" sx={{mt: 2, mb: 2 }} >Desculpe, tente novamente!</Alert>)}
             { filme && ( <Alert severity="success" sx={{mt: 2, mb: 2 }} >Obrigado por se cadastrar!</Alert>)}
         <Box component="form" onSubmit={Assistir}>
            <TextField 
            type="text" 
            label="Titulo" 
            variant="filled" 
            margin="normal"
            value={titulo}
            onChange={ (e) => setTitulo( e.target.value ) } 
            fullWidth
            />
            <TextField 
            type="text" 
            label="Descrição" 
            variant="filled" 
            margin="normal"
            value={descricao}
            onChange={ (e) => setDescricao( e.target.value ) } 
            fullWidth
            />
            <TextField 
            type="date" 
            label="Ano" 
            variant="filled" 
            margin="normal"
            value={ano}
            onChange={ (e) => setAno( e.target.value ) } 
            fullWidth
            />
            <TextField 
            type="time" 
            label="Duração" 
            variant="filled" 
            margin="normal"
            value={duracao}
            onChange={ (e) => setDuracao( e.target.value ) } 
            fullWidth
            />
            <TextField 
            type="text" 
            label="Categoria" 
            variant="filled" 
            margin="normal"
            value={categoria}
            onChange={ (e) => setCategoria( e.target.value ) } 
            fullWidth
            />
            <TextField 
            type="text" 
            label="Capa do Filme" 
            variant="filled" 
            margin="normal"
            value={capa}
            onChange={ (e) => setCapa( e.target.value ) } 
            fullWidth
            />
            <Button type="submit" variant="contained"  size="large" fullWidth sx={ { mt:2, mb:2 }}>Cadastro Filmes</Button>
        </Box>
        </Box>
    </Container>     
  )
}
export default Filme;