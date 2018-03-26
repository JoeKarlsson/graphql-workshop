import React, { PureComponent } from 'react';
import './css/normalize.css';
import './css/skeleton.css';
import './css/index.css';

class List extends PureComponent {
	render() {
		const itemNode = this.props.todos.map(todo => {
			return <Todo todo={todo.item} key={todo._id} />;
		});
		return <ul>{itemNode}</ul>;
	}
}

class Todo extends PureComponent {
	render() {
		return <li>{this.props.todo}</li>;
	}
}

class App extends PureComponent {
	constructor() {
		super();
		this.state = {
			todos: [],
		};
		this.getGraphQlData = this.getGraphQlData.bind(this);
		this.postGraphQLData = this.postGraphQLData.bind(this);
		this.createNewTodo = this.createNewTodo.bind(this);
	}

	componentDidMount() {
		this.getAllTodos();
	}

	getAllTodos () {
		const resource = 'todos';
		const params = {};
		const fields = `{itemId item completed}`
		this.getGraphQlData(resource, params, fields)
		.then(todos => {
			this.setState({
				todos: todos.data.todos,
			});
		});
	}

	createNewTodo (event) {
		event.preventDefault();
		const operationName = 'AddTodoItem';
		const resource = 'AddTodo';
		const params = {itemId:2,item:'new todo 4321',completed:false};
		const fields = `{itemId item completed}`
		this.postGraphQLData(operationName, resource, params, fields)
		.then(todos => {
			console.log('todos', todos);
		});
	}

	getGraphQlData(resource, params, fields) {
		const query = `{${resource} ${this.paramsToString(params)} ${fields}}`;
		return fetch('/graphql', {
			method: 'POST',
			mode: 'cors',
			headers: new Headers({
				'Content-Type': 'application/json',
				Accept: 'application/json',
			}),
			body: JSON.stringify({ query }),
		})
		.then(response => response.json())
	}

	postGraphQLData(operationName, resource, params, fields) {
		const query = `mutation {${resource} ${this.paramsToString(params)} ${fields}}`;
		return fetch('/graphql', {
			method: 'POST',
			mode: 'cors',
			headers: new Headers({
				'Content-Type': 'application/json',
				Accept: 'application/json',
			}),
			body: JSON.stringify({ query }),
		})
		.then(response => response.json())
	}

	paramsToString(params) {
		let paramString = '';
		if (params.constructor === Object && Object.keys(params).length) {
			let tmp = [];
			for (let key in params) {
				let paramStr = params[key];
				if (paramStr !== '') {
					if (typeof params[key] === 'string') {
						paramStr = `"${paramStr}"`;
					}
					tmp.push(`${key}:${paramStr}`);
				}
			}
			if (tmp.length) {
				paramString = `(${tmp.join()})`;
			}
		}
		return paramString;
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
						<h4>GraphQL</h4>
						<form>
							<input type="text" placeholder="item" name="item" />
							<input type="hidden" value="false" name="completed" />
							<input type="hidden" value="3" name="id" />
							<button onClick={this.createNewTodo} type="submit">Submit</button>
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
						<a href="/graphql?query=mutation%20DeleteTodoItem($itemId:%20Int!)%7BDeleteTodo(itemId%3A%24itemId)%7Bitem%7D%7D&operationName=DeleteTodoItem&variables={itemId:2}">
							GraphQL Mutation Test - Delete Todo by ID
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
