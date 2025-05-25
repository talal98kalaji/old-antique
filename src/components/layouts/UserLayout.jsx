import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Badge, 
  MenuItem, 
  Menu, 
  Drawer, 
  List, 
  Divider, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Avatar, 
  Button,
  InputBase,
  Paper,
  Popover,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = 240;

// Styled search component
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const UserLayout = ({ children }) => {
  // State for various UI elements
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  
  // Mock data for cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Vintage Vase', price: 129.99, image: 'https://via.placeholder.com/100x100' },
    { id: 2, name: 'Antique Lamp', price: 249.99, image: 'https://via.placeholder.com/100x100' }
  ]);

  // Mock data for notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your order has been shipped!', time: '2 hours ago' },
    { id: 2, message: 'New arrivals are now available', time: '1 day ago' }
  ]);

  // Handle menu openings
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCartOpen = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  // Handle menu closings
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

  // Menu IDs
  const menuId = 'primary-search-account-menu';
  const cartMenuId = 'primary-cart-menu';
  const notificationsMenuId = 'primary-notifications-menu';

  // Sidebar items
  const sidebarItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/home' },
    { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
    { text: 'Wishlist', icon: <FavoriteIcon />, path: '/wishlist' },
    { text: 'Order History', icon: <HistoryIcon />, path: '/orders' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  // Render profile menu
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  // Render cart popover
  const renderCartPopover = (
    <Popover
      id={cartMenuId}
      open={Boolean(cartAnchorEl)}
      anchorEl={cartAnchorEl}
      onClose={handleCartClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box sx={{ width: 350, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Shopping Cart</Typography>
          <Typography variant="subtitle1">{cartItems.length} items</Typography>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', mb: 2 }}>
                <Box sx={{ width: 60, height: 60, mr: 2 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">€{item.price}</Typography>
                </Box>
                <IconButton size="small" onClick={() => removeFromCart(item.id)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1">Total:</Typography>
              <Typography variant="subtitle1" fontWeight="bold">€{cartTotal}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" fullWidth onClick={handleCartClose}>View Cart</Button>
              <Button variant="contained" fullWidth onClick={handleCartClose}>Checkout</Button>
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <ShoppingCartIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
            <Typography variant="body1">Your cart is empty</Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={handleCartClose}>Continue Shopping</Button>
          </Box>
        )}
      </Box>
    </Popover>
  );

  // Render notifications popover
  const renderNotificationsPopover = (
    <Popover
      id={notificationsMenuId}
      open={Boolean(notificationsAnchorEl)}
      anchorEl={notificationsAnchorEl}
      onClose={handleNotificationsClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box sx={{ width: 300, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Notifications</Typography>
        <Divider sx={{ mb: 2 }} />
        
        {notifications.map((notification) => (
          <Box key={notification.id} sx={{ mb: 2 }}>
            <Typography variant="body1">{notification.message}</Typography>
            <Typography variant="caption" color="text.secondary">{notification.time}</Typography>
            <Divider sx={{ mt: 1 }} />
          </Box>
        ))}
        
        <Button variant="text" fullWidth onClick={handleNotificationsClose}>
          View All Notifications
        </Button>
      </Box>
    </Popover>
  );

  // Render sidebar
  const renderSidebar = (
    <Drawer
      variant="temporary"
      open={sidebarOpen}
      onClose={toggleSidebar}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
      sx={{
        display: { xs: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div">
          Syrian Treasures
        </Typography>
        <IconButton onClick={toggleSidebar}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2 }}>J</Avatar>
          <Box>
            <Typography variant="subtitle1">John Doe</Typography>
            <Typography variant="body2" color="text.secondary">john.doe@example.com</Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <List>
        {sidebarItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Syrian Treasures
          </Typography>
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for treasures..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex' }}>
            <IconButton
              size="large"
              aria-label="show notifications"
              aria-controls={notificationsMenuId}
              aria-haspopup="true"
              onClick={handleNotificationsOpen}
              color="inherit"
            >
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            <IconButton
              size="large"
              aria-label="show cart items"
              aria-controls={cartMenuId}
              aria-haspopup="true"
              onClick={handleCartOpen}
              color="inherit"
            >
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Render menus and popovers */}
      {renderProfileMenu}
      {renderCartPopover}
      {renderNotificationsPopover}
      {renderSidebar}
      
      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      
      {/* Footer */}
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.grey[200] }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Syrian Treasures. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default UserLayout;
