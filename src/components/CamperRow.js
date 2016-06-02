import React from 'react';

class CamperRow extends React.Component {
  render() {
    return (
      <tr className="camperRow">
        <td>{this.props.count}</td>
        <td><img src={this.props.camper.img} className="userImg"></img> <span>{this.props.camper.username}</span></td>
        <td>{this.props.camper.recent}</td>
        <td>{this.props.camper.alltime}</td>
      </tr>
    )
  }
}

export default CamperRow;