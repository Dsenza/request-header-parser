import React from 'react';
import { Link } from 'react-router';

class Projects extends React.Component {


  render() {
    return (
      <div>
        <h3>React</h3>
        <ul>
          <li><Link to="/leaderboard">FreeCodeCamp points leaderboard</Link></li>
          <li><Link to="/movielist">Local storage movie list</Link></li>
        </ul>
        <h3>Micro API Services</h3>
        <ul>
          <li><Link to="/api/whereami">GPS Location</Link></li>
          <li><Link to="/api/whoami">Request header parser</Link></li>
          <li><Link to="/api/timestamp">Timestamp API</Link></li>
        </ul>
      </div>
    )
  }
}

export default Projects;