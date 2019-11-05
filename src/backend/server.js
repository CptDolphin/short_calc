  
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 7000;
const hostname = 'localhost';

const routes = [
    [/html$/i, path.join(__dirname, '../frontend/index.html'), 'text/html' ],
	[/style\.css$/i, path.join(__dirname, '../frontend/style.css'), 'text/css' ],
	[/app\.js$/i, path.join(__dirname, '../frontend/app.js'), 'text/javascript' ]
];

http.createServer((request, response) => {
    console.log('request.url', request.url);
    if(request.url == '/'){
        request.url = '/index.html';
    }

    const route = routes.find(element => element[0].test(request.url));
    console.log('item is:', route);

    if (!route) {
        //        return void response.end('Sorry, could not find a route.\n');
        return;
    }

    const [, path, content_type] = route;
    
    fs.readFile(path, (err, content) => {
        if (err) {
            console.error(err);
            response.end('error reading file');
            return;
        }
    
        response.writeHead(200, { 'Content-Type': content_type});
        response.write(content);
        response.end();
    });
}).listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`);
});
