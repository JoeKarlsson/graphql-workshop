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
				<h2>GraphQL Test</h2>
 				<hr />
				<div>
					<a href="/graphql?query={todo(itemId:1){itemId,item}}">GraphQL Query Test</a>
				</div>
				<div>
					<a href='/graphql?query=mutation%20AddTodoItem{AddTodo(itemId:2,item:"New_todo_item",completed:false){item, completed}}&operationName=AddTodoItem'>GraphQL Mutation Test</a>
				</div>
    </div>
    )
  }
}

export default App;
