
// Modal window Component
function modalWindow(buttonId, modalId) {
    const open = document.querySelector(buttonId);
    const modal = document.querySelector(modalId);
    const close = modal.querySelector('.modal-close');
    open.addEventListener('click', function () {
        modal.classList.add('modal-content-show');
    });
    close.addEventListener('click', function () {
        modal.classList.remove('modal-content-show');
    });
    let inputTel = document.querySelector('[type=tel]');
    inputTel.addEventListener('focus', function () {
        inputTel.value = '+380';
    });
}
// Dropdown Menu
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropDown(dropId) {
    const button = document.querySelector(dropId);
    button.classList.toggle("sub-menu-show");
    button.classList.toggle("sub-menu-show-labtop");

    button.addEventListener('blur', function (event) {
        button.classList.remove("sub-menu-show");
        button.classList.remove("sub-menu-show-labtop");
    });
}
// Close the dropdown menu if the user clicks outside of it
window.addEventListener('click', function (event) {
    if (!event.target.matches('.sub-menu__btn')) {
        const dropdowns = document.getElementsByClassName("sub-menu__container");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('sub-menu-show')) {
                openDropdown.classList.remove('sub-menu-show');
            }
            if (openDropdown.classList.contains('sub-menu-show-labtop')) {
                openDropdown.classList.remove('sub-menu-show-labtop');
            }
        }
    }
});


/*
// Dropdown Menu Component
function dropdown() {
    var subMenu = document.querySelectorAll('sub-menu');
    for (var j = 0; j <= subMenu.length; j++) {
        var button = subMenu[j].querySelector('.sub-menu__btn');
        var clearItems = document.getElementsByClassName('sub-menu-js');
        console.log(clearItems);
        // var subMenuContainer = subMenu.querySelector('.sub-menu__container');
        // subMenuContainer.classList.add('sub-menu-js');
        button.addEventListener('click', function (event) {
            event.preventDefault();
            if (this.nextElementSibling.classList.contains('sub-menu-show')) {
                this.nextElementSibling.classList.remove('sub-menu-show');
                return true
            }
            else {
                for (var i = 0; i <= clearItems.length; i++) {
                    console.log("++" + clearItems[i]);
                    //clearItems[i].classList.remove('sub-menu-show');
                }
            }
            this.nextElementSibling.classList.add('sub-menu-show');
        });

    }
}
dropdown();
*/

