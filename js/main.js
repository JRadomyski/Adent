const yearInFooter = document.querySelector('.footer__year');
const menuBtn = document.getElementById("menubtn");
const sideNav = document.getElementById("sideNav");
const menu = document.getElementById("menu");

sideNav.style.right = "-250px";

menuBtn.onclick = function() {
    if (sideNav.style.right == "-250px") {
        sideNav.style.right = "0";
        menu.src = "img/icons/x.svg";
    } else {
        sideNav.style.right = "-250px";
        menu.src = "img/icons/menu.svg";
    }
}

document.addEventListener('click', function(event) {
    const isClickInside = sideNav.contains(event.target) || menuBtn.contains(event.target);

    if (!isClickInside && sideNav.style.right === "0px") {
        sideNav.style.right = "-250px";
        menu.src = "img/icons/menu.svg";
    }
});

const CurrentYear = () => {
    const year = (new Date).getFullYear();
    yearInFooter.innerText = year;
}

CurrentYear();

const photo = document.querySelectorAll(".photo img");
const popUp = document.querySelector(".popup");
const popUpClose = document.querySelector(".popup__close");
const popupImg = document.querySelector(".popup__img");
const arrowLeft = document.querySelector(".popup__arrow--left");
const arrowRight = document.querySelector(".popup__arrow--right");

let currentImgIndex;

const showNextImg = () => {
    if (currentImgIndex === photo.length - 1) {
        currentImgIndex = 0;
    } else {
        currentImgIndex++;
    }
    popupImg.src = photo[currentImgIndex].src;
};

const showPreviousImg = () => {
    if (currentImgIndex === 0) {
        currentImgIndex = photo.length - 1;
    } else {
        currentImgIndex--;
    }
    popupImg.src = photo[currentImgIndex].src;
};

const closePopup = () => {
    popUp.classList.add("fade-out");
    setTimeout(() => {
        popUp.classList.add("hidden");
        popUp.classList.remove("fade-out");
        photo.forEach((element) => {
            element.setAttribute("tabindex", 1);
        });
    }, 300);
};

photo.forEach((thumbnail, index) => {
    const showPopup = (e) => {
        popUp.classList.remove("hidden");
        popupImg.src = e.target.src;
        currentImgIndex = index;
        photo.forEach((element) => {
            element.setAttribute("tabindex", -1);
        });
    };

    thumbnail.addEventListener("click", showPopup);

    thumbnail.addEventListener("keydown", (e) => {
        if (e.code === "Enter" || e.keyCode === 13) {
            showPopup(e);
        }
    });
});

popUpClose.addEventListener("click", closePopup);
arrowRight.addEventListener("click", showNextImg);
arrowLeft.addEventListener("click", showPreviousImg);

document.addEventListener("keydown", (e) => {
    if (!popUp.classList.contains("hidden")) {
        if (e.code === "ArrowRight" || e.keyCode === 39) {
            showNextImg();
        }
        if (e.code === "ArrowLeft" || e.keyCode === 37) {
            showPreviousImg();
        }
        if (e.code === "Escape" || e.keyCode === 27) {
            closePopup();
        }
    }
});

popUp.addEventListener("click", (e) => {
    if (e.target === popUp) {
        closePopup();
    }
});
