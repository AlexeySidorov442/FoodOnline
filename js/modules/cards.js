import {getResourses} from "../services/services";

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


    getResourses("http://localhost:3000/menu")
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

export default cards;