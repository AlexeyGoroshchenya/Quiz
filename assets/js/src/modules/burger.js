import { blockBody } from './helpers'
import { unblockBody } from './helpers'

export const burger = () => {

    const menu = document.querySelector('.header__menu')
    const toggleMenuBtn = document.querySelector('.header__menu-button')



    const openMenu = () => {

        menu.classList.add('header__menu_active')
        toggleMenuBtn.classList.add('header__menu-button_active')
        blockBody()
    }

    const closeMenu = () => {

        menu.classList.remove('header__menu_active')
        toggleMenuBtn.classList.remove('header__menu-button_active')
        unblockBody()
    }



    document.body.addEventListener('click', (e) => {



        if (e.target.closest('.header__menu-button')) {   // 

            if (!document.querySelector('.header__menu_active')) {
                openMenu()
            } else {
                closeMenu()
            }

        }

        if (e.target.closest('.nav-header__link')) {
            // e.preventDefault()
            if (document.querySelector('.header__menu_active')) {

                closeMenu()
            }

        }




    })
}