import { Component } from "react"
import "../../assets/scss/Nav.scss"
import { NavLink } from "react-router-dom"

class Nav extends Component {
  render() {
    return (
      <div className="topnav">
        <NavLink activeClassName="active" to="/">
          {/* exact={true} */}
          Home
        </NavLink>
        <NavLink to="/user" activeClassName="active">
          Users
        </NavLink>
        <NavLink to="/todos" activeClassName="active">
          Todos
        </NavLink>
      </div>
    )
  }
}

export default Nav
