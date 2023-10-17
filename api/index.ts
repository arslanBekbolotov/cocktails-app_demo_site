import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from "./routes/users";

const app = express();
const PORT = 8001;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((e) => console.log(e));
