import app from "./app.js";
import dotenv from 'dotenv';
dotenv.config({quiet:true})
import ConnectDB from "./config/DB.js";

const PORT = process.env.PORT;

ConnectDB()
  .then(() => {
    console.log("DB Connected")
    app.listen(PORT, () => {
      console.log("Listening on port 5000");
    });
  })
  .catch((err) => {
    console.error(err);
  });


  