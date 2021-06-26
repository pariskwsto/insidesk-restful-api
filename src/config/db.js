const mongoose = require('mongoose');

const connectDB = async () => {
  const {
    MONGO_ROOT_USER,
    MONGO_ROOT_PASSWORD,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DATABASE,
  } = process.env;

  const mongoUri = `mongodb://${MONGO_ROOT_USER}:${MONGO_ROOT_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?authSource=admin`;

  const conn = await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`.bgGreen.black);
};

connectDB.getStatus = () => {
  const readyState = mongoose.connection._readyState;
  const state = mongoose.connection.states[`${readyState}`];
  const name = mongoose.connection.name;
  const host = mongoose.connection.host;
  const port = mongoose.connection.port;

  return { state, name, host, port };
};

module.exports = connectDB;
