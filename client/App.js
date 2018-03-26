import React, { PureComponent } from "react";
import "./css/normalize.css";
import "./css/skeleton.css";
import "./css/index.css";

class List extends PureComponent {
  render() {
    const itemNode = this.props.todos.map(todo => {
      return (
        <Item todo={ todo.item } key={ todo._id } />
      )
    })
    return <ul>{ itemNode }</ul>;
  }
};

class Item extends PureComponent {
  render() {
    return <li>{ this.props.todo }</li>;
  }
};

class App extends PureComponent {
	constructor() {
    super();
    this.state = {
      todos: [],
    }
		this.getTodos = this.getTodos.bind(this);
  };

	componentDidMount () {
		this.getTodos();
	}

	getTodos () {
		const url = '/graphql?query=query%20GetAllTodos%7Btodos%7BitemId%2Citem%7D%7D&operationName=GetAllTodos';

		fetch(url)
		.then((response) => response.json())
		.then(todos => {
			this.setState({
				todos: todos.data.todos,
			});
		});
	}

  render() {
    return (
      <div>
        <div className="section header">
          <div className="container">
            <h1 className="section-heading">GraphQL Workshop</h1>
            <p className="section-description">
              By: <a href="http://callmejoe.net/">Joe Karlsson</a>
            </p>
          </div>
        </div>

        <div className="section" id="content">
				 <div className="six columns">
          <h4>REST</h4>
          <form action="/todo" method="POST">
            <input type="text" placeholder="item" name="item" />
            <button type="submit">Submit</button>
          </form>
				</div>

					<div className="six columns">
            <h4>Graphql Post</h4>
            <form action="/graphql?query=mutation" method="POST">
              <input type="text" placeholder="item" name="item" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

				<div className="section todos">
          <h4>Todos:</h4>
					<List todos={this.state.todos} />

        </div>

				<div className="section footer">
          <h2>GraphQL Test</h2>
          <div>
            <a href="/graphql?query={todo(itemId:1){itemId,item}}">
              GraphQL Query Test
            </a>
          </div>
          <div>
            <a href="/graphql?query=query%20GetAllTodos%7Btodos%7BitemId%2Citem%7D%7D&operationName=GetAllTodos">
              GraphQL Mutation Test - Get All Todos
            </a>
          </div>
          <div>
            <a href="/graphql?query=mutation%20AddTodoItem{AddTodo(itemId:2,item:&quot;New_todo_item&quot;,completed:false){item, completed}}&operationName=AddTodoItem">
              GraphQL Mutation Test - Add Todo
            </a>
          </div>
          <div>
            <a href="/graphql?query=mutation%20DeleteTodoItem%7BDeleteTodo(itemId%3A2)%7Bitem%7D%7D&operationName=DeleteTodoItem">
              GraphQL Mutation Test - Delete Todo by ID
            </a>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
