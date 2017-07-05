import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAllTimeGreatest: true
    }

    this.toggleTimespan = this.toggleTimespan.bind(this);
  }

  componentDidMount() {
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then((response) => {
          response.json().then((data) => { 
            this.setState({
              recent: data
            })
          })
        })
    
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
      .then((response) => {
        response.json().then((data) => {
          this.setState({
            allTime: data
          })
        })
      })
    // this.state.recent and this.state.allTime now contain arrays of objects
  }

  toggleTimespan() {
    this.setState({ showAllTimeGreatest: !this.state.showAllTimeGreatest })
  }

  render() {
    const linkStyles = {
      textDecoration: 'underline',
      color: 'blue',
      cursor: 'pointer'
    }
    if (this.state.showAllTimeGreatest) {
      return (
        <div className="App">
          <table>
            <tbody>
              <tr>
                <th>Leaderboard</th>
              </tr>
              <tr>
                <th>#</th>
                <th>Camper Name</th>
                <th style={linkStyles} onClick={this.toggleTimespan}>Points in past 30 Days</th>
                <th>All time points</th>
              </tr>
              {this.state.allTime && this.state.allTime.map((user, i) =>  
                <tr>
                  <td>{i + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.recent}</td>
                  <td>{user.alltime}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="App">
          <table>
            <tbody>
              <tr>
                <th>Leaderboard</th>
              </tr>
              <tr>
                <th>#</th>
                <th>Camper Name</th>
                <th>Points in past 30 Days</th>
                <th style={linkStyles} onClick={this.toggleTimespan}>All time points</th>
              </tr>
              {this.state.recent && this.state.recent.map((user, i) =>  
                <tr>
                  <td>{i + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.recent}</td>
                  <td>{user.alltime}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default App;
