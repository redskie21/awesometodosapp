const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require('path');

const app = express();
app.use(express.json());

// ✅ API routes FIRST
const router = require("./routes");
app.use("/api", router);

// ✅ Static files AFTER
app.use(express.static(path.join(__dirname, '../client/vite-app/dist')));

app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/vite-app/dist/index.html'));
});

const port = process.env.PORT || 5000;

const startServer = async () => {
    await connectToMongoDB();
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
};
startServer();