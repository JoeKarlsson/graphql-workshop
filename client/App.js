import React, { Component } from 'react';
import Header from './static/Header';

class App extends Component {
  render() {
    return (
      <div>
      	<Header />
				<h2>This is just a normal POST</h2>
 				<div>Enter a new item in the text box and hit Submit to save it to the database</div>
 				<form action="/quotes" method="POST">
					<input type="text" placeholder="item" name="item" />
					<button type="submit">Submit</button>
 				</form>
 				<hr />
    </div>
    )
  }
}

export default App;
