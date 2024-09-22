import { Component } from 'react';
import Cookies from 'js-cookie';
import { Link, Navigate } from 'react-router-dom';
import './index.css';

class Navbar extends Component {
  state = {
    loggedOut: false,
  };

  onClickLogout = () => {
    Cookies.remove('username_dealsdry');
    Cookies.remove('jwt_token');
    this.setState({ loggedOut: true });
  };

  render() {
    const { loggedOut } = this.state;
    const username = Cookies.get('username_dealsdry');

    if (loggedOut) {
      return <Navigate to='/login' />;
    }

    return (
      <nav className='navbar'>
        <img src='/Admin_ink.jpg' alt='logo' className='logo'/>
        <ul className="link-container">
          <li>
            <Link to="/" className="link">
              <p className='tab-buttons'>Home</p>
            </Link>
          </li>
          <li>
            <Link to="/employee-list" className="link">
              <p className='tab-buttons'>Employee List</p>
            </Link>
          </li>
        </ul>
        <h1>{username}</h1>
        <button type='button' onClick={this.onClickLogout} className='logout-btn'>Logout</button>
      </nav>
    );
  }
}

export default Navbar;
