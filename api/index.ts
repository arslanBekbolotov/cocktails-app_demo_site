import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routes/users';
import cocktailsRouter from './routes/cocktails';

const app = express();
const PORT = process.env.PORT || 8080;
const url = config.db || "";

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/cocktails', cocktailsRouter);

const run = async () => {
  await mongoose.connect(url);

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((e) => console.log(e));
