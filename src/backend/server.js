const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 7000;
const hostname = 'localhost';

const routes = [
    [/html$/i, path.join(__dirname, '../frontend/index.html'), 'text/html' ],
	[/style\.css$/i, path.join(__dirname, '../frontend/style.css'), 'text/css' ],
    [/js$/i, undefined, 'text/javascript'],
    [/js\.map$/i, undefined, 'text/plain'],
];

http.createServer((request, response) => {
    if (!request.url.includes('favicon.ico')){
        console.log('request.url', request.url);
        if(request.url == '/'){
            request.url = '/index.html';
        }

        const route = routes.find(element => element[0].test(request.url));
        console.log('item is:', route);

        if (route[1] === undefined) {
            let x = path.join(__dirname, '../frontend', request.url);
            fs.readFile(x, (err, content) => {
                if (err) {
                    console.error(err);
                    response.end('');
                }

                response.writeHead(200, {'Content-Type': route[2]});
                response.write(content);
                response.end('');
            });
            return;
        }

        const [, filepath, content_type] = route;
        console.log('filepath is %s, content_type is %s', filepath, content_type);
        
        fs.readFile(filepath, (err, content) => {
            if (err) {
                console.error(err);
                response.end('error reading file');
                return;
            }
        
            response.writeHead(200, { 'Content-Type': content_type});
            response.write(content);
            response.end();
        });
    }
}).listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`);
});
