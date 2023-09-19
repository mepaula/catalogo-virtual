import { Card, CardActionArea, CardContent, CardMedia, Grid, Link, Typography } from '@mui/material'

function Roupa(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <CardMedia 
                component="img"
                height="140"
                image={props.imagem}
                alt={props.marca}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.marca}
                </Typography>
                <Typography variant="body2" component="text.secondary">
                    {props.tamanho}
                </Typography>
                <Grid container>
                    <Grid item >
                        <span>{props.estilo}</span>
                    </Grid>

                </Grid>
            </CardContent>
        </CardActionArea>
        <Grid container>
            <Grid item xs={6}>
                <button onClick={props.excluir}>x</button>
            </Grid>
            <Grid item xs={6}>
                <Link href={ "edicao/" + props.id }>Editar</Link>
            </Grid>
        </Grid>
    </Card> 
  )
}

export default Roupa;