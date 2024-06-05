const http = require("http");
const fs = require("fs");

const server = http.createServer();

const host = "localhost";
const port = 8080;

server.on("request", (req, res) => {
    if (req.url.startsWith("/public/")) {
        try {
            res.end(fs.readFileSync("." + req.url));
        } catch (e) {
            res.writeHead(404);
            // Prévoir une page d'erreur 404
            res.end("Erreur 404 : Page non trouvée");
        }
    } else if (req.url == "/") {
        res.end(fs.readFileSync("index2.html"));
    } else {
        res.writeHead(404);
        // Prévoir une page d'erreur 404
        res.end("Erreur 404 : Page non trouvée");
    }
});

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});