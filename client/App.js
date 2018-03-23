import React, { PureComponent } from 'react';
import Header from './static/Header';
import './css/normalize.css';
import './css/skeleton.css';

class App extends PureComponent {
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
				<form action="/graphql?query=mutation" method="POST">
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
					<a href='/graphql?query=mutation%20AddTodoItem{AddTodo(itemId:2,item:"New_todo_item",completed:false){item, completed}}&operationName=AddTodoItem'>GraphQL Mutation Test - Add Todo</a>
				</div>
				<div>
					<a href='/graphql?query=mutation%20DeleteTodoItem{DeleteTodo(itemId:2){item}}&operationName=DeleteTodoItem'>GraphQL Mutation Test - Delete Todo</a>
				</div>
    </div>
    )
  }
}

export default App;
