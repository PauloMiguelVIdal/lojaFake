import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const navItems = [{ label: 'Produtos', path: '/' }];

function Navbar(props) {
  const { window: windowFn } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation(); // <-- pega a rota atual

  const updateCartCount = () => {
    try {
      const fakeUser = JSON.parse(localStorage.getItem("fakeUser"));
      const total = fakeUser?.cart?.products?.reduce((sum, p) => sum + p.quantity, 0) || 0;
      setCartCount(total);
    } catch (e) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCartCount(); // inicial

    const handleUpdate = () => updateCartCount();

    window.addEventListener("cart-updated", handleUpdate);  // evento customizado para mesmo tab
    window.addEventListener("storage", handleUpdate);       // evento storage para outras tabs

    return () => {
      window.removeEventListener("cart-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(prev => !prev);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const container = windowFn !== undefined ? () => windowFn().document.body : undefined;
  const fakeUser = localStorage.getItem("fakeUser");
  const nomeUser = fakeUser ? JSON.parse(fakeUser).username : "";

  const handleCartClick = () => {
    if (fakeUser) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  const drawer = (
    <Box sx={{ textAlign: 'center', paddingTop: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        VANE STORE
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleNavigate(item.path)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Botões de login/cadastro ou saudação */}
        {!fakeUser ? (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleNavigate('/login')}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleNavigate('/register')}>
                <ListItemText primary="Cadastrar-se" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemText
                primary={`Olá, ${nomeUser}`}
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#350973',
                  my: 1,
                }}
              />
            </ListItem>
          </>
        )}

        {/* Carrinho */}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={handleCartClick}>
            <ShoppingCartIcon sx={{ mr: 1 }} />
            <ListItemText
              primary={`Carrinho (${cartCount})`}
              primaryTypographyProps={{
                fontWeight: 'bold',
                color: '#6411D9',
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }} className="navbar">
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          background: 'linear-gradient(90deg, #350973, #6411D9, #F28705)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          marginBottom: '64px',
        }}
      >
<Toolbar sx={{ justifyContent: 'space-between' }}>
  {/* Ícone do menu hambúrguer e título da loja */}
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ mr: 2, display: { sm: 'none' } }}
    >
      <MenuIcon />
    </IconButton>
    <Typography
      variant="h6"
      component="div"
      sx={{ fontWeight: 'bold', letterSpacing: 1 }}
    >
      VANE STORE
    </Typography>
  </Box>

  {/* Seção de botões e usuário */}
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    {/* Itens só para desktop */}
    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
      {navItems.map((item) => (
        <Button
          key={item.label}
          sx={{
            color: '#fff',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.15)',
            }
          }}
          onClick={() => handleNavigate(item.path)}
        >
          {item.label}
        </Button>
      ))}
      {!fakeUser && (
        <>
          <Button
            onClick={() => navigate('/login')}
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)',
              }
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => navigate('/register')}
            sx={{
              ml: 1,
              background: ' #6411D9',
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': {
                background: '#350973',
              }
            }}
          >
            Cadastrar-se
          </Button>
        </>
      )}
    </Box>

    {/* Carrinho (visível sempre, exceto na rota /cart) */}
    {location.pathname !== '/cart' && (
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
        <IconButton color="inherit" onClick={handleCartClick}>
          <ShoppingCartIcon />
        </IconButton>
        {cartCount > 0 && (
          <Box
            sx={{
              backgroundColor: '#6411D9',
              color: 'white',
              borderRadius: '50%',
              padding: '0.3em 0.6em',
              fontSize: '0.8rem',
              ml: -1.5,
              mt: -0.5,
              fontWeight: 'bold'
            }}
          >
            {cartCount}
          </Box>
        )}
      </Box>
    )}

    {/* Usuário (sempre visível, alinhado à direita) */}
    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
      <PersonIcon />
      {nomeUser && (
        <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold', color: '#350973', fontSize: '1rem' }}>
          {nomeUser}
        </Typography>
      )}
    </Box>
  </Box>
</Toolbar>

      </AppBar>

      {/* Drawer mobile */}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      {/* Espaço abaixo do AppBar para conteúdo da página */}
      <Box component="main" sx={{ p: 2 }}>
        <Toolbar />
      </Box>
    </Box>
  );

}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
