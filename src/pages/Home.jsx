import React, { use } from 'react';
import CardProduct from '../components/cardProduct'
import Navbar from '../navbar/Navbar'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid } from '@mui/material';
const Home = () => {

    const [products, setProducts] = useState([])



    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => setProducts(response.data))
            .catch((err) => console.log(err));
    }

    axios.get('https://fakestoreapi.com/products')
        .then(response => console.log(response.data))


    useEffect(() => {
        // Fetch users data from the API
        axios.get('https://fakestoreapi.com/users')
            .then(response => console.log(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);



    return (
        <div className='home'>

            <Navbar />
            <Container maxWidth={"xl"}>
                <Grid container spacing={4}>
                    {products.map((product, index) => (
                     <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <div style={{ height: '100%' }}>
                                <CardProduct
                                    id={product.id}
                                    image={product.image}
                                    title={product.title}
                                    price={product.price}
                                    description={product.description}
                                />
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default Home;