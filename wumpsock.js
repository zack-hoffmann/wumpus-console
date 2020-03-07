export default function (url) {

    var writeFunc = () => {};
    var socket = newSocket();

    const getWriteFunc = () => {
        return writeFunc;
    }

    const newSocket = () => {
        var ws = new WebSocket(url);
        ws.onmessage = (e) => {
            getWriteFunc().apply(e.data);
        }
        return ws;
    }

    const getSocket = () => {
        if (socket.readyState != WebSocket.OPEN) {
            socket = newSocket();
        }
        return socket;
    }

    const $ = {
        send: (t) => {
            getSocket().send(t);
        },
        writeHook: (f) => {
            writeFunc = f;
        }
    };

    return $;
}