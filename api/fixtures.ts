import mongoose from 'mongoose';
import config from './config';
import {User} from './models/User';
import {randomUUID} from 'crypto';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
  } catch (error) {
    console.log('Collection were not present, skipping drop...');
  }

  const [user_1, user_2] = await User.create(
    {
      username: 'user',
      password: '123',
      displayName: 'John Doe',
      token: randomUUID(),
      role: 'user',
    },
    {
      username: 'admin',
      password: '123',
      displayName: 'Will Smith',
      token: randomUUID(),
      role: 'admin',
    },
  );

  await db.close();
};

run().catch((e) => console.log(e));
