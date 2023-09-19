import { Avatar, Button, Container } from "@mui/material";
import "./global.css"
import { useEffect, useState } from "react";
import Roupa from "./components/Roupa";
import Menu from "./components/MenuResponsivo.jsx";

function App() {

  const[ roupa, setRoupa ] = useState();
  const[ erro, setErro ] = useState();

  useEffect( () => {
      fetch( process.env.REACT_APP_BACKEND + "filmes",{
          method: "GET",
          headers: {
              'Content-Type': 'application/json'
          },
      } )
      .then( (resposta) => resposta.json() )
      .then( ( json ) => { setRoupa( json ) })
      .catch( ( erro ) => { setErro( true ) } )


  }, [])

function Excluir( evento, id ) {
  evento.preventDefault();
        fetch( process.env.REACT_APP_BACKEND + "filmes",{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    id: id 
            })
        } )
        .then( (resposta) => resposta.json() )
        .then( ( json ) => { 
            const novalista = roupa.filter( (roupa ) => roupa._id !== id );
            setRoupa( novalista );
        })
        .catch( ( error ) => { setErro( true ) } )
}  

  return (
    <>
      <Menu />
      <h1>Produtos Disponíveis</h1>
      <Container sx={{
        display: "flex",
        flexFlow: "row",
        flexWrap: "wrap",
        gap: "2rem"
      }}>

      { roupa && (
          roupa.map( (roupa, index ) => ( 
            <Roupa 
                imagem={roupa.imagem}
                marca={roupa.marca}
                tamanho={roupa.tamanho}
                estilo={roupa.estilo}
                excluir={ (e) => Excluir( e,roupa._id ) }
                id={roupa._id}
            />
          ) )
      )}
     </Container> 
    </>
  );
}

export default App;
