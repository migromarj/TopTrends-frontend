import {
	checkNavbar,
	checkCountryTitle,
	check404,
	checkBackground,
	checkFooter,
} from '../utils/aux_functions'

describe('Navbar', () => {
	it('Should show the navbar', () => {
		cy.visit('/trends/ES/youtube')
		checkNavbar('TopTrends | Spain | YouTube')
	})
})

describe('Country title', () => {
	it('Should show title of a country', () => {
		checkCountryTitle(
			'/trends/ES/youtube',
			'TopTrends | Spain | YouTube',
			'/trends/ES',
			'TopTrends | Spain'
		)
	})
})

describe('Statistics title', () => {
	it('Should show the statistics title', () => {
		cy.visit('/trends/ES/youtube')
		cy.title().should('eq', 'TopTrends | Spain | YouTube')
		cy.get('#statistics-title').should('exist')
		cy.get('#statistics-title').should('be.visible')
		cy.get('#statistics-title').should('include.text', 'YouTube Statistics')
	})
})

describe('Dropdown Menu', () => {
	it('Should show the dropdown menu', () => {
		cy.visit('/trends/ES/youtube')
		cy.title().should('eq', 'TopTrends | Spain | YouTube')
		cy.get('#categories-dropdown').should('exist')
		cy.get('#categories-dropdown').should('be.visible')
		cy.get('#categories-dropdown').should('have.value', 'Default')
		cy.get('#categories-dropdown').select('Sports')
		cy.get('#categories-dropdown').should('have.value', 'Sports')
	})
})

describe('Trends Container', () => {
	it('Should show the trends container', () => {
		cy.visit('/trends/ES/youtube')
		cy.title().should('eq', 'TopTrends | Spain | YouTube')
		cy.get('#yt-trends-container').should('exist')
		cy.get('#yt-trends-container').should('be.visible')

		for (let i = 1; i < 6; i++) {
			cy.get(`#yt-trend-${i}`).should('exist')
			cy.get(`#yt-trend-${i}`).should('be.visible')
			cy.get(`#yt-trend-${i}`).should('include.text', `#${i} -`)
		}
	})
})

describe('Views Graph', () => {
	it('Should show the views count graph', () => {
		cy.visit('/trends/ES/youtube')
		cy.title().should('eq', 'TopTrends | Spain | YouTube')
		cy.get('#graphs-container').should('exist')
		cy.get('#graphs-container').should('be.visible')
		cy.get('#views-container').should('exist')
		cy.get('#views-container').should('be.visible')
		cy.get('#views-text').should('exist')
		cy.get('#views-text').should('be.visible')
		cy.get('#views-text').should('include.text', 'Views')
		cy.get('#Views-graph').should('exist')
		cy.get('#Views-graph').should('be.visible')
	})
})

describe('Likes Graph', () => {
	it('Should show the likes count graph', () => {
		cy.visit('/trends/ES/youtube')
		cy.title().should('eq', 'TopTrends | Spain | YouTube')
		cy.get('#graphs-container').should('exist')
		cy.get('#graphs-container').should('be.visible')
		cy.get('#likes-container').should('exist')
		cy.get('#likes-container').should('be.visible')
		cy.get('#likes-text').should('exist')
		cy.get('#likes-text').should('be.visible')
		cy.get('#likes-text').should('include.text', 'Likes')
		cy.get('#Likes-graph').should('exist')
		cy.get('#Likes-graph').should('be.visible')
	})
})

describe('Comments Graph', () => {
	it('Should show the comments count graph', () => {
		cy.visit('/trends/ES/youtube')
		cy.title().should('eq', 'TopTrends | Spain | YouTube')
		cy.get('#graphs-container').should('exist')
		cy.get('#graphs-container').should('be.visible')
		cy.get('#comments-container').should('exist')
		cy.get('#comments-container').should('be.visible')
		cy.get('#comments-text').should('exist')
		cy.get('#comments-text').should('be.visible')
		cy.get('#comments-text').should('include.text', 'Comments')
		cy.get('#Comments-graph').should('exist')
		cy.get('#Comments-graph').should('be.visible')
	})
})

describe('404 page', () => {
	it('Should show 404 page', () => {
		check404('/trends/NotCountry/youtube')
	})
})

describe('Background', () => {
	it('It should show the background', () => {
		checkBackground('/trends/ES/youtube', 'TopTrends | Spain | YouTube')
	})
})

describe('Footer', () => {
	it('Should show the footer', () => {
		checkFooter('/trends/ES/youtube', 'TopTrends | Spain | YouTube')
	})
})
