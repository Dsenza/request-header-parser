import React from 'react';
import CamperTable from '../components/CamperTable';

class CamperTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campers: [],
      reverse: true,
      column: "recent",
      url: "http://fcctop100.herokuapp.com/api/fccusers/top/"
    };
  }

  loadDataFromServer() {
    $.ajax({
      url: this.state.url + this.state.column,
      dataType: 'json',
      cache: false,
      success: data => {
        this.setState({campers: data});
      },
      error: (xhr, status, err) => {
        console.error(this.state.url, status, err.toString());
      }
    });
  }

  componentDidMount() {
    this.loadDataFromServer();
  }

  render() {
    return (
      <CamperTable campers={this.state.campers}/>
    );
  }
};

export default CamperTableContainer;