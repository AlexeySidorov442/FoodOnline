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

export default tabs;