import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import { createTheme,ThemeProvider} from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "./Login";
import Cadastro from "./Cadastro";
import EditarProduto from './EditarProduto';
import Produto from './Produto';


const theme = createTheme({
  palette: {
      mode: 'light',
  primary: {
    main: '#ab47bc',
    light: '#c236e0',
    dark: '#320652',
  },
  secondary: {
    main: '#3de4e4',
    light: '#a7f3f3',
    dark: '#0f8383',
  },
  text: {
    secondary: '#f5f5f5',
  },
  info: {
    main: '#7d32d8',
  },
  success: {
    main: '#673ab7',
  },
  }

});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/edicao/:id",
    element: <EditarProduto />
  },
  {
    path: "/produto",
    element: <Produto />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
  <RouterProvider router={router} />
  </ThemeProvider>
);
