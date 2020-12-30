import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import schema from './src/schema.js';
import { verifyUser } from './src/middlewares/auth.js';

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hallo!');
});

app.use(verifyUser);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.connection.on('open', () => console.log('Database Connected.'));

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
