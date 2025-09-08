import {Utils} from './Utils.js'

export  class ImitatorUtils{
    /**
     * Отправка сеанса связи(старая версия).
     * @param  {Object}data - данные сеанса связи.
     */
    static async  postActiveSession(data) {
        try {
            const response = await fetch(`http://${Utils.getTestUrl()}/CommunicationAvailability/AddActiveSession?ist=71`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log("Success:", result);
            return result;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    static async  addArchivalSession(id,dataEnd,timeSeans,timeCall,idSeansRes){
        try {
            const response = await fetch(`http://${Utils.getTestUrl()}/CommunicationAvailability/AddArchivalSession?ID=${id}&ist=71
    &Data_End=${dataEnd}&Time_Seans=${timeSeans}&Time_Razg=${timeCall}&Id_Seans_Rez=${idSeansRes}`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            console.log("Success:", result);
            return result;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Освобождение ОЧР сеанса связи(старая версия).
     * @param  {Object}data - все данные для освобождения сеанса связи.
     * @param{Number} stId - номер КА для освобождения ячеек ОЧР.
     */
    static async  postRelaeseFrRes(data,stId){
        try {
            const response = await fetch(`http://${Utils.getTestUrl()}/CommunicationAvailability/ReleaseFrequencyResource?satellite_id=${stId}&ist=71`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log("Success:", result);
            return result;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Отображает сеанс связи(старая версия).
     * @param  {Object}result -  данные сеанса связи.
     * @param {Date} datesStartTime -дата начала отсчета сеанса связи.
     * @param {Object} data -данные по сеансу связи.
     * @param{Object} countSession -счетчик сеансов для потока вызовов.
     */
    static  createDataSessionCommunicationsOld(result,respons,datesStartTime,data,countSession){
        function clearFrecRes(selectorBtn,responses,respons,result,data,timer,dataVyz,countSession){
            clearTimeout(timer);

            let starTime=data.start_datetime_iso;
            if (document.querySelector('h2').innerHTML=='Имитатор потока вызовов')
                // countSession=document.getElementById('quantity_calls').value;
            {   countSession.countSession=document.getElementById('quantity_calls').value;
                starTime=dataVyz;
                console.log( 'должно быть максимум:',countSession.countSession);
            }
            const data_cell=respons.Nomera_zanyatyih_yacheek.concat(respons.Nomera_zanyatyih_yacheek_pr);
            ImitatorUtils.postRelaeseFrRes(data_cell,result.satellite_id).then((res)=>{
                if (!res) {
                    const dataEndCall=new Date();
                    document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                    document.getElementById('response3').innerHTML+=`<br><div style="
                    font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                    document.querySelector('.information_request').innerHTML+=` <div>СОВ: Запрос на освобождение частотного ресурса </div>`;
                    document.querySelector('.information_request').innerHTML+=` <div>СОВ: Время запроса:${new Date().toLocaleString()} </div>`;
                    document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                    document.querySelector('.information_request').innerHTML+=` <div>СУРР Продолжительность вызова: 
                    ${(dataEndCall-new Date(starTime))/1000} секунд</div>`;
                    document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: 
                    ${dataEndCall.toLocaleString()}</div>`;
                    document.getElementById('response3').innerHTML+=` <div>СОВ: Запрос на освобождение частотного ресурса </div>`;
                    document.getElementById('response3').innerHTML+=` <div>СОВ: Время запроса:${new Date().toLocaleString()} </div>`;
                    document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                    document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                    const timeCall=Math.round(Number((dataEndCall-new Date(starTime))/1000));
                    console.log(timeCall);
                    ImitatorUtils.addArchivalSession(responses.ID,String(dataEndCall.toISOString()),timeCall,timeCall,7);
                    document.getElementById(selectorBtn).disabled = true;
                }
            });
        }
        const randTime=Utils.getRandomNumber(60000,120000);
        function addListenerImitator(selectorBtn,responses,respons,result,data,timer,dataVyz){
            const btnEnd=document.getElementById(selectorBtn);
            btnEnd.addEventListener('click',clearFrecRes.bind(null,selectorBtn,responses,respons,result,data,timer,dataVyz,countSession),{once:true});
        }
        const dateStartTime=new Date();
        function createBeginningLog(dateStartTime,respons,result){
            document.querySelector('.information_request').innerHTML+=`<div>СУРР: Время ответа от СУРР:  ${dateStartTime.toLocaleString()}</div>`;
            document.getElementById('response3').innerHTML+=`<div>СОВ:  Начало сеанса связи: ${dateStartTime.toLocaleString()}</div>`;
            document.getElementById('response3').innerHTML+=`<div>СУРР: Частотный ресурс: ${result.satellite_name} на передачу: канал
             ${respons.Nomera_zanyatyih_yacheek[0][1]} тайм слот  ${respons.Nomera_zanyatyih_yacheek[0][0]}, 
             на прием: канал
             ${respons.Nomera_zanyatyih_yacheek_pr[0][1]} тайм слот ${respons.Nomera_zanyatyih_yacheek_pr[0][0]}</div>`;
            document.querySelector('.information_request').innerHTML+=`<div>СОВ:  Начало сеанса связи: ${dateStartTime.toLocaleString()}</div>`;
            document.querySelector('.information_request').innerHTML+=`<div> 
             СУРР: Частотный ресурс:  ${result.satellite_name} на передачу: канал
             ${respons.Nomera_zanyatyih_yacheek[0][1]} тайм слот  ${respons.Nomera_zanyatyih_yacheek[0][0]}, 
             на прием: канал
             ${respons.Nomera_zanyatyih_yacheek_pr[0][1]} тайм слот ${respons.Nomera_zanyatyih_yacheek_pr[0][0]}
             </div> `;
            console.log(respons.Nomera_zanyatyih_yacheek[0]);
        }
        function createLogImitator(dateStartTime,datesStartTime,respons,result,data){
            console.log(respons.Nomera_zanyatyih_yacheek[0]);
            let time;
            if (document.querySelector('.time_call-max').checked){
                time =result.datetime_period.duration_in_sec;
            }
            else{
                time =Utils.getRandomNumber(60000,120000);
            }
            let numPhone ='';
            if(document.getElementById('abonent-select')){
                console.log(document.getElementById('abonent-select').value);
                document.querySelectorAll('.number').forEach((number)=>{
                    console.log(number.innerHTML);
                    if (number.classList.contains('show') ){
                        numPhone=number.innerHTML;
                    }
                    console.log(numPhone);
                });
            }
            let valueAbonent=0;
            if (document.getElementById('abonent-select')) {
                valueAbonent=Number(document.getElementById('abonent-select').value);
                if (!valueAbonent) {
                    valueAbonent+=1;
                }
            }
            if (document.querySelector('.time_call-max').checked){
                document.getElementById('response3').innerHTML+=`<div>СОВ:  Прогнозируемая продолжительность сеанса ,сек: ${time}</div>`;
            }
            else{
                document.getElementById('response3').innerHTML+=`<div>СОВ:  Прогнозируемая продолжительность сеанса ,сек: ${time/1000}</div>`;
            }
            const dataSession={
                "ID_Zapros_Seans_Tek": 0,
                "Tlf1": String(numPhone),
                "ID_Abonent_T1": valueAbonent,
                "ID_KA1": result.satellite_id,
                "ID_RSS1": 0,
                "Canal1": respons.Nomera_zanyatyih_yacheek[0][1],
                "Time_Slot1": respons.Nomera_zanyatyih_yacheek[0][0],
                "Canal_pr1": respons.Nomera_zanyatyih_yacheek_pr[0][1],
                "Time_Slot_pr1": respons.Nomera_zanyatyih_yacheek_pr[0][0],
                "Tlf2": '',
                "ID_Abonent_T2": ++valueAbonent,
                "ID_KA2": 0,
                "ID_RSS2": 0,
                "Canal2": 0,
                "Time_Slot2": 0,
                "Canal_pr2": 0,
                "Time_Slot_pr2": 0,
                "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
                "Data_Otv": String(datesStartTime.toISOString()),
                "Data_Beg": String(dateStartTime.toISOString()),
                "Data_Beg_Razg": String(dateStartTime.toISOString()),
                "Data_End": '',
                "Time_Seans": '',
                "Time_Razg": '',
                "Id_Seans_Rez": 1
            }
            ImitatorUtils.postActiveSession(dataSession).then((responses)=>{
                let endTimer;
                if (document.querySelector('.time_call-max').checked)
                {
                    endTimer=time*1000;
                }
                else{
                    endTimer=time;
                }

                const timer=setTimeout(function(){

                    // if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов'){
                    //   // document.getElementById("task-btn_cansel").disabled=true;
                    //   document.getElementById("task-btn_cansel").removeEventListener('click',clearFrecRes);
                    // }
                    // else{
                    //   // document.getElementById("task-btn_cansel_flow").disabled=true;
                    //   document.getElementById("task-btn_cansel_flow").removeEventListener('click',clearFrecRes)

                    // }
                    const data_cell=respons.Nomera_zanyatyih_yacheek.concat(respons.Nomera_zanyatyih_yacheek_pr);
                    ImitatorUtils.postRelaeseFrRes(data_cell,result.satellite_id).then(()=>{
                        document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                        document.querySelector('.information_request').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса</div>`;
                        document.querySelector('.information_request').innerHTML+=`<div>СОВ: Время запроса:${new Date().toLocaleString()}</div>`;
                        document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                        if (document.querySelector('.time_call-max').checked){
                            document.querySelector('.information_request').innerHTML+=`<div>CУРР: Продолжительность вызова ${time} секунд</div>`;
                        }
                        else{
                            document.querySelector('.information_request').innerHTML+=`<div>CУРР: Продолжительность вызова ${time/1000} секунд</div>`;
                        }

                        const dataEndCall=new Date();
                        document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}:</div>`;
                        document.getElementById('response3').innerHTML+=`<br><div style="
                        font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                        document.getElementById('response3').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса</div>`;
                        document.getElementById('response3').innerHTML+=`<div>СОВ: Время запроса:${new Date().toLocaleString()}</div>`;
                        document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                        document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                        ImitatorUtils.addArchivalSession(responses.ID,String(dataEndCall.toISOString()),time,time,1);
                        if (document.querySelector('h2').innerHTML==='Имитатор одиночных вызовов'){
                            // document.getElementById("task-btn_cansel").disabled=true;
                            document.getElementById("task-btn_cansel").removeEventListener('click',clearFrecRes);
                        }
                        else{
                            // document.getElementById("task-btn_cansel_flow").disabled=true;
                            document.getElementById("task-btn_cansel_flow").removeEventListener('click',clearFrecRes)

                        }
                    });
                },Number(endTimer));
                if (document.querySelector('h2').innerHTML==='Имитатор одиночных вызовов'){
                    addListenerImitator("task-btn_cansel",responses,respons,result,data,timer);
                }
                else{
                    addListenerImitator("task-btn_cansel_flow",responses,respons,result,data,timer,dataSession.Data_Vyz);
                }
            });
        }
        createBeginningLog(dateStartTime,respons,result);
        createLogImitator(dateStartTime,datesStartTime,respons,result,data);
        }


    /**
     * Отображает сеанс связи.
     * @param  {Object}result - все данные сеанса связи.
     */
    static createDataSessionCommunications(result,respons,datesStartTime,data,countsSession){
        function  createBeginningLog(dateStartTime,{abonents:[{intervals}]},idInterval){
            document.querySelector('.information_request').innerHTML+=`<div>СУРР: Время ответа от СУРР:  ${dateStartTime.toLocaleString()}</div>`;
            if (idInterval===0) {
                document.getElementById('response3').innerHTML+=`<div>СОВ:  Начало сеанса связи: ${dateStartTime.toLocaleString()}</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>СОВ:  Начало сеанса связи: ${dateStartTime.toLocaleString()}</div>`;
            }
            else{
                document.getElementById('response3').innerHTML+=`<div>СОВ:  Продолжение сеанса связи: ${dateStartTime.toLocaleString()}</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>СОВ:  Продолжение сеанса связи: ${dateStartTime.toLocaleString()}</div>`;
            }
            // document.getElementById('response3').innerHTML+=`<div>СОВ:  Начало сеанса связи: ${dateStartTime.toLocaleString()}</div>`;
            document.getElementById('response3').innerHTML+=`<div>СУРР: Частотный ресурс: ${intervals[idInterval]['ka-naim']} на передачу: канал
              ${intervals[0]['canal-transm']} тайм слот  ${intervals[idInterval]['time-transm-no']}, 
              на прием: канал
              ${intervals[idInterval]['canal-receive']} тайм слот ${intervals[idInterval]['time-receive-no']}</div>`;
            // document.querySelector('.information_request').innerHTML+=`<div>СОВ:  Начало сеанса связи: ${dateStartTime.toLocaleString()}</div>`;
            document.querySelector('.information_request').innerHTML+=`<div> 
              СУРР: Частотный ресурс:  ${intervals[idInterval]['ka-naim']} на передачу: канал
              ${intervals[idInterval]['canal-transm']} тайм слот  ${intervals[idInterval]['time-transm-no']}, 
              на прием: канал
              ${intervals[idInterval]['canal-receive']} тайм слот ${intervals[idInterval]['time-receive-no']}
             </div> `;
            document.querySelector('.information_request').innerHTML+=`<div>СУРР: ID подключенной РСС: ${intervals[idInterval]["rss-id"]}</div>`;
            document.getElementById('response3').innerHTML+=`<div>СУРР: ID подключенной РСС: ${intervals[idInterval]["rss-id"]}</div>`;
            document.querySelector('.information_request').innerHTML+=`<div>СУРР: Наименование подключенной РСС: ${intervals[idInterval]["rss-name"]}</div>`;
            document.getElementById('response3').innerHTML+=`<div>СУРР: Наименование  подключенной РСС: ${intervals[idInterval]["rss-name"]}</div>`;
            document.querySelector('.information_request').innerHTML+=`<br>`;
            document.getElementById('response3').innerHTML+=`<br>`;
            console.log('durations: ',intervals[idInterval]['duration']);
        }
        const randTime=Utils.getRandomNumber(60000,120000);
        let idInterval=0;
        let  duration=0;
        let dateStartTime=new Date();
        console.log('result:',result);
        let timerLogs=setTimeout(createLogs,duration,dateStartTime,result,idInterval);
        const btnEnd=document.getElementById("task-btn_cansel");
        function endSeans( timer,dateStartTime) {
            countsSession.countSession=document.getElementById('quantity_calls').value;
            ImitatorUtils.logEndSeans(timer,dateStartTime);
            const data={
                id_sov: result['sessions-id'],
                data_end: new Date().toISOString().replace('Z','+00:00'),
                ist: 2
            }
            console.log('data:',data);
            ImitatorUtils.endSovSeans(data).then(res=>{
                console.log(res);
            });
        }

        let boundHandler =endSeans.bind(null,timerLogs,dateStartTime);
        // const boundHandler =endSeans.bind(null,timerLogs,dateStartTime,{once:true});
        // btnEnd.addEventListener('click',boundHandler)
        // createBeginningLog(dateStartTime,result,idInterval);
        const createLog=function (intervals,dateStartTime,idInterval){

            if (idInterval!==intervals.length){
                if((intervals[idInterval-1]['data-end']==intervals[idInterval]['data-beg'] || new Date(intervals[idInterval]['data-beg']) <= new Date())&& intervals.length>1)
                {
                    duration=intervals[idInterval]['duration']*1000;
                    console.log(`Длительность :${duration/1000} секунд`)
                    createBeginningLog(dateStartTime,result,idInterval);
                    timerLogs=setTimeout(createLogs,duration,dateStartTime,result,idInterval+1);
                    idInterval++;
                }
                else if(intervals[idInterval-1]['data-end']!=intervals[idInterval]['data-beg'] && intervals.length>1){
                    duration = (new Date(intervals[idInterval]['data-beg']) - new Date(intervals[idInterval-1]['data-end']))/1000
                    // btnEnd.removeEventListener("click", boundHandler);
                    // ImitatorUtils.logEndSeans(timerLogs,dateStartTime);
                    // clearTimeout(timerLogs);
                    // const data={
                    //     id_sov: result['sessions-id'],
                    //     data_end: new Date().toISOString().replace('Z','+00:00'),
                    //     ist: 2
                    // }
                    // console.log('data:',data);
                    // ImitatorUtils.endSovSeans(data).then(res=>{
                    //     console.log(res);
                    // });

                    console.log(`Следующий сеанс начнется через: ${duration} секунд`)
                    console.log('нет сеанса связи')
                    // duration+=intervals[idInterval-1]['duration']*100;
                    // createBeginningLog(dateStartTime,result,idInterval);
                    // idInterval++;
                    //dateStartTime=new Date();
                     timerLogs=setTimeout(createLogs,100,dateStartTime,result,intervals.length);
                }
                else{
                    duration=intervals[idInterval]['duration']*1000;
                    createBeginningLog(dateStartTime,result,idInterval);
                    timerLogs=setTimeout(createLogs,duration,dateStartTime,result,idInterval+1);
                    idInterval++;
                }
            }
        }
        let flag=true;
        function createLogs(dateStartTime,{abonents:[{intervals}]},idInterval){

            // console.log(intervals[idInterval]['duration'])
            btnEnd.addEventListener('click',boundHandler,{once:true})
            if (idInterval!==intervals.length) {
                dateStartTime=new Date();
                if (idInterval===0 &&  new Date(intervals[idInterval]['data-beg']) <= dateStartTime) {
                    createBeginningLog(dateStartTime,result,idInterval);
                    clearTimeout(timerLogs);
                    idInterval++;
                    duration=intervals[idInterval-1]['duration']*1000;
                    btnEnd.removeEventListener("click", boundHandler);
                    timerLogs=setTimeout(createLogs,duration,dateStartTime,result,idInterval);
                    boundHandler =endSeans.bind(null,timerLogs,dateStartTime,{once:true});
                    btnEnd.addEventListener('click',boundHandler,{once:true})


                }
                else if(idInterval===0){
                    // duration = (new Date(intervals[idInterval+1]['data-beg']) - new Date(intervals[idInterval]['data-end']))/1000;
                    duration=(new Date()-new Date(intervals[idInterval]['data-beg']))/1000
                    clearTimeout(timerLogs);
                    btnEnd.removeEventListener("click", boundHandler);
                    if ((duration*-1)>5 && flag){
                        document.querySelector('.information_request').innerHTML+=`<div>Сеанс начнется через ${duration*-1} секунд</div>`
                        document.querySelector('#response3').innerHTML+=`<div>Сеанс начнется через ${duration*-1} секунд</div>`
                        flag=false;

                    }



                    timerLogs=setTimeout(createLogs,duration,dateStartTime,result,idInterval);
                }
                else{
                    clearTimeout(timerLogs);
                    btnEnd.removeEventListener("click", boundHandler);
                    createLog(intervals,dateStartTime,idInterval)
                    boundHandler =endSeans.bind(null,timerLogs,dateStartTime,{once:true});
                    btnEnd.addEventListener('click',boundHandler,{once:true})
                    idInterval++;

                }
            }
            else{
                // clearTimeout(timerLogs);
                btnEnd.removeEventListener("click", boundHandler);
                ImitatorUtils.logEndSeans(timerLogs,dateStartTime);
                const data={
                    id_sov: result['sessions-id'],
                    data_end: new Date().toISOString().replace('Z','+00:00'),
                    ist: 2
                }
                console.log('data:',data);
                ImitatorUtils.endSovSeans(data).then(res=>{
                    console.log(res);
                });
            }
        }

        //  if (idInterval0) {
        //   duration=result['abonents'][0]['intervals'][idInterval-1]['duration']*1000;
        // }

        // if (idInterval!=1) {
        //   duration=result['abonents'][0]['intervals'][idInterval-1][duration]*1000
        // }

        // let timeLogs=setTimeout(createBeginningLog,0,dateStartTime,result,idInterval);
        // createLogImitator(dateStartTime,datesStartTime,respons,result,data);
    }

    /**
     * Отображает логи ошибок сеанса связи сеанс связи.
     * @param  {HTMLElement }elemResponse - HTML элемент для записи логов.
     * @param  {HTMLElement }elemRequest - HTML элемент для записи логов.
     * @param {Object} data -данные для создания сеанса связи.
     */
    static logErrorSvSeans(elemResponse,elemRequest,data) {
        console.log(data);
        elemResponse.innerHTML+=`<br><div  class="header-log">Вызов:</div>`;
        elemRequest.innerHTML+=`<br><div  class="header-log">Вызов:</div>`;
        elemResponse.innerHTML+=`<div>ID запроса на инициирование сеанса связи:${data['sessions-id']}
        ID Вызывающего Абонента: ${data['abonents'][0]['terminal-id']}  ID Вызываемого Абонента: ${data['abonents'][1]['terminal-id']}</div>` ;
        elemRequest.innerHTML+=`<br><div>ID запроса на инициирование сеанса связи:${data['sessions-id']} 
        ID Вызывающего Абонента: ${data['abonents'][0]['terminal-id']}
        ID Вызываемого Абонента: ${data['abonents'][1]['terminal-id']}</div>`;
        elemRequest.innerHTML+='<div>Отказано в сеансе связи</div><br> ';
        elemRequest.innerHTML+=`<br><div class="header-log" style="display: block;">Характеристики  Вызывающего Абонента:</div>`;
        elemResponse.innerHTML+='<br><div>Отказано в сеансе связи</div> ';
        elemResponse.innerHTML+=`<br><div>Характеристики Вызывающего Абонента :</div>`;

        const latRes=document.createElement('div');
        latRes.classList.add('latitude-res');
        const lonRes=document.createElement('div')
        lonRes.classList.add('long-res');
        const latResInf=document.createElement('div');
        latResInf.classList.add('latitude-res');
        latResInf.innerHTML=`Широта, градусы: ${document.getElementById('lat3').value}`;
        const lonResInf=document.createElement('div')
        lonResInf.innerHTML=`Долгота, градусы: ${document.getElementById('lon3').value}`;
        lonResInf.classList.add('long-res');

        elemResponse.appendChild(latResInf.cloneNode(true));
        elemResponse.appendChild(lonResInf.cloneNode(true));
        elemRequest.appendChild(latResInf.cloneNode(true));
        elemRequest.appendChild(lonResInf.cloneNode(true));
        elemResponse.innerHTML+=`<br><div>Характеристики Вызываемого Абонента :</div>`;
        elemRequest.innerHTML+=`<br><div>Характеристики Вызываемого Абонента :</div>`;

        const latResRec=document.createElement('div');
        latResRec.classList.add('latitude-res');
        const lonResRec=document.createElement('div')
        lonResRec.classList.add('long-res');
        const latResInfRec=document.createElement('div');
        latResInfRec.classList.add('latitude-res');
        latResInfRec.innerHTML=`Широта, градусы: ${document.getElementById('lat6').value}`;
        const lonResInfRec=document.createElement('div')
        lonResInfRec.innerHTML=`Долгота, градусы: ${document.getElementById('lon6').value}`;
        lonResInfRec.classList.add('long-res');
        elemResponse.appendChild(latResInfRec.cloneNode(true));
        elemResponse.appendChild(lonResInfRec.cloneNode(true));
        elemRequest.appendChild(latResInfRec.cloneNode(true));
        elemRequest.appendChild(lonResInfRec.cloneNode(true));
        if (document.querySelector('h2').innerHTML==='Имитатор потока вызовов') {
            latRes.innerHTML=`Широта, градусы: ${document.getElementById('lat4').value}`;
            lonRes.innerHTML=`Долгота, градусы: ${document.getElementById('lon4').value}`;
        }
        else{
            latRes.innerHTML=`Широта, градусы: ${document.getElementById('lat3').value}`;
            lonRes.innerHTML=`Долгота, градусы: ${document.getElementById('lon3').value}`;
        }

    }

    /**
     * Отображает часть данных сеанса связи(старая версия).
     * @param {Object} result результат полученный от сервера
     * @param {Object} data -данные для создания сеанса связи.
     */
    static   createResponseOld(result,data){
        if (document.querySelector('.information_request')) {
            if (false) {
                document.getElementById('response3').innerHTML+=`<br><div> Нет подходящего КА</div>`;
            }
            else{
                const select = document.getElementById('abonent-select');
                let selIndex=select.selectedIndex;
                if (!selIndex) {
                    selIndex+=1;
                }
                console.log(select.options[select.selectedIndex].text);
                document.getElementById('response3').innerHTML+=`<br><div class="header-log">Вызов: </div>`;
                document.getElementById('response3').innerHTML+=`
                <div>ID запроса на инициирование сеанса связи:
                ${new Date(result.datetime_period.start_datetime_iso).toLocaleString()} ID Абонента: ${selIndex} </div>`;
                if (select.options[select.selectedIndex].text==='Выберите Абонента') {
                    document.getElementById('response3').innerHTML+=`<div">Абонент:Абонент 1</div>`;
                }
                else{
                    document.getElementById('response3').innerHTML+=`<div">Абонент:${select.options[select.selectedIndex].text}</div>`;
                }
                if (document.querySelector('h2').innerHTML==='Имитатор потока вызовов') {
                    const latRes=document.createElement('div');
                    latRes.classList.add('latitude-res');
                    latRes.innerHTML=`Широта, градусы: ${document.getElementById('lat4').value}`;
                    const lonRes=document.createElement('div')
                    lonRes.innerHTML=`Долгота, градусы: ${document.getElementById('lon4').value}`;
                    lonRes.classList.add('long-res');
                    document.getElementById('response3').append(latRes);
                    document.getElementById('response3').append(lonRes);

                }
                else
                {
                    const latRes=document.createElement('div');
                    latRes.classList.add('latitude-res');
                    latRes.innerHTML=`Широта, градусы: ${document.getElementById('lat3').value}`;
                    const lonRes=document.createElement('div')
                    lonRes.innerHTML=`Долгота, градусы: ${document.getElementById('lon3').value}`;
                    lonRes.classList.add('long-res');
                    document.getElementById('response3').append(latRes);
                    document.getElementById('response3').append(lonRes);
                }


                if (document.querySelector('.duplex-checkbox').checked) {
                    document.getElementById('response3').innerHTML+=`Вид связи: Дуплекс <br>`;
                }
                else{
                    document.getElementById('response3').innerHTML+=`Вид связи: Симплекс <br>`;
                }

                // document.getElementById('response3').innerHTML+=`<br><div class="header-log" style="display: block;">Доступный КА:</div>`;
                for (const [key, value] of Object.entries(result)) {
                    if (typeof(value)!='object') {
                        // if (key=='duration_in_sec') {
                        //   document.getElementById('response3').innerHTML+=`<div class="total-time"> total_duration_in_sec: ${value}</div>`;
                        // }
                        // else {

                        //   document.getElementById('response3').innerHTML+=`<div>${key}: ${value}</div>`;
                        // }
                    }
                    else{
                        for (const [key, values] of Object.entries(value)){
                            if (key==='duration_in_sec') {
                                document.getElementById('response3').innerHTML+=`<br><span style="
            font-size: calc(1.2rem);">Запрос: </span>`;
                            }
                        }
                    }
                    console.log();
                }
                // document.querySelector('.information_request').remove();
                const createInformationRequest=document.querySelector('.information_request');
                const parent=document.querySelector('.content');
                // createInformationRequest.classList.add('information_request');
                for (const [key, value] of Object.entries(data)) {
                    if (typeof(value)!='object') {
                        if (key==='start_datetime_iso') {
                            createInformationRequest.innerHTML+=`<br><div style="
                            font-size: calc(1.2rem);">Начало сеанса связи:</div>`;
                            document.getElementById('response3').innerHTML+=`<div>СОВ: Инициирование сеанса связи</div>`;
                            createInformationRequest.innerHTML+=`<div>СОВ: Инициирование сеанса связи</div>`;
                            createInformationRequest.innerHTML+=`<div>СОВ:Время инициирования сеанса связи: ${new Date(value).toLocaleString()}</div>`;
                            document.getElementById('response3').innerHTML+=`<div>СОВ:Время инициирования сеанса связи: ${new Date(value).toLocaleString()}`;
                            // const div=document.createElement('div');
                            // div.textContent=`Время инициирования сеанса связи: ${value}`;
                            // document.getElementById('long-res').after(div);
                        }
                        else if (key==='min_duration_in_sec') {
                            createInformationRequest.innerHTML+=`<div>CОВ: Минимальная продолжительность вызова, сек: ${value}</div>`;
                            console.log(value);
                        }
                        else{
                            createInformationRequest.innerHTML+=`<div>${key}: ${value}</div>`;
                        }
                    }
                    else{
                        const charKA=document.createElement('div');
                        for (const [key, values] of Object.entries(value)){

                            if (key==='name') {

                                charKA.style=` font-size: calc(1.2rem);`;
                                charKA.textContent="Характеристики КА:";
                                // createInformationRequest.innerHTML+=`<div style="
                                // font-size: calc(1.2rem);">Характеристики КА:</div>`;

                                charKA.innerHTML+=`<div>Наименование КА: ${result.satellite_name} ${values}</div>`;

                            }
                            else if (key==='lat') {
                                // createInformationRequest.innerHTML+=`<br><div>Вызов:</div>`;
                                createInformationRequest.innerHTML+=`<br><div style="
                                font-size: calc(1.2rem);">Характеристики Абонента:</div>`;
                                createInformationRequest.innerHTML+=`<div>Широта, градусы: ${values}</div>`;
                            }
                            else if (key==='lon') {
                                createInformationRequest.innerHTML+=`<div>Долгота, градусы: ${values}</div><br>`;
                            }
                            else if (key==='radius') {
                                charKA.innerHTML+=`<div>Радиус зоны действия КА, км: ${values}</div>`;
                                // createInformationRequest.append(charKA);
                            }
                            else{
                                createInformationRequest.innerHTML+=`<div>${key}: ${values}</div>`;
                            }

                        }

                    }
                    console.log();
                }
                parent.append(createInformationRequest);
            }

        }
        else{
            for (const [key, value] of Object.entries(result)) {
                if (typeof(value)!='object') {
                    if (key==='duration_in_sec') {
                        document.getElementById('response3').innerHTML+=`<div class="total-time"> total_duration_in_sec: ${value}</div>`;
                    }
                    else {
                        document.getElementById('response3').innerHTML+=`<div>${key}: ${value}</div>`;
                    }
                }
                else{
                    for (const [key, values] of Object.entries(value)){
                        if (key==='duration_in_sec') {
                            document.getElementById('response3').innerHTML+=`<div class="total-time"> total_duration_in_sec: ${values}</div> <br><span style="
                            font-size: calc(1.2rem);">Запрос: </span>`;
                        }
                        else  if (key==='end_datetime_iso') {
                            document.getElementById('response3').innerHTML+=`<div>${key}: ${values}</div>`;
                            document.getElementById('response3').innerHTML+=`<div>Максимальная продолжительность вызова : ${(new Date(values)-new Date(data.start_datetime_iso))/1000}</div>`;
                            console.log(new Date(values));
                            console.log(new Date(data.start_datetime_iso));
                        }
                        else{
                            document.getElementById('response3').innerHTML+=`<div>${key}: ${values}</div>`;
                        }


                    }
                }
                console.log();
            }
            const createInformationRequest=document.createElement('div');
            const parent=document.querySelector('.content');
            createInformationRequest.classList.add('information_request');
            for (const [key, value] of Object.entries(data)) {
                if (typeof(value)!='object') {
                    if (key==='start_datetime_iso') {
                        createInformationRequest.innerHTML+=`<br><div style="
                        font-size: calc(1.2rem);">Начало сеанса связи:</div>`;
                        createInformationRequest.innerHTML+=`<div>СОВ:Время инициирования сеанса связи: ${new Date(value.toLocaleString())}</div>`;
                        document.getElementById('response3').innerHTML+=`<div>СОВ: Инициирование сеанса связи</div>`;
                        document.getElementById('response3').innerHTML+=`<br><div>СОВ:Время инициирования сеанса связи: ${new Date(value).toLocaleString()}` ;
                    }
                    else if (key==='min_duration_in_sec') {
                        createInformationRequest.innerHTML+=`<div>CОВ: Минимальная продолжительность вызова, сек: ${value}</div>`;
                        console.log(value);
                    }
                    else{
                        createInformationRequest.innerHTML+=`<div>${key}: ${value}</div>`;
                    }
                }
                else{
                    const charKA=document.createElement('div');
                    for (const [key, values] of Object.entries(value)){
                        if (key==='name') {
                            charKA.style=` font-size: calc(1.2rem);`;
                            charKA.textContent="Характеристики КА:";
                            charKA.innerHTML+=`<div>Наименование КА: ${result.satellite_name} ${values}</div>`;
                        }
                        else if (key==='lat') {
                            createInformationRequest.innerHTML+=`<br><div style="
                            font-size: calc(1.2rem);">Характеристики Абонента:</div>`;
                            createInformationRequest.innerHTML+=`<div>Широта, градусы: ${values}</div>`;
                        }
                        else if (key==='lon') {
                            createInformationRequest.innerHTML+=`<div>Долгота, градусы: ${values}</div><br>`;
                        }
                        else if (key==='radius') {
                            charKA.innerHTML+=`<div>Радиус зоны действия КА, км: ${values}</div>`;
                        }
                        else{
                            createInformationRequest.innerHTML+=`<div>${key}: ${values}</div>`;
                        }
                    }
                }
            }
            parent.append(createInformationRequest);
        }
    }

    /**
     * Получает интервалы и создает сеанс связи.
     * @param {Object} data -данные для создания сеанса связи.
     */
    static async  calculateFirstAvailableInterval(data,countsSession){
        try {
            const response = await fetch(`http://${Utils.getTestUrl()}/sov_surr/calc_plan_svyazi_sov?ist=71`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log("Success:", response.status);
            if (response.status!==200 )  {
                this.logErrorSvSeans( document.getElementById('response3'),document.querySelector('.information_request'),data)
            }
            else
            {
                const elemResponse=document.getElementById('response3'),elemRequest=document.querySelector('.information_request');
                elemResponse.innerHTML+=`<br><div  class="header-log">Вызов:</div>`;
                elemRequest.innerHTML+=`<br><div  style="
                font-size: calc(1.2rem);">Вызов:</div>`;
                elemResponse.innerHTML+=`<div>ID запроса на инициирование сеанса связи:${data['sessions-id']}
                ID Вызывающего Абонента: ${data['abonents'][0]['terminal-id']}  ID Вызываемого Абонента: ${data['abonents'][1]['terminal-id']}</div>` ;
                elemRequest.innerHTML+=`<br><div>ID запроса на инициирование сеанса связи:${data['sessions-id']} ID Вызывающего Абонента: ${data['abonents'][0]['terminal-id']}
                ID Вызываемого Абонента: ${data['abonents'][1]['terminal-id']}</div>`;
                elemRequest.innerHTML+=`<br><div class="header-log" style="display: block;">Характеристики  Вызывающего Абонента:</div>`;
                elemResponse.innerHTML+=`<br><div>Характеристики Вызывающего Абонента :</div>`;
                const latRes=document.createElement('div');
                latRes.classList.add('latitude-res');
                const lonRes=document.createElement('div')
                lonRes.classList.add('long-res');
                const latResInf=document.createElement('div');
                latResInf.classList.add('latitude-res');
                latResInf.innerHTML=`Широта, градусы: ${document.getElementById('lat3').value}`;
                const lonResInf=document.createElement('div')
                lonResInf.innerHTML=`Долгота, градусы: ${document.getElementById('lon3').value}`;
                lonResInf.classList.add('long-res');

                elemResponse.appendChild(latResInf.cloneNode(true));
                elemResponse.appendChild(lonResInf.cloneNode(true));
                elemRequest.appendChild(latResInf.cloneNode(true));
                elemRequest.appendChild(lonResInf.cloneNode(true));
                elemResponse.innerHTML+=`<br><div>Характеристики Вызываемого Абонента :</div>`;
                elemRequest.innerHTML+=`<br><div>Характеристики Вызываемого Абонента :</div>`;
                const latResRec=document.createElement('div');
                latResRec.classList.add('latitude-res');
                const lonResRec=document.createElement('div')
                lonResRec.classList.add('long-res');
                const latResInfRec=document.createElement('div');
                latResInfRec.classList.add('latitude-res');
                latResInfRec.innerHTML=`Широта, градусы: ${document.getElementById('lat6').value}`;
                const lonResInfRec=document.createElement('div')
                lonResInfRec.innerHTML=`Долгота, градусы: ${document.getElementById('lon6').value}`;
                lonResInfRec.classList.add('long-res');
                elemResponse.appendChild(latResInfRec.cloneNode(true));
                elemResponse.appendChild(lonResInfRec.cloneNode(true));
                elemRequest.appendChild(latResInfRec.cloneNode(true));
                elemRequest.appendChild(lonResInfRec.cloneNode(true));
                let keys= Object.keys(data.abonents[0])
                console.log(keys[0])
                console.log(data.abonents[0][keys[0]])
                const svSeanAllowed=this.createResponse(result,data);
                const datesStartTime=new Date();
                if (svSeanAllowed) {
                    document.getElementById('response3').innerHTML+=`<br><div class="header-log">Сеанс связи:</div>`;
                    document.getElementById('response3').innerHTML+=`<div>СУРР: Сеанс разрешен</div>`;
                    document.getElementById('response3').innerHTML+=`<div>СУРР: Время ответа от СУРР: ${datesStartTime.toLocaleString()}</div>`;
                }
                else  {
                    document.getElementById('response3').innerHTML+=`<br><div class="header-log">Сеанс связи:</div>`;
                    document.getElementById('response3').innerHTML+=`<div>СУРР: Сеанс  не разрешен</div>`;
                    document.getElementById('response3').innerHTML+=`<div>СУРР: Время ответа от СУРР: ${datesStartTime.toLocaleString()}</div>`;
                }


                if (document.querySelector('.duplex-checkbox').checked) {
                    let valDuplex=document.querySelector('.duplex-checkbox').value;

                    this.createDataSessionCommunications(result,response,datesStartTime,data,countsSession);

                }
                else if(document.querySelector('.simplex-checkbox').checked){

                    this.createDataSessionCommunications(result,response,datesStartTime,data,countsSession);

                }
                return result;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Отображает часть данных сеанса связи.
     * @param {Object} result результат полученный от сервера
     * @param {Object} data -данные для создания сеанса связи.
     */
    static createResponse(result,data){
        console.log(result)
        if (result==={}) {
            return false;
        }
        else{
            if (document.querySelector('.information_request')) {
                const select = document.getElementById('abonent-select');
                let selIndex=select.selectedIndex;
                if (!selIndex) {
                    selIndex+=1;
                }
                // let keysAb= Object.keys(data.abonents[0]);
                // let keys= Object.keys(data)
                // console.log(data)
                // document.getElementById('response3').innerHTML+=`<br><div class="header-log">Вызов: </div>`;
                // document.getElementById('response3').innerHTML+=`
                //   <div>ID запроса на инициирование сеанса связи:
                //   ID Абонента: ${data.abonents[0][keysAb[0]]} </div>`;
                // if (select.options[select.selectedIndex].text=='Выберите Абонента') {
                //   document.getElementById('response3').innerHTML+=`<div">Абонент:Абонент 1</div>`;
                // }
                // else{
                //   document.getElementById('response3').innerHTML+=`<div">Абонент:${select.options[select.selectedIndex].text}</div>`;
                // }
                // if (document.querySelector('h2').innerHTML=='Имитатор потока вызовов') {
                //   const latRes=document.createElement('div');
                //   latRes.classList.add('latitude-res');
                //   latRes.innerHTML=`Широта, градусы: ${document.getElementById('lat4').value}`;
                //   const lonRes=document.createElement('div')
                //   lonRes.innerHTML=`Долгота, градусы: ${document.getElementById('lon4').value}`;
                //   lonRes.classList.add('long-res');
                //   document.getElementById('response3').append(latRes);
                //   document.getElementById('response3').append(lonRes);
                // }
                // else
                // {
                //   const latRes=document.createElement('div');
                //   latRes.classList.add('latitude-res');
                //   latRes.innerHTML=`Широта, градусы: ${document.getElementById('lat3').value}`;
                //   const lonRes=document.createElement('div')
                //   lonRes.innerHTML=`Долгота, градусы: ${document.getElementById('lon3').value}`;
                //   lonRes.classList.add('long-res');
                //   document.getElementById('response3').append(latRes);
                //   document.getElementById('response3').append(lonRes);
                // }
                let typeConnection=0;
                if (document.querySelector('.duplex-checkbox').checked) {
                    document.getElementById('response3').innerHTML+=`<div><br>Вид связи: Дуплекс <br></div>`;
                    typeConnection=2;
                }
                else{
                    document.getElementById('response3').innerHTML+=`Вид связи: Симплекс <br>`;
                    typeConnection=3;
                }
                document.getElementById('response3').innerHTML+=`<br><span style="
                font-size: calc(1.2rem);">Запрос: </span>`;
                const createInformationRequest=document.querySelector('.information_request');
                const parent=document.querySelector('.content');
                for (const [key, value] of Object.entries(data)) {
                    console.log(result)
                    if (typeof(value)!='object') {
                        if (key==='date-time-call') {
                            createInformationRequest.innerHTML+=`<br><div style="
                            font-size: calc(1.2rem);">Начало сеанса связи:</div>`;
                            document.getElementById('response3').innerHTML+=`<div>СОВ: Инициирование сеанса связи</div>`;
                            createInformationRequest.innerHTML+=`<div>СОВ: Инициирование сеанса связи</div>`;
                            createInformationRequest.innerHTML+=`<div>СОВ:Время инициирования сеанса связи: ${new Date(value).toLocaleString()}</div>`;
                            document.getElementById('response3').innerHTML+=`<div>СОВ:Время инициирования сеанса связи: ${new Date(value).toLocaleString()}`;

                            console.log(result)
                        }
                        else if (key==='min_duration_in_sec') {
                            createInformationRequest.innerHTML+=`<div>CОВ: Минимальная продолжительность вызова, сек: ${value}</div>`;
                            console.log(value);
                        }
                        // else{
                        //   createInformationRequest.innerHTML+=`<div>${key}: ${value}</div>`;
                        // }
                    }
                    // else{
                    //   const charKA=document.createElement('div');
                    //   for (const [key, values] of Object.entries(value)){

                    //    console.log(value,values)

                    //       createInformationRequest.innerHTML+=`<br><div>terminal-id: ${values['terminal-id']}</div>`;

                    //   }
                    // }
                    console.log();
                }
                parent.append(createInformationRequest);


                return true;
            }

        }
    }

    /**
     * Отображение завершения сеанса связи.
     * @param {number} timer -интервал для переходов между данными сеанса связи.
     * @param {Date} dataStart -время начала сеанса связи.
     */
     static logEndSeans(timer,dataStart){
        clearTimeout(timer);
        console.log('end seans:')
        const elemResponse=document.getElementById('response3'),elemRequest=document.querySelector('.information_request');
        elemResponse.innerHTML+=`<br><div  style="
                            font-size: calc(1.2rem);" class="header-log">Завершение сеанса связи:</div>`;
        elemResponse.innerHTML+=`<div>СУРР: Сеанс завершен</div>`;
        elemResponse.innerHTML+=`<div>СУРР: Время завершения сеанса связи: ${new Date().toLocaleString()}</div>`;

        elemRequest.innerHTML+=`<br><div  style="
                            font-size: calc(1.2rem);" class="header-log">Завершение сеанса связи:</div>`;
        elemRequest.innerHTML+=`<div>СУРР: Сеанс завершен</div>`;
        elemRequest.innerHTML+=`<div>СУРР: Время завершения сеанса связи: ${new Date().toLocaleString()}</div>`;

    }

    /**
     * Архивация сеанса связи.
     * @param {Object} data -данные для архивации сеанса связи.
     */
    static async endSovSeans(data){
        try {
            const response = await fetch(`http://${Utils.getTestUrl()}/sov_surr/Delete_plan_sov?ist=71`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log("Success:", response.status);
        }
        catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Занимает ячейки ОЧР выбранного КА.
     * @param {Number} stId -Номер КА для занятия ячеек.
     */
    static async  postOcFrREs(stId,type,reception,transmission){
        try {
            const response = await fetch(`http://${Utils.getTestUrl()}/CommunicationAvailability/OccupyFrequencyResource?satellite_id=${stId}&ist=71`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },

            });
            const result = await response.json();
            console.log("Success:", response.ok);
            if (response.ok) {
                return result;
            }

        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Функция для получения первого доступного-КА(старая версия).
     * @param {Object} data -данные для получения КА.
     * @param{Object} countSession -данные по кол-ву сеансов для потока вызовов.
     */
    static  async  calculateFirstAvailableIntervalOld(data,countSession){
        try {
            const response = await fetch(`http://${Utils.getTestUrl()}/CommunicationAvailability/CalculateFirstAvailableInterval?ist=71`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log("Success:", result);
            if (result.detail || Date.parse((new Date((result.start_datetime_iso)))<Date.parse(new Date())))  {
                console.log(document.getElementById('max-time-dur').value);
                const select = document.getElementById('abonent-select');
                let selIndex=select.selectedIndex;
                if (!selIndex) {
                    selIndex+=1;
                }
                document.getElementById('response3').innerHTML+=`<br><div  class="header-log">Вызов:</div>`;
                document.getElementById('response3').innerHTML+=`<div>ID запроса на инициирование сеанса связи:
                ${new Date(data.start_datetime_iso).toLocaleString()} ID Абонента: ${selIndex}</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>ID запроса на инициирование сеанса связи:
                ${new Date(data.start_datetime_iso).toLocaleString()} ID Абонента: ${selIndex}</div>`;
                document.querySelector('.information_request').innerHTML+='<div>Отказано в сеансе связи</div><br> ';
                document.querySelector('.information_request').innerHTML+=`<br><div class="header-log" style="display: block;">Характеристики Абонента:</div>`;
                document.getElementById('response3').innerHTML+='<br><div>Отказано в сеансе связи</div> ';
                document.getElementById('response3').innerHTML+=`<br><div>Характеристики Абонента:</div>`;
                const latRes=document.createElement('div');
                latRes.classList.add('latitude-res');


                const lonRes=document.createElement('div')
                if (document.querySelector('h2').innerHTML==='Имитатор потока вызовов') {
                    latRes.innerHTML=`Широта, градусы: ${document.getElementById('lat4').value}`;
                    lonRes.innerHTML=`Долгота, градусы: ${document.getElementById('lon4').value}`;
                }
                else{
                    latRes.innerHTML=`Широта, градусы: ${document.getElementById('lat3').value}`;
                    lonRes.innerHTML=`Долгота, градусы: ${document.getElementById('lon3').value}`;
                }
                lonRes.classList.add('long-res');
                const latResInf=document.createElement('div');
                latResInf.classList.add('latitude-res');
                latResInf.innerHTML=`Широта, градусы: ${document.getElementById('lat3').value}`;
                const lonResInf=document.createElement('div')
                lonResInf.innerHTML=`Долгота, градусы: ${document.getElementById('lon3').value}`;
                lonResInf.classList.add('long-res');
                document.querySelector('.information_request').append(latResInf);
                document.querySelector('.information_request').append(lonResInf);
                document.getElementById('response3').append(latRes);
                document.getElementById('response3').append(lonRes);

            }
            else
            {
                ImitatorUtils.createResponseOld(result,data);
                const datesStartTime=new Date();
                document.getElementById('response3').innerHTML+=`<br><div class="header-log">Сеанс связи:</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Сеанс разрешен</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Время ответа от СУРР: ${datesStartTime.toLocaleString()}</div>`;
                if (document.querySelector('.duplex-checkbox').checked) {
                    let valDuplex=document.querySelector('.duplex-checkbox').value;
                    ImitatorUtils.postOcFrREs(result.satellite_id)
                        .then(respons=>{
                            ImitatorUtils.createDataSessionCommunicationsOld(result,respons,datesStartTime,data,countSession);
                        });
                }
                else if(document.querySelector('.simplex-checkbox').checked){
                    ImitatorUtils.postOcFrREs(result.satellite_id).then(response=>{
                        ImitatorUtils.createDataSessionCommunicationsOld(result,response,datesStartTime,data,countSession);
                    });
                }
                return result;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
}