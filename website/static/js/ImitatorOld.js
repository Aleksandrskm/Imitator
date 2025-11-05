'use strict'
import {Utils} from "./Utils.js";
import {ImitatorUtils} from "./ImitatorUtils.js";
import {Loader} from "./Loader.js";
function renderLogChannels(planData,abonents){
    const containerElement = document.querySelector("#containers_calls");
    const callElement = document.createElement("div");
    const logElement = document.createElement("div");
    const elemResponse = document.querySelector('#response3');
    const headerLogElement = document.createElement("div");
    headerLogElement.textContent=`Вызов:`
    headerLogElement.classList.add("headers-log");
    logElement.textContent = `СУРР:ID созданного плана сеанса связи: ${planData.ID_SV_ZAPROS_SEANS}`;
    callElement.append(headerLogElement)
    callElement.append(logElement);
    planData.details.forEach((detail,index) => {
        const channelElement = document.createElement("div");
        channelElement.textContent =`СУРР: Абонент:${abonents[index].abonent}, КА:${abonents[index].KA}, РСС:${abonents[index].rss}, Антенна:${abonents[index].ant},
        Время начала сеанса:${abonents[index].dateStart}, Канал на передачу: ${detail.CANAL}, Тайм слот на передачу: ${detail.TIME_SLOT},
        Канал на прием: ${detail.CANAL_PR}, Тайм слот на прием: ${detail.TIME_SLOT_PR}`;
        callElement.append(channelElement);
    })
    containerElement.append(callElement)
    elemResponse.append(callElement.cloneNode(true));
}
function endSvSeans(channels,timer,handler){
    clearTimeout(timer);
    if (handler) {
        document.querySelector('#task-btn_cansel').removeEventListener('click', handler);
    }
    ImitatorUtils.archivatePlanSv(channels.ID_SV_ZAPROS_SEANS).then(()=>{
        renderEndLog(channels.ID_SV_ZAPROS_SEANS);
    })
}
function renderEndLog(idSvPlan){
    const containerElement = document.querySelector("#containers_calls");
    const callElement = document.createElement("div");
    const logElement = document.createElement("div");
    const logElementDate = document.createElement("div");
    const elemResponse = document.querySelector('#response3');
    const headerLogElement = document.createElement("div");
    headerLogElement.textContent=`Завершение:`
    headerLogElement.classList.add("headers-log");
    logElement.textContent = `СУРР:Сеанс связи ${idSvPlan} завершен `;
    logElementDate.textContent=`СОВ:Время завершения запроса ${new Date().toLocaleString()}`;
    callElement.append(headerLogElement)
    callElement.append(logElement);
    callElement.append(logElementDate);
    containerElement.append(callElement)
    elemResponse.append(callElement.cloneNode(true));
}
function renderErrorLog(){
    const containerElement = document.querySelector("#containers_calls");
    const callElement = document.createElement("div");
    const logElement = document.createElement("div");
    const logElementDate = document.createElement("div");
    const elemResponse = document.querySelector('#response3');
    const headerLogElement = document.createElement("div");
    headerLogElement.textContent=`Завершение:`
    headerLogElement.classList.add("headers-log");
    logElement.textContent = `СУРР:Произошла ошибка на стороне сервера `;
    logElementDate.textContent=`СОВ:Время завершения запроса ${new Date().toLocaleString()}`;
    callElement.append(headerLogElement)
    callElement.append(logElement);
    callElement.append(logElementDate);
    containerElement.append(callElement)
    elemResponse.append(callElement.cloneNode(true));

}
function renderErrorLogRSS(){
    const containerElement = document.querySelector("#containers_calls");
    const callElement = document.createElement("div");
    const logElement = document.createElement("div");
    const logElementDate = document.createElement("div");
    const elemResponse = document.querySelector('#response3');
    const headerLogElement = document.createElement("div");
    headerLogElement.textContent=`Завершение:`
    headerLogElement.classList.add("headers-log");
    logElement.textContent = `СУРР:Нет доступных РСС для однного из абонентов`;
    logElementDate.textContent=`СОВ:Время завершения запроса ${new Date().toLocaleString()}`;
    callElement.append(headerLogElement)
    callElement.append(logElement);
    callElement.append(logElementDate);
    containerElement.append(callElement)
    elemResponse.append(callElement.cloneNode(true));

}
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов') {
        function addSecondsToDate(dateString, seconds) {
            const date = new Date(dateString);
            date.setSeconds(date.getSeconds() + seconds);

            const isoString = date.toISOString();
            return isoString.replace('Z', '+00:00');
        }
        ImitatorUtils.getInformationAboutAllAbonents().then((data)=>{
            console.log(data);
            Utils.createCountAbs(data)
            Utils.viewAllAbonents(data,2)

            // Utils.viewAbonents('abonent-select','.number');
            // Utils.viewAbonents('abonent-select-rec','.number-rec')
        })
        // const imgRe=document.querySelector('.re-date');
        // imgRe.addEventListener('click',()=>{
        //     if (document.querySelector('.coord-rand').checked) {
        //         const randLong=Utils.getRandomNumber(27,169)
        //         const randLat=Utils.getRandomNumber(41,77)
        //         document.getElementById('lat3').value=randLat;
        //         document.getElementById('lon3').value=randLong;
        //     }
        //
        //     // document.getElementById('latitude-res').innerHTML=`Широта, градусы: ${randLat}`;
        //     // document.getElementById('long-res').innerHTML=`Долгота, градусы: ${randLong}`;
        //
        // });
        // document.getElementById('latitude-res').innerHTML+=document.getElementById('lat3').value;
        //   document.getElementById('long-res').innerHTML+=document.getElementById('lon3').value;
        // document.getElementById("task-btn_cansel").disabled = true;
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

        console.log(numberTime);
        console.log(timeVal);
        // timeControl.value=getDateTime().substring(11,19);
        console.log(dateControl.value);
        console.log(timeControl.value);
        let timeSelf=`${dateControl.value}T0${numberTime-3}${timeControl.value.substring(2,10)}.000Z`;
        console.log(timeControl);
        console.log(`${dateControl.value}T${timeControl.value}Z.000`);
        const btnStartSim=document.getElementById('task-btn_sim');
        btnStartSim.addEventListener('click',()=>{
            const latData=[];
            const lonData=[];
            const absData=[];
            const absIds=[]
            document.querySelectorAll('select.abs').forEach(select=>{
                console.log(select[select.selectedIndex].innerHTML)
                absIds.push(select[select.selectedIndex].value)
                absData.push(select[select.selectedIndex].innerHTML);
            });

            document.querySelectorAll('input.input_abs').forEach((select,index)=>{
                if (index%2==0){
                    latData.push(select.value);
                    console.log(select.value)
                }
                else {
                    lonData.push(select.value);
                }

            });
            const callers=[];
            absData.forEach((ab,index)=>{
                const obj={}
                obj.name = '';
                obj.lat=latData[index];
                obj.lon=lonData[index];
                obj.radius=2500;
                callers.push(obj);
            })
            const arrDataKA=[]
            if (document.querySelector('.timer_call-current').checked) {
                callers.forEach((caller,index)=>{
                    const data={}
                    data.point=caller;
                    data["start_datetime_iso"]=new Date().toISOString();
                    data["min_duration_in_sec"]=document.getElementById('min-call-time').value;
                    arrDataKA.push(data)
                })
            }
            else {
                callers.forEach((caller,index)=>{
                    const data={}
                    data.point=caller;
                    timeSelf=Utils.getDateTimes(dateControl,timeControl)
                    data["start_datetime_iso"]=String(timeSelf.toISOString());
                    data["min_duration_in_sec"]=document.getElementById('min-call-time').value;
                    arrDataKA.push(data)
                })
                // timeSelf=Utils.getDateTimes(dateControl,timeControl)
                // // timeSelf=`${dateControl.value}T${timeControl.value}.000Z`;
                // data.start_datetime_iso= String(timeSelf.toISOString());
                // console.log(timeSelf)
            }


        console.log(absIds);
            // const data = {
            //     'point':{
            //         "name":'',
            //         "lat": document.getElementById('lat3').value,
            //         "lon": document.getElementById('lon3').value,
            //         "radius": 2500
            //     },
            //     "start_datetime_iso": new Date().toISOString(),
            //     "min_duration_in_sec":document.getElementById('min-call-time').value
            //
            // }
            // if (document.querySelector('.timer_call-current').checked) {
            //     data.start_datetime_iso= new Date().toISOString();
            // }
            // else{
            //     timeSelf=Utils.getDateTimes(dateControl,timeControl)
            //     // timeSelf=`${dateControl.value}T${timeControl.value}.000Z`;
            //     data.start_datetime_iso= String(timeSelf.toISOString());
            //     console.log(timeSelf)
            //
            // }

            // document.getElementById('response3').innerHTML='';
            if (document.querySelector('.information_request')) {
                // document.querySelector('.information_request').remove();
            }
            const resultArr=[]
            const loader = new Loader('.loader-container');
            loader.show('Загрузка данных с сервера');
            const select=document.querySelector('#abonent-select-count')
            const arrDatAbs=[]
            // Создаем массив промисов для всех вызовов calculateFirstAvailableIntervalOld
            const promises = arrDataKA.map((data, index) =>
                ImitatorUtils.calculateFirstAvailableIntervalOld(data, {})
            );

            const minDurationKas=[]
            let minDurationInSec=0;
            const elemContainer = document.querySelector('#containers_calls');
            const elemResponse = document.querySelector('#response3');
            const elemLogs = document.createElement('div');
            elemLogs.innerHTML = `<div style="font-size: calc(1.2rem);">Запрос:</div><div>СОВ:Инициация создания плана связи </div>
                        <div>СОВ:Время инициирования запроса ${new Date().toLocaleString()}</div>`;
            elemContainer.append(elemLogs);
            elemResponse.append(elemLogs.cloneNode(true));
            Promise.all(promises)
                .then((results) => {
                    console.log('results',results);
                    resultArr.push(...results);
                    loader.close();
                    document.getElementById('response3').style.display = 'block';
                    document.getElementById("task-btn_cansel").disabled = false;
                    if (select[select.selectedIndex].innerHTML == results.length) {
                        console.log(resultArr);
                        const chousenKA = [];
                        resultArr.forEach((data) => {
                            if (data['chosen_satellite']?.['satellite_id']) {
                                chousenKA.push(data['chosen_satellite']['satellite_id']);
                            }
                            if (data['chosen_satellite']?.['datetime_period']?.['duration_in_sec'])
                            {

                                minDurationKas.push(Number(data['chosen_satellite']['datetime_period']['duration_in_sec']));
                            }
                        });
                        const minDur=Math.min(...minDurationKas);

                        console.log('minDurationKas',minDurationKas);
                        console.log('min',minDur);
                        minDurationInSec = minDur;
                        const latData = [];
                        const lonData = [];
                        const absData = [];
                        const absIds = [];

                        document.querySelectorAll('select.abs').forEach(select => {
                            absIds.push(select[select.selectedIndex].value);
                            absData.push(select[select.selectedIndex].innerHTML);
                        });
                        document.querySelectorAll('input.input_abs').forEach((select, index) => {
                            if (index % 2 == 0) {
                                latData.push(select.value);
                            } else {
                                lonData.push(select.value);
                            }
                        });

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

                        const callers = [];
                        absData.forEach((ab, index) => {
                            const obj = {
                                name: ab,
                                lat: latData[index],
                                lon: lonData[index],
                                radius: 2500
                            };
                            callers.push(obj);
                        });

                        console.log(callers);

                        const data = {
                            "params": {
                                "start_datetime_iso": dataBeg,
                                "end_datetime_iso": formattedDate,
                                "dates_delta_in_sec": 15,
                                "min_session_time_in_sec": document.querySelector('#min-time-dur').value,
                                "acceptable_session_time_in_sec": 100
                            },
                            "callers": callers,
                            'ka_id_list': [...chousenKA]
                        }

                        console.log(absIds);

                        // Создаем промисы для SQL запросов
                        const sqlPromises = data['ka_id_list'].map((kaId, index) => {
                            const query = `SELECT * FROM RSS_KA WHERE ID_KA = ${kaId} AND DATA_TIME_IN <= '${dataBeg}' AND DATA_TIME_OUT > '${dataBeg}' AND DEISTV = 0`;
                            return Utils.selectQuery(query).then((res) => {
                                console.log('res',res);
                                if (res.length>0){
                                    const bodyDataAbs = {
                                        abonent: +absIds[index],
                                        KA: kaId,
                                        dateStart: dataBeg,
                                        ant: res[0][8],
                                        rss: res[0][9],
                                        dateEnd: addSecondsToDate(dataBeg,minDur),
                                    };
                                    console.log('bodyDataAbs',bodyDataAbs);
                                    return bodyDataAbs;
                                }


                            });
                        });

                        // Обрабатываем все SQL запросы параллельно
                        return Promise.all(sqlPromises);
                    }
                })
                .then(async (sqlResults) => {
                    if (!sqlResults.includes(undefined)) {
                        arrDatAbs.push(...sqlResults);
                        console.log('Все запросы выполнены успешно');
                        console.log(sqlResults);
                        console.log('minDurationInSec',minDurationInSec);
                        const channels = await ImitatorUtils.addPlanSessionChannels(sqlResults)
                        const timerSeans=setTimeout(()=>{
                            console.log('endInterval')
                            endSvSeans(channels, timerSeans, bindEndSv)
                            removeEventListener('click', bindEndSv)
                        },minDurationInSec*1000);
                        const bindEndSv = () => {
                            endSvSeans(channels, timerSeans, bindEndSv);
                        };
                        document.querySelector('#task-btn_cansel').addEventListener('click', bindEndSv,{once: true});
                        renderLogChannels(channels,sqlResults)
                        console.log('channels',channels)

                    }
                    else {
                        console.log('Нет РСС');
                        renderErrorLogRSS()
                    }
                })
                .catch((error) => {
                    console.error('Произошла ошибка на стороне сервера:', error);
                    renderErrorLog()
                    loader.close();
                    document.getElementById("task-btn_cansel").disabled = false;
                });

        });

    }
    // Utils.viewAbonents('abonent-select','.number');
    // Utils.viewAbonents('abonent-select-rec','.number-rec')
})


