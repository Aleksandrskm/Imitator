'use strict'
import {Utils} from "./Utils.js";
import {ImitatorUtils} from "./ImitatorUtils.js";
import {Loader} from "./Loader.js";

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов') {
        const imgRe=document.querySelector('.re-date');
        imgRe.addEventListener('click',()=>{
            if (document.querySelector('.coord-rand').checked) {
                const randLong=Utils.getRandomNumber(27,169)
                const randLat=Utils.getRandomNumber(41,77)
                document.getElementById('lat3').value=randLat;
                document.getElementById('lon3').value=randLong;
            }

            // document.getElementById('latitude-res').innerHTML=`Широта, градусы: ${randLat}`;
            // document.getElementById('long-res').innerHTML=`Долгота, градусы: ${randLong}`;

        });
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
            const data = {
                'point':{
                    "name":'',
                    "lat": document.getElementById('lat3').value,
                    "lon": document.getElementById('lon3').value,
                    "radius": 2500
                },
                "start_datetime_iso": new Date().toISOString(),
                "min_duration_in_sec":document.getElementById('min-call-time').value

            }
            if (document.querySelector('.timer_call-current').checked) {
                data.start_datetime_iso= new Date().toISOString();
            }
            else{
                timeSelf=Utils.getDateTimes(dateControl,timeControl)
                // timeSelf=`${dateControl.value}T${timeControl.value}.000Z`;
                data.start_datetime_iso= String(timeSelf.toISOString());
                console.log(timeSelf)

            }

            // document.getElementById('response3').innerHTML='';
            if (document.querySelector('.information_request')) {
                // document.querySelector('.information_request').remove();
            }
            const loader = new Loader('.loader-container');
            loader.show('Загрузка данных с сервера');

            ImitatorUtils.calculateFirstAvailableIntervalOld(data,{}).then(()=>{
                loader.close();
                document.getElementById('response3').style.display='block';
                document.getElementById("task-btn_cansel").disabled = false;
            });
        });

    }
    Utils.viewAbonents('abonent-select','.number');
    Utils.viewAbonents('abonent-select-rec','.number-rec')
})


