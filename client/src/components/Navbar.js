import React, { Component } from 'react'
import { Link } from 'react-router'
import { logout } from '../actions/auth'
import './Navbar.css'

class Navbar extends Component {

  handleLogout = (event) => {
    event.preventDefault()
    this.props.dispatch(logout())
  }

  render() {
    const { isAuthenticated } = this.props

    return (
      <nav className="navbar">
        <div className="container">
          <ul className="navbar-list">
            <li className="navbar-item"><Link to="/" className="navbar-link">Bangumi Pic</Link></li>

            {!isAuthenticated &&
              <li className="navbar-item"><Link to="/signup" className="navbar-link" activeClassName="active">Signup</Link></li>
            }

            {!isAuthenticated &&
              <li className="navbar-item"><Link to="/login" className="navbar-link" activeClassName="active">Login</Link></li>
            }

            {isAuthenticated &&
              <li className="navbar-item"><Link to="/upload" className="navbar-link" activeClassName="active">Upload</Link></li>
            }

            {isAuthenticated &&
              <li className="navbar-item"><a href="" className="navbar-link" onClick={this.handleLogout}>Logout</a></li>
            }
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar
