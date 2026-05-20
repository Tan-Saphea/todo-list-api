const app = require("./app");
const dotenv = require("dotenv");
const connectToDatabase = require("./config/db");

dotenv.config();

//connect to database
connectToDatabase();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
