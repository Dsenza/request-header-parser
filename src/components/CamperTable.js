import React from 'react';
import CamperList from './CamperList';
import CamperTableHeading from './CamperTableHeading';

class CamperTable extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div id="tableHeader">
              <h3>LeaderBoard</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <table className="table table-striped">
              <CamperTableHeading />
              <CamperList campers={this.props.campers} />
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default CamperTable;