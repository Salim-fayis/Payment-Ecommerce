const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const path = require('path')





const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
      credentials: true,
    
}));

console.log(__dirname);


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());



app.use("/api", router);
// const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
}).catch(err => {
    console.error("Failed to connect to DB", err);
});
