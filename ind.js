const moment = require('moment')
const EventEmitter = require('events')

const emitter = new EventEmitter;
const dateFromConsole = process.argv.slice(2).toString()
let now = new Date()
var timer

let startTime = moment(now, ['DD-MM-YYYY h:mm:ss A'])
    .utcOffset(7)
    .format('DD-MM-YYYY hh:mm:ss A')

let endTime = moment(dateFromConsole, ['DD-MM-YYYY h:mm:ss A'])
    .utcOffset(7)
    .format('DD-MM-YYYY hh:mm:ss A')

    let TotalSeconds = moment(endTime, 'DD-MM-YYYY hh:mm:ss A')
    .utcOffset(7)
    .diff(
        moment(startTime, 'DD-MM-YYYY hh:mm:ss A').utcOffset(7),
        'seconds',
    );

const counter =(TotalTime) =>{
      timer = setInterval(() => {
        if(TotalTime > 0 ){
        let years = Math.floor(TotalTime / (3600*24*365));
        let mounth = Math.floor(TotalTime / (3600*24*30,42));
        let days = Math.floor(TotalTime / (3600*24));
        let hours = Math.floor(TotalTime / 3600);
        let minutes = Math.floor((TotalTime / 60) % 60);
        let seconds = Math.floor(TotalTime % 60);
        console.log(`Времени до назначенной даты осталось: ${years} лет, ${mounth} месяцев, ${days} дней, ${hours} часов, ${minutes} минут, ${seconds} секунд`)
        TotalTime--
      } 
      if(TotalTime <= 0){
        clearInterval(timer);
          console.log('Ивент начался!');
          emitter.emit('closeTimer');
        }
      }, 1000);
      
}
emitter.on('timer', counter)
emitter.on('closeTimer', counter)
emitter.on('error', ()=> console.log('error'))

if (!isNaN(TotalSeconds) && TotalSeconds > 0){
  emitter.emit('timer')
  counter(TotalSeconds)
  
}else {
  emitter.emit('error')
  console.log('Вы ввели не верное значение даты. Введите в формате ДД-ММ-ГГ-ЧЧ-ММ-СС')
}







