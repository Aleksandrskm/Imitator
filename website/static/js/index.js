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
function createLogOnceImitator(dateStartTime,datesStartTime,respons,result,data){
  console.log(respons.Nomera_zanyatyih_yacheek[0]);
  const time =result.datetime_period.duration_in_sec;
  let numPhone ='';
  if(document.getElementById('abonent-select')){
    console.log(document.getElementById('abonent-select').value);
    document.querySelectorAll('.number').forEach((number)=>{
      console.log(number.innerHTML);
      if (number.classList.contains('show') ){
        numPhone=number.innerHTML;
      }
      console.log('1');
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
  document.getElementById('response3').innerHTML+=`<div>СОВ:  Прогнозируемая продолжительность сеанса ,сек: ${time}</div>`;
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
      postActiveSession(dataSession).then((responses)=>{
        const timer=setTimeout(function(){
          const data_cell=respons.Nomera_zanyatyih_yacheek.concat(respons.Nomera_zanyatyih_yacheek_pr);
          postRelaeseFrRes(data_cell,result.satellite_id).then(()=>{
            document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
            document.querySelector('.information_request').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса</div>`;
            document.querySelector('.information_request').innerHTML+=`<div>СОВ: Время запроса:${new Date().toLocaleString()}</div>`;
            document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
            document.querySelector('.information_request').innerHTML+=`<div>CУРР: Продолжительность вызова ${time} секунд</div>`;
            const dataEndCall=new Date();
            document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}:</div>`;
            document.getElementById('response3').innerHTML+=`<br><div style="
            font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
            document.getElementById('response3').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса</div>`;
            document.getElementById('response3').innerHTML+=`<div>СОВ: Время запроса:${new Date().toLocaleString()}</div>`;
            document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
            document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
            addArchivalSession(responses.ID,String(dataEndCall.toISOString()),time,time,1);
          }); 
        },Number(time)*1000);
        if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов'){
          const btnEnd=document.getElementById('task-btn_cansel');
          btnEnd.addEventListener('click',()=>{
            document.getElementById("task-btn_sim").disabled = true;
            clearTimeout(timer);
            document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
            document.getElementById('response3').innerHTML+=`<br><div style="
            font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
            const data_cell=respons.Nomera_zanyatyih_yacheek.concat(respons.Nomera_zanyatyih_yacheek_pr);
            postRelaeseFrRes(data_cell,result.satellite_id).then(()=>{
              const dataEndCall=new Date();
              document.querySelector('.information_request').innerHTML+=` <div>СОВ: Запрос на освобождение частотного ресурса </div>`;
              document.querySelector('.information_request').innerHTML+=` <div>СОВ: Время запроса:${new Date().toLocaleString()} </div>`;
              document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
              document.querySelector('.information_request').innerHTML+=` <div>СУРР Продолжительность вызова: 
              ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
              document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: 
              ${dataEndCall.toLocaleString()}</div>`;  
              document.getElementById('response3').innerHTML+=` <div>СОВ: Запрос на освобождение частотного ресурса </div>`;
              document.getElementById('response3').innerHTML+=` <div>СОВ: Время запроса:${new Date().toLocaleString()} </div>`;
              document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
              document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
              const timeCall=Math.round(Number((dataEndCall-new Date(data.start_datetime_iso))/1000));
              console.log(timeCall);
              addArchivalSession(responses.ID,String(dataEndCall.toISOString()),timeCall,timeCall,7);
            });
            document.getElementById("task-btn_sim").disabled = false;  
          },{once:true});
        }
    }); 
}
function createDuplexData(result,respons,datesStartTime,data){
  const randTime=getRandomNumber(60000,120000);
  const dateStartTime=new Date();
  createBeginningLog(dateStartTime,respons,result);
  if (document.querySelector('.time_call-max').checked) {
    if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов'){
      createLogOnceImitator(dateStartTime,datesStartTime,respons,result,data);
    }
     else{ 
      console.log(respons.Nomera_zanyatyih_yacheek[0]);
      const time =result.datetime_period.duration_in_sec;
      let numPhone ='';
      if(document.getElementById('abonent-select')){
        console.log(document.getElementById('abonent-select').value);
        document.querySelectorAll('.number').forEach((number)=>{
          console.log(number.innerHTML);
          if (number.classList.contains('show')) {
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
      document.getElementById('response3').innerHTML+=`<div>СОВ:  Прогнозируемая продолжительность сеанса ,сек: ${time}</div>`;
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
      postActiveSession(dataSession).then((responses)=>{
        const timer=setTimeout(function(){
          const data_cell=respons.Nomera_zanyatyih_yacheek.concat(respons.Nomera_zanyatyih_yacheek_pr);
          postRelaeseFrRes(data_cell,result.satellite_id).then(()=>{
            document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
            document.querySelector('.information_request').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса</div>`;
            document.querySelector('.information_request').innerHTML+=`<div>СОВ: Время запроса: ${time} секунд</div>`;
            document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
            document.querySelector('.information_request').innerHTML+=`<div>СУРР: Продолжительность вызова ${time} секунд</div>`;
            const dataEndCall=new Date();
            document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}:</div>`;
            document.getElementById('response3').innerHTML+=`<br><div style="
            font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
            document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
            ocument.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
            addArchivalSession(responses.ID,String(dataEndCall.toISOString()),time,time,1);
          }); 
        },Number(time)*1000);
        const btnEnd=document.getElementById('task-btn_cansel_flow');
        btnEnd.addEventListener('click',()=>{
          countSession=document.getElementById('quantity_calls').value;
          clearTimeout(timer);
          const data_cell=respons.Nomera_zanyatyih_yacheek.concat(respons.Nomera_zanyatyih_yacheek_pr);
          postRelaeseFrRes(data_cell,result.satellite_id).then(()=>{
            document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
            document.getElementById('response3').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
            const dataEndCall=new Date();
            document.querySelector('.information_request').innerHTML+=` <div>СОВ: Запрос на освобождение частотного ресурса </div>`;
            document.querySelector('.information_request').innerHTML+=` <div>СОВ: Время запроса:${new Date().toLocaleString()} </div>`;
            document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
            document.querySelector('.information_request').innerHTML+=` <div>СУРР Продолжительность вызова: 
            ${(dataEndCall-new Date(dataSession.Data_Vyz))/1000} секунд</div>`;
            document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: 
            ${dataEndCall.toLocaleString()}</div>`;
            document.getElementById('response3').innerHTML+=` <div>СОВ: Запрос на освобождение частотного ресурса </div>`;
            document.getElementById('response3').innerHTML+=` <div>СОВ: Время запроса:${new Date().toLocaleString()} </div>`;
            document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
            document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
            const timeCall=Math.round(Number((dataEndCall-new Date(data.start_datetime_iso))/1000));
            console.log(timeCall);
            addArchivalSession(responses.ID,String(dataEndCall.toISOString()),timeCall,timeCall,7);
            });  
          },{once:true});
                  });
     }    
  }
  else{
    let numPhone='';
    if(document.getElementById('abonent-select')){
     console.log(document.getElementById('abonent-select').value);
      document.querySelectorAll('.number').forEach((number)=>{
      console.log(number.innerHTML);
      if (number.classList.contains('show')) {
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
    console.log('1');
    document.getElementById('response3').innerHTML+=`<div>СОВ:  Прогнозируемая продолжительность сеанса ,сек: ${randTime/1000}</div>`;
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
    "Tlf2": "string",
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
    postActiveSession(dataSession).then((responses)=>{
      const timer=setTimeout(function(){
        const data_cell=respons.Nomera_zanyatyih_yacheek.concat(respons.Nomera_zanyatyih_yacheek_pr);
        postRelaeseFrRes(data_cell,result.satellite_id).then(()=>{
          document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
          document.querySelector('.information_request').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса</div>`;
          document.querySelector('.information_request').innerHTML+=`<div>СОВ: Время запроса: ${new Date().toLocaleString()}</div>`;
          document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
          document.querySelector('.information_request').innerHTML+=`<div>СУРР: Продолжительность вызова ${randTime/1000} секунд</div>`;
          const dataEndCall=new Date();
          document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}:</div>`;
          document.getElementById('response3').innerHTML+=`<br><div style="
          font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
          document.getElementById('response3').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса</div>`;
          document.getElementById('response3').innerHTML+=`<div>СОВ: Время запроса: ${new Date().toLocaleString()}</div>`;
          document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
          document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
          const timeCall=Math.round(Number(randTime/1000));
          console.log(timeCall);
          addArchivalSession(responses.ID,String(dataEndCall.toISOString()),timeCall,timeCall,1);
        }); 
      },randTime);
      if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов'){
        const btnEnd=document.getElementById('task-btn_cansel');
        btnEnd.addEventListener('click',()=>{
          document.getElementById("task-btn_sim").disabled = true; 
          clearTimeout(timer);
          const data_cell=respons.Nomera_zanyatyih_yacheek.concat(respons.Nomera_zanyatyih_yacheek_pr);
          postRelaeseFrRes(data_cell,result.satellite_id).then(()=>{
          const dataEndCall=new Date();
          document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
          document.querySelector('.information_request').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса</div>`;
          document.querySelector('.information_request').innerHTML+=` <div>СОВ: Время запроса:${new Date().toLocaleString()}</div>`;
          document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
          document.querySelector('.information_request').innerHTML+=` <div>СУРР: Продолжительность вызова 
          ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
          document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: 
          ${dataEndCall.toLocaleString()}</div> <br>`;
          document.getElementById('response3').innerHTML+=`<br><div style="
            font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
          document.getElementById('response3').innerHTML+=`<div>СУРР: СОВ: Запрос на освобождение частотного ресурса</div>`;
          document.getElementById('response3').innerHTML+=` <div>СОВ: Время запроса:${new Date().toLocaleString()}</div>`;
          document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
          document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
          let timeCall=Math.round(Number((dataEndCall-new Date(data.start_datetime_iso))/1000));
          if (timeCall<0) {
            timeCall*=-1;
          }
          console.log((timeCall));
          console.log(typeof(timeCall));
          console.log(dataEndCall);
          addArchivalSession(responses.ID,String(dataEndCall.toISOString()),timeCall,timeCall,7);
          console.log(data.start_datetime_iso);
          });
        document.getElementById("task-btn_sim").disabled = false;   
        },{once:true});
      }
      else{
        const btnEnd=document.getElementById('task-btn_cansel_flow');
        btnEnd.addEventListener('click',()=>{
          countSession=document.getElementById('quantity_calls').value;
          clearTimeout(timer);
          const data_cell=respons.Nomera_zanyatyih_yacheek.concat(respons.Nomera_zanyatyih_yacheek_pr);
          postRelaeseFrRes(data_cell,result.satellite_id).then(()=>{
            document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
            document.getElementById('response3').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
            const dataEndCall=new Date();
            document.querySelector('.information_request').innerHTML+=` <div>СОВ: Запрос на освобождение частотного ресурса </div>`;
            document.querySelector('.information_request').innerHTML+=` <div>СОВ: Время запроса:${new Date().toLocaleString()} </div>`;
            document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
            document.querySelector('.information_request').innerHTML+=` <div>СУРР Продолжительность вызова: 
            ${(dataEndCall-new Date(dataSession.Data_Vyz))/1000} секунд</div>`;
            document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: 
            ${dataEndCall.toLocaleString()}</div>`;
            document.getElementById('response3').innerHTML+=` <div>СОВ: Запрос на освобождение частотного ресурса </div>`;
            document.getElementById('response3').innerHTML+=` <div>СОВ: Время запроса:${new Date().toLocaleString()} </div>`;
            document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
            document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
            const timeCall=Math.round(Number((dataEndCall-new Date(data.start_datetime_iso))/1000));
            console.log(timeCall);
            addArchivalSession(responses.ID,String(dataEndCall.toISOString()),timeCall,timeCall,7);
          });
             
        },{once:true});
      }
    });     
  }
}
// example usage: realtime clock
setInterval(function(){
  let currentTime = getDateTime();
  document.getElementById("timer").innerHTML = currentTime;
}, 0);
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
async function calculateFirstAvailableInterval(data){
  try {
    const response = await fetch("http://185.192.247.60:7130/CommunicationAvailability/CalculateFirstAvailableInterval", {
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
      if (document.querySelector('h2').innerHTML=='Имитатор потока вызовов') {
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
      
        // console.log( (result.datetime_period.duration_in_sec < document.getElementById('max-time-dur').value));
      createResponse(result,data);
      const datesStartTime=new Date();
      document.getElementById('response3').innerHTML+=`<br><div class="header-log">Сеанс связи:</div>`;
      document.getElementById('response3').innerHTML+=`<div>СУРР: Сеанс разрешен</div>`;
      document.getElementById('response3').innerHTML+=`<div>СУРР: Время ответа от СУРР: ${datesStartTime.toLocaleString()}</div>`;
      // document.getElementById('response3').innerHTML+=`<div>Время запроса сеанса связи ${datesStartTime.toLocaleString()}</div>`;
      if (document.querySelector('.duplex-checkbox').checked) {
        let valDuplex=document.querySelector('.duplex-checkbox').value;
          postOcFrREs(result.satellite_id,valDuplex-1,0,1)
            .then(respons=>{
              createDuplexData(result,respons,datesStartTime,data);
            });
       }
      else if(document.querySelector('.simplex-checkbox').checked){
        postOcFrREs(result.satellite_id,document.querySelector('.simplex-checkbox').value,0,1).then(response=>{
          const randTime=getRandomNumber(60000,120000);
          const dateStartTime=new Date();
          document.querySelector('.information_request').innerHTML+=`<div>СУРР: Время ответа от СУРР:  ${dateStartTime.toLocaleString()}
          </div>`;
          document.getElementById('response3').innerHTML+=`<div>СОВ:  Начало сеанса связи: ${dateStartTime.toLocaleString().toLocaleString()}</div>`;
          document.getElementById('response3').innerHTML+=`<div>СУРР: Частотный ресурс: ${result.satellite_name} 
          на передачу:канал ${response.Nomera_zanyatyih_yacheek[0][1]} тайм слот
           ${response.Nomera_zanyatyih_yacheek[0][0]}</div>`;
          document.querySelector('.information_request').innerHTML+=`<div>СОВ:  Начало сеанса связи: ${dateStartTime.toLocaleString()}</div>`;
          document.querySelector('.information_request').innerHTML+=`<div>СУРР: Частотный ресурс: ${result.satellite_name} 
          на прередачу :канал ${response.Nomera_zanyatyih_yacheek[0][1]} тайм слот
           ${response.Nomera_zanyatyih_yacheek[0][0]}
          на прием:канал ${response.Nomera_zanyatyih_yacheek_pr[0][1]} тайм слот
           ${response.Nomera_zanyatyih_yacheek_pr[0][0]}
           
           </div> `;
          if (document.querySelector('.time_call-max').checked) {
            const time =result.datetime_period.duration_in_sec;
            let numPhone='';
            if(document.getElementById('abonent-select')){
              console.log(document.getElementById('abonent-select').value);
              document.querySelectorAll('.number').forEach((number)=>{
                console.log(number.innerHTML);
                if (number.classList.contains('show')) {
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
            document.getElementById('response3').innerHTML+=`<div>СОВ:  Прогнозируемая продолжительность сеанса ,сек: ${time}</div>`;
            console.log(time);
            const dataSession={
              "ID_Zapros_Seans_Tek": 0,
              "Tlf1": numPhone,
              "ID_Abonent_T1": Number(valueAbonent),
              "ID_KA1": result.satellite_id,
              "ID_RSS1": 0,
              "Canal1": response.Nomera_zanyatyih_yacheek[0][1],
              "Time_Slot1": response.Nomera_zanyatyih_yacheek[0][0],
              "Canal_pr1": response.Nomera_zanyatyih_yacheek_pr[0][1],
              "Time_Slot_pr1": response.Nomera_zanyatyih_yacheek_pr[0][0],
              "Tlf2": "string",
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
          postActiveSession(dataSession).then((responses)=>{
            const timer=setTimeout(function(){
              const data_cell=response.Nomera_zanyatyih_yacheek.concat(response.Nomera_zanyatyih_yacheek_pr);
              postRelaeseFrRes(data_cell).then(()=>{
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                document.querySelector('.information_request').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>СОВ: Время запроса: ${new Date().toLocaleString()} секунд</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>CУРР: Продолжительность вызова ${time} секунд</div>`;
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}:</div> <br>`;
                document.getElementById('response3').innerHTML+=`<br><div style="
                font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                document.getElementById('response3').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса</div>`;
                document.getElementById('response3').innerHTML+=`<div>СОВ: Время запроса: ${new Date().toLocaleString()} секунд</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                addArchivalSession(responses.ID,String(dataEndCall.toISOString()),time,time,1);
              });  
            },Number(time)*1000);
            if(document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов'){
              const btnEnd=document.getElementById('task-btn_cansel');
              btnEnd.addEventListener('click',()=>{
                document.getElementById("task-btn_sim").disabled = true;
                
                clearTimeout(timer);
                const data_cell=response.Nomera_zanyatyih_yacheek.concat(response.Nomera_zanyatyih_yacheek_pr);
                postRelaeseFrRes(data_cell,result.satellite_id).then(()=>{
                  const dataEndCall=new Date();
                  document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                  document.querySelector('.information_request').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>СОВ: Время запроса: ${new Date().toLocaleString()} секунд</div>`;
                    document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                    // document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${dataEndCall} секунд</div>`;
                    document.querySelector('.information_request').innerHTML+=` <div>CУРР:Продолжительность вызова 
                    ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
                    document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: 
                    ${dataEndCall.toLocaleString()}</div> <br>`;
                    document.getElementById('response3').innerHTML+=`<br><div style="
                    font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                    document.getElementById('response3').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса</div>`;
                    document.getElementById('response3').innerHTML+=`<div>СУРР: СОВ: Время запроса:  ${(new Date().toLocaleString())}</div>`;
                    document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                    document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                    const timeCall=Math.round(Number(dataEndCall-new Date(data.start_datetime_iso)/1000));
                    console.log(timeCall);
                    addArchivalSession(responses.ID,String(dataEndCall.toISOString()),timeCall,timeCall,7);
                });
                document.getElementById("task-btn_sim").disabled = false;   
              },{once:true});
            }
            else{
              const btnEnd=document.getElementById('task-btn_cansel_flow');
            btnEnd.addEventListener('click',()=>{
              countSession=document.getElementById('quantity_calls').value;
              clearTimeout(timer);
              const data_cell=response.Nomera_zanyatyih_yacheek.concat(response.Nomera_zanyatyih_yacheek_pr);
              postRelaeseFrRes(data_cell,result.satellite_id).then(()=>{

                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                document.getElementById('response3').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
              
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <div>СОВ: Запрос на освобождение частотного ресурса </div>`;
                document.querySelector('.information_request').innerHTML+=` <div>СОВ: Время запроса:${new Date().toLocaleString()} </div>`;
                document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                document.querySelector('.information_request').innerHTML+=` <div>СУРР Продолжительность вызова: 
                ${(dataEndCall-new Date(dataSession.Data_Vyz))/1000} секунд</div>`;
                document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: 
                ${dataEndCall.toLocaleString()}</div>`;
          
                document.getElementById('response3').innerHTML+=` <div>СОВ: Запрос на освобождение частотного ресурса </div>`;
                document.getElementById('response3').innerHTML+=` <div>СОВ: Время запроса:${new Date().toLocaleString()} </div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                const timeCall=Math.round(Number((dataEndCall-new Date(data.start_datetime_iso))/1000));
                console.log(timeCall);
                addArchivalSession(responses.ID,String(dataEndCall.toISOString()),timeCall,timeCall,7);
              });
            },{once:true});
            }
          });
            
          }
          else{
            document.getElementById('response3').innerHTML+=`<div>СОВ:  Прогнозируемая продолжительность сеанса ,сек: ${randTime/1000}</div>`;
            let numPhone='';
            if(document.getElementById('abonent-select')){
              console.log(document.getElementById('abonent-select').value);
              document.querySelectorAll('.number').forEach((number)=>{
                console.log(number.innerHTML);
                if (number.classList.contains('show')) {
                  numPhone=number.innerHTML;
                }
                  
                  console.log(numPhone);
                
              });
            }
            let valueAbonent=0;
           if (document.getElementById('abonent-select')) {
            valueAbonent=Number(document.getElementById('abonent-select').value);
           }
            const dataSession={
              "ID_Zapros_Seans_Tek": 0,
              "Tlf1": numPhone,
              "ID_Abonent_T1": result.satellite_id,
              "ID_KA1": result.satellite_id,
              "ID_RSS1": 0,
              "Canal1": response.Nomera_zanyatyih_yacheek[0][1],
              "Time_Slot1": response.Nomera_zanyatyih_yacheek[0][0],
              "Canal_pr1": response.Nomera_zanyatyih_yacheek_pr[0][1],
              "Time_Slot_pr1": response.Nomera_zanyatyih_yacheek_pr[0][0],
              "Tlf2": "string",
              "ID_Abonent_T2": 0,
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
              "Time_Razg":'',
              "Id_Seans_Rez": 0
          }
          postActiveSession(dataSession).then(responses=>{
            setTimeout(function(){
              const data_cell=response.Nomera_zanyatyih_yacheek.concat(response.Nomera_zanyatyih_yacheek_pr);
              postRelaeseFrRes(data_cell,result.satellite_id).then(()=>{
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                document.querySelector('.information_request').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>СОВ: Время запроса: ${new Date().toLocaleString()}</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>CУРР: Продолжительность вызова ${randTime/1000} секунд</div>`;
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}:</div> <br>`;
                document.getElementById('response3').innerHTML+=`<br><div style="
                font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                document.getElementById('response3').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса</div>`;
                document.getElementById('response3').innerHTML+=`<div>СОВ: Время запроса: ${new Date().toLocaleString()}</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                const timeCall=Math.round(Number(randTime/1000));
                console.log(timeCall);
                    addArchivalSession(responses.ID,String(dataEndCall.toISOString()),timeCall,timeCall,1);
              });
              
            },randTime);
            if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов'){
              const btnEnd=document.getElementById('task-btn_cansel');
            btnEnd.addEventListener('click',()=>{
              document.getElementById("task-btn_sim").disabled = true;
              clearTimeout(timer);
              document.getElementById('response3').innerHTML+=`<br><div style="
                  font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                  document.getElementById('response3').innerHTML+=`<div >СОВ: Запрос на освобождение частотного ресурса</div>`;
                  document.getElementById('response3').innerHTML+=`<div >СОВ: Время запроса:${new Date().toLocaleString()}</div>`;
                  
                  document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                  document.querySelector('.information_request').innerHTML+=`<div>СОВ: Запрос на освобождение частотного ресурса </div>`;
                  document.querySelector('.information_request').innerHTML+=`<div>СОВ: Время запроса:${new Date().toLocaleString()} </div>`;
                  const data_cell=response.Nomera_zanyatyih_yacheek.concat(response.Nomera_zanyatyih_yacheek_pr);
                  postRelaeseFrRes(data_cell,result.satellite_id).then(()=>{
                    const dataEndCall=new Date();
               
                
                  document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                  // document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${dataEndCall} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>СУРР: Продолжительность вызова 
                  ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: 
                  ${dataEndCall.toLocaleString()}</div> <br>`;
                  
                  document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                  document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                  const timeCall=Math.round(Number((dataEndCall-new Date(data.start_datetime_iso))/1000));
                  console.log(timeCall);
                  addArchivalSession(responses.ID,String(dataEndCall.toISOString()),timeCall,timeCall,7);
              
              });
              document.getElementById("task-btn_sim").disabled = false;    
            },{once:true});
            }
            else{
              const btnEnd=document.getElementById('task-btn_cansel_flow');
            btnEnd.addEventListener('click',()=>{
              countSession=document.getElementById('quantity_calls').value;
              // document.getElementById("task-btn_sim").disabled = true;
              clearTimeout(timer);
              const data_cell=response.Nomera_zanyatyih_yacheek.concat(response.Nomera_zanyatyih_yacheek_pr);
              postRelaeseFrRes(data_cell,result.satellite_id).then(()=>{
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                        document.getElementById('response3').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                      
                        const dataEndCall=new Date();
                        document.querySelector('.information_request').innerHTML+=` <div>СОВ: Запрос на освобождение частотного ресурса </div>`;
                        document.querySelector('.information_request').innerHTML+=` <div>СОВ: Время запроса:${new Date().toLocaleString()} </div>`;
                        document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                        document.querySelector('.information_request').innerHTML+=` <div>СУРР Продолжительность вызова: 
                        ${(dataEndCall-new Date(dataSession.Data_Vyz))/1000} секунд</div>`;
                        document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: 
                        ${dataEndCall.toLocaleString()}</div>`;
                  
                        document.getElementById('response3').innerHTML+=` <div>СОВ: Запрос на освобождение частотного ресурса </div>`;
                        document.getElementById('response3').innerHTML+=` <div>СОВ: Время запроса:${new Date().toLocaleString()} </div>`;
                        document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                        document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                        const timeCall=Math.round(Number((dataEndCall-new Date(data.start_datetime_iso))/1000));
                        console.log(timeCall);
                        addArchivalSession(responses.ID,String(dataEndCall.toISOString()),timeCall,timeCall,7);
              });
              // document.getElementById("task-btn_sim").disabled = false;    
            },{once:true});
            }
          });
            
            
          }
         
          
        });
      }
   
      return result;
      
      
      
    }
   
  } catch (error) {
    console.error("Error:", error);
  }
}
async function postJSON(data) {
    try {
      const response = await fetch("http://185.192.247.60:7128/Database/TableInfo", {
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
      if (select.options[select.selectedIndex].text=='Выберите Абонента') {
        document.getElementById('response3').innerHTML+=`<div">Абонент:Абонент 1</div>`;
      }
      else{
        document.getElementById('response3').innerHTML+=`<div">Абонент:${select.options[select.selectedIndex].text}</div>`;
      }
     if (document.querySelector('h2').innerHTML=='Имитатор потока вызовов') {
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
          if (key=='duration_in_sec') {
            document.getElementById('response3').innerHTML+=`<br><span style="
            font-size: calc(1.2rem);">Запрос: </span>`;
           }
          // else  if (key=='end_datetime_iso') {
          //   document.getElementById('response3').innerHTML+=`<div>${key}: ${new Date(values).toLocaleString()}</div>`;
          //   document.getElementById('response3').innerHTML+=`<div>Максимальная продолжительность вызова : ${(new Date(values)-new Date(data.start_datetime_iso))/1000}</div>`;
          //   console.log(new Date(values));
          //   console.log(new Date(data.start_datetime_iso));
          // }
          // else  if (key=='start_datetime_iso') {
          //   document.getElementById('response3').innerHTML+=`<div>${key}: ${new Date(values).toLocaleString()}</div>`;
          // }
          // else{
          //   document.getElementById('response3').innerHTML+=`<div>${key}: ${values}</div>`;
          // }
         
          
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
          if (key=='start_datetime_iso') {
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
          else if (key=='min_duration_in_sec') {
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
          
          if (key=='name') {
           
            charKA.style=` font-size: calc(1.2rem);`;
            charKA.textContent="Характеристики КА:";
            // createInformationRequest.innerHTML+=`<div style="
            // font-size: calc(1.2rem);">Характеристики КА:</div>`;
           
            charKA.innerHTML+=`<div>Наименование КА: ${result.satellite_name} ${values}</div>`;
            
          }
          else if (key=='lat') {
            // createInformationRequest.innerHTML+=`<br><div>Вызов:</div>`;
            createInformationRequest.innerHTML+=`<br><div style="
            font-size: calc(1.2rem);">Характеристики Абонента:</div>`;
            createInformationRequest.innerHTML+=`<div>Широта, градусы: ${values}</div>`;
          }
          else if (key=='lon') {
            createInformationRequest.innerHTML+=`<div>Долгота, градусы: ${values}</div><br>`;
          }
          else if (key=='radius') {
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
    // document.getElementById('response3').innerHTML+=`<br><div class="header-log" style="display: block;">Доступный КА:</div>`;  
  for (const [key, value] of Object.entries(result)) {
    if (typeof(value)!='object') {
      if (key=='duration_in_sec') {
        document.getElementById('response3').innerHTML+=`<div class="total-time"> total_duration_in_sec: ${value}</div>`;
      }
      else {
        
        document.getElementById('response3').innerHTML+=`<div>${key}: ${value}</div>`;
      }
     
    }
   else{
    for (const [key, values] of Object.entries(value)){
      if (key=='duration_in_sec') {
        document.getElementById('response3').innerHTML+=`<div class="total-time"> total_duration_in_sec: ${values}</div> <br><span style="
        font-size: calc(1.2rem);">Запрос: </span>`;
      }
      else  if (key=='end_datetime_iso') {
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
        if (key=='start_datetime_iso') {
          createInformationRequest.innerHTML+=`<br><div style="
          font-size: calc(1.2rem);">Начало сеанса связи:</div>`; 
          createInformationRequest.innerHTML+=`<div>СОВ:Время инициирования сеанса связи: ${new Date(value.toLocaleString())}</div>`;
          document.getElementById('response3').innerHTML+=`<div>СОВ: Инициирование сеанса связи</div>`;
          document.getElementById('response3').innerHTML+=`<br><div>СОВ:Время инициирования сеанса связи: ${new Date(value).toLocaleString()}` ;
          // const div=document.createElement('div');
          // div.textContent=`Время инициирования сеанса связи: ${value}`;
          // document.getElementById('long-res').after(div); 
        }
        else if (key=='min_duration_in_sec') {
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
        
        if (key=='name') {
         
          charKA.style=` font-size: calc(1.2rem);`;
          charKA.textContent="Характеристики КА:";
          // createInformationRequest.innerHTML+=`<div style="
          // font-size: calc(1.2rem);">Характеристики КА:</div>`;
         
          charKA.innerHTML+=`<div>Наименование КА: ${result.satellite_name} ${values}</div>`;
          
        }
        else if (key=='lat') {
          // createInformationRequest.innerHTML+=`<br><div>Вызов:</div>`;
          createInformationRequest.innerHTML+=`<br><div style="
          font-size: calc(1.2rem);">Характеристики Абонента:</div>`;
          createInformationRequest.innerHTML+=`<div>Широта, градусы: ${values}</div>`;
        }
        else if (key=='lon') {
          createInformationRequest.innerHTML+=`<div>Долгота, градусы: ${values}</div><br>`;
        }
        else if (key=='radius') {
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
  // document.getElementById('response3').innerHTML='';
  
  
  
 
}
async function postOcFrREs(stId,type,reception,transmission){
  try {
    const response = await fetch(`http://185.192.247.60:7130/CommunicationAvailability/OccupyFrequencyResource?satellite_id=${stId}&number_of_cells_for_reservation=${type}&number_of_cells_for_reception=${reception}&number_of_cells_for_transmission=${transmission}`, {
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
      const randLong=getRandomNumber(27,169)
      const randLat=getRandomNumber(41,77)
      document.getElementById('lat3').value=randLat;
      document.getElementById('lon3').value=randLong;
      // document.getElementById('latitude-res').innerHTML=`Широта, градусы: ${randLat}`;
      // document.getElementById('long-res').innerHTML=`Долгота, градусы: ${randLong}`;

    });
    // document.getElementById('latitude-res').innerHTML+=document.getElementById('lat3').value;
    //   document.getElementById('long-res').innerHTML+=document.getElementById('lon3').value;
    document.getElementById("task-btn_cansel").disabled = true;
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
   
    console.log(numberTime);
    console.log(timeVal);
    // timeControl.value=getDateTime().substring(11,19);
    console.log(dateControl.value);
    console.log(timeControl.value);
    let timeSelf=`${dateControl.value}T0${numberTime-3}${timeControl.value.substring(2,10)}.000Z`;
    console.log(timeSelf);
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
        timeSelf=`${dateControl.value}T${timeControl.value}.000Z`;
        data.start_datetime_iso= timeSelf;
      }
      
      // document.getElementById('response3').innerHTML='';
      if (document.querySelector('.information_request')) {
        // document.querySelector('.information_request').remove();
      }
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
      const randLong=getRandomNumber(27,169)
      const randLat=getRandomNumber(41,77)
      document.getElementById('lat4').value=randLat;
      document.getElementById('lon4').value=randLong;
      // document.getElementById('latitude-res').innerHTML=`Широта, градусы: ${randLat}`;
      // document.getElementById('long-res').innerHTML=`Долгота, градусы: ${randLong}`;

    });
    btnFlawStart.addEventListener('click',()=>{
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
      function setIntervalImmediately(func, interval) {
        func(); // Немедленное исполнение функции
        return setInterval(func, interval); // Затем функция продолжает работать по интервалу
      }
      const timerCalls=setIntervalImmediately(nextCall,timeTimers*1000)
      
      
      const time=setInterval(function(){
        if (countSession==quantyCalls) {
            clearTimeout(timerCalls);
           
            console.log(countSession);
            clearTimeout(time);
        }
    },100);
      
     
    
      // console.log(countSession);
      // clearInterval(timerCalls);
     
   

  
    });
    
  }
}
if (document.getElementById('abonent-select')) {
  const select = document.getElementById('abonent-select');
let number = document.querySelectorAll('.number');
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





