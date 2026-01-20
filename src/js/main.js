const navBar = document.querySelector('.nav-menu')
window.addEventListener('scroll', () => {
	navBarBgHandler()
})

const body = document.querySelector('body')
const mobileNav = document.querySelector('.nav-menu__links')
const btnOpenNav = document.querySelector('.nav-menu__mobile-open-btn')
const menuBtns = Array.from(document.querySelectorAll('.nav-menu__link')).filter(el => el.classList.length === 1)
const contactDiv = document.querySelector('#contact')
const btnCloseContact = document.querySelectorAll('.close-contact')
const submitButton = document.querySelector('.email__submit')

const navBarBgHandler = () => {
	if (window.scrollY > 10) {
		navBar.classList.add('background')
	} else if (window.scrollY <= 10) {
		navBar.classList.remove('background')
	}
}
const navHandler = () => {
	if (window.scrollY > 10) {
		mobileNav.classList.toggle('active')
		body.classList.toggle('menuActive')
	} else {
		mobileNav.classList.toggle('active')
		body.classList.toggle('menuActive')
		navBar.classList.toggle('background')
	}
}

const openContactHandler = () => {
	if (window.scrollY > 10) {
		contactDiv.classList.add('active')
		body.classList.add('menuActive')
	} else {
		contactDiv.classList.add('active')
		body.classList.add('menuActive')
		navBar.classList.toggle('background')
	}
}

const closeContactHandler = () => {
	contactDiv.classList.remove('active')
	body.classList.remove('menuActive')

}
const isContactOpen = () => contactDiv.classList.contains('active')

menuBtns.forEach(btn => {
	btn.addEventListener('click', e => {
		const btnLink = btn.querySelector('a')
		const href = btnLink ? btnLink.getAttribute('href') : null
		const isMobile = window.innerWidth <= 992

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
btnCloseContact.forEach(btn => {
	btn.addEventListener('click', () => {
		closeContactHandler()
	})
})
document.addEventListener('DOMContentLoaded', () => {
	if (window.location.hash === '#contact') {
		openContactHandler()
	}
})

const regFormPopup = document.querySelector('[form-popup]')
const regFormPopupContainer = document.querySelector('[form-popup-container]')
const regFormMsg = document.querySelector('[registration-form-msg]')
const sendingProccede = document.querySelector('.sendingProceed')
const closePopupBtn = document.querySelector('[close-popup-btn]')

const createSpanHendler = msg => {
	const span = document.createElement('span')
	span.classList.add('form-popup__container--msg')
	span.innerText = msg
	closePopupBtn.insertAdjacentElement('beforebegin', span)

	// regFormPopupContainer.appendChild(span)
	regFormPopup.classList.add('active')
}
const registrationForm = document.querySelector('[registration-form="subscribe"]')
let lastErrors = {}

if (registrationForm) {
	registrationForm.addEventListener('submit', e => {
		e.preventDefault()
		sendFormToBackend(e)
	})
}
const sendFormToBackend = async e => {
	const form = e.target
	const data = {
		name: form.querySelector('[name="userName"]')?.value || '',
		email: form.querySelector('[name="userEmail"]')?.value || '',
		checkbox: form.querySelector('input[name="checkbox"]:checked')?.value || '',
	}
	sendingProccede.classList.add('active')
	try {
		// const res = await fetch('/api/newsletter', {
		const res = await fetch('http://localhost:8000/newsletter.php', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
		const json = await res.json()

		if (res.ok) {
			createSpanHendler(`📩 Witaj, ${json.user_name} 
Dziękujemy za zapisanie się do naszego newslettera ✅
Teraz będziesz na bieżąco z ważnymi informacjami i wydarzeniami.
📬 Sprawdź skrzynkę (oraz SPAM) — wysłaliśmy wiadomość powitalną.
W razie pytań pisz do nas śmiało: 📧 ticket@bliskobrzegu.pl
Do zobaczenia nad wodą! 🌊 #BliskoBrzegu #DoZobaczenia`)

			lastErrors = {}
		} else {
			if (typeof json.errors === 'object') {
				const errors = json.errors || {}

				Object.values(errors).forEach(err => {
					createSpanHendler(err)
				})

				lastErrors = errors
			} else if (json.error) {
				createSpanHendler(json.error)
			} else {
				createSpanHendler('Wystąpił nieznany błąd')
			}
		}
	} catch (err) {
		createSpanHendler('Błąd połączenia z serwerem, spróbuj ponownie')
	}
}

closePopupBtn.addEventListener('click', e => {
	e.preventDefault()
	const errorSpan = regFormPopup.querySelectorAll('.form-popup__container--msg')
	errorSpan.forEach(span => span.remove())
	regFormPopup.classList.remove('active')
	const currentForm = regFormPopup.closest('form')
	sendingProccede.classList.remove('active')

	if (Object.keys(lastErrors).length === 0) {
		currentForm.reset()
	} else {
		Object.keys(lastErrors).forEach(fieldName => {
			const field = currentForm.querySelector(`[name="${fieldName}"]`)
			if (field) field.value = ''
		})
	}
})

const unsubscribeForm = document.querySelector('[registration-form="unsubscribe"]')
if (unsubscribeForm) {
	unsubscribeForm.addEventListener('submit', e => {
		e.preventDefault()
		unsubscribeNewsLetter(e)
	})
}

const unsubscribeNewsLetter = async e => {
	const form = e.target
	const data = {
		email: form.querySelector('[name="userEmailUs"]')?.value || '',
		checkbox: form.querySelector('input[name="checkboxUs"]:checked')?.value || '',
	}
	sendingProccede.classList.add('active')
	try {
		const res = await fetch('http://localhost:8000/unsubscribe.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		const json = await res.json()

		if (res.ok) {
			createSpanHendler(`
Zostałeś usunięty z naszego newslettera`)

			lastErrors = {}
		} else {
			if (typeof json.errors === 'object') {
				const errors = json.errors || {}

				Object.values(errors).forEach(err => {
					createSpanHendler(err)
				})

				lastErrors = errors
			} else if (json.error) {
				createSpanHendler(json.error)
			} else {
				createSpanHendler('Wystąpił nieznany błąd')
			}
		}
	} catch (err) {
		createSpanHendler('Błąd połączenia z serwerem, spróbuj ponownie')
	}
}

const footerYear = document.querySelector('.footer__foot-year')
const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}
handleCurrentYear()
