import {
	checkNavbar,
	checkCountryTitle,
	check404,
	checkBackground,
	checkFooter,
} from '../utils/aux_functions'

describe('Navbar', () => {
	it('Should show the navbar', () => {
		cy.visit('/trends/ES')
		checkNavbar('TopTrends | Spain')
	})
})

describe('Country title', () => {
	it('Should show title of a country', () => {
		checkCountryTitle(
			'/trends/ES',
			'TopTrends | Spain',
			'/',
			'TopTrends | Home'
		)
	})
})

describe('Twitter container', () => {
	it('Should show Twitter container of a country', () => {
		cy.visit('/trends/ES')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.wait(10000)

		cy.get('#Twitter-title-container').should('exist')
		cy.get('#Twitter-title-container').should('be.visible')
		cy.get('#twitter-icon').should('exist')
		cy.get('#twitter-icon').should('be.visible')
		cy.get('#Twitter-title').should('exist')
		cy.get('#Twitter-title').should('be.visible')
		cy.get('#Twitter-title').should('have.text', 'Twitter')

		cy.get('#container-Twitter').should('exist')
		cy.get('#container-Twitter').should('be.visible')

		for (let i = 1; i < 11; i++) {
			cy.get('#Twitter-trend-' + i).should('exist')
			cy.get('#Twitter-trend-' + i).should('be.visible')
			cy.get('#Twitter-trend-' + i).should('include.text', `#${i} -`)
		}
		cy.get('#Twitter-trend-1').click()
		cy.wait(5000)
		cy.url().should('include', '/trends/ES/words/')
	})
	it("Shouldn't show Twitter container of a country", () => {
		cy.visit('/trends/RO')
		cy.title().should('eq', 'TopTrends | Romania')
		cy.wait(10000)
		cy.get('#container-Twitter').should('not.exist')
	})
})

describe('Google container', () => {
	it('Should show Google container of a country', () => {
		cy.visit('/trends/RO')
		cy.title().should('eq', 'TopTrends | Romania')
		cy.wait(10000)

		cy.get('#Google-title-container').should('exist')
		cy.get('#Google-title-container').should('be.visible')
		cy.get('#google-icon').should('exist')
		cy.get('#google-icon').should('be.visible')
		cy.get('#Google-title').should('exist')
		cy.get('#Google-title').should('be.visible')
		cy.get('#Google-title').should('have.text', 'Google')

		cy.get('#container-Google').should('exist')
		cy.get('#container-Google').should('be.visible')

		for (let i = 1; i < 11; i++) {
			cy.get('#Google-trend-' + i).should('exist')
			cy.get('#Google-trend-' + i).should('be.visible')
			cy.get('#Google-trend-' + i).should('include.text', `#${i} -`)
		}
		cy.get('#Google-trend-1').click()
		cy.wait(5000)
		cy.url().should('include', '/trends/RO/words/')
	})
	it("Shouldn't show Google container of a country", () => {
		cy.visit('/trends/ES')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.wait(10000)
		cy.get('#container-Google').should('not.exist')
	})
})

describe('YouTube container', () => {
	it('Should show YouTube container of a country', () => {
		cy.visit('/trends/ES')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.wait(10000)

		cy.get('#YouTube-title-container').should('exist')
		cy.get('#YouTube-title-container').should('be.visible')
		cy.get('#youtube-icon').should('exist')
		cy.get('#youtube-icon').should('be.visible')
		cy.get('#YouTube-title').should('exist')
		cy.get('#YouTube-title').should('be.visible')
		cy.get('#YouTube-title').should('have.text', 'YouTube')

		cy.get('#container-YouTube').should('exist')
		cy.get('#container-YouTube').should('be.visible')

		for (let i = 1; i < 11; i++) {
			cy.get('#YouTube-trend-' + i).should('exist')
			cy.get('#YouTube-trend-' + i).should('be.visible')
			cy.get('#YouTube-trend-' + i).should('include.text', `#${i} -`)
		}
		cy.get('#YouTube-trend-1').click()
		cy.wait(5000)
		cy.url().should('include', '/trends/ES/youtube/')
		cy.visit('/trends/ES')

		cy.get('#dropdownYouTube').should('exist')
		cy.get('#dropdownYouTube').should('be.visible')
		cy.get('#dropdownYouTube').should('have.value', 'Default')
		cy.get('#dropdownYouTube').select('Sports')
		cy.get('#dropdownYouTube').should('have.value', 'Sports')

		cy.get('#YouTube-more-info').should('exist')
		cy.get('#YouTube-more-info').should('be.visible')
		cy.get('#YouTube-more-info').should('have.text', 'More info')
		cy.get('#YouTube-more-info').click()
		cy.wait(5000)
		cy.url().should('include', '/trends/ES/youtube')
	})
})

describe('404 page', () => {
	it('Should show 404 page', () => {
		check404('/trends/NotCountry')
	})
})

describe('Background', () => {
	it('It should show the background', () => {
		checkBackground('/trends/ES', 'TopTrends | Spain')
	})
})

describe('Footer', () => {
	it('Should show the footer', () => {
		checkFooter('/trends/ES', 'TopTrends | Spain')
	})
})
