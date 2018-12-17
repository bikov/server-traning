const fs = require('fs');
const {Transform} = require('stream');
const path = require('path');
const server = require('http').createServer();

const upperCaseTr = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    },
});

const getLastUpdateDate = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.stat(path.join(__dirname, filePath), (err, stat) => {
            if (err) {
                reject(err);
            } else {
                resolve(stat.mtime.toISOString());
            }
        });
    });
};

const sendContentUppderCase = (req, res) => {
    const src = fs.createReadStream('./package.json');
    src.pipe(upperCaseTr).pipe(res);
};

const sendFileUpdateTime = async (req, res) => {
    res.write(await getLastUpdateDate('package.json'));
    res.statusCode = 200;
    res.end();
};

const sendNotFound = (req, res) => {
    res.write('Not found');
    res.statusMessage = 'Not found';
    res.statusCode = 404;
    res.end();
};

const routes = {
    '/content': sendContentUppderCase,
    '/updateTime': sendFileUpdateTime,
};

server.on('request', (req, res) => {
    const route = routes[req.url] ? routes[req.url] : sendNotFound;
    route(req, res);
});

server.listen(8000);