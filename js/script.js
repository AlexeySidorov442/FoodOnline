import tabs from "./modules/tabs";
import  modal from "./modules/modal";
import  forms from "./modules/forms";
import  calc from "./modules/calc";
import  timer from "./modules/timer";
import  cards from "./modules/cards";
import  slider from "./modules/slider";
import {openModalWindow} from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {  
    const modalTimerId = setTimeout(()=>openModalWindow(".modal", modalTimerId), 50000);

    tabs(".tabheader__item", ".tabheader__items", ".tabcontent", "tabheader__item_active");
    modal("button[data-modal]",".modal", modalTimerId);
    timer(".timer", "2022-01-27");
    cards();
    calc();
    forms("form", modalTimerId);
    slider({
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