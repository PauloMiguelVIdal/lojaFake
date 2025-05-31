import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress,Modal, Fade, Backdrop
} from '@mui/material';

import Navbar from '../navbar/Navbar';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fakeUser = JSON.parse(localStorage.getItem("fakeUser"));
  const userId = fakeUser?.id;

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  


  const updateLocalStorageCart = (updatedItems) => {
    const updatedCart = {
      ...fakeUser,
      cart: {
        ...fakeUser.cart,
        products: updatedItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      },
    };
    localStorage.setItem("fakeUser", JSON.stringify(updatedCart));
  };

  const fetchCart = async () => {
    try {
      if (fakeUser?.cart?.products?.length > 0) {
        const localCartItems = await Promise.all(
          fakeUser.cart.products.map(async (item) => {
            const res = await axios.get(`https://fakestoreapi.com/products/${item.productId}`);
            return {
              id: item.productId,
              name: res.data.title,
              image: res.data.image,
              price: res.data.price,
              quantity: item.quantity,
            };
          })
        );
        setCartItems(localCartItems);
      } else if (userId) {
        const res = await axios.get(`https://fakestoreapi.com/carts/user/${userId}`);
        const carts = res.data;

        if (carts.length === 0) {
          setCartItems([]);
          return;
        }

        const latestCart = carts[carts.length - 1];

        const detailedProducts = await Promise.all(
          latestCart.products.map(async (item) => {
            const res = await axios.get(`https://fakestoreapi.com/products/${item.productId}`);
            return {
              id: item.productId,
              name: res.data.title,
              image: res.data.image,
              price: res.data.price,
              quantity: item.quantity,
            };
          })
        );

        setCartItems(detailedProducts);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Erro ao carregar o carrinho:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleRemoveItem = (productId) => {
    const updatedItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedItems);
    updateLocalStorageCart(updatedItems);
  };

  const handleQuantityChange = (productId, delta) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
    updateLocalStorageCart(updatedItems);
  };

  return (
<Box sx={{ p: 4, minHeight: '100vh' }}>
  <Navbar />
  <Typography
    color="#ffffff"
    variant="h4"
    fontWeight="bold"
    gutterBottom
  >
    Carrinho
  </Typography>

  {loading ? (
    <CircularProgress sx={{ color: '#6411D9' }} />
  ) : cartItems.length === 0 ? (
    <Typography variant="h6" sx={{ mt: 4, color: '#FFFFFF', textAlign: 'center' }}>
      Seu carrinho está vazio.
    </Typography>
  ) : (
    <Grid container spacing={4}>
      {/* Produtos */}
      <Grid item xs={12} md={8}>
        {cartItems.map((item) => (
// Dentro do .map dos cartItems
<Card
  key={item.id}
  sx={{
    mb: 3,
    p: 2,
    borderRadius: 3,
    boxShadow: '0 2px 10px rgba(100, 17, 217, 0.3)',
    backgroundColor: '#ffffff',
    transition: 'border-color 0.3s',
    '&:hover': {
      borderColor: '#6411D9',
    },
  }}
>
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'center', sm: 'flex-start' },
      gap: 3,
    }}
  >
    <Box
      component="img"
      src={item.image}
      alt={item.name}
      sx={{
        width: { xs: 120, sm: 100 },
        height: { xs: 120, sm: 100 },
        borderRadius: 2,
        objectFit: 'contain',
        backgroundColor: '#ffffff',
        p: 1,
        mb: { xs: 2, sm: 0 },
      }}
    />
    <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
      <Typography
        variant="h6"
        fontWeight="medium"
        color="#350973"
        sx={{ mb: 0.5 }}
      >
        {item.name}
      </Typography>
      <Typography sx={{ mb: 1, color: '#6411D9' }}>
        ${item.price.toFixed(2)} x {item.quantity}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'center', sm: 'flex-start' },
          gap: 1,
          mb: 1,
        }}
      >
        <Button
          variant="contained"
          onClick={() => handleQuantityChange(item.id, -1)}
          sx={{
            minWidth: 36,
            width: 36,
            height: 36,
            padding: 0,
            borderRadius: 1,
            backgroundColor: '#350973',
            color: '#fff',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#6411D9' },
          }}
        >
          −
        </Button>
        <Typography sx={{ fontWeight: 'bold', color: '#350973' }}>
          {item.quantity}
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleQuantityChange(item.id, 1)}
          sx={{
            minWidth: 36,
            width: 36,
            height: 36,
            padding: 0,
            borderRadius: 1,
            backgroundColor: '#350973',
            color: '#fff',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#6411D9' },
          }}
        >
          +
        </Button>
      </Box>
      <Typography fontWeight="bold" color="#6411D9">
        Subtotal: ${(item.price * item.quantity).toFixed(2)}
      </Typography>
    </Box>
    <Box sx={{ textAlign: { xs: 'center', sm: 'right' }, mt: { xs: 2, sm: 0 } }}>
      <Button
        variant="outlined"
        sx={{
          color: '#F28705',
          borderColor: '#F28705',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#F28705',
            color: '#fff',
          },
        }}
        onClick={() => handleRemoveItem(item.id)}
      >
        Remover
      </Button>
    </Box>
  </Box>
</Card>

        ))}
      </Grid>

      {/* Resumo */}
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: '0 2px 15px rgba(100, 17, 217, 0.3)',
            backgroundColor: '#ffffff',
            border: '2px solid #350973',
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: '#350973' }}
            gutterBottom
          >
            Order Summary
          </Typography>
          <Divider sx={{ my: 2, borderColor: '#6411D9' }} />
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold', color: '#6411D9' }}>
            Total de itens: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </Typography>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 3, color: '#350973' }}
          >
            Total: ${calculateTotal()}
          </Typography>
          <Button
  variant="contained"
  fullWidth
  size="large"
  onClick={handleOpenModal}
  sx={{
    backgroundColor: '#6411D9',
    color: '#fff',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#350973',
    },
  }}
>
  Finalizar Compra
</Button>

        </Card>
      </Grid>
    </Grid>
  )}
  <Modal
  open={openModal}
  onClose={handleCloseModal}
  closeAfterTransition
  BackdropComponent={Backdrop}
  BackdropProps={{ timeout: 500 }}
>
  <Fade in={openModal}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '80%', sm: 400 },
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ color: '#350973', mb: 2 }}>
        🎉 Parabéns pela sua compra!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Seu pedido foi finalizado com sucesso.
      </Typography>
      <Button
        variant="contained"
        onClick={handleCloseModal}
        sx={{
          backgroundColor: '#6411D9',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#350973',
          },
        }}
      >
        Fechar
      </Button>
    </Box>
  </Fade>
</Modal>

</Box>


  
  );
};

export default Cart;
