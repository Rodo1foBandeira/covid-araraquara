import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grafic from './Grafic';
import { Typography, Container } from '@material-ui/core';

function App() {
  return (
    <div>
      <center>
      <Typography variant="h4">Covid-19 Araraquara</Typography>
      <Typography variant="subtitle1">Ocupação de leitos: confirmados e suspeitos</Typography>
      <Typography variant="subtitle1">Mortes: somente confirmadas</Typography>
      </center>
      
      <Grafic />
    </div>
  );
}

export default App;
