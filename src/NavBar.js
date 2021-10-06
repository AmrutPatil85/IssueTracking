import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyle = makeStyles({
    header: {
        background: '#111111'
    },
    tabs: {
        color: '#FFFFFF',
        marginRight: 20,
        textDecoration: 'none',
        fontSize: 18
    }
})

const NavBar = () => {
    const classes = useStyle();
    return (
        <AppBar position="static" className={classes.header}>
            <Toolbar>
                <NavLink className={classes.tabs} to="./" exact>Check In</NavLink>
                <NavLink className={classes.tabs} to="checkout" exact>Check Out</NavLink>
                <NavLink className={classes.tabs} to="issuetrack" exact>Issue Tracking</NavLink>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;