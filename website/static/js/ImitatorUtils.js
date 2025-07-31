import {Utils} from './Utils.js'

export  class ImitatorUtils{

    /**
     * Отображает сеанс связи.
     * @param  {Object}result - все данные сеанса связи.
     */
    static createDataSessionCommunications(result,respons,datesStartTime,data){
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
            console.log(intervals[idInterval]['time-receive-no']);
        }
        const randTime=Utils.getRandomNumber(60000,120000);
        let idInterval=0;
        let  duration=0;
        let dateStartTime=new Date();

        let timerLogs=setTimeout(createLogs,duration,dateStartTime,result,idInterval)
        // createBeginningLog(dateStartTime,result,idInterval);
        const createLog=function (intervals,dateStartTime,idInterval){

            if (idInterval!==intervals.length){
                if((intervals[idInterval-1]['data-end']===intervals[idInterval]['data-beg'] || new Date(intervals[idInterval]['data-beg']) <= new Date())&& intervals.length>1)
                {
                    duration=intervals[idInterval]['duration']*1000;
                    console.log(`Длительность :${duration/1000} секунд`)
                    createBeginningLog(dateStartTime,result,idInterval);
                    timerLogs=setTimeout(createLogs,duration,dateStartTime,result,idInterval+1);
                    idInterval++;
                }
                else if(intervals[idInterval-1]['data-end']!==intervals[idInterval]['data-beg'] && intervals.length>1){
                    duration = (new Date(intervals[idInterval]['data-beg']) - new Date(intervals[idInterval-1]['data-end']))/1000
                    console.log(`Следующий сеанс начнется через: ${duration} секунд`)
                    console.log('нет сеанса связи')
                    // duration+=intervals[idInterval-1]['duration']*100;
                    // createBeginningLog(dateStartTime,result,idInterval);
                    // idInterval++;
                    dateStartTime=new Date();
                    timerLogs=setTimeout(createLogs,duration*1000,dateStartTime,result,idInterval);
                }
                else{
                    duration=intervals[idInterval]['duration']*1000;
                    createBeginningLog(dateStartTime,result,idInterval);
                    timerLogs=setTimeout(createLogs,duration,dateStartTime,result,idInterval+1);
                    idInterval++;
                }
            }
        }
        function createLogs(dateStartTime,{abonents:[{intervals}]},idInterval){
            console.log(`idInterval: ${idInterval}`)
            if (idInterval!==intervals.length) {
                dateStartTime=new Date();
                if (idInterval===0 &&  new Date(intervals[idInterval]['data-beg']) <= dateStartTime) {
                    createBeginningLog(dateStartTime,result,idInterval);
                    clearTimeout(timerLogs);
                    idInterval++;
                    duration=intervals[idInterval-1]['duration']*1000;
                    timerLogs=setTimeout(createLogs,duration,dateStartTime,result,idInterval);
                }
                else if(idInterval===0){
                    // duration = (new Date(intervals[idInterval+1]['data-beg']) - new Date(intervals[idInterval]['data-end']))/1000;
                    duration=(new Date()-new Date(intervals[idInterval]['data-beg']))/1000
                    clearTimeout(timerLogs);
                    console.log(`Сеанс начнется через ${duration*-1} секунд, ID интервала: ${idInterval}`)
                    timerLogs=setTimeout(createLogs,duration,dateStartTime,result,idInterval);
                }
                else{
                    clearTimeout(timerLogs);
                    createLog(intervals,dateStartTime,idInterval)
                    idInterval++;
                }
                // if (idInterval!=intervals.length){
                //   if(intervals[idInterval-1]['data-end']!=intervals[idInterval]['data-beg'] && intervals.length>1){
                //     duration = (new Date(intervals[idInterval]['data-beg']) - new Date(intervals[idInterval-1]['data-end']))/1000
                //     console.log(duration)
                //     console.log('нет сеанса связи')
                //     duration+=intervals[idInterval-1]['duration']*100;
                //     createBeginningLog(dateStartTime,result,idInterval);
                //     idInterval++;
                //     timerLogs=setTimeout(createLogs,duration,dateStartTime,result,idInterval);
                //   }
                //   else{
                //     duration=intervals[idInterval-1]['duration']*100;
                //     createBeginningLog(dateStartTime,result,idInterval);
                //     timerLogs=setTimeout(createLogs,duration,dateStartTime,result,idInterval);
                //     idInterval++;
                //   }
                // }
                // else{
                //   duration=result['abonents'][0]['intervals'][idInterval-1]['duration']*100;
                //   timerLogs=setTimeout(createLogs,duration,dateStartTime,result,idInterval);
                // }
            }
            else{
                clearTimeout(timerLogs);
                console.log(`Конец`)
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
     * Получает интервалы и создает сеанс связи.
     * @param {Object} data -данные для создания сеанса связи.
     */
    static async  calculateFirstAvailableInterval(data){
        try {
            const response = await fetch(`http://${Utils.getTestUrl()}/sov_surr/calc_plan_svyazi_sov`, {
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

                    this.createDataSessionCommunications(result,datesStartTime,data);

                }
                else if(document.querySelector('.simplex-checkbox').checked){

                    this.createDataSessionCommunications(result,response,datesStartTime,data);

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
                        if (key=='date-time-call') {
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
}