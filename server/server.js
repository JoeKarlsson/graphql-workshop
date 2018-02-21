import express from 'express';
import graphQLHTTP from 'express-graphql';
import { Schema } from './database/schema';
import path from 'path';

const app = express();
const SERVER_PORT = 5000;

app.use('/', express.static(path.resolve(__dirname, 'dist')));

app.use('/graphql', graphQLHTTP({
  graphiql: true,
  pretty: true,
  schema: Schema,
}));

app.listen(SERVER_PORT, () => {
  console.log(`Server is now running on http://localhost:${SERVER_PORT}`);
});
