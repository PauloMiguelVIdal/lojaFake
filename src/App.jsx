import React from 'react';
import Home from './pages/Home'
import Login from './pages/Login';
import './App.css'
import { Routes,Route,BrowserRouter } from 'react-router-dom';
import Register from './pages/Register';

function App() {

  return (
    <>
        <BrowserRouter>
      {/* <DrawerAppBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/cadastrar-produto" element={<CadastrarProduto />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
        {/* <Login />
        <Home /> */}
    </>
  )
}

export default App
