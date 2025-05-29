import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
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
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap title={title}>
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
        >
          Add item
        </Button>
      </CardActions>
    </Card>
  );
}
