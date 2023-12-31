import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Switch, ListItem, List, IconButton, Badge, Box } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import { useAppSelector } from "../store/configureStore";

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
]

const navStyles = {
    color: 'white',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
};

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

function Header({ darkMode, handleThemeChange }: Props) {
    const { basket } = useAppSelector(state => state.basket);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Box display='flex' alignItems='center'>
                    <Typography
                        variant="h6"
                        component={NavLink}
                        to='/'
                        sx={navStyles}
                    >
                        Re-Store
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                </Box>

                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <NavLink to={path} key={path} style={{ textDecoration: 'none' }}>
                            <ListItem
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        </NavLink>
                    ))}
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/basket' size="large" edge='start' color='inherit' sx={{ mr: 2 }}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <NavLink to={path} key={path} style={{ textDecoration: 'none' }}>
                                <ListItem sx={navStyles}>
                                    {title.toUpperCase()}
                                </ListItem>
                            </NavLink>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar >
    )
}

export default Header
