'use strict';
import {Utils} from "./Utils.js";
import {ImitatorUtils} from "./ImitatorUtils.js";
import {Loader} from "./Loader.js";


document.addEventListener('DOMContentLoaded', ()=>{

        const imgRe=document.querySelector('.re-date');
        imgRe.addEventListener('click',()=>{
            if (document.querySelector('.coord-rand').checked) {
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

        let timeSelf=`${dateControl.value}T0${numberTime-3}${timeControl.value.substring(2,10)}.000Z`;
        const btnStartSim=document.getElementById('task-btn_sim');
        btnStartSim.addEventListener('click',()=>{
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
            const data =
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



            // if (document.querySelector('.timer_call-current').checked) {
            //    data.start_datetime_iso= new Date().toISOString();
            // }
            // else{
            //   timeSelf=getDateTimes(dateControl,timeControl)
            //   data.start_datetime_iso= String(timeSelf.toISOString());
            //   console.log(timeSelf)

            // }
            const loader = new Loader('.loader-container');
            loader.show('Загрузка данных с сервера');
            ImitatorUtils.calculateFirstAvailableInterval(data).then(()=>{
                loader.close();
                document.getElementById('response3').style.display='block';
                document.getElementById("task-btn_cansel").disabled = false;
            });
        });
    Utils.viewAbonents('abonent-select','.number');
    Utils.viewAbonents('abonent-select-rec','.number-rec')


})
