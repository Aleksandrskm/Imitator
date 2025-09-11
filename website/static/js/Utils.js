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
}