import path from 'path';
import dotenv from 'dotenv';

const rootPath = __dirname;
dotenv.config();

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: process.env.MONGO_URL,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
};

export default config;
