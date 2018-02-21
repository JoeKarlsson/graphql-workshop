const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const path = require('path');
const ToDo = require ('./database/Todo');
const { graphql } = require('graphql');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/Schema');

const app = express();
const SERVER_PORT = 3000;

module.exports = function (app) {
	app.use(bodyParser.urlencoded({extended:true}))

	mongoose.connect('mongodb://database:27017/local')

	const db = mongoose.connection;
	db.on('error', ()=> { console.log( '---FAILED to connect to mongoose') })
	db.once('open', () => {
		console.log( '+++Connected to mongoose')
	})

	app.use('/', express.static(path.resolve(__dirname, 'dist')));

	app.use('/graphql', graphqlHTTP (req => ({
		schema,
		// graphiql:true,
	})))

	app.post('/quotes',(req,res)=>{
		// Insert into TodoList Collection
		var todoItem = new ToDo({
			itemId:1,
			item:req.body.item,
			completed: false
		})

		todoItem.save((err,result)=> {
			if (err) {console.log("---TodoItem save failed " + err)}
			console.log("+++TodoItem saved successfully " + todoItem.item)

			res.redirect('/')
		})
	})

	app.listen(SERVER_PORT, () => {
	  console.log(`Server is now running on http://localhost:${SERVER_PORT}`);
	});
}
