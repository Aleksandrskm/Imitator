'use strict';
import {Loader} from "./Loader.js";
import {ImitatorUtils} from "./ImitatorUtils.js";
import {Utils} from "./Utils.js";

let countsSession={countSession:0};

const btnFlawStart=document.querySelector('#task-btn_sim_flow');
const imageRe=document.querySelector('.re-date-flow');
imageRe.addEventListener('click',()=>{
    if (document.querySelector('.priority-checkbox').checked) {
        const randLong=Utils.getRandomNumber(27,169)
        const randLat=Utils.getRandomNumber(41,77)
        document.getElementById('lat3').value=randLat;
        document.getElementById('lon3').value=randLong;
    }
});
const dateControl = document.querySelector('input[type="date"]');
dateControl.value=Utils.getDateTime().slice(0,10);
const timeControl = document.querySelector('input[type="time"]');
let numberTime=Number(Utils.getDateTime().substring(11,13));
let timeVal=Utils.getDateTime().substring(13,19);
if (numberTime>=10) {
    timeControl.value=`${numberTime}${timeVal}`;
}
else{
    timeControl.value=`0${numberTime}${timeVal}`;
}
btnFlawStart.addEventListener('click',()=>{
    document.getElementById('task-btn_cansel').disabled=false;
    countsSession.countSession=0;
    const loader = new Loader('.loader-container');
    loader.show('Загрузка данных с сервера');
    const select = document.getElementById('abonent-select');
    let selIndex=select.selectedIndex;
    if (!selIndex) {
        selIndex+=1;
    }
    const selectRec = document.getElementById('abonent-select-rec');
    let selIndexRec=selectRec.selectedIndex;
    if (!selIndexRec) {
        selIndexRec+=2;
    }
    let data =
        {
            "sessions-id": Utils.getRandomNumber(10000,99999),
            "terminal-id-output": selIndex,
            "date-time-call": new Date().toISOString().replace('Z','+00:00'),
            "сonnection_type": 3,
            "ist":2,
            "abonents": [
                {
                    "terminal-id": selIndex,
                    "terminal-latitude": document.getElementById('lat3').value,
                    "terminal-longitude": document.getElementById('lon3').value,
                    "alien": 0
                },
                {
                    "terminal-id": selIndexRec,
                    "terminal-latitude": document.getElementById('lat6').value,
                    "terminal-longitude":document.getElementById('lon6').value,
                    "alien":1
                }
            ]
        }
    const arrTimers=[];
    console.log(document.getElementById('quantity_calls').value,document.getElementById('time_calls').value);
    let quantyCalls='';
    let timeCalls='';
    let timeTimers= 1;
    const radioButtons = document.querySelectorAll('input[name="radio-call"]');
    let selectedSize;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedSize = radioButton.value;
            break;
        }
    }
    console.log(selectedSize)
    if (selectedSize==1) {
        quantyCalls=document.getElementById('quantity_calls').value;
        timeCalls=document.getElementById('time_calls').value;
        timeTimers= Math.floor(timeCalls/quantyCalls);
        console.log('Таймер test 1:',timeTimers);
    }
    if (selectedSize==2) {
        quantyCalls=document.getElementById('quantity_calls').value;
        timeCalls=document.getElementById('time_calls').value;
        timeTimers= Math.floor(Utils.getRandomNumber(1,(timeCalls/quantyCalls)));
        console.log('Таймер test 2:',timeTimers);
    }
    function nextCall(){
        if (countsSession.countSession!=0) {
            data =
                {
                    "sessions-id": Utils.getRandomNumber(10000,99999),
                    "terminal-id-output": selIndex,
                    "date-time-call": new Date().toISOString().replace('Z','+00:00'),
                    "сonnection_type": 3,
                    "ist":2,
                    "abonents": [
                        {
                            "terminal-id": selIndex,
                            "terminal-latitude": document.getElementById('lat3').value,
                            "terminal-longitude": document.getElementById('lon3').value,
                            "alien": 0
                        },
                        {
                            "terminal-id": selIndexRec,
                            "terminal-latitude": document.getElementById('lat6').value,
                            "terminal-longitude":document.getElementById('lon6').value,
                            "alien":1
                        }
                    ]
                }
        }
        else if (selectedSize===2) {
            timeTimers= Math.floor(Utils.getRandomNumber(1,(timeCalls/quantyCalls)));
            console.log(timeTimers);
        }
        console.log(btnFlawStart.disabled,'Кнопка отключена');
        console.log(data.lat,' ', data.lon);
        ImitatorUtils.calculateFirstAvailableInterval(data,countsSession).then(()=>{
            loader.close();
            ++countsSession.countSession;
            console.log(countsSession.countSession);
            document.getElementById('response3').style.display='block';
        })
        console.log('Таймер: ',timeTimers);
    }
    function setIntervalImmediately(func, interval) {
        func(); // Немедленное исполнение функции
        console.log('func',func,'интервал',interval);
        return setInterval(func, interval); // Затем функция продолжает работать по интервалу
    }

    const timerCalls=setIntervalImmediately(nextCall,timeTimers*1000)
    console.log('Интервал',timerCalls)
    const time=setInterval(function(){
        console.log(countsSession.countSession);
        if (countsSession.countSession==quantyCalls) {
            clearInterval(timerCalls);
            console.log(countsSession.countSession);
            clearInterval(time);
        }
    },100);
});
Utils.viewAbonents('abonent-select','.number');
Utils.viewAbonents('abonent-select-rec','.number-rec')
