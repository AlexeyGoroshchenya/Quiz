

export const quiz = () => {

    const answerData = [

    ]

    const quizTitle = document.querySelector('#quiz-title')
    const quizQuestion = document.querySelector('.quiz__question')
    const quizAnswers = document.querySelector('.quiz__answers')
    const quizSelect = document.querySelector('.quiz__input select')
    const quizInput = document.querySelector('.quiz__input input')
    const historyQuiz = document.querySelector('.quiz__history')

    const questions = [
        {
            title: 'Какие виды тестов вам нравятся?',
            question: 'Многие из нас хоть раз попадались на эту удочку — хочешь пройти всего один тест из интернета, и вдруг понимаешь, что пролетело полдня.',
            answers: ['На темперамент', 'Кто я из вселенной Марвел', 'Увидел это', 'Мое тотемное животное', 'На IQ', 'На словарный запас', 'На логическое мышление', 'На уровень интеллекта'],
            type: 'checkbox'
        },
        {
            title: 'Вы любите проходить тесты?',
            question: 'Нам важно узнать насолько часто Вы проходите тесты.',
            answers: ['Нет, я не никогда не прохожу тесты', 'Да, я прохожу все тесты', 'Заставляю себя проходить тесты', 'Не люблю проходить тесты, но иногда приходится'],
            type: 'radio'
        },
        {
            title: 'Спасибо за ответы! Заполните форму ниже',
            question: 'Ваше мнение важно для нас. Прикрепите фото с Вашей любимой картинкой и оставьте комментарий насколько понравился Вам тест.',
            answers: ['Очень понравился', 'Не понравился', 'Пройду еще раз', 'Посоветую пройти всем'],
            type: 'input'
        },

    ]



    const getQuestions = async (num) => {
        let res = await fetch(`https://jsonplaceholder.typicode.com/todos/${num + 1}`)

        return res.json()
    }

    const renderHistory = () => {

        const renderUnanswered = (i) => {
            let historyItem = document.createElement('div');
            historyItem.classList.add('history-quiz__item')
            historyItem.dataset.num = answerData.length + 1
            historyItem.innerHTML = `<div class="history-quiz__title">${questions[i].title}</div>`
            historyQuiz.append(historyItem)
        }

        if (answerData.length === 0) {
            renderUnanswered(0)
        } else {
            historyQuiz.innerHTML = ''
            answerData.forEach((item, index) => {
                let historyItem = document.createElement('div');
                historyItem.classList.add('history-quiz__item')
                historyItem.dataset.num = index + 1
                historyItem.innerHTML = `
                <div class="history-quiz__title">${questions[index].title}</div>
                `

                item.forEach(el => {
                    questions[index].type !== 'input' ? historyItem.innerHTML += `<div class="history-quiz__text">${el.text}</div>` :
                        historyItem.innerHTML += `<div class="history-quiz__text">${el}</div>`
                })



                historyQuiz.append(historyItem)
            })
            if (answerData.length < questions.length) renderUnanswered(answerData.length)

            historyQuiz.lastElementChild.classList.add('history-quiz__item_active')
        }
    }

    const renderQuestionByIndex = (ind) => {

        renderQuestion(ind)

        if (answerData[ind]) {


            document.querySelectorAll('.quiz__answer').forEach(item => {

                let recordedAnswer = answerData[ind].filter(el => el.number === item.dataset.num)

                if (recordedAnswer.length > 0) {

                    item.classList.add('quiz__answer_active')
                }
            })
        }
    }

    const renderQuestion = (num) => {

        if (questions[num].type !== 'input') {
            quizTitle.textContent = questions[num].title
            quizQuestion.textContent = questions[num].question
            quizQuestion.dataset.question = num + 1
            quizQuestion.dataset.type = questions[num].type
            quizAnswers.innerHTML = ''
            questions[num].answers.forEach((item, index) => {

                quizAnswers.innerHTML += `<div class="quiz__answer" data-num="${index + 1}"> <input type="${questions[num].type}"> ${item}</div>`
            })
        } else {
            quizTitle.textContent = questions[num].title
            quizQuestion.textContent = questions[num].question
            quizQuestion.dataset.question = num + 1
            quizQuestion.dataset.type = questions[num].type
            quizAnswers.innerHTML = ''
            document.querySelector('.quiz__input').style.display = 'flex'
            quizSelect.innerHTML = ''

            questions[num].answers.forEach((item) => {
                let option = document.createElement('option');

                option.value = item;
                option.textContent = item;

                quizSelect.append(option)
            })
        }

        num > 0 ?
            document.querySelector('.quiz__button_prev').style.display = 'block'
            :
            document.querySelector('.quiz__button_prev').style.display = 'none'
    }

    const sendAnswers = async () => {
        return await fetch('https://jsonplaceholder.typicode.com/posts', {
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


    }

    const showLoader = () => {

        document.querySelector('.loader').style.display = 'flex'
    }

    const hideLoader = () => {

        document.querySelector('.loader').style.display = 'none'
    }

    const finishQuiz = () => {
        showLoader()

        try {

            sendAnswers().then(() => {

                document.querySelector('.quiz__textbox_start').style.display = 'none'
                document.querySelector('.quiz__textbox_finish').style.display = 'block'
                historyQuiz.style.display = 'none'
                hideLoader()
            })

        } catch (error) {
            hideLoader()
            console.log(error);
        }
    }

    const writeAnswer = (questionInd, answer) => {


        if (parseFloat(quizQuestion.dataset.question) > answerData.length) {
            answerData.push(answer)
        } else {
            answerData[questionInd] = answer
        }
    }

    const getAnswer = () => {
        let answer = []
        if (quizQuestion.dataset.type !== 'input') {

            document.querySelectorAll('.quiz__answer_active').forEach(item => {
                answer.push({ number: item.dataset.num, text: item.textContent })
            })
        } else {
            answer.push(quizInput.value)
        }

        return answer
    }

    const init = function () {
        showLoader()
        try {
            getQuestions(0).then((res) => {


                if (res) {
                    document.querySelector('.quiz').style.display = 'flex'
                    document.querySelector('.quiz__textbox_start').style.display = 'block'
                    //тут было бы привоение значение переменной questions, но раз это только имитация работы сервера, переменная захардкожена тут в коде

                    renderQuestion(0)
                    renderHistory()
                } else {

                }

                hideLoader()

            })
        } catch (error) {
            hideLoader()
            console.log(error);
        }

    }

    init()


    quizSelect.addEventListener('change', (e) => {

        quizInput.value = e.target.value
    })



    document.addEventListener('click', (e) => {

        if (e.target.closest('.quiz__answer')) {


            if (quizQuestion.dataset.type !== 'radio') {
                e.target.closest('.quiz__answer').classList.toggle('quiz__answer_active')
            } else {
                if (document.querySelector('.quiz__answer_active')) { document.querySelector('.quiz__answer_active').classList.remove('quiz__answer_active') }
                e.target.closest('.quiz__answer').classList.add('quiz__answer_active')
            }


        }

        if (e.target.closest('.quiz__button_next')) {

            let questionInd = parseFloat(quizQuestion.dataset.question) - 1

            if (quizQuestion.dataset.type !== 'input' && !document.querySelector('.quiz__answer_active')) {
                console.log('select something');
                return
            } else if (quizQuestion.dataset.type == 'input' && !quizInput.value) {
                console.log('Пожалуйста напишите ваш ответ');
                return
            } else {
                writeAnswer(questionInd, getAnswer())
            }





            if (parseFloat(quizQuestion.dataset.question) === questions.length) {
                finishQuiz()

            } else {
                renderQuestionByIndex(questionInd + 1)
                renderHistory()
            }

            console.log(answerData);



        }

        if (e.target.closest('.quiz__button_prev')) {

            let questionInd = parseFloat(quizQuestion.dataset.question) - 1


            writeAnswer(questionInd, getAnswer())

            console.log(answerData);

            document.querySelector('.quiz__input').style.display = 'none'

            renderQuestionByIndex(questionInd - 1)

            historyQuiz.innerHTML = ''
            renderHistory()
        }

        if (e.target.closest('.history-quiz__item')) {
            let numberGoTo = e.target.closest('.history-quiz__item').dataset.num

            if (document.querySelector('.history-quiz__item_active')) {
                document.querySelector('.history-quiz__item_active').classList.remove('history-quiz__item_active')
                e.target.closest('.history-quiz__item').classList.add('history-quiz__item_active')
            }


            if (numberGoTo) renderQuestionByIndex(parseFloat(numberGoTo) - 1)

        }





    })


}