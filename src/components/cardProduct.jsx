import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccordionDescription from './accordionDescription';
export default function CardProduct({ title, price, description, image }) {



    return (
        <Card sx={{ maxWidth: 345, }} >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="400"
                    image={image}
                    alt="green iguana"
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
                <Typography variant="h4" component="h2" >
                    {price}
                </Typography>
                </div>

                <Button variant="contained" startIcon={<AddShoppingCartIcon />}>
                    Add item
                </Button>
            </CardActions>
        </Card>
    );
}