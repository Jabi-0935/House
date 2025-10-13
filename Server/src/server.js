import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import ConnectDB from "./config/DB.js";
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

ConnectDB(MONGO_URI)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("some error in the connecetion", err);
  });
