export  class Utils{
    static #testUrl=`127.0.0.1:8000`
    static #url=`185.192.247.60:7130`;
    /**
     * Создает число в заданном диапазоне.
     * @param  {Number }min - минимальное значение числа.
     * @param {Number} max - максимальное значение числа.
     */
    static  getRandomNumber(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min) + min)
    }
    /**
     * Выборка данных из таблиц по собственному запросу
     * @param {String} query -запрос на выборку
     */
     static async selectQuery(query){
        try {
            console.log((query))
            const response =await fetch(`http://${this.getTestUrl()}/db/custom_select_query`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                'body':`"${query}"`,
            })
            const result = await response.json();
            console.log(`Success:`, result);
            return result;
        } catch (error) {
            console.error(`Error:`, error);
        }
    }
    /**
     * Преобразует текущую дату в нужный формат для отображения.
     */
    static getDateTime() {
        let now     = new Date();
        let year    = now.getFullYear();
        let month   = now.getMonth()+1;
        let day     = now.getDate();
        let hour    = now.getHours();
        let minute  = now.getMinutes();
        let second  = now.getSeconds();
        if(month.toString().length === 1) {
            month = '0'+month;
        }
        if(day.toString().length === 1) {
            day = '0'+day;
        }
        if(hour.toString().length === 1) {
            hour = '0'+hour;
        }
        if(minute.toString().length === 1) {
            minute = '0'+minute;
        }
        if(second.toString().length === 1) {
            second = '0'+second;
        }

        return  `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    }

    /**
     * Получение даты для сеанса связи в нужном формате.
     * @param  {Element }dateControl - минимальное значение числа.
     * @param {Element} timeControl - максимальное значение числа.
     */
    static getDateTimes(dateControl,timeControl){
        let dateControlYear=+dateControl.value.substring(0,4);
        let dateControlMonth=+dateControl.value.substring(5,7);
        let dateControlDay=+dateControl.value.substring(8,10);
        let timeHouse=Number(`${timeControl.value[0]}${timeControl.value[1]}`);
        let timeMin=+(`${timeControl.value[3]}${timeControl.value[4]}`);
        let timeSec=+(`${timeControl.value[6]}${timeControl.value[7]}`);
        const dateTime=new Date(dateControlYear,dateControlMonth-1,dateControlDay,timeHouse,timeMin,timeSec);
        return dateTime
    }

    /**
     * Получение URL для отправки запросов на сервер
     */
    static getUrl(){
        return this.#url
    }

    /**
     * Получение URL для отправки запросов на тестовый сервер
     */
    static  getTestUrl(){
        return this.#testUrl;
    }

    /**
     * Отображение абонентов и их номеров на сайте
     * @param  {String }selectorSelect - селектор выбора абонентов.
     * @param {String} selectorPhoneNumber - селектор для отображения номеров абонентов.
     */
    static viewAbonents(selectorSelect,selectorPhoneNumber) {

        if(document.getElementById(selectorSelect)) {

            const select = document.getElementById(selectorSelect);
            let number = document.querySelectorAll(selectorPhoneNumber);

            let lastIndex = 0;
            number[lastIndex].classList.add("show");
            number[lastIndex].classList.remove ("hide");
            select.addEventListener('change', function() {
                console.log(number[lastIndex]);
                number[lastIndex].classList.remove ("hide");
                number[lastIndex].classList.remove ("show");
                let index = select.selectedIndex;
                if (!index) {
                    number[lastIndex].classList.remove ("hide");
                    number[lastIndex].classList.remove ("show");
                    number[index].classList.add("show");
                }
                else{
                    number[index].classList.add("show"); // Показать блок с соответствующим индексом
                    number[index].classList.remove ("hide");
                    number[lastIndex].classList.remove ("show");
                }
                lastIndex = index;
            });
        }
    }
    /**
     * Отображение абонентов на странице.
     * @param  {Object} abonents - данные по всем абонентам связи.
     */
    static  createCountAbs(abonents){
        const elementCountAbonents=document.createElement("div");
        const elementSelectCount=document.createElement("select");
        elementSelectCount.classList.add("select");
        elementSelectCount.name="count-abonents";
        elementSelectCount.id="abonent-select-count";
        elementCountAbonents.classList.add("count-abonents");
        abonents.forEach((abonent,index)=>{
            const elementOptionalAbonent=document.createElement("option");
            elementOptionalAbonent.value=index+1;
            elementOptionalAbonent.innerText=index+1;
            elementSelectCount.append(elementOptionalAbonent);
        })
        elementSelectCount.addEventListener("change", (e)=>{
            console.log(e.target.value);
            document.querySelector(".test-ab").innerHTML=``;
            Utils.viewAllAbonents(abonents,e.target.value);
        })
        console.log(elementSelectCount[1])
        elementSelectCount[1].selected=true
        document.querySelector('#count-abs').append(elementSelectCount);

    }
    /**
     * Отображение абонентов на странице.
     * @param  {Object} abonents - данные по всем абонентам связи.
     * @param  {Number} countAbs - кол-во абонентов.
     */
    static viewAllAbonents(abonents,countAbs){
        for (let i = 0; i < countAbs; i++) {
            const elementAbonent= document.createElement("details");
            const elementAbonentSum= document.createElement("summary");
            if(i === 0){
                elementAbonentSum.innerText=`Вызывающий абонент`;
            }
            else {

                    elementAbonentSum.innerText=`Вызываемый абонент`;

            }

            elementAbonent.append(elementAbonentSum);
            elementAbonent.innerHTML+=`
                    <div class="data-abonent">
                    <span>Принадлежность абонента к МСПСС Гонец_М1: </span>
                    <select class="select" name="affiliation" id="affiliation-id" disabled>
                        <option>да</option>
                    </select>
                </div>
                <div class="data-abonent">
                    <span>Задать координаты абонента :</span>
                    <div class="radio-dvi">
                        <br>
                        <input id="hand_coord${i}" type="radio" value="1" name=radio-coord${i} class="time_call">
                        <label for="hand_coord${i}">Вручную</label>
                        <input id="rand_coord${i}" type="radio" value="1" name=radio-coord${i} class="time_call coord-rand" checked="">
                        <label for="rand_coord${i}">Случайным образом</label>
                        <img class="re-date re${i}" src="../static/img/re.png">
                    </div>
                </div>
                <div class="data-abonent">
                        <div>Координаты абонента:</div>
                        <label for="lat${i}">Широта, градусы</label>
                        <input id="lat${i}" class="input_abs" type="number" value="51">
                        <label for="lon${i}">Долгота, градусы</label>
                        <input id="lon${i}" class="input_abs" type="number" value="39">
                        <!--            <span>Минимальная продолжительность сеанса,сек</span>-->
                        <!--            <input id="min-call-time" type="text" value="30">-->
                    </div>
                <div class="data-abonent">
                    <span>Размещение абонента: </span>
                    <span>Страна: </span>
                    <select class="select" name="subscriber-placement" id="subscriber-placement-id" disabled>
                        <option>Россия</option>
                    </select>
                    <span>Регион: </span>
                    <select class="select" disabled>
                        <option>Все регионы</option>
                    </select>

                </div>
`
            const elementSelectAbonent=document.createElement("select");
            elementSelectAbonent.classList.add("select");
            elementSelectAbonent.classList.add("abs");
            elementSelectAbonent.name=`abonents${i}`;
            elementSelectAbonent.id=`abonent-select${i}`;

            // const elementCountAbonents=document.createElement("div");
            // const elementSelectCount=document.createElement("select");
            // elementSelectCount.classList.add("select");
            // elementSelectCount.name="count-abonents";
            // elementSelectCount.id="abonent-select-count";
            // elementCountAbonents.classList.add("count-abonents");
            // abonents.forEach((abonent,index)=>{
            //     const elementOptionalAbonent=document.createElement("option");
            //     elementOptionalAbonent.value=abonent.ID;
            //     elementOptionalAbonent.innerText=abonent.ID;
            //     elementSelectCount.append(elementOptionalAbonent);
            // })
            // document.querySelector('#count-abs').append(elementSelectCount);
            const elementName=document.createElement("span");

            elementName.innerText=`Абонент: `;
            abonents.forEach((abonent,index)=>{
                const elementOptionalAbonent=document.createElement("option");
                const elementPhoneNumber=document.createElement("span");
                if (index==0){
                    elementPhoneNumber.classList.add("hide");
                }else {
                    elementPhoneNumber.classList.add("hide");
                }

                elementPhoneNumber.classList.add("number");
                elementPhoneNumber.classList.add(`ab${i}`);
                elementOptionalAbonent.value=abonent.ID;
                elementOptionalAbonent.innerText=`${abonent.Family} ${abonent.Name} ${abonent.Surname}`;
                elementPhoneNumber.innerText=`Номер телефона:${abonent.Tlf}`;
                elementSelectAbonent.append(elementOptionalAbonent);

                elementAbonent.prepend(elementPhoneNumber);
                elementAbonent.prepend(elementSelectAbonent);

                document.querySelector(".test-ab").append(elementAbonent);

            })
            elementAbonent.prepend(elementName);
            const imgRe=document.querySelector(`.re${i}`);
            imgRe.addEventListener('click',()=>{
                if (document.querySelector('.coord-rand').checked) {
                    const randLong=Utils.getRandomNumber(27,169)
                    const randLat=Utils.getRandomNumber(41,77)
                    document.getElementById(`lat${i}`).value=randLat;
                    document.getElementById(`lon${i}`).value=randLong;
                    // const latData=[];
                    // const lonData=[];
                    // const absData=[];
                    // document.querySelectorAll('select.abs').forEach(select=>{
                    //     console.log(select[select.selectedIndex].innerHTML)
                    //
                    //     absData.push(select[select.selectedIndex].innerHTML);
                    // });
                    //
                    //     document.querySelectorAll('input.input_abs').forEach((select,index)=>{
                    //         if (index%2==0){
                    //             latData.push(select.value);
                    //             console.log(select.value)
                    //         }
                    //         else {
                    //             lonData.push(select.value);
                    //         }
                    //
                    //     });

                    // console.log(absData)
                    // console.log('latData',latData)
                    // console.log('lonData',lonData)

                }
            });
            Utils.viewAbonents(`abonent-select${i}`,`.ab${i}`);
        }

    }
}