const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection is successfully'))
  .catch((err) => {
    console.error('DB connection error', err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
});
