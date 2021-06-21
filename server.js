const app = require("./app");
const PORT = process.env.PORT;



// SERVER
app.listen(PORT, () => {
  console.log("server is up on port " + PORT);
});
