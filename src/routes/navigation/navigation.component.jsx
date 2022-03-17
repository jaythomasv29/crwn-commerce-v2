import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';

import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>SHOP</Link>
          {/* <Link className='nav-link' to='#'>MENS</Link> */}
          <Link className='nav-link' to='#'>WOMENS</Link>
          <Link className='nav-link' to='#'>CONTACT</Link>
          {
            currentUser ?
              <span className='nav-link' onClick={signOutUser}>{currentUser.email.toUpperCase()} |  <span className='sign-out-text'>SIGN OUT</span></span>
              :
              <Link className='nav-link' to='/auth'>SIGN IN</Link>
          }
          <CartIcon />
        </div>
        {
          isCartOpen && <CartDropdown />
        }
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation