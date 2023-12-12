

export const scroll = () => {

    const homeLink = document.querySelector('.nav-header__link[href="#home"]')
    const quizLink = document.querySelector('.nav-header__link[href="#quiz"]')
    const reviewsLink = document.querySelector('.nav-header__link[href="#reviews"]')

        const changeClasses = (el) => {
            if (el.classList.contains('nav-header__link-active')) return


            document.querySelector('.nav-header__link-active').classList.remove('nav-header__link-active')
            el.classList.add('nav-header__link-active')
        }

        let quizTop = document.querySelector('#quiz').getBoundingClientRect().top
        let reviewsTop = document.querySelector('#reviews').getBoundingClientRect().top



    window.addEventListener('scroll', function () {


        if (window.scrollY < quizTop) {
            changeClasses(homeLink)
        } else if (window.scrollY < reviewsTop && window.scrollY > quizTop) {
            changeClasses(quizLink)
        } else { changeClasses(reviewsLink) }

    });




}