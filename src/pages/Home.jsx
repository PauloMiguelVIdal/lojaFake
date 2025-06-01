import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from '@mui/material';
import Grid from '@mui/material/Grid';
import CardProduct from '../components/cardProduct';
import Navbar from '../navbar/Navbar';
import Footer from '../components/Footer';
const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/users')
      .then(response => console.log(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    
    <div className="home" >
      <Navbar />
      <Container maxWidth={false}> {/* Ajuste para permitir mais largura */}
        <Grid container spacing={4} justifyContent="center"> {/* Centralização e espaçamento melhorado */}
          {products.map((product, index) => (
            <Grid item size={{ xs: 12, sm: 6,md:4, lg:3, xl:3 }}  key={index}> {/* Ajuste nas colunas */}
              <CardProduct
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                description={product.description}
              />
            </Grid>
          ))}
        </Grid>
        
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
