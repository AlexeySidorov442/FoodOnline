/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
    const result = document.querySelector(".calculating__result span");
    let sex, height, weight, age, ratio;

    if(localStorage.getItem("sex")){
        sex = localStorage.getItem("sex");
    }else{
        sex="female";
        localStorage.setItem("sex", sex);
    }

    if(localStorage.getItem("ratio")){
        ratio=localStorage.getItem("ratio");
    } else{
        ratio=1.375;
        localStorage.setItem("ratio", ratio);
    }

    function initLocalStorage(selector, activeClass){
        const elems = document.querySelectorAll(selector);

        elems.forEach(elem=>{
            elem.classList.remove(activeClass);

            if(elem.getAttribute("id")==localStorage.getItem("sex")){
                elem.classList.add(activeClass);
            }

            if(+elem.getAttribute("data-ratio")==localStorage.getItem("ratio")){
                elem.classList.add(activeClass);
            }
        });

    }


    initLocalStorage("#gender div", "calculating__choose-item_active");
    initLocalStorage(".calculating__choose_big div", "calculating__choose-item_active");

    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = "____";
            return;
        } 

        if(sex=="female"){
            result.textContent = ((447.6 + (9.2*weight) + (3.1*height) - (4.3*age)) * ratio).toFixed(0);
        } else{
            result.textContent = (88.36 + (13.4 *weight) + (4.8 *height) - (5.7 *age) * ratio).toFixed(0);
        }
    }
    calcTotal();

    function staticInformation(selector, activeClass){
        const elements = document.querySelectorAll(selector);
        console.log(elements);

        elements.forEach(elem=>{
            elem.addEventListener("click", (e)=>{
                if(!e.target.getAttribute("data-ratio")){
                    sex = e.target.getAttribute("id");
                    localStorage.setItem("sex", e.target.getAttribute("id"));
                } else{
                    ratio = +e.target.getAttribute("data-ratio");
                    localStorage.setItem("ratio",+e.target.getAttribute("data-ratio"));
                }
                console.log(sex,ratio);
                elements.forEach(item=>{
                    item.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    function dynamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener("input",()=>{

            if(input.value.match(/\D/g)){
                input.style.border="1px solid red";
            } else{
                input.style.border="none";
            }

            switch (input.getAttribute("id")){
                case "height":
                    height= +input.value;
                    break;
                case "weight":
                    weight= +input.value;
                    break;
                case "age":
                    age= +input.value;
                    break;
            }
            calcTotal();
        });
    }


    staticInformation("#gender div", "calculating__choose-item_active");
    staticInformation(".calculating__choose_big div", "calculating__choose-item_active");
    dynamicInformation("#height");
    dynamicInformation("#weight");
    dynamicInformation("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    class MenuItem {
        constructor(src, alt, title, text, price, parrentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.transfer = 27;
            this.changeToUAH();
            this.parrent = document.querySelector(parrentSelector);
            this.classes = classes;
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        createItem() {
            const element = document.createElement("div");

            if (this.classes.length === 0) {
                this.element = "menu__item";
                element.classList.add(this.element);

            } else {
                this.classes.forEach(className => element.classList.add(className));

            }
            element.innerHTML = `
                
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.text}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
    
        `;

            this.parrent.append(element);
        }

    }


    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResourses)("http://localhost:3000/menu")
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuItem(img, altimg, title, descr, price, ".menu .container").createItem();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formsSelector, modalTimerId){
    const forms = document.querySelectorAll(formsSelector);
    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо, скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    

    function bindPostData(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });



        });
    }


    //SHOW STATUS POST REQUEST

    function showThanksModal(message) {
        const previusModalDialog = document.querySelector(".modal__dialog");

        previusModalDialog.classList.add("hide");
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModalWindow)(".modal", modalTimerId);


        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");

        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

        document.querySelector(".modal").append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            previusModalDialog.classList.add("show");
            previusModalDialog.classList.remove("hide");
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModalWindow)(".modal");
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModalWindow": () => (/* binding */ openModalWindow),
/* harmony export */   "closeModalWindow": () => (/* binding */ closeModalWindow)
/* harmony export */ });
 //Открытия модального окна
 function openModalWindow(modalSelector, modalTimerId) {
     //Добавление класса отвечающего за отображение
     const modalWindow = document.querySelector(modalSelector);
     modalWindow.classList.add('show');
     modalWindow.classList.remove('hide');

     //Свойство убирает возможность скролить
     document.body.style.overflow = "hidden";

     //Обнуление таймера, который отображает модальное окно автоматически
     clearTimeout(modalTimerId);
 }


 //Закрытие модального окна
 function closeModalWindow(modalSelector) {

    const modalWindow = document.querySelector(modalSelector);
     //Удаление класса отвечающего за отображение
     modalWindow.classList.add('hide');
     modalWindow.classList.remove('show');

     //Установка значения слайдера для автоматического определения
     document.body.style.overflow = "";
 }

 function modal(triggerSelector, modalSelector, modalTimerId) {
     const modalTrigger = document.querySelectorAll(triggerSelector),
         modalWindow = document.querySelector(modalSelector);

         modalTrigger.forEach(btn => {
            btn.addEventListener("click", ()=>openModalWindow(modalSelector, modalTimerId));
        });

     modalWindow.addEventListener("click", (event) => {
         if (event.target === modalWindow || event.target.getAttribute('data-close') == "") {
             closeModalWindow(modalSelector);
         }
     });

     document.addEventListener("keydown", (event) => {
         if (event.code === "Escape" && modalWindow.classList.contains("show")) {
             closeModalWindow(modalSelector);
         }
     });


     function showModalByScroll() {
         if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
             openModalWindow(modalSelector,modalTimerId);
             window.removeEventListener("scroll", showModalByScroll);
         }
     }

     window.addEventListener("scroll", showModalByScroll);

 }

 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

 
 

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let offset = 0;
    let slideIndex = 1;

    slidesField.style.display = "flex";
    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.transition = "0.5s all";

    slidesWrapper.style.overflow = "hidden";

    slides.forEach(slide => {
        slide.style.width = width;
    });


    slider.style.position = "relative";

    const indicators = document.createElement("ol");
    indicators.classList.add("carousel-indicators");
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);
    const dots = [];

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.classList.add("dot");
        dot.setAttribute("data-slide-index", i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }



    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }


    function replaceNoDigits(str){
        return +str.replace(/\D/g, "");
    }

    next.addEventListener("click", () => {

        if (offset == replaceNoDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += replaceNoDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentSlideChange(slides, current, slideIndex);

        activityDot(dots, slideIndex - 1, .5);
    });


    prev.addEventListener("click", () => {

        if (offset == 0) {
            offset = replaceNoDigits(width) * (slides.length - 1);
        } else {
            offset -= replaceNoDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentSlideChange(slides, current, slideIndex);

        activityDot(dots, slideIndex - 1, .5);
    });

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-index");

            slideIndex = slideTo;

            offset = replaceNoDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;


            currentSlideChange(slides, current, slideIndex);

            activityDot(dots, slideIndex - 1, .5);
        });
    });

    function activityDot(arr, index, opacity) {
        arr.forEach(item => item.style.opacity = opacity);
        arr[index].style.opacity = 1;
    }

    function currentSlideChange(arr, textField, value) {
        if (arr.length < 10) {
            textField.textContent = `0${value}`;
        } else {
            textField.textContent = value;
        }
        
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsParrentSelector, tabsContentSelector, activeClass) {
    const tabsParrent = document.querySelector(tabsParrentSelector),
        tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = "none";
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });

    }

    function showTabContent(index = 0) {
        tabsContent[index].style.display = "block";
        tabs[index].classList.add(activeClass);
    }

    tabsParrent.addEventListener("click", (event) => {
        let target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, index) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });

    hideTabContent();
    showTabContent();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResourses": () => (/* binding */ getResourses)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: data
    });

    return await res.json();
};

const getResourses = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener("DOMContentLoaded", () => {  
    const modalTimerId = setTimeout(()=>(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModalWindow)(".modal", modalTimerId), 50000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabheader__items", ".tabcontent", "tabheader__item_active");
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("button[data-modal]",".modal", modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_4__["default"])(".timer", "2022-01-27");
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])("form", modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map