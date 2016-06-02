import React from 'react';
import CamperRow from './CamperRow';

class CamperList extends React.Component {
  render() {
    var count = 0;
    var camperList = this.props.campers.map(camper => {
      count++
      return (
        <CamperRow camper={camper} key={camper.username} count={count} />
      );
    });

    return (
      <tbody>
        {camperList}
      </tbody>
    )
  }
}

export default CamperList;