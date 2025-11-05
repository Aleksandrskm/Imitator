'use strict';
import {Utils} from "./Utils.js";
import {ImitatorUtils} from "./ImitatorUtils.js";
import {Loader} from "./Loader.js";


document.addEventListener('DOMContentLoaded', ()=>{
    ImitatorUtils.getInformationAboutAllAbonents().then((data)=>{
        console.log(data);
        Utils.createCountAbs(data)
        Utils.viewAllAbonents(data,2)

        // Utils.viewAbonents('abonent-select','.number');
        // Utils.viewAbonents('abonent-select-rec','.number-rec')
    })
    let countsSession={countSession:0};
    // const imgRe=document.querySelector('.re-date');
    // imgRe.addEventListener('click',()=>{
    //     if (document.querySelector('.coord-rand').checked) {
    //         const randLong=Utils.getRandomNumber(27,169)
    //         const randLat=Utils.getRandomNumber(41,77)
    //         document.getElementById('lat3').value=randLat;
    //         document.getElementById('lon3').value=randLong;
    //         // const latData=[];
    //         // const lonData=[];
    //         // const absData=[];
    //         // document.querySelectorAll('select.abs').forEach(select=>{
    //         //     console.log(select[select.selectedIndex].innerHTML)
    //         //
    //         //     absData.push(select[select.selectedIndex].innerHTML);
    //         // });
    //         //
    //         //     document.querySelectorAll('input.input_abs').forEach((select,index)=>{
    //         //         if (index%2==0){
    //         //             latData.push(select.value);
    //         //             console.log(select.value)
    //         //         }
    //         //         else {
    //         //             lonData.push(select.value);
    //         //         }
    //         //
    //         //     });
    //
    //         // console.log(absData)
    //         // console.log('latData',latData)
    //         // console.log('lonData',lonData)
    //
    //     }
    // });
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
    let arrIdsSvSenas=[]
    let timeSelf=`${dateControl.value}T0${numberTime-3}${timeControl.value.substring(2,10)}.000Z`;
    const btnEnd=document.querySelector('#task-btn_cansel');
    btnEnd.addEventListener('click',()=>{



        arrIdsSvSenas.forEach((id)=>{

            ImitatorUtils.archivatePlanSv(id).then(res=>{
                arrIdsSvSenas=[];
                document.getElementById('containers_calls').innerHTML+=`<div class="header-log">СУРР:Сеанс связи под номером:${id} заархивирован</div><div>СОВ:Время завершения запроса ${new Date().toLocaleString()}</div> <br>`;
                }
            );
        })


    })
    const btnStartSim=document.getElementById('task-btn_sim');
    btnStartSim.addEventListener('click',()=>{
        const latData=[];
        const lonData=[];
        const absData=[];
        document.querySelectorAll('select.abs').forEach(select=>{
            console.log(select[select.selectedIndex].innerHTML)

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
        const callers=[];
        absData.forEach((ab,index)=>{
            const obj={}
            obj.name = ab;
            obj.lat=latData[index];
            obj.lon=lonData[index];
            obj.radius=2500;
            callers.push(obj);
        })
        console.log(callers);
        const data =
            {
                "params": {
                    "start_datetime_iso": dataBeg,
                    "end_datetime_iso": formattedDate,
                    "dates_delta_in_sec": 15,
                    "min_session_time_in_sec": document.querySelector('#min-time-dur').value,
                    "acceptable_session_time_in_sec": 100
                },
                "callers": callers
            }




        // if (document.querySelector('.timer_call-current').checked) {
        //    data.start_datetime_iso= new Date().toISOString();
        // }
        // else{
        //   timeSelf=getDateTimes(dateControl,timeControl)
        //   data.start_datetime_iso= String(timeSelf.toISOString());
        //   console.log(timeSelf)

        // }
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
        const rusKeuAll={
            ID_SV_AB:'Ссылка на абонента сеанса связи',
            DATA_BEG:'Дата и время начала подключения к КА и РСС',
            DATA_END:'Дата и время завершения подключения к КА и РСС',
            DURATION:'Продолжительность, сек'
        }
        const loader = new Loader('.loader-container');
        document.getElementById('containers_calls').innerHTML+=`<div class="header-log">СОВ:Инициация создания плана связи </div><div>СОВ:Время инициирования запроса${new Date().toLocaleString()}</div>`;
        loader.show('Загрузка данных с сервера');
        ImitatorUtils.addPlanSv(data,arrIdsSvSenas,rusKeys,rusKeuAll,true).then((idPlan)=>{
            console.log('idPlan:',idPlan)
            // arrIdsSvSenas.push(idPlan)
            // document.getElementById('containers_calls').innerHTML+=`<div class="header-log">СУРР:План сеанса связи под номером ${idPlan} успешно создан </div>`;
            // document.getElementById('containers_calls').innerHTML+=`<div class="header-log">СОВ:Время ответа от СУРР ${new Date().toLocaleString()}</div><br>`;
            // const elementViewSvPlan=document.createElement('div');
            // const elementViewIntervals=document.createElement('div');
            // const elementViewIntervalsRes=document.createElement('div');
            // ImitatorUtils.getDetailsPlanSv(idPlan).then((data)=>{
            //     data['cutted_rss_intervals'].forEach(planInterval=>{
            //         const elements=document.createElement('div');
            //         const nameInterval=document.createElement('div')
            //         nameInterval.innerText='Данные интервала: ';
            //         nameInterval.classList.add('name-interval');
            //         elements.append(nameInterval)
            //         Object.keys(planInterval).forEach(key=>{
            //             const field=rusKeys[key]
            //             console.log('key: ',field,'value: ',planInterval[key])
            //             const element=document.createElement('div');
            //             element.innerText=`${field}:${planInterval[key]}`
            //             elements.appendChild(element)
            //         })
            //         elements.classList.add('sv-seans-interval')
            //         elementViewIntervals.append(elements)
            //     })
            //     data['cutted_abonent_result_intervals'].forEach(resultInterval=>{
            //         const elements=document.createElement('div');
            //         const nameInterval=document.createElement('div')
            //         nameInterval.innerText='Данные абонента: ';
            //         nameInterval.classList.add('name-interval');
            //         elements.append(nameInterval)
            //         Object.keys(resultInterval).forEach(key=>{
            //             const field=rusKeuAll[key]
            //             console.log('key: ',field,'value: ',resultInterval[key])
            //             const element=document.createElement('div');
            //             element.innerText=`${field}:${resultInterval[key]}`
            //             elements.appendChild(element)
            //
            //         })
            //         elements.classList.add('sv-seans-interval-res')
            //         elementViewIntervalsRes.append(elements)
            //     })
            //     const elementHeaderSv=document.createElement('div');
            //     elementHeaderSv.innerText=`План сеанса связи:${idPlan}`
            //     if (data['cutted_rss_intervals'].length==0 && data['cutted_abonent_result_intervals'].length==0)
            //     {
            //         elementHeaderSv.innerText=`В плане сеанса связи:${idPlan} нет данных`
            //
            //     }
            //     elementViewSvPlan.id=`${idPlan}`
            //     elementViewSvPlan.classList.add('sv-seans')
            //     elementViewIntervals.classList.add('sv-seans-intervals')
            //     elementViewIntervalsRes.classList.add('sv-seans-res-intervals')
            //
            //
            //     elementHeaderSv.classList.add('header-log')
            //     elementViewSvPlan.append(elementHeaderSv)
            //     elementViewSvPlan.append(elementViewIntervals)
            //     elementViewSvPlan.append(elementViewIntervalsRes)
            //     console.log(elementViewIntervals)
            //     console.log(elementViewIntervalsRes)
            //     console.log(elementViewSvPlan)
            //     document.querySelector('#response3').append(elementViewSvPlan)

            // })
            loader.close();
            document.getElementById('response3').style.display='block';
            document.getElementById("task-btn_cansel").disabled = false;


        });
    });



})
