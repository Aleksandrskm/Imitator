'use strict';
import {Utils} from "./Utils.js";
import {ImitatorUtils} from "./ImitatorUtils.js";
import {Loader} from "./Loader.js";
function release_all_frequency_resources(){
    const url = `http://${Utils.getUrl()}/CommunicationAvailability/ReleaseAllFrequencyResources?ist=71`;
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
  const url = `http://${Utils.getUrl()}/CommunicationAvailability/ClearActiveSessions?ist=71`;
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
// example usage: realtime clock
setInterval(function(){
    document.getElementById("timer").innerHTML = Utils.getDateTime();
}, 0);
const modal = document.getElementById("myModal");
const btn = document.getElementById("openModal");
const span = document.getElementsByClassName("close")[0];
// let countSession=0;
btn.addEventListener("click", ()=>{modal.style.display = "flex"});
span.addEventListener("click", ()=>{modal.style.display = "none"});
document.querySelector('#clear_btn').addEventListener('click', release_all_frequency_resources)
// Utils.viewAbonents('abonent-select','.number');
// Utils.viewAbonents('abonent-select-rec','.number-rec')


