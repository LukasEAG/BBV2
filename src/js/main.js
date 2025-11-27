const navBar = document.querySelector('.nav-menu')
window.addEventListener('scroll', () => {
	navBarBgHandler()
})

const body = document.querySelector('body')
const mobileNav = document.querySelector('.nav-menu__links')
const btnOpenNav = document.querySelector('.nav-menu__mobile-open-btn')
const menuBtns = Array.from(document.querySelectorAll('.nav-menu__link')).filter(el => el.classList.length === 1)
const contactDiv = document.querySelector('#contact')
const btnCloseContact = document.querySelector('.close-contact')

const navBarBgHandler = () => {
	if (window.scrollY > 10) {
		navBar.classList.add('background')
	} else if (window.scrollY <= 10) {
		navBar.classList.remove('background')
	}
}
const navHandler = () => {
	mobileNav.classList.toggle('active')
}

const openContactHandler = () => {
	contactDiv.classList.add('active')
	body.classList.add('stop-scrolling')
}

const closeContactHandler = () => {
	contactDiv.classList.remove('active')
	body.classList.remove('stop-scrolling')
}
const isContactOpen = () => contactDiv.classList.contains('active')

menuBtns.forEach(btn => {
	btn.addEventListener('click', e => {
		const btnLink = btn.querySelector('a')
		const href = btnLink ? btnLink.getAttribute('href') : null
		const isMobile = window.innerWidth <= 768

		if (href === '#contact') {
			isContactOpen() ? closeContactHandler() : openContactHandler()
			if (isMobile) navHandler()
		} else {
			if (isContactOpen()) {
				closeContactHandler()
			}
			if (isMobile) navHandler()
		}
	})
})
btnOpenNav.addEventListener('click', () => {
	navHandler()
})
btnCloseContact.addEventListener('click', () => {
	closeContactHandler()
})


const footerYear = document.querySelector('.footer__foot-year')
const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}
handleCurrentYear()
