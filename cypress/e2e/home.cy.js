import {
	checkNavbar,
	checkBackground,
	checkFooter,
	checkSearchEngine,
} from '../utils/aux_functions'

describe('Navbar', () => {
	it('Should show the navbar', () => {
		cy.visit('/')
		checkNavbar('TopTrends | Home')
		cy.get('#brandIcon').click()
		cy.url().should('include', '/')
		checkNavbar('TopTrends | Home')
		cy.get('#brand').click()
		cy.url().should('include', '/')
		cy.title().should('eq', 'TopTrends | Home')
	})
})

describe('Search engine', () => {
	it('Should show options for a country', () => {
		checkSearchEngine()
		cy.get('#autocomplete-1-label').type('Spain')
		cy.get('#autocomplete-1-label').should('have.value', 'Spain')
		cy.get('#countryList').should('exist')
		cy.get('#countryList').should('be.visible')
		cy.get('#countryList').should('include.text', 'Spain')
		cy.get('#search-ES').should('exist')
		cy.get('#search-ES').should('be.visible')
		cy.get('#search-ES').click()
		cy.wait(5000)
		cy.url().should('include', '/trends/ES')
		cy.title().should('eq', 'TopTrends | Spain')
	})
	it("Shouldn't show options for a country", () => {
		checkSearchEngine()
		cy.get('#autocomplete-1-label').type('España')
		cy.wait(3000)
		cy.get('#autocomplete-1-label').should('have.value', 'España')
		cy.get('#countryList').should('not.exist')
	})
})

describe('Background', () => {
	it('It should show the background', () => {
		checkBackground('/', 'TopTrends | Home')
	})
})

describe('Footer', () => {
	it('Should show the footer', () => {
		checkFooter('/', 'TopTrends | Home')
	})
})
