import dotenv from "dotenv";
dotenv.config();
import app from "./app/app";
import mongoose from "mongoose";
// mongoose.set('debug', true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("db connection success");
    app.listen(process.env.PORT, () => {
      console.log("server is running on port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
