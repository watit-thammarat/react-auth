import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.css';

class Header extends Component {
  renderLinks = () => {
    if (this.props.auth) {
      return (
        <div>
          <Link to="/signout">Signout</Link>
          <Link to="/feature">Feature</Link>
        </div>
      );
    }
    return (
      <div>
        <Link to="/signup">Signup</Link>
        <Link to="/signin">Signin</Link>
      </div>
    );
  };

  render() {
    return (
      <div className="header">
        <Link to="/">Redux Auth</Link>
        {this.renderLinks()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth: auth.authenticated });

export default connect(mapStateToProps)(Header);
