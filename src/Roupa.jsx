import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MenuResponsivo from './components/MenuResponsivo';

function Roupa() {

    const[ titulo, setTitulo ] = useState( "" );
    const[ descricao, setDescricao ] = useState( "" );
    const[ ano, setAno ] = useState( "" );
    const[ duracao, setDuracao] = useState( "" );
    const[ categoria, setCategoria ] = useState( "" );
    const[ produto, setProduto ] = useState( "" );
    const[ erro, setErro ] = useState( false );
    const[ imagem, setImagem ] = useState( "" );

    function Cadastrar( evento )
    {
        evento.preventDefault();
        fetch( process.env.REACT_APP_BACKEND + "produtos",{
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
                    imagem: imagem,
                    usuario: localStorage.getItem( "usuario" )
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

        setTitulo( "" );
        setDescricao( "" );
        setAno( "" );
        setDuracao( "" );
        setCategoria( "" );
        setImagem( "" );

    }, [ Roupa ] );

       
    return (

        <>
        <MenuResponsivo/>
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
         <Box component="form" onSubmit={Cadastrar}>
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
            type="text" 
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
    </>    
  )
}
export default Roupa;