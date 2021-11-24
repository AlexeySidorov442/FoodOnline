function timer(id, deadline){
    
    //Получение разницы между датами
    function getRemainingTime(endtime) {
        //Разница между целевой и текущей датой
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    //Перевод однозначных чисел к формату `00`
    function zeroFormat(value) {
        if (value >= 0 && value < 10) {
            return `0${value}`;
        } else
            return value;
    }

    //Установка новых значений с интервалом в 1 секунду
    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            interval = setInterval(updateClock, 1000);

        //Для начальной загрузки, не дожидаясь 1 секунды
        updateClock();

        function updateClock() {
            const t = getRemainingTime(endtime);

            days.textContent = zeroFormat(t.days);
            hours.textContent = zeroFormat(t.hours);
            minutes.textContent = zeroFormat(t.minutes);
            seconds.textContent = zeroFormat(t.seconds);

            if (t <= 0) {
                clearInterval(interval);
            }
        }
    }

    setClock(id, deadline);
}

export default timer;