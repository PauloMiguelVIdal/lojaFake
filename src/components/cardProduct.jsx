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

  const handleAddToCart = () => {
    const storedUser = localStorage.getItem("fakeUser");

    if (!storedUser) {
      alert("Você precisa estar logado para adicionar itens ao carrinho.");
      return;
    }

    try {
      const fakeUser = JSON.parse(storedUser);

      // Garante que o carrinho e a lista de produtos existam
      if (!fakeUser.cart) {
        fakeUser.cart = { products: [] };
      }
      if (!Array.isArray(fakeUser.cart.products)) {
        fakeUser.cart.products = [];
      }

      const currentProducts = fakeUser.cart.products;

      // Verifica se o produto já está no carrinho
      const existingProductIndex = currentProducts.findIndex(p => p.productId === id);

      if (existingProductIndex !== -1) {
        // Se já existe, incrementa a quantidade
        currentProducts[existingProductIndex].quantity += 1;
      } else {
        // Caso contrário, adiciona novo produto
        currentProducts.push({ productId: id, quantity: 1 });
      }

      // Atualiza o fakeUser no localStorage
      fakeUser.cart.products = currentProducts;
      localStorage.setItem("fakeUser", JSON.stringify(fakeUser));

      alert("Produto adicionado ao carrinho!");
    } catch (error) {
      console.error("Erro ao adicionar produto ao carrinho:", error);
      alert("Erro ao adicionar ao carrinho.");
    }
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
