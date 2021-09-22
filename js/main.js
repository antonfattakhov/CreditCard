// Подключение слайдера

(function () {

    let serviceSlider = new Swiper('.service-swiper', {
        loop: true,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        speed: 1000,
        slidesPerView: 4,
    });

    const breakpoint = window.matchMedia("(max-width: 768px)");
    const breakpoint2 = window.matchMedia("(max-width: 650px)");
    if (breakpoint.matches) {
        serviceSlider.params.slidesPerView = 3;
    }
    if (breakpoint2.matches) {
        serviceSlider.params.slidesPerView = 2;
        serviceSlider.params.spaceBetween = 15;
    }
    breakpoint.addEventListener('change', () => {
        // Перезагрузка страницы, чтобы раскрытие карточек было адекватным(только для проверок при resize)
        location.reload();
        // Изменение количества показывающих слайдов
        serviceSlider.params.slidesPerView = 3;
    });
    breakpoint2.addEventListener('change', () => {
        // Перезагрузка страницы, чтобы раскрытие карточек было адекватным(только для проверок при resize)
        location.reload();
        // Изменение количества показывающих слайдов
        serviceSlider.params.slidesPerView = 2;
        serviceSlider.params.spaceBetween = 15;
    });

}());


// Хэдер

(function () {
    const header = document.querySelector('.header');
    function changeheader () {
        if (window.pageYOffset > 66) {
            header.classList.add('header_active');
        }
        else {
            header.classList.remove('header_active')
        }
    };
    window.addEventListener('scroll', changeheader);
}());


// Бургер

let header = document.querySelector('.header');

(function () {
    
    const burger = document.querySelector('.burger-js');
    const menu = document.querySelector('.header__menu');
    const menuLinks = document.querySelectorAll('.nav__link');
    
    function burgerClick () {
        menu.classList.toggle('header__menu_active');
        burger.classList.toggle('header__burger_active');
        if (burger.classList.contains('header__burger_active')) {
            menuLinks.forEach(each => {each.addEventListener('click', linkClick)});
            hideScroll();
        } else {
            showScroll();
            menuLinks.forEach(each => {each.removeEventListener('click', linkClick)}); 
        }  
    };
    function linkClick () {
        menu.classList.toggle('header__menu_active');
        burger.classList.toggle('header__burger_active');
        menuLinks.forEach(each => {each.removeEventListener('click', linkClick)});
        showScroll();
    };
   
    burger.addEventListener('click', burgerClick);
}());


// Скролл

(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.nav__link-js');
        links.forEach(each => {each.addEventListener('click', function () {
            const currentTarget = this.getAttribute('href');
            smoothScroll(currentTarget, 1000);
            })
        });
    };
    scrollTo();
}());


// Скрытие/Показ скролла

function hideScroll () {
    
    const getScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    header.style.paddingRight = `${getScrollbarWidth}px`;
    document.body.style.paddingRight = `${getScrollbarWidth}px`;
    document.body.style.overflowY = 'hidden';
    document.body.addEventListener('touchmove', hideforIOS, { passive: false });
    window.addEventListener('keydown', pressEsc);
} 

function hideforIOS (event) {
    event.preventDefault();
}

function showScroll (event) {

    header.style.paddingRight = '';
    document.body.style.paddingRight = '';
    document.body.style.overflowY = 'visible';
    document.body.removeEventListener('touchmove', hideforIOS);
    window.removeEventListener('keydown', pressEsc);
}

function pressEsc (event) {
        if (event.keyCode == 27) {
            formLogin.classList.remove('login_active');
            showScroll();
        }
};