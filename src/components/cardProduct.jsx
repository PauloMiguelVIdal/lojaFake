import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import CardActions from '@mui/material/CardActions';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccordionDescription from './accordionDescription';

export default function CardProduct({ id, title, price, description, image }) {
  const addToCart = (productId, quantity = 1) => {
    const storedUser = localStorage.getItem("fakeUser");
    if (!storedUser) return;

    const fakeUser = JSON.parse(storedUser);
    if (!fakeUser.cart) fakeUser.cart = { products: [] };
    if (!Array.isArray(fakeUser.cart.products)) fakeUser.cart.products = [];

    const updatedCart = { ...fakeUser.cart };
    const existingProduct = updatedCart.products.find(p => p.productId === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      updatedCart.products.push({ productId, quantity });
    }

    const updatedUser = { ...fakeUser, cart: updatedCart };
    localStorage.setItem("fakeUser", JSON.stringify(updatedUser));
    window.dispatchEvent(new Event("storage"));
  };

  const handleAddToCart = () => {
    addToCart(id, 1);
  };

  

  return (
    <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'linear-gradient(135deg, #6411D9, #350973)',
      color: 'white',
      borderRadius: 3,
      boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.03)',
      }
    }}
  >
     <CardMedia
  component="img"
  image={image}
  alt={title}
  sx={{
    height: 200,
    objectFit: 'contain',
    padding: 2,
    backgroundColor: 'white',  // <-- fundo branco fixo na área da imagem
    borderRadius: 1,           // opcional, para bordas arredondadas
  }}
/>

      <CardContent>
      <Typography 
  gutterBottom 
  variant="h6" 
  component="div" 
  noWrap 
  title={title}
  sx={{ color: '#F28705', fontWeight: 'bold' }}
>
  {title}
</Typography>
        <AccordionDescription description={description} />
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'space-between',
          paddingX: 2,
          paddingBottom: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          
          <AttachMoneyIcon fontSize="small" />
          <Typography variant="h6">{price}</Typography>
        </div>
        <Button
  variant="contained"
  onClick={handleAddToCart}
  startIcon={<AddShoppingCartIcon />}
  sx={{
    background: 'linear-gradient(90deg, #F28705, #6411D9)',
    color: '#fff',
    '&:hover': {
      background: 'linear-gradient(90deg, #6411D9, #F28705)',
    }
  }}
>
  Add item
</Button>
      </CardActions>
    </Card>
  );
}
