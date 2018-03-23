const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const ToDo = require ('./database/Todo');
const schema = require('./graphql/schema');

const connectToMongo = () => {
	mongoose.connect('mongodb://database:27017/local')
	const db = mongoose.connection;
	db.on('error', ()=> { console.log( '---FAILED to connect to mongoose') });
	db.once('open', () => {
		console.log( '+++Connected to mongoose');
	});
};

module.exports = (app) => {
	connectToMongo();
	app.use('/', express.static(path.resolve(__dirname, 'dist')));

	app.use('/graphql', graphqlHTTP(request => {
		return {
			schema: schema,
		  graphiql: true,
			pretty: true,
			formatError: error => ({
			  message: error.message,
			  locations: error.locations,
			  stack: error.stack ? error.stack.split('\n') : [],
			  path: error.path,
			}),
		};
	}));

	app.listen(3000);
}
