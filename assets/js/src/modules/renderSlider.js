import { swiper } from './swiper';



export const renderSlider = () => {


	const reviews = [
		{
			name: 'Андрей Пархимович',
			text: 'Можно было бы сделать динамическую высоту карточки, но с переполнением контентом это может смотреться плохо, Поэтому сделал так. Можно было бы сделать динамическую высоту карточки, но с переполнением контентом это может смотреться плохо, Поэтому сделал так',
			avatar: './assets/img/main/reviews/avatars/1.webp',
			background: './assets/img/main/reviews/bg/43611.webp'
		},
		{
			name: 'Андрей Иванов',
			text: 'Можно было бы сделать динамическую высоту карточки, но с переполнением контентом это может смотреться плохо, Поэтому сделал так',
			avatar: './assets/img/main/reviews/avatars/2.webp',
			background: './assets/img/main/reviews/bg/43602.webp'
		},
		{
			name: 'Лев Толстой',
			text: 'Можно было бы сделать динамическую высоту карточки, но с переполнением контентом это может смотреться плохо, Поэтому сделал так',
			avatar: './assets/img/main/reviews/avatars/3.webp',
			background: './assets/img/main/reviews/bg/43611.webp'
		},
		{
			name: 'Николай Андреев',
			text: 'Можно было бы сделать динамическую высоту карточки, но с переполнением контентом это может смотреться плохо, Поэтому сделал так',
			avatar: './assets/img/main/reviews/avatars/1.webp',
			background: './assets/img/main/reviews/bg/43602.webp'
		},
		{
			name: 'Андрей Николаев',
			text: 'Можно было бы сделать динамическую высоту карточки, но с переполнением контентом это может смотреться плохо, Поэтому сделал так',
			avatar: './assets/img/main/reviews/avatars/2.webp',
			background: './assets/img/main/reviews/bg/43611.webp'
		},
		{
			name: 'Николай Гоголь',
			text: 'Можно было бы сделать динамическую высоту карточки, но с переполнением контентом это может смотреться плохо, Поэтому сделал так',
			avatar: './assets/img/main/reviews/avatars/3.webp',
			background: './assets/img/main/reviews/bg/43602.webp'
		},
	]


	const getReviews = async () => {
		let res = await fetch(`https:/jsonplaceholder.typicode.com/todos/`)

		return res.json()
	}

	const renderSlides = (arr) => {

		document.querySelector('.reviews__body').innerHTML = ''

		arr.forEach(element => {

			let div = document.createElement('div');
			div.className = "reviews__slide swiper-slide slide-reviews";

			div.innerHTML = `
			<div class="slide-reviews__body">
							<div class="slide-reviews__ava"> <img src="${element.avatar}" alt="">
							</div>

							<div class="slide-reviews__frame">
								<div class="slide-reviews__content">
									<div class="slide-reviews__name">${element.name}</div>
									<div class="slide-reviews__text">
										${element.text}
									</div>
								</div>



							</div>

						</div>
			
			`
			div.style.backgroundImage = `url(${element.background})`
			document.querySelector('.reviews__body').append(div)

		});
		document.querySelector('.reviews').style.display = 'block'
		swiper()
	}


	const init = function () {

		try {
			getReviews().then((res) => {

				console.log('здесь было бы присвоение переменной reviews. но раз это только имитация работы сервера, она захардкожена ранее в коде');
				
				renderSlides(reviews)



			})
		} catch (error) {

			console.log(error);
		}

	}

	init()



}