const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
    path: path.resolve(__dirname, "../config.env"),
});

const app = require("./app");
const connect_db = require("./lib/db");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
    connect_db();
});
