import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

function Produto() {

    const[ marca, setMarca ] = useState( "" );
    const[ tamanho, setTamanho ] = useState( "" );
    const[ ano, setAno ] = useState( "" );
    const[ cor, setCor] = useState( "" );
    const[ estilo, setEstilo ] = useState( "" );
    const[ produto, setProduto ] = useState( "" );
    const[ erro, setErro ] = useState( false );
    const[ imagem, setImagem ] = useState( "" );

    function Produto( evento )
    {
        evento.preventDefault();
        fetch( process.env.REACT_APP_BACKEND + "produtos",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    marca: marca,
                    tamanho: tamanho,
                    ano: ano,
                    cor: cor,
                    estilo: estilo,
                    imagem: imagem
                }
            )
        } )
        .then( (resposta) => resposta.json() )
        .then( ( json ) => { 

            if( json._id ) {
                setProduto( true );
                setErro( false );
            } else {
                setErro( true );
                setProduto( false );
            }
        })
        .catch( ( error ) => { setErro( true ) } )
    }

    useEffect( () => {

        setMarca( "" );
        setTamanho( "" );
        setAno( "" );
        setCor( "" );
        setEstilo( "" );
        setImagem( "" );

    }, [ Produto ] );

       
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
             <Typography component="h1" variant='h6'>Roupas</Typography>

             { erro && ( <Alert severity="warning" sx={{mt: 2, mb: 2 }} >Desculpe, tente novamente!</Alert>)}
             { produto && ( <Alert severity="success" sx={{mt: 2, mb: 2 }} >Obrigado por procurar a roupa!</Alert>)}
         <Box component="form" onSubmit={Produto}>
            <TextField 
            type="text" 
            label="Marca" 
            variant="filled" 
            margin="normal"
            value={marca}
            onChange={ (e) => setMarca( e.target.value ) } 
            fullWidth
            />
            <TextField 
            type="text" 
            label="Tamanho" 
            variant="filled" 
            margin="normal"
            value={tamanho}
            onChange={ (e) => setTamanho( e.target.value ) } 
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
            type="text" 
            label="Cor" 
            variant="filled" 
            margin="normal"
            value={cor}
            onChange={ (e) => setCor( e.target.value ) } 
            fullWidth
            />
            <TextField 
            type="text" 
            label="Estilo" 
            variant="filled" 
            margin="normal"
            value={estilo}
            onChange={ (e) => setEstilo( e.target.value ) } 
            fullWidth
            />
            <TextField 
            type="text" 
            label="Imagem da roupa" 
            variant="filled" 
            margin="normal"
            value={imagem}
            onChange={ (e) => setImagem( e.target.value ) } 
            fullWidth
            />
            <Button type="submit" variant="contained"  size="large" fullWidth sx={ { mt:2, mb:2 }}>Procurar roupas</Button>
        </Box>
        </Box>
    </Container>     
  )
}
export default Produto;