import React, { PureComponent } from "react";
import Header from "./static/Header";
import "./css/normalize.css";
import "./css/skeleton.css";
import "./css/index.css";

class App extends PureComponent {
  render() {
    return (
      <div>
        <div className="section header">
          <div className="container">
            <h3 className="section-heading">GraphQL Workshop</h3>
            <p className="section-description">
              By: <a href="http://callmejoe.net/">Joe Karlsson</a>
            </p>
          </div>
        </div>

        <div className="section content">
          <div className="one-half column">
            <h4>REST</h4>
            <div>
              Enter a new item in the text box and hit Submit to save it to the
              database
            </div>
            <form action="/quotes" method="POST">
              <input type="text" placeholder="item" name="item" />
              <button type="submit">Submit</button>
            </form>
          </div>

          <div className="one-half column">
            <h4>Graphql Post</h4>
            <form action="/graphql?query=mutation" method="POST">
              <input type="text" placeholder="item" name="item" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

        <div className="section footer">
          <h2>GraphQL Test</h2>
          <div>
            <a href="/graphql?query={todo(itemId:1){itemId,item}}">
              GraphQL Query Test
            </a>
          </div>
          <div>
            <a href="/graphql?query=mutation%20AddTodoItem{AddTodo(itemId:2,item:&quot;New_todo_item&quot;,completed:false){item, completed}}&operationName=AddTodoItem">
              GraphQL Mutation Test - Add Todo
            </a>
          </div>
          <div>
            <a href="/graphql?query=mutation%20DeleteTodoItem{DeleteTodo(itemId:2){item}}&operationName=DeleteTodoItem">
              GraphQL Mutation Test - Delete Todo
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
