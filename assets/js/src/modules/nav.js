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

        if (e.target.matches('a.nav-header__link')) {
            e.preventDefault()

            let anchor = e.target.href.slice(e.target.href.indexOf('#'))
            document.querySelector(anchor).scrollIntoView({ behavior: "smooth", block: "center", inline: "start" }) 

        }

        if (e.target.closest('div.nav-header__link')) {
           

        }

    })
}