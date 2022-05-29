import * as http from "http";

const port = 3000;

const server = http.createServer(
    (request, response) => {
        response.writeHead(200);
        response.write("hello!");
        response.end();
    }
);
server.listen(port, () => {
    console.log("Start example1 server!");
});