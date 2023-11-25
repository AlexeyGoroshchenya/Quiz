
import { blockBody } from './helpers'
import { unblockBody } from './helpers'


export const formModals = () => {

    const modal = document.querySelector('.modal')
    const modalTitle = modal.querySelector('.modal__title')
    const modalForm = modal.querySelector('.modal__form')
    const modalSuccess = modal.querySelector('.modal__success')
    const modalImage = modal.querySelector('.modal__image')
    
    const modalMessage = modal.querySelector('.form-modal__comment')
    const notification = modal.querySelector('.form-modal__notification')
    const notificationImage = modal.querySelector('.notification-image')

    const openModal = () => {
        blockBody()
        modal.classList.add('modal_active')
    }

    const closeModal = () => {
        unblockBody()
        modal.classList.remove('modal_active')
    }

    const sendForm = async (data) => {

        // данные в атрибуте data в данном случае собраны в объект formData
        //jsonplaceholder не поддерживает formData поэтому тут ничего не отправляется. иначе нужно было бы приложить его в body запроса и поменять headers Content-type на multipart/form-data

        let res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                name: 'foo',
                body: 'bar',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        return res.json()
    }

    const changeModalPage = () => {

        modalTitle.textContent = 'Ваши данные отправлены'
        modalImage.style.display = 'block'
        modalForm.style.display = 'none'
        modalSuccess.style.display = 'block'
    }

const showErrorMessage = (str, input)=>{
    notificationImage.style.display = 'block'
    notification.style.display = 'flex'
    notification.textContent = str
    input.classList.add('invalid')
}

const hideErrorMessage = ()=>{
    notificationImage.style.display = 'none'
    notification.style.display = 'none'
    if(modal.querySelector('.invalid')) modal.querySelector('.invalid').classList.remove('invalid')
}

    const validateForm = () => {

        let message = true

        // здесь бы использовать более адекватные критерии валидации, а заодно валидировать остальные инпуты формы, но для демонстрации вот так сделал 

        if(modalMessage.value.length < 2) {
            message = false
            
            showErrorMessage("Это обязательное поле", modalMessage)
           
        } else {
            hideErrorMessage()
        }

        return message
    }

    const submitForm = () => {

        let formData = new FormData(modalForm);

        if (document.querySelector('.form-modal__radio_active')) {
            formData.append('choose', document.querySelector('.form-modal__radio_active').dataset.num)
        }

        try {
            if (validateForm()) {
                sendForm(formData).then((res) => {
                    
                    changeModalPage()
                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    document.addEventListener('click', (e) => {

        if (e.target.closest('.header__contact')) openModal()

        if (e.target.closest('.modal__close')) closeModal()

        if (document.querySelector('.modal_active') && e.target.closest('.nav-header__list')) closeModal()

        if (e.target.closest('.success-modal__button')) closeModal()

        if (e.target.closest('.form-modal__radio')) {

            if (document.querySelector('.form-modal__radio_active')) {
                document.querySelector('.form-modal__radio_active').classList.remove('form-modal__radio_active')
                e.target.closest('.form-modal__radio').classList.add('form-modal__radio_active')
            } else { e.target.closest('.form-modal__radio').classList.add('form-modal__radio_active') }
        }
    })

    document.addEventListener('submit', (e) => {
        e.preventDefault()
        submitForm()
    })

    document.addEventListener('input', (e) => {

        if (e.target.closest('.form-modal__comment')) {
            console.log(1);
            validateForm()
        }

        if (e.target.closest('.form-modal__upload')) {

            if (e.target.files.length > 0) {

                let fileNameStart = e.target.value.indexOf('fakepath\\') + 9

                //на мобильных разрешениях не будет хватать наглядности что файл добавлен
                e.target.closest('.form-modal__upload').querySelector('span:first-child').textContent = e.target.value.slice(fileNameStart)  

                if (e.target.files[0].size > 1e+6) {
                    
                    showErrorMessage("Максимальный размер файла 1Мб", modal.querySelector('.form-modal__upload'))
                    
                } else { hideErrorMessage() }
            }
        }
    })

}