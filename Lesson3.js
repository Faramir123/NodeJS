const fs = require('fs');
const readline = require('readline');

const ACCESS_LOG = 'access.log';

const readFile = fs.createReadStream(ACCESS_LOG, 'utf-8')
// Создал поток чтения из файла
const file  = readline.createInterface({
    input: readFile,
    terminal: false,
    crlfDelay: Infinity
});

//подписался на событие лайн, которое построчно считывает из файла информацию
// Сздал 2 поток асинхронных с условием выборки строк по IP через метод includes
file.on( 'line' , (line) => {
   if(line.includes('89.123.1.41')){
       const writeStream1 = fs.createWriteStream('89.123.1.41_requests.log',
        {
            encoding: 'utf-8',
            flags: 'a+'
        }
        ) 
        writeStream1.write(line + '\n')
    } else if(line.includes('34.48.240.111')){
        const writeStream2 = fs.createWriteStream('34.48.240.111_requests.log',
        {
            encoding: 'utf-8',
            flags: 'a+'
        }
        )
        writeStream2.write(line + '\n')
     }
    });

