import { Avatar, Button } from "@mui/material";
import Style from "./global.css"

function App() {

  return (
    <>
      <h1>Home</h1>
      <Button variant="contained">Contained</Button>
      <Button variant="contained" color="warning">Vazio</Button>
      <Avatar alt="Melina Pontes" src="/static/images/avatar/1.jpg" />
    </>
  );
}

export default App;
