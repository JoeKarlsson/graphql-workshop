const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// create a schema
const toDoSchema = new Schema({
    itemId: Number,
    item: String,
    completed: Boolean
}, {collection:"TodoList"});
// we need to create a model using it
const ToDo = mongoose.model('ToDo', toDoSchema);

module.exports = ToDo
