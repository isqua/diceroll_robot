import { createServer } from "http";

createServer((req, res) => {
    console.log(`Request ${req.method} ${req.url}`);
    res.end("hi!");
}).listen(process.env.PORT);
