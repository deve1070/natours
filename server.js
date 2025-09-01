const app = require('./app');

port = 3000;
app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
});
