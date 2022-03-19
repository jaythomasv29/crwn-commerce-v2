import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';

import { NavigationContainer, NavLinksContainer, NavLink } from './navigation.styles'

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <NavLinksContainer>
          <NavLink to='/shop'>SHOP</NavLink>
          <NavLink to='/shop/mens'>MENS</NavLink>
          <NavLink to='/shop/womens'>WOMENS</NavLink>
          <NavLink to='#'>CONTACT</NavLink>
          {
            currentUser ?
              <NavLink as="span"><span onClick={signOutUser}>SIGN OUT | </span><span style={{color: `#4285f4`, textDecoration: `underline`}}>{currentUser.email.toUpperCase()}</span></NavLink>
              :
              <NavLink to='/auth'>SIGN IN</NavLink>
          }
          <CartIcon />
        </NavLinksContainer>
        {
          isCartOpen && <CartDropdown />
        }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation