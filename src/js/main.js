const navBar = document.querySelector('.nav-menu')
window.addEventListener('scroll', () => {
	navBarBgHandler()
})


const body = document.querySelector('body')
const mobileNav = document.querySelector('.nav-menu__links')
const btnOpenNav = document.querySelector('.nav-menu__mobile-open-btn')
const mobileMenuBtns = document.querySelectorAll('.nav-menu__link')
const contactDiv = document.querySelector('#contact')
const contactBtn = document.querySelector('.contactBtn')
const closeContact = document.querySelector('.close-contact')

const navBarBgHandler = () => {
	if (window.scrollY > 10 ) {
		console.log('dziala');
		navBar.classList.add('background')
	} else if (window.scrollY <= 10) {
		navBar.classList.remove('background')
	}
}


const navHendler = () => {
	mobileNav.classList.contains('active') ? mobileNav.classList.remove('active') : mobileNav.classList.add('active')
}
const contacHendler = () => {
	contactDiv.classList.contains('active') ? contactDiv.classList.remove('active') : contactDiv.classList.add('active')
}
const stopScrolling = () => {
	body.classList.contains('stop-scrolling')
		? body.classList.remove('stop-scrolling')
		: body.classList.add('stop-scrolling')
}

btnOpenNav.addEventListener('click', e => {
	e.preventDefault()
	navHendler()
	stopScrolling()
})
mobileMenuBtns.forEach(btn => {
	btn.addEventListener('click', e => {
		stopScrolling()
		navHendler()
	})
})
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
