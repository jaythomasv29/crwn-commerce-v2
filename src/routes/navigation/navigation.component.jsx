import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../components/contexts/user.context';

import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log(currentUser)

  const signOutHandler = async () => {
    await signOutUser()
    setCurrentUser(null)
  }
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
              <span className='nav-link' onClick={signOutHandler}>{currentUser.email.toUpperCase()} |  SIGN OUT</span>
              :
              <Link className='nav-link' to='/auth'>SIGN IN</Link>
          }
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation