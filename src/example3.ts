import * as http from "http";
import * as fs from "fs";
import * as WebSocket from "websocket";

const port = 3000;

const server = http.createServer(
    (request, response) => {
        response.writeHead(200);
            response.write("hello!");
            response.end();
    }
);

server.listen(port, () => {
    console.log("Start example3 server!");
});

const wsServer = new WebSocket.server({
    httpServer: server,
    autoAcceptConnections: false
});

const originIsAllowed = (origin: string) => {
    return true;
};

// websocketクライアントは、wscat -c ws://localhost:3000 -s ws-sampleでテスト可能
wsServer.on("request", (request) => {
    if(!originIsAllowed(request.origin)) {
        request.reject();
        console.log(`${request.origin}からのリクエストを拒否`);
    }

    const connection = request.accept("ws-sample", request.origin);
    console.log(`${request.origin}からのリクエストを許可`);

    connection.on("message", message => {
        switch (message.type) {
            case 'utf8':
              console.log(`メッセージ: ${message.utf8Data}`);
              connection.sendUTF(`Your message is \"${message.utf8Data}\"`);
              wsServer.broadcast(`New message is \"${message.utf8Data}\"`);
              break
            case 'binary':
              console.log(`バイナリデータ: ${message.binaryData.length}byte`);
              connection.sendBytes(message.binaryData);
              break
          }
    });

    connection.on("close", (resonCode, description) => {
        console.log(`${connection.remoteAddress}が切断`);
    });
});
