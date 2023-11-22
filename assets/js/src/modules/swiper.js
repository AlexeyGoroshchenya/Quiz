import Swiper, { Autoplay, Navigation } from 'swiper';


export const swiper = () => {



    const swiper = new Swiper('.swiper', {
        observer: true,
        observeParents: true,
        slidesPerView: 1.2,
        spaceBetween: 10,
        loop: true,
        parallax: true,
        centeredSlides: true,

        modules: [Autoplay, Navigation],
        autoplay: {
            delay: 60000,
            disableOnInteraction: true,
            stopOnLastSlide: false,
        },

        
        navigation: {
            nextEl: '.reviews__button_next',
            prevEl: '.reviews__button_prev',
        },
        breakpoints: {
            1023.98: {
                slidesPerView: 4.2,
            },
            991.98: {
                slidesPerView: 3.2,
            },
            767.98: {
                slidesPerView: 2.2,
            },
        }

    }
    );

    


}