'use strict';
class Loader {
  /**
   * Конструктор класса загрузчика.
   * 
   * @param {string} selector - селектор элемента загрузчика.
   */
  constructor(selector, delay = 300) {
      this.delay = delay;
      /**
       * DOM-элемент, представляющий загрузчик.
       * @type {HTMLElement}
       */
      this.element = document.querySelector(selector);
      /**
       * DOM-элемент, представляющий заголовок загрузчика.
       * @type {HTMLElement}
       */
      this.titleElement = this.element.querySelector('.loader-container__title');

      this.isLoading = false;
  }

  /**
   * Открывает загрузчик.
   * 
   * Этот метод удаляет класс 'loder-container--hidden' у элемента загрузчика,
   * что приведет к его отображению.
   */
  open() {
      this.isLoading = true;
      setTimeout(() => {
          if (!this.isLoading) return;
          this.element.classList.remove('loader-container--hidden');
      }, this.delay);
  }

  /**
   * Скрывает загрузчик.
   * 
   * Этот метод добавляет класс 'loder-container--hidden' к элементу загрузчика,
   * что приведет к его скрытию.
   */
  close() {
      this.isLoading = false;
      this.element.classList.add('loader-container--hidden');
  }

  /**
   * Устанавливает заголовок загрузчика и открывает его.
   *
   * @param {string} title - Заголовок загрузчика.
   */
  show(title) {
      // Устанавливаем заголовок загрузчика
      this.titleElement.innerText = title;
      this.open()
  }
}
function setIntervalImmediately(func, interval) {
        // func(); // Немедленное исполнение функции
        return setTimeout(func, interval); // Затем функция продолжает работать по интервалу
      }
function getDateTimes(dateControl,timeControl){
  let dateControlYear=+dateControl.value.substring(0,4);
  let dateControlMonth=+dateControl.value.substring(5,7);
  let dateControlDay=+dateControl.value.substring(8,10);
  let timeHouse=Number(`${timeControl.value[0]}${timeControl.value[1]}`);
  let timeMin=+(`${timeControl.value[3]}${timeControl.value[4]}`);
  let timeSec=+(`${timeControl.value[6]}${timeControl.value[7]}`);
  const dateTime=new Date(dateControlYear,dateControlMonth-1,dateControlDay,timeHouse,timeMin,timeSec);
  return dateTime
}
function getRandomNumber(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}
function getDateTime() {
  let now     = new Date(); 
  let year    = now.getFullYear();
  let month   = now.getMonth()+1; 
  let day     = now.getDate();
  let hour    = now.getHours();
  let minute  = now.getMinutes();
  let second  = now.getSeconds(); 
  if(month.toString().length == 1) {
       month = '0'+month;
  }
  if(day.toString().length == 1) {
       day = '0'+day;
  }   
  if(hour.toString().length == 1) {
       hour = '0'+hour;
  }
  if(minute.toString().length == 1) {
       minute = '0'+minute;
  }
  if(second.toString().length == 1) {
       second = '0'+second;
  }  
   
  let dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
   return dateTime;
}
function createBeginningLog(dateStartTime,{abonents:[{intervals}]},idInterval){
  
  document.querySelector('.information_request').innerHTML+=`<div>СУРР: Время ответа от СУРР:  ${dateStartTime.toLocaleString()}</div>`;
  if (idInterval==0) {
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
function clearFrecRes(selectorBtn,responses,respons,result,data,timer,dataVyz){
  clearTimeout(timer);
    let starTime=data.start_datetime_iso;
    if (document.querySelector('h2').innerHTML=='Имитатор потока вызовов'){
      countSession=document.getElementById('quantity_calls').value;
      starTime=dataVyz;
    }
    const data_cell=respons.Nomera_zanyatyih_yacheek.concat(respons.Nomera_zanyatyih_yacheek_pr);
    postRelaeseFrRes(data_cell,result.satellite_id).then((res)=>{
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
      addArchivalSession(responses.ID,String(dataEndCall.toISOString()),timeCall,timeCall,7);
      document.getElementById(selectorBtn).disabled = true;
      }
    });
}
function addListenerImitator(selectorBtn,responses,respons,result,data,timer,dataVyz){
  const btnEnd=document.getElementById(selectorBtn);
  btnEnd.addEventListener('click',clearFrecRes.bind(null,selectorBtn,responses,respons,result,data,timer,dataVyz),{once:true});
}
function createLogImitator(dateStartTime,datesStartTime,respons,result,data){
  
  let time;
  if (document.querySelector('.time_call-max').checked){
     time =result.datetime_period.duration_in_sec;
  }
  else{
    time =getRandomNumber(60000,120000);
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
  // const dataSession={
  //   "ID_Zapros_Seans_Tek": 0,
  //   "Tlf1": String(numPhone),
  //   "ID_Abonent_T1": valueAbonent,
  //   "ID_KA1": result.satellite_id,
  //   "ID_RSS1": 0,
  //   "Canal1": respons.Nomera_zanyatyih_yacheek[0][1],
  //   "Time_Slot1": respons.Nomera_zanyatyih_yacheek[0][0],
  //   "Canal_pr1": respons.Nomera_zanyatyih_yacheek_pr[0][1],
  //   "Time_Slot_pr1": respons.Nomera_zanyatyih_yacheek_pr[0][0],
  //   "Tlf2": '',
  //   "ID_Abonent_T2": ++valueAbonent,
  //   "ID_KA2": 0,
  //   "ID_RSS2": 0,
  //   "Canal2": 0,
  //   "Time_Slot2": 0,
  //   "Canal_pr2": 0,
  //   "Time_Slot_pr2": 0,
  //   "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
  //   "Data_Otv": String(datesStartTime.toISOString()),
  //   "Data_Beg": String(dateStartTime.toISOString()),
  //   "Data_Beg_Razg": String(dateStartTime.toISOString()),
  //   "Data_End": '',
  //   "Time_Seans": '',
  //   "Time_Razg": '',
  //   "Id_Seans_Rez": 1
  // }
  //     postActiveSession(dataSession).then((responses)=>{
  //       let endTimer;
  //       if (document.querySelector('.time_call-max').checked)
  //       {
  //         endTimer=time*1000;
  //       }
  //       else{
  //         endTimer=time;
  //       }
        
  //       const timer=setTimeout(function(){
          
  //         // if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов'){
  //         //   // document.getElementById("task-btn_cansel").disabled=true;
  //         //   document.getElementById("task-btn_cansel").removeEventListener('click',clearFrecRes);
  //         // }
  //         // else{
  //         //   // document.getElementById("task-btn_cansel_flow").disabled=true;
  //         //   document.getElementById("task-btn_cansel_flow").removeEventListener('click',clearFrecRes)

  //         // }
  //         const data_cell=respons.Nomera_zanyatyih_yacheek.concat(respons.Nomera_zanyatyih_yacheek_pr);
  //         postRelaeseFrRes(data_cell,result.satellite_id).then(()=>{
  //           document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
  //           document.querySelector('.information_request').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса</div>`;
  //           document.querySelector('.information_request').innerHTML+=`<div>СОВ: Время запроса:${new Date().toLocaleString()}</div>`;
  //           document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
  //           if (document.querySelector('.time_call-max').checked){
  //             document.querySelector('.information_request').innerHTML+=`<div>CУРР: Продолжительность вызова ${time} секунд</div>`;
  //           }
  //           else{
  //             document.querySelector('.information_request').innerHTML+=`<div>CУРР: Продолжительность вызова ${time/1000} секунд</div>`;
  //           }
            
  //           const dataEndCall=new Date();
  //           document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}:</div>`;
  //           document.getElementById('response3').innerHTML+=`<br><div style="
  //           font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
  //           document.getElementById('response3').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса</div>`;
  //           document.getElementById('response3').innerHTML+=`<div>СОВ: Время запроса:${new Date().toLocaleString()}</div>`;
  //           document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
  //           document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
  //           addArchivalSession(responses.ID,String(dataEndCall.toISOString()),time,time,1);
  //           if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов'){
  //             // document.getElementById("task-btn_cansel").disabled=true;
  //             document.getElementById("task-btn_cansel").removeEventListener('click',clearFrecRes);
  //           }
  //           else{
  //             // document.getElementById("task-btn_cansel_flow").disabled=true;
  //             document.getElementById("task-btn_cansel_flow").removeEventListener('click',clearFrecRes)
        
  //           }
  //         }); 
  //       },Number(endTimer));
  //       if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов'){
  //         addListenerImitator("task-btn_cansel",responses,respons,result,data,timer);
  //       }
  //       else{
  //         addListenerImitator("task-btn_cansel_flow",responses,respons,result,data,timer,dataSession.Data_Vyz);
  //       }
  //   }); 
}



function createDataSessionCommunications(result,respons,datesStartTime,data){
  const randTime=getRandomNumber(60000,120000);
  let idInterval=0;
  let  duration=0;
  let dateStartTime=new Date();

  let timerLogs=setTimeout(createLogs,duration,dateStartTime,result,idInterval)
  // createBeginningLog(dateStartTime,result,idInterval);
  const createLog=function (intervals,dateStartTime,idInterval){
    
       if (idInterval!=intervals.length){
        if((intervals[idInterval-1]['data-end']==intervals[idInterval]['data-beg'] || new Date(intervals[idInterval]['data-beg']) <= new Date())&& intervals.length>1)
        {
            duration=intervals[idInterval]['duration']*1000;
            console.log(`Длитеьность :${duration/1000} секунд`)
            createBeginningLog(dateStartTime,result,idInterval);
            timerLogs=setTimeout(createLogs,duration,dateStartTime,result,idInterval+1);
            idInterval++;
        }
        else if(intervals[idInterval-1]['data-end']!=intervals[idInterval]['data-beg'] && intervals.length>1){
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
    
    if (idInterval!=intervals.length) {
     
        dateStartTime=new Date();
        if (idInterval==0 &&  new Date(intervals[idInterval]['data-beg']) <= dateStartTime) {
          
          createBeginningLog(dateStartTime,result,idInterval);
          clearTimeout(timerLogs);
          idInterval++;
          duration=intervals[idInterval-1]['duration']*1000;
          timerLogs=setTimeout(createLogs,duration,dateStartTime,result,idInterval);   
        }
        else if(idInterval==0){
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
        console.log(`konez`)
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
function release_all_frequency_resources(){
    const url = "http://185.192.247.60:7130/CommunicationAvailability/ReleaseAllFrequencyResources";
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => {

        if (!response.ok) {
            console.error("Ошибка при выполнении запроса:", response.status);
        }
        else {
        clearActiveSessions();
        alert("Освобожден частотный ресурс");
        

        }
    })
    .catch(error => {
        console.error("Сетевая ошибка:", error);
    });
}
function clearActiveSessions(){
  const url = "http://185.192.247.60:7130/CommunicationAvailability/ClearActiveSessions";
  fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
  })
  .then(response => {

      if (!response.ok) {
          console.error("Ошибка при выполнении запроса:", response.status);
      }
      else {
        console.error("Очищены активные сеансы", response.status);

      }
  })
  .catch(error => {
      console.error("Сетевая ошибка:", error);
  });
}
async function addArchivalSession(id,dataEnd,timeSeans,timeCall,idSeansRes){
  try {
    const response = await fetch(`http://185.192.247.60:7130/CommunicationAvailability/AddArchivalSession?ID=${id}
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
function logErrorSvSeans(elemResponse,elemRequest,data) {
  console.log(data)
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
      if (document.querySelector('h2').innerHTML=='Имитатор потока вызовов') {
        latRes.innerHTML=`Широта, градусы: ${document.getElementById('lat4').value}`;
        lonRes.innerHTML=`Долгота, градусы: ${document.getElementById('lon4').value}`;
      }
      else{
        latRes.innerHTML=`Широта, градусы: ${document.getElementById('lat3').value}`;
        lonRes.innerHTML=`Долгота, градусы: ${document.getElementById('lon3').value}`;
      }
     
}
async function calculateFirstAvailableInterval(data){
  try {
    const response = await fetch("http://127.0.0.1:8000/sov_surr/calc_plan_svyazi_sov", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    console.log("Success:", response.status);
    if (response.status!=200 )  {
      logErrorSvSeans( document.getElementById('response3'),document.querySelector('.information_request'),data)
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
      const svSeanAllowed=createResponse(result,data);
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
              
              createDataSessionCommunications(result,datesStartTime,data);
           
       }
      else if(document.querySelector('.simplex-checkbox').checked){
       
          createDataSessionCommunications(result,response,datesStartTime,data);
       
      }
      return result;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
async function postActiveSession(data) {
  try {
    const response = await fetch("http://185.192.247.60:7130/CommunicationAvailability/AddActiveSession", {
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
function createResponse(result,data){
  console.log(result)
  if (result=={}) {
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
      let typeСonnection=0;
      if (document.querySelector('.duplex-checkbox').checked) {
        document.getElementById('response3').innerHTML+=`<div><br>Вид связи: Дуплекс <br></div>`;
        typeСonnection=2;
      }
      else{
        document.getElementById('response3').innerHTML+=`Вид связи: Симплекс <br>`;
        typeСonnection=3;
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
          else if (key=='min_duration_in_sec') {
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
async function postOcFrREs(stId,type,reception,transmission){
  try {
    const response = await fetch(`http://185.192.247.60:7130/CommunicationAvailability/OccupyFrequencyResource?satellite_id=${stId}`, {
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
async function postRelaeseFrRes(data,stId){
  try {
    const response = await fetch(`http://185.192.247.60:7130/CommunicationAvailability/ReleaseFrequencyResource?satellite_id=${stId}`, {
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

// example usage: realtime clock
setInterval(function(){
  let currentTime = getDateTime();
  document.getElementById("timer").innerHTML = currentTime;
}, 0);

const modal = document.getElementById("myModal");
const btn = document.getElementById("openModal");
const span = document.getElementsByClassName("close")[0];
let countSession=0;

btn.addEventListener("click", ()=>{modal.style.display = "flex"});
span.addEventListener("click", ()=>{modal.style.display = "none"});  
if (document.querySelector('h2')) {
  if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов') {
    const imgRe=document.querySelector('.re-date');
    imgRe.addEventListener('click',()=>{
      if (document.querySelector('.coord-rand').checked) {
        const randLong=getRandomNumber(27,169)
        const randLat=getRandomNumber(41,77)
        document.getElementById('lat3').value=randLat;
        document.getElementById('lon3').value=randLong;
      }
    });
    const dateControl = document.querySelector('input[type="date"]');
    dateControl.value=getDateTime().slice(0,10);
    const timeControl = document.querySelector('input[type="time"]');
    let numberTime=Number(getDateTime().substring(11,13));
    let timeVal=getDateTime().substring(13,19);
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
            "sessions-id": getRandomNumber(10000,99999),
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
        calculateFirstAvailableInterval(data).then(()=>{
        loader.close();
        document.getElementById('response3').style.display='block';
        document.getElementById("task-btn_cansel").disabled = false;
      });
    });
   
  }
  else if (document.querySelector('h2').innerHTML=='Имитатор потока вызовов') {
    const btnFlawStart=document.querySelector('#task-btn_sim_flow');
    const imageRe=document.querySelector('.re-date-flow');
    imageRe.addEventListener('click',()=>{
      if (document.querySelector('.priority-checkbox').checked) {
        const randLong=getRandomNumber(27,169)
        const randLat=getRandomNumber(41,77)
        document.getElementById('lat4').value=randLat;
        document.getElementById('lon4').value=randLong;
      }
    });
    btnFlawStart.addEventListener('click',()=>{
      document.getElementById('task-btn_cansel_flow').disabled=false;
      countSession=0;
      const loader = new Loader('.loader-container');
      loader.show('Загрузка данных с сервера');
      const data = {
      'point':{
            "name":'',
            "lat": document.getElementById('lat4').value,
            "lon": document.getElementById('lon4').value,
            "radius": 2500
          },
      "start_datetime_iso": new Date().toISOString(),
      "min_duration_in_sec":document.getElementById('min-call-time').value  
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
         console.log(timeTimers);
      }
      if (selectedSize==2) {
         quantyCalls=document.getElementById('quantity_calls').value;
         timeCalls=document.getElementById('time_calls').value; 
         timeTimers= Math.floor(getRandomNumber(1,(timeCalls/quantyCalls)));
         console.log(timeTimers);
      }
      function nextCall(){
        if (countSession!=0) {
          data.start_datetime_iso=new Date().toISOString();
          data.point.lat=document.getElementById('lat4').value;
          data.point.lon=document.getElementById('lon4').value;
        }
        if (selectedSize==2) {
          timeTimers= Math.floor(getRandomNumber(1,(timeCalls/quantyCalls)));
          console.log(timeTimers);
        }
        console.log(data.lat,' ', data.lon);
        calculateFirstAvailableInterval(data).then(()=>{
          loader.close();
          ++countSession;
          console.log(countSession);
          document.getElementById('response3').style.display='block';
        })
      }
     
      const timerCalls=setIntervalImmediately(nextCall,timeTimers*1000)
      const time=setInterval(function(){
        if (countSession==quantyCalls) {
            clearTimeout(timerCalls);
           
            console.log(countSession);
            clearTimeout(time);
        }
    },100);
    }); 
  }
}


// if (document.getElementById('abonent-select')) {
//   const select = document.getElementById('abonent-select');
// let number = document.querySelectorAll('.number');
// let lastIndex = 0; 
// select.addEventListener('change', function() {
//   number[lastIndex].classList.remove ("hide"); 
//   number[lastIndex].classList.remove ("show"); 
//   let index = select.selectedIndex; 
//  if (!index) {
//   number[lastIndex].classList.remove ("hide"); 
//   number[lastIndex].classList.remove ("show"); 
//  }
//  else{
//   number[index].classList.add("show"); // Показать блок с соответствующим индексом
//   number[index].classList.remove ("hide");
//  }
//   lastIndex = index; 
// });
// }
// if (document.getElementById('abonent-select-rec')) {
//   const select = document.getElementById('abonent-select-rec');
// let number = document.querySelectorAll('.number-rec');
// let lastIndex = 0; 
// select.addEventListener('change', function() {
//   number[lastIndex].classList.remove ("hide"); 
//   number[lastIndex].classList.remove ("show"); 
//   let index = select.selectedIndex; 
//  if (!index) {
//   number[lastIndex].classList.remove ("hide"); 
//   number[lastIndex].classList.remove ("show"); 
//  }
//  else{
//   number[index].classList.add("show"); // Показать блок с соответствующим индексом
//   number[index].classList.remove ("hide");
//  }
//   lastIndex = index; 
// });
// }
function viewAbonents(selectorSelect,selectorPhoneNumper) {
  if (document.getElementById(selectorSelect)) {
    const select = document.getElementById(selectorSelect);
  let number = document.querySelectorAll(selectorPhoneNumper);
  let lastIndex = 0; 
  select.addEventListener('change', function() {
    number[lastIndex].classList.remove ("hide"); 
    number[lastIndex].classList.remove ("show"); 
    let index = select.selectedIndex; 
   if (!index) {
    number[lastIndex].classList.remove ("hide"); 
    number[lastIndex].classList.remove ("show"); 
   }
   else{
    number[index].classList.add("show"); // Показать блок с соответствующим индексом
    number[index].classList.remove ("hide");
   }
    lastIndex = index; 
  });
  }
}
viewAbonents('abonent-select','.number');
viewAbonents('abonent-select-rec','.number-rec')


