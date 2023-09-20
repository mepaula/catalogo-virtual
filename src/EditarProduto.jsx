import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuResponsivo from "./components/MenuResponsivo";

function EditaProduto() {

    const { id } = useParams();
    const[ titulo, setTitulo ] = useState( "" );
    const[ descricao, setDescricao ] = useState( "" );
    const[ ano, setAno ] = useState( "" );
    const[ duracao, setDuracao ] = useState( "" );
    const[ imagem, setImagem ] = useState( "" );
    const[ editar, setEditar ] = useState( false );
    const[ erro, setErro ] = useState( false );

    function Editar( evento ) {
        evento.preventDefault();
         
        fetch( process.env.REACT_APP_BACKEND + "produtos",{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id: id,
                    titulo: titulo,
                    descricao: descricao,
                    ano: ano,
                    imagem: imagem,
                    duracao: duracao,
                    usuario: localStorage.getItem( "usuario" )
                }
            )
        } )
        .then( (resposta) => resposta.json() )
        .then( ( json ) => { 

            if( json._id ) {
                setEditar( true );
                setErro( false );
            } else {
                setErro( true );
                setEditar("Não foi possível ediatr o filme");
            }
        })
        .catch((erro) => { setErro (true) })
    }

    useEffect( () => {

        const usuario = localStorage.getItem( "usuario" );
        fetch( process.env.REACT_APP_BACKEND + "produtos/" + usuario +  id,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resposta) => resposta.json())
        .then((json) => {
            if( !json.status ) {
                setTitulo( json.titulo );
                setDescricao( json.descricao );
                setAno( json.ano );
                setImagem( json.imagem );
                setDuracao( json.duracao )
            } else {
                setErro( "Filme não encontardo" );
            }
        })
        .catch((erro) => { setErro("opps ocorreu um erro") })
    }, [] );

  return (

    <>
    <MenuResponsivo/>
    <Container component="section" maxWidth="xs">
        <Box sx={{
            mt: 5,
            backgroundColor: "#9003fc",
            padding: "30px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
         }}>  

         <Typography component="h1" variant='h5'>Editar </Typography>  

         { erro && ( <Alert severity="warning">Não foi possível editar</Alert>)}
         { editar && ( <Alert severity="success">Filme editado com sucesso</Alert>)}

         <Box component="form" onSubmit={Editar}>
         <TextField 
            type="text" 
            label="Titulo:" 
            variant="filled" 
            margin="normal"
            value={titulo}
            onChange={ (e) => setTitulo( e.target.value ) } 
            fullWidth
            />
            <TextField 
            type="text" 
            label="Descrição:" 
            variant="filled" 
            margin="normal"
            value={descricao}
            onChange={ (e) => setDescricao( e.target.value ) } 
            fullWidth
            />
            <TextField 
            type="text" 
            label="Ano:" 
            variant="filled" 
            margin="normal"
            value={ano}
            onChange={ (e) => setAno( e.target.value ) } 
            fullWidth
            />
            <TextField 
            type="text" 
            label="Duração:" 
            variant="filled" 
            margin="normal"
            value={duracao}
            onChange={ (e) => setDuracao( e.target.value ) } 
            fullWidth
            />
            <TextField 
            type="text" 
            label="Imagem da Roupa:" 
            variant="filled" 
            margin="normal"
            value={imagem}
            onChange={ (e) => setImagem( e.target.value ) } 
            fullWidth
            />
                   
            <Button type="submit" variant="contained"  size="large" fullWidth sx={ { mt:2, mb:2 }}>Cadastro Feito</Button>
         </Box>
        </Box> 
    </Container>
    </>
  )
}

export default EditaProduto;