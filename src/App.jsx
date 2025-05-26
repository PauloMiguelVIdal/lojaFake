import React from 'react';
import Home from './pages/Home'
import Login from './pages/Login';
import './App.css'
import { Routes,Route,BrowserRouter } from 'react-router-dom';
import Register from './pages/Register';
import Cart from './pages/Cart';

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
        <Route path="/cart" element={<Cart />} />

      </Routes>
    </BrowserRouter>
        {/* <Login />
        <Home /> */}
    </>
  )
}

export default App
