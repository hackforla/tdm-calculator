const app = require("../server");

require('dotenv').config();

const PORT = process.env.PORT || 5002;

let server;

const setupServer = () => {
    return new Promise((resolve) => {
        server = app.listen(PORT, () => {
            console.log(`Test Server running on port ${PORT}`);
            resolve(server);
        });
    });
};

const teardownServer = () => {
    return new Promise((resolve) => {
        server.close(resolve);
    });
};

module.exports = {
    setupServer,
    teardownServer
};