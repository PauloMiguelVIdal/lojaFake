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
                <Grid container spacing={8}>
                    {products.map((product, key) => (
                        <Grid item xs={3} >
                            <CardProduct key={key} image={product.image} title={product.title} price={product.price} description={product.description} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default Home;