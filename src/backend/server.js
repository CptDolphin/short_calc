  
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 7000;
const hostname = 'localhost';

const paths = [
    [/html$/i, path.join(__dirname, '../frontend/index.html'), 'text/html' ],
	[/style\.css$/i, path.join(__dirname, '../frontend/style.css'), 'text/css' ],
	[/app\.js$/i, path.join(__dirname, '../frontend/app.js'), 'text/javascript' ]
];

http.createServer((request, response) => {
    console.log('request.url', request.url);
    if(request.url == '/'){
        request.url = '/index.html';
    }

    paths.find(([re, filepath, type]) => { 
        let item = request.url.match(re);
        console.log('item is:', item);

        if (!item) {
            // didn't find the file it searched for
            return;
        }

        fs.readFile(filepath, (err, content) => {
            if (err) {
                console.error(err);
                response.end('');
                return;
            }
        
            response.writeHead(200, { 'Content-Type': type});
            response.write(content);
            response.end();
        });
    });
}).listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`);
});
