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

 export default modal;

 export {
     openModalWindow
 };
 export {
     closeModalWindow
 };