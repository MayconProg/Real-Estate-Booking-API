import express from "express";
import { UserRoutes } from "./routes/user.route";
import { PropertyRoutes } from "./routes/property.route";

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Hello world" });
});

app.use(express.json());

app.use("/users", UserRoutes);
app.use("/properties", PropertyRoutes);

app.listen(2108, () => {
  console.log("HTTP Server Running on http://localhost:2108! 😊");
});
