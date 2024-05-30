import express from "express";
import jiraRoute from "./jira/route.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 8080;

// midleware
app.use(express.json());

// todo: add cors

// routes
app.get("/", (req, res) => res.send("Hello from Formsly API"));
app.use("/jira", jiraRoute);

// start api
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})