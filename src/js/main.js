const body = document.querySelector('body')
const contactDiv = document.querySelector('#contact')
const contactBtn = document.querySelector('.contactBtn')
const closeContact = document.querySelector('.close-contact')

const contacHendler = () => {
	contactDiv.classList.contains('active') ? contactDiv.classList.remove('active') : contactDiv.classList.add('active')
}

const stopScrolling = () => {
	body.classList.contains('stop-scrolling')
		? body.classList.remove('stop-scrolling')
		: body.classList.add('stop-scrolling')
}
contactBtn.addEventListener('click', e => {
	e.preventDefault()
	contacHendler()
	stopScrolling()
})

closeContact.addEventListener('click', e => {
	e.preventDefault()
	contacHendler()
	stopScrolling()
})

const footerYear = document.querySelector('.footer__foot-year')
const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}
handleCurrentYear()
