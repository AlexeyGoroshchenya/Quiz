import { swiper } from './swiper';



export const renderSlider = () => {


const reviews = [
	{
		name: 'Андрей Пархимович',
		text: 'Можно было бы сделать динамическую высоту карточки, но с переполнением контентом это может смотреться плохо, Поэтому сделал так. Можно было бы сделать динамическую высоту карточки, но с переполнением контентом это может смотреться плохо, Поэтому сделал так',
		avatar: '/assets/img/main/reviews/avatars/1.jpg',
		background: '/assets/img/main/reviews/bg/43611.jpg'
	},
	{
		name: 'Андрей Иванов',
		text: 'Можно было бы сделать динамическую высоту карточки, но с переполнением контентом это может смотреться плохо, Поэтому сделал так',
		avatar: '/assets/img/main/reviews/avatars/2.jpg',
		background: '/assets/img/main/reviews/bg/43602.jpg'
	},
	{
		name: 'Лев Толстой',
		text: 'Можно было бы сделать динамическую высоту карточки, но с переполнением контентом это может смотреться плохо, Поэтому сделал так',
		avatar: '/assets/img/main/reviews/avatars/3.jpg',
		background: '/assets/img/main/reviews/bg/43611.jpg'
	},
	{
		name: 'Николай Андреев',
		text: 'Можно было бы сделать динамическую высоту карточки, но с переполнением контентом это может смотреться плохо, Поэтому сделал так',
		avatar: '/assets/img/main/reviews/avatars/1.jpg',
		background: '/assets/img/main/reviews/bg/43602.jpg'
	},
	{
		name: 'Андрей Николаев',
		text: 'Можно было бы сделать динамическую высоту карточки, но с переполнением контентом это может смотреться плохо, Поэтому сделал так',
		avatar: '/assets/img/main/reviews/avatars/2.jpg',
		background: '/assets/img/main/reviews/bg/43611.jpg'
	},
	{
		name: 'Николай Гоголь',
		text: 'Можно было бы сделать динамическую высоту карточки, но с переполнением контентом это может смотреться плохо, Поэтому сделал так',
		avatar: '/assets/img/main/reviews/avatars/3.jpg',
		background: '/assets/img/main/reviews/bg/43602.jpg'
	},
]


	const getReviews = async () => {
        let res = await fetch(`https://jsonplaceholder.typicode.com/todos/`)

        return res.json()
    }

	const renderSlides = (arr)=>{

		document.querySelector('.reviews__body').innerHTML=''

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
                
			//this would be the assignment of the reviews variable. but since in this case only an imitation of working with the server, reviews is already declared as a local variable and contains all the data for rendering
				renderSlides(reviews)
            
           

            })
        } catch (error) {
           
            console.log(error);
        }

    }

    init()



}