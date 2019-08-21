const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger);

function logger(req, res, next) {
    const method = req.method;
    const url = req.url;
    const timestamp = Date.now();
    console.log(`${method} request to ${url} at ${timestamp}`);
    next();
}

server.get('/', (req, res) => {
    res.status(200).json({ "it's": 'working!!' })
})

module.exports = server;