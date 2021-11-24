import {openModalWindow, closeModalWindow} from "./modal";
import {postData} from "../services/services";

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

            postData("http://localhost:3000/requests", json)
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
        openModalWindow(".modal", modalTimerId);


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
            closeModalWindow(".modal");
        }, 4000);
    }
}

export default forms;