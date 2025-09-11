'use strict';
import {Loader} from "./Loader.js";
import {ImitatorUtils} from "./ImitatorUtils.js";
import {Utils} from "./Utils.js";

let countsSession={countSession:0};
const rusKeys={
    ID:'Идентификатор',
    ID_SV_ZAPROS_SEANS:'Ссылка на сеанс связи',
    ID_SV_AB:'Ссылка на абонента сеанса связи',
    ID_KA:'Номер КА',
    ID_RSS:'Номер РСС',
    ID_RSS_ANT:'Номер антенны РСС',
    CANAL:'Номер канала передачи',
    TIME_SLOT:'Номер тайм-слота передачи',
    CANAL_PR:'Номер канала приема',
    TIME_SLOT_PR:'Номер тайм-слота приема',
    ID_CANAL_ZAN:'Занятость канала',
    DATA_BEG:'Дата и время начала подключения к КА и РСС',
    DATA_END:'Дата и время завершения подключения к КА и РСС',
    DURATION:'Продолжительность, сек',
    IST:'Источник вызова',

}
let arrIdsSvSenas=[]
const rusKeuAll={
    ID_SV_AB:'Ссылка на абонента сеанса связи',
    DATA_BEG:'Дата и время начала подключения к КА и РСС',
    DATA_END:'Дата и время завершения подключения к КА и РСС',
    DURATION:'Продолжительность, сек'
}
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
    let formattedDate;
    let dataBeg;
    if (document.querySelector('.timer_call-current').checked) {
        // Используем текущее время
        const now = new Date();
        dataBeg = now.toISOString().replace('Z', '+00:00');

        // Вычисляем конечную дату
        const duration = parseInt(document.querySelector('#max-time-dur').value) * 1000;
        formattedDate = new Date(now.getTime() + duration).toISOString().replace('Z', '+00:00');
    } else {
        // Получаем дату из контролов
        const startDate = Utils.getDateTimes(dateControl, timeControl);
        dataBeg = startDate.toISOString().replace('Z', '+00:00');

        // Добавляем продолжительность
        const duration = parseInt(document.querySelector('#max-time-dur').value) * 1000;
        formattedDate = new Date(startDate.getTime() + duration).toISOString().replace('Z', '+00:00');
    }
    let data =
        {
            "params": {
                "start_datetime_iso": dataBeg,
                "end_datetime_iso": formattedDate,
                "dates_delta_in_sec": 15,
                "min_session_time_in_sec": document.querySelector('#min-time-dur').value,
                "acceptable_session_time_in_sec": 100
            },
            "callers": [
                {
                    "name": "А1",
                    "lat": document.getElementById('lat3').value,
                    "lon": document.getElementById('lon3').value,
                    "radius": 2500
                },
                {
                    "name": "А2",
                    "lat": document.getElementById('lat6').value,
                    "lon": document.getElementById('lon6').value,
                    "radius": 2500
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
            if (document.querySelector('.timer_call-current').checked) {
                // Используем текущее время
                const now = new Date();
                dataBeg = now.toISOString().replace('Z', '+00:00');

                // Вычисляем конечную дату
                const duration = parseInt(document.querySelector('#max-time-dur').value) * 1000;
                formattedDate = new Date(now.getTime() + duration).toISOString().replace('Z', '+00:00');
            } else {
                // Получаем дату из контролов
                const startDate = Utils.getDateTimes(dateControl, timeControl);
                dataBeg = startDate.toISOString().replace('Z', '+00:00');

                // Добавляем продолжительность
                const duration = parseInt(document.querySelector('#max-time-dur').value) * 1000;
                formattedDate = new Date(startDate.getTime() + duration).toISOString().replace('Z', '+00:00');
            }
            data =
                {
                    "params": {
                        "start_datetime_iso": dataBeg,
                        "end_datetime_iso": formattedDate,
                        "dates_delta_in_sec": 15,
                        "min_session_time_in_sec": document.querySelector('#min-time-dur').value,
                        "acceptable_session_time_in_sec": 100
                    },
                    "callers": [
                        {
                            "name": "А1",
                            "lat": document.getElementById('lat3').value,
                            "lon": document.getElementById('lon3').value,
                            "radius": 2500
                        },
                        {
                            "name": "А2",
                            "lat": document.getElementById('lat6').value,
                            "lon": document.getElementById('lon6').value,
                            "radius": 2500
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
        ImitatorUtils.addPlanSv(data,arrIdsSvSenas,rusKeys,rusKeuAll).then(()=>{
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
const btnEnd=document.querySelector('#task-btn_cansel');
btnEnd.addEventListener('click',()=>{
    const quantyCalls =document.getElementById('quantity_calls').value;
    countsSession.countSession=quantyCalls;


    arrIdsSvSenas.forEach((id)=>{

        ImitatorUtils.archivatePlanSv(id).then(res=>{
                arrIdsSvSenas=[];
                document.getElementById('containers_calls').innerHTML+=`<div class="header-log">СУРР:Сеанс связи под номером:${id} заархивирован</div><div>СОВ:Время завершения запроса${new Date().toLocaleString()}</div> <br>`;
            }
        );
    })


})
Utils.viewAbonents('abonent-select','.number');
Utils.viewAbonents('abonent-select-rec','.number-rec')
