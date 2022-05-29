import * as http from "http";
import * as fs from "fs";

const port = 3000;

const server = http.createServer(
    (request, response) => {
        const url = request.url;
        if(url === "/") {
            fs.readFile("./template/example2.html", "utf-8", (error, data) => {
                response.writeHead(200);
                response.write(data);
                response.end();
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    }
);
server.listen(port, () => {
    console.log("Start example2 server!");
});