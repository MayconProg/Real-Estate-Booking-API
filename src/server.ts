import express from "express";
import { UserRoutes } from "./routes/user.route";
import { PropertyRoutes } from "./routes/property.route";
import { ScheduleRoutes } from "./routes/schedule.route";

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send({ message: "Hello world" });
});

app.use(express.json());

app.use("/users", UserRoutes);
app.use("/properties", PropertyRoutes);
app.use("/schedules", ScheduleRoutes);

app.listen(PORT, () => {
  console.log(`HTTP Server Running on http://localhost:${PORT}! 😊`);
});
