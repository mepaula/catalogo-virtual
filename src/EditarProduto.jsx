import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuResponsivo from "./components/MenuResponsivo";

function EditaProduto() {

    const { id } = useParams();
    const[ marca, setMarca ] = useState( "" );
    const[ estilo, setEstilo ] = useState( "" );
    const[ tamanho, setTamanho ] = useState( "" );
    const[ colecao, setColecao ] = useState( "" );
    const[ imagem, setImagem ] = useState( "" );
    const[ editar, setEditar ] = useState( false );
    const[ erro, setErro ] = useState( false );

    function Editar( evento ) {

        evento.preventDefault();
        fetch( process.env.REACT_APP_BACKEND + "filmes",{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id: id,
                    marca: marca,
                    estilo: estilo,
                    tamanho: tamanho,
                    imagem: imagem,
                    colecao: colecao
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
        fetch( process.env.REACT_APP_BACKEND + "filmes/" +  id,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resposta) => resposta.json())
        .then((json) => {
            if( !json.status ) {
                setMarca( json.marca );
                setEstilo( json.estilo );
                setTamanho( json.tamanho );
                setImagem( json.imagem );
                setColecao( json.colecao )
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

         <Typography component="h1" variant='h5'>Cadastro da Roupa</Typography>  

         { erro && ( <Alert severity="warning">Não foi possível editar</Alert>)}
         { editar && ( <Alert severity="success">Filme editado com sucesso</Alert>)}

         <Box component="form" onSubmit={Editar}>
         <TextField 
            type="text" 
            label="Marca:" 
            variant="filled" 
            margin="normal"
            value={marca}
            onChange={ (e) => setMarca( e.target.value ) } 
            fullWidth
            />
            <TextField 
            type="text" 
            label="Estilo:" 
            variant="filled" 
            margin="normal"
            value={estilo}
            onChange={ (e) => setEstilo( e.target.value ) } 
            fullWidth
            />
            <TextField 
            type="text" 
            label="Tamanho da Roupa:" 
            variant="filled" 
            margin="normal"
            value={tamanho}
            onChange={ (e) => setTamanho( e.target.value ) } 
            fullWidth
            />
            <TextField 
            type="text" 
            label="Coleção:" 
            variant="filled" 
            margin="normal"
            value={colecao}
            onChange={ (e) => setColecao( e.target.value ) } 
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