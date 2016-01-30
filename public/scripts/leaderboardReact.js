var Header = React.createClass({
  render: function() {
    return (
      <header>
        <a href="http://www.freecodecamp.com">
          <img className="fcclogo" src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" alt="Freecodecamp logo" />
        </a>
      </header>
    );
  }
});

var TableHeading = React.createClass({
  handleClick: function(event) {
    
  },
  
  render: function() {
    return (
      <thead>
        <tr>
          <th>#</th>
          <th>Camper Name</th>
          <th className="recent" onClick={this.handleClick}>Points in past 30 days</th>
          <th className="alltime" onClick={this.handleClick}>All time points</th>
        </tr>
      </thead>
    );
  }
});

var CamperRow = React.createClass({
  render: function() {
    return (
      <tr className="camperRow">
        <td>{this.props.count}</td>
        <td><img src={this.props.camper.img} className="userImg"></img> <span>{this.props.camper.username}</span></td>
        <td>{this.props.camper.recent}</td>
        <td>{this.props.camper.alltime}</td>
      </tr>
    );
  }
});

var CampersList = React.createClass({
  
  render: function() {
    var count = 0;
    var self = this;
    var camperList = this.props.campers.map(function(camper) {
      count++
      return (
        <CamperRow camper={camper}  key={camper.username} count={count} />
      );
    }.bind(this));
    
    return (
      <tbody>
        {camperList}
      </tbody>
      
    );
  }
});

var CamperTable = React.createClass({
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.urlRoot + this.state.column,
      dataType: 'json',
      cache: false,
      success: function(data) {
        var campers = data;
        this.setState({campers: campers});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {
      campers: [],
      reverse: true,
      column: "recent"
    };
  },

  componentDidMount: function() {
    this.loadDataFromServer();
  },
  
  handleHeaderClick: function(setSortColumn) {
    this.setState({column: setSortColumn});
  },

  render: function() {
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
              <TableHeading onHeaderClick={this.handleHeaderClick} />
              <CampersList campers={this.state.campers} />
            </table>
          </div>
        </div>
      </div>
    );
  }
});

var LeaderApp = React.createClass({
  render: function() {
    return (
      <div>
        <CamperTable urlRoot={this.props.urlRoot} />
      </div>
    );
  }
});

ReactDOM.render(<LeaderApp urlRoot="http://fcctop100.herokuapp.com/api/fccusers/top/" />, document.getElementById('content'));