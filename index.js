import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import passport from "passport";
import {router} from "./Routers/authRoute.js";
import session from "express-session";
import "./passport.js";


const app = express();

dotenv.config();
app.use(session({
	secret: 'somethingsecretgoeshere',
	resave: false,
	saveUninitialized: true,
	// cookie: { secure: true }
 }));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
	origin: process.env.CLIENT_URL,
	methods: "GET,PUT,POST,DELETE",
	credentials: true
}));

app.get("/", (req, res)=>{
	res.send("hello world");
})
app.use("/auth", router);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));