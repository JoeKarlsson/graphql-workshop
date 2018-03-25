const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} = require("graphql/type");

const ToDoMongo = require("../database/Todo");

const todoType = new GraphQLObjectType({
  name: "todo",
  description: "todo item",
  fields: () => ({
    itemId: {
      type: GraphQLInt,
      description: "The id of the todo."
    },
    item: {
      type: GraphQLString,
      description: "The name of the todo."
    },
    completed: {
      type: GraphQLBoolean,
      description: "Completed todo?"
    }
  })
});

const TodoQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    todo: {
      type: new GraphQLList(todoType),
      description: "Todo items",
      args: {
        itemId: {
          name: "itemId",
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (root, { itemId }, source, fieldASTs) => {
        const foundItems = new Promise((resolve, reject) => {
          ToDoMongo.find({ itemId }, (err, todos) => {
            err ? reject(err) : resolve(todos);
          });
        });

        return foundItems;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: TodoQueryType
});

module.exports = schema;
