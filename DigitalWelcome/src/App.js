import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Messenger from './Containers/Messenger/Messenger';
import Reader from './Containers/Reader/Reader';


class App extends Component {
  render () {
    console.log(this.props);
    return (
      <div>        
        <Switch>
          <Route path="/reader" exact component={Reader} />
          <Route path="/" exact component={Messenger} />
        </Switch> 
      </div>
    );
  }
}

export default App;
