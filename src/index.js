const express = require("express");
const app = express();
const cors = require("cors")

app.listen(4000);
console.log("server on port 4000");

//middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//routes
app.use(require("./routes/emloyeesRoutes"));
app.use(require("./routes/statesRoutes"));
app.use(require("./routes/tasksRoutes"));
