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

    if (!storedUser) {
      // alert("Você precisa estar logado para adicionar itens ao carrinho.");
      return;
    }

    const fakeUser = JSON.parse(storedUser);

    if (!fakeUser.cart) {
      fakeUser.cart = { products: [] };
    }
    if (!Array.isArray(fakeUser.cart.products)) {
      fakeUser.cart.products = [];
    }

    const updatedCart = { ...fakeUser.cart };
    const existingProduct = updatedCart.products.find(p => p.productId === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      updatedCart.products.push({ productId, quantity });
    }

    const updatedUser = { ...fakeUser, cart: updatedCart };
    localStorage.setItem("fakeUser", JSON.stringify(updatedUser));

    // 🔄 dispara evento para atualizar outros componentes
    window.dispatchEvent(new Event("storage"));

    // alert("Produto adicionado ao carrinho!");
  };

  const handleAddToCart = () => {
    addToCart(id, 1);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <AccordionDescription description={description} />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className='flex items-center justify-around w-full bg'>
        <div className='flex items-center justify-center'>
          <AttachMoneyIcon />
          <Typography variant="h4" component="h2">
            {price}
          </Typography>
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
