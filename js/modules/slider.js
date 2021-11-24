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

export default slider;