import React from 'react'
import './Header.css'
import { Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Search from '../Search/Search'
import { logout } from '../../../actions/userActions'

export default function Header() {

  const alert = useAlert()
  const dispatch = useDispatch()

  const { user, loading } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.cart)

  const logoutHandler = () => {
    dispatch(logout())
    alert.success('Logged out successfully.')
  }

  return (
    <>
      <nav className='navbar row'>
        <div className='col-12 col-md-3'>
          <div className='navbar-brand'>
            <Link to='/'>
              <img src='/images/shopit_logo.png' alt='logo' />
            </Link>
          </div>
        </div>

        <div className='col-12 col-md-6 mt-2 mt-md-0'>
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className='col-12 col-md-3 mt-4 mt-md-0 text-center'>
          <Link to='/cart' style={{ textDecoration: 'none' }} >
            <span id='cart' className='ms-3'>Cart</span>
            <span className='ms-1' id='cart_count'>{cartItems.length}</span>
          </Link>

          {user ? (
            <div className="ms-4 dropdown d-inline">
              <Link to='!#' className='btn dropdown-toggle text-white' type='button' id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">

                <figure className="avatar avatar-nav">
                  <img src={user.avatar && user.avatar.url} alt={user && user.name} className='rounded-circle' />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                {user && user.role === 'admin' && (
                  <Link className="dropdown-item" to='/dashboard'>Dashboard</Link>
                )}
                <Link className="dropdown-item" to='/orders/me'>Orders</Link>
                <Link className='dropdown-item' to='/me'>
                  Profile
                </Link>
                <Link className='dropdown-item text-danger' to='/' onClick={logoutHandler}>
                  Logout
                </Link>
              </div>

            </div>
          ) : !loading && <Link to='/login' className='btn ms-4' id='login_btn'> Login</Link>}
          
        </div>
      </nav>
    </>
  )
}
