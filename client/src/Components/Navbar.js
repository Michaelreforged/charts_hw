import React, { useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { AuthContext } from '../providers/AuthProvider'
import { useHistory, useLocation } from 'react-router'

const NavBar = () => {
  const history = useHistory()
  const {user, handleLogout } = useContext(AuthContext)
  const location = useLocation()

  const rightNavItems = () => {
    if (user) {
      return (
        <Menu.Item onClick={() => handleLogout(history)}>Logout</Menu.Item>
      );
    }
    return (
      <>
        <Link to="/login">
          <Menu.Item active={location.pathname == "/login"}>Login</Menu.Item>
        </Link>
        <Link to="/register">
          <Menu.Item active={location.pathname == "/register"}>
            Register
          </Menu.Item>
        </Link>
      </>
    );
  };

  return (
    <Menu>
      <Link to='/'><Menu.Item active={location.pathname == "/"}>Home</Menu.Item></Link>
      <Link to='/sellers'><Menu.Item active={location.pathname == "/sellers"}>Sellers</Menu.Item></Link>
      <Link to='/categories'><Menu.Item active={location.pathname == "/categories"}>Categories</Menu.Item></Link>
      <Link to='/find'><Menu.Item active={location.pathname == "/find"}>Find Product</Menu.Item></Link>
      <Link to='/chartsByCategory'><Menu.Item active={location.pathname == "/chartsByCategory"}>Donut Charts</Menu.Item></Link>
      <Link to='/chartBar'><Menu.Item active={location.pathname == "/chartBar"}>Bar Charts</Menu.Item></Link>
      <Link to='/chartLine'><Menu.Item active={location.pathname == "/chartLine"}>Line Charts</Menu.Item></Link>
      <Link to='/chartPie'><Menu.Item active={location.pathname == "/chartPie"}>Pie Charts</Menu.Item></Link>
      <Menu.Menu position="right">
        {rightNavItems()}
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar