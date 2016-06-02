import React from 'react';
import NavLink from './NavLink';
import { IndexLink } from 'react-router';

const Header = () => (

  <header>
        <h1 className="title">My Site</h1>
        <div className="nav">
          <ul>
            <li><IndexLink to="/" activeClassName="active-nav">Home</IndexLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/projects">Projects</NavLink></li>
          </ul>
        </div>
      </header>

);

export default Header;