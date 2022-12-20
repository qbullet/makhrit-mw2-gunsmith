import mongoose from "mongoose";
import AppVariables from "../app.variables.js";

mongoose.set("strictQuery", true);
mongoose.connect(AppVariables.DB_CONNECTION, { useNewUrlParser: true });

export default mongoose;
