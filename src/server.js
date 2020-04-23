const app = require("./app");

// Added a msg when the app is restarted
app.listen(3333, () => {
  console.log('Backend started!')
});
