const http = require('http');
const path = require('path');
const fs = require('fs');

(async () => {
    const isFile = (path) => fs.lstatSync(path).isFile();
    http.createServer( (req, res) => {
        const fullPath = path.join(process.cwd(), req.url);
        let herfList = '';
        const urlPath = req.url.match(/[\d\w\.]+/gi);
        console.log('req.url:  ', req.url)
        console.log('urlPath:  ',urlPath)
        console.log('fullPath:  ',fullPath)
        //проверяем существует ли путь
        if (!fs.existsSync(fullPath)) return res.end('PATH NOT FOUND!!!');
        //проверяем является ли выбранный вариант файлом
        if (isFile(fullPath)) {
            return fs.createReadStream(fullPath).pipe(res);
        }

        if (urlPath) {
            urlPath.pop();
            const prevUrl = urlPath.join('/');
            herfList = urlPath.length ? `<li><a href="/${prevUrl}">..</a></li>` : '<li><a href="/">..</a></li>';
        }
      
        fs.readdirSync(fullPath)
            .forEach(fileName => {
                const filePath = path.join(req.url, fileName);
                herfList += `<li><a href="${filePath}">${fileName}</a></li>`;
            });
            //получение HTML страницы с содержимым директории замена через replace
        const fromHTML = fs
            .readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
            .replace('##links', herfList);
        res.writeHead(200, {
            'Content-Type': 'text/html',
        })
        return res.end(fromHTML);
    }).listen(8080);
})()
