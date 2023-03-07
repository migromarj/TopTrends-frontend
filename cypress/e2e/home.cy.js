describe('Navbar', () => {
	it('Should show the navbar', () => {
		cy.visit('/')
		cy.get('#navBar').should('exist')
		cy.get('#navBar').should('be.visible')
		cy.get('#brandIcon').should('exist')
		cy.get('#brandIcon').should('be.visible')
		cy.get('#brandIcon').click()
		cy.url().should('include', '/')
		cy.get('#brand').should('exist')
		cy.get('#brand').should('be.visible')
		cy.get('#brand').should('have.text', 'TopTrends')
		cy.get('#brand').click()
		cy.url().should('include', '/')
	})
})

describe('Search engine', () => {
	it('Should show options for a country', () => {
		cy.visit('/')
		cy.get('#autocomplete-3-input').should('exist')
		cy.get('#autocomplete-3-input').should('be.visible')
		cy.get('#autocomplete-3-input').should('have.value', '')
		cy.get('#autocomplete-3-input').type('Spain')
		cy.get('#autocomplete-3-input').should('have.value', 'Spain')
		cy.get('#countryList').should('exist')
		cy.get('#countryList').should('be.visible')
		cy.get('#countryList').should('include.text', 'Spain')
		cy.get('#search-ES').should('exist')
		cy.get('#search-ES').should('be.visible')
		cy.get('#search-ES').click()
		cy.wait(5000)
		cy.url().should('include', '/trends/ES')
	})
	it("Shouldn't show options for a country", () => {
		cy.visit('/')
		cy.get('#autocomplete-3-input').should('exist')
		cy.get('#autocomplete-3-input').should('be.visible')
		cy.get('#autocomplete-3-input').should('have.value', '')
		cy.get('#autocomplete-3-input').type('España')
		cy.get('#autocomplete-3-input').should('have.value', 'España')
		cy.get('#countryList').should('not.exist')
	})
})

describe('Background', () => {
	it('It should show the background', () => {
		cy.visit('/')
		cy.wait(5000)
		cy.get('#background').should('exist')
		cy.get('#background').should('be.visible')
	})
})

describe('Footer', () => {
	it('Should show the footer', () => {
		cy.visit('/')
		cy.wait(5000)
		cy.get('#footer').should('exist')
		cy.get('#footer').should('be.visible')
		cy.get('#footer').should('include.text', 'Designed by Miguel Romero Arjona')
	})
})
