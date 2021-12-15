#!/usr/local/bin/node
const fs = require('fs');
/* const fsp = require('fs/promises'); */
const readline = require('readline');
const path = require('path');
const inquirer = require('inquirer');

let startPath='';
let request ='';

const isFile = (filename) => fs.lstatSync(filename).isFile();
//рекурсивная функция поиска файла в директории
const searchFile = (pathname, question) =>{
    let fileList = fs.readdirSync(pathname)
    inquirer.prompt([
        {
            name: 'fileName',
            type: 'list', 
            message: 'Введите путь до файла: ',
            choices: fileList,
        }
    ]).then( ({fileName}) =>{
        const fullPath = path.join(pathname, fileName);
    if(isFile(fullPath)){
        const data = fs.readFileSync(fullPath, 'utf-8');
        console.log(data);
        const readStream = fs.createReadStream(fullPath, 'utf8')
        const rlf = readline.createInterface({
            input: readStream,
            terminal: true
        });
        rlf.on('line', (line) => {
            // сделать получение данных запроса из строки и проверку через includes
            
            if (line.includes(question)) {
                console.log(line)
            }
        
        })
        console.log('СТРОКИ СОВПАДАЮЩИЕ С ЗАПРОСОМ:  ')
        
    }else {
        return  searchFile(fullPath, question);       
        }
    })
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    
});
// Задаем начальные параметры для дальнейшей работе в CLI
 rl.question('Введите путь до файла: ',(filePath) => {
    startPath = filePath;
     rl.question('Введите поисковый запрос: ',(searchString) => {
        request = searchString;
         rl.close();
         //Проверяем существует ли заданный путь, если нет
         if(fs.existsSync(startPath)){
    
            searchFile(startPath,request)
         }else {
            const executionDir = process.cwd();
            searchFile(executionDir, request)
         }
     });
     
 });
 


