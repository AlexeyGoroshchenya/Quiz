export const nav = () => {


    const submenu = document.querySelector('.nav-header__sublist')

    const openSubMenu = () => {
        submenu.classList.add('nav-header__sublist_active')
    }

    const closeSubMenu = () => {
        submenu.classList.remove('nav-header__sublist_active')
    }


    document.body.addEventListener('pointerover', (e) => {

        if (e.target.closest('div.nav-header__link')) {
            openSubMenu()

        }
    })

    document.body.addEventListener('pointerout', (e) => {

        if (e.target.closest('.nav-header__sublist_active')) {
            closeSubMenu()

        }
    })

    document.body.addEventListener('click', (e) => {
        
        if (document.querySelector('.nav-header__sublist_active') && !e.target.closest('.nav-header__sublist_active')) {
            closeSubMenu()
        }

        if (e.target.closest('div.nav-header__link')) {
           

        }

    })
}