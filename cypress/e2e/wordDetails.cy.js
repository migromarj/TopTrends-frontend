describe('Navbar', () => {
	it('Should show the navbar', () => {
		cy.visit('/trends/ES/words/Messi')
		cy.title().should('eq', 'TopTrends | Spain | Messi')
		cy.get('#navBar').should('exist')
		cy.get('#navBar').should('be.visible')
		cy.get('#brandIcon').should('exist')
		cy.get('#brandIcon').should('be.visible')
		cy.get('#brand').should('exist')
		cy.get('#brand').should('be.visible')
		cy.get('#brand').should('have.text', 'TopTrends')
	})
})

describe('Country title', () => {
	it('Should show title of a country', () => {
		cy.visit('/trends/ES/words/Messi')
		cy.title().should('eq', 'TopTrends | Spain | Messi')
		cy.get('#countryTitle').should('exist')
		cy.get('#countryTitle').should('be.visible')
		cy.get('#countryFlag').should('exist')
		cy.get('#countryFlag').should('be.visible')
		cy.get('#countryName').should('exist')
		cy.get('#countryName').should('be.visible')
		cy.get('#countryName').should('have.text', 'Spain')
		cy.get('#previousPage').should('exist')
		cy.get('#previousPage').should('be.visible')
		cy.get('#previousPage').click()
		cy.wait(5000)
		cy.url().should('include', '/trends/ES')
		cy.title().should('eq', 'TopTrends | Spain')
	})
})

describe('Dropdown Menu', () => {
	it('Should show the dropdown menu', () => {
		cy.visit('/trends/ES/words/Messi')
		cy.title().should('eq', 'TopTrends | Spain | Messi')
		cy.get('#period-dropdown').should('exist')
		cy.get('#period-dropdown').should('be.visible')
		cy.get('#period-dropdown').should('have.value', 'daily')
		cy.get('#period-dropdown').select('Weekly')
		cy.get('#period-dropdown').should('have.value', 'weekly')
	})
})

describe('Word Interest Graph', () => {
	it('Should show the word interest graph', () => {
		cy.visit('/trends/ES/words/Messi')
		cy.title().should('eq', 'TopTrends | Spain | Messi')
		cy.get('#word-graphs').should('exist')
		cy.get('#word-graphs').should('be.visible')
		cy.get('#interest-container').should('exist')
		cy.get('#interest-container').should('be.visible')
		cy.get('#interest-text').should('exist')
		cy.get('#interest-text').should('be.visible')
		cy.get('#interest-text').should('include.text', 'Messi interest')
		cy.get('#wordInterestGraph').should('exist')
		cy.get('#wordInterestGraph').should('be.visible')
	})
	it("Shouldn't show the word interest topics graph", () => {
		cy.visit('/trends/ES/words/FKSJDHFLSKDJGIUVBSDKL')
		cy.wait(10000)
		cy.title().should('eq', 'TopTrends | Spain | FKSJDHFLSKDJGIUVBSDKL')
		cy.get('#word-graphs').should('exist')
		cy.get('#word-graphs').should('be.visible')
		cy.get('#interest-container').should('exist')
		cy.get('#interest-container').should('be.visible')
		cy.get('#interest-text').should('exist')
		cy.get('#interest-text').should('be.visible')
		cy.get('#interest-text').should(
			'include.text',
			'FKSJDHFLSKDJGIUVBSDKL interest'
		)
		cy.get('#interest-container').get('#error-container').should('exist')
		cy.get('#interest-container').get('#error-container').should('be.visible')
		cy.get('#interest-container').get('#errorIcon').should('exist')
		cy.get('#interest-container').get('#errorIcon').should('be.visible')
		cy.get('#interest-container').get('#error-text').should('exist')
		cy.get('#interest-container').get('#error-text').should('be.visible')
		cy.get('#interest-container')
			.get('#error-text')
			.should('include.text', 'Data not found')
	})
})

describe('Word Related Topics Graph', () => {
	it('Should show the word related topics graph', () => {
		cy.visit('/trends/ES/words/Messi')
		cy.title().should('eq', 'TopTrends | Spain | Messi')
		cy.get('#word-graphs').should('exist')
		cy.get('#word-graphs').should('be.visible')
		cy.get('#topics-container').should('exist')
		cy.get('#topics-container').should('be.visible')
		cy.get('#topics-text').should('exist')
		cy.get('#topics-text').should('be.visible')
		cy.get('#topics-text').should('include.text', 'Messi related topics')
		cy.get('#wordTopicsGraph').should('exist')
		cy.get('#wordTopicsGraph').should('be.visible')
	})
	it("Shouldn't show the word related topics graph", () => {
		cy.visit('/trends/ES/words/FKSJDHFLSKDJGIUVBSDKL')
		cy.wait(10000)
		cy.title().should('eq', 'TopTrends | Spain | FKSJDHFLSKDJGIUVBSDKL')
		cy.get('#word-graphs').should('exist')
		cy.get('#word-graphs').should('be.visible')
		cy.get('#topics-container').should('exist')
		cy.get('#topics-container').should('be.visible')
		cy.get('#topics-text').should('exist')
		cy.get('#topics-text').should('be.visible')
		cy.get('#topics-text').should(
			'include.text',
			'FKSJDHFLSKDJGIUVBSDKL related topics'
		)
		cy.get('#topics-container').get('#error-container').should('exist')
		cy.get('#topics-container').get('#error-container').should('be.visible')
		cy.get('#topics-container').get('#errorIcon').should('exist')
		cy.get('#topics-container').get('#errorIcon').should('be.visible')
		cy.get('#topics-container').get('#error-text').should('exist')
		cy.get('#topics-container').get('#error-text').should('be.visible')
		cy.get('#topics-container')
			.get('#error-text')
			.should('include.text', 'Data not found')
	})
})

describe('404 page', () => {
	it('Should show 404 page', () => {
		cy.visit('/trends/NotCountry/words/Messi')
		cy.wait(5000)
		cy.title().should('eq', 'TopTrends | Country not found')
		cy.get('#not-found-container').should('exist')
		cy.get('#not-found-container').should('be.visible')
		cy.get('#error-icon').should('exist')
		cy.get('#error-icon').should('be.visible')
		cy.get('#not-found-text').should('exist')
		cy.get('#not-found-text').should('be.visible')
		cy.get('#not-found-text').should('include.text', 'Country not found')
	})
})

describe('Background', () => {
	it('It should show the background', () => {
		cy.visit('/trends/ES/words/Messi')
		cy.title().should('eq', 'TopTrends | Spain | Messi')
		cy.get('#background').should('exist')
	})
})

describe('Footer', () => {
	it('Should show the footer', () => {
		cy.visit('/trends/ES/words/Messi')
		cy.title().should('eq', 'TopTrends | Spain | Messi')
		cy.wait(5000)
		cy.get('#footer').should('exist')
		cy.get('#footer').should('be.visible')
		cy.get('#footer').should('include.text', 'Designed by Miguel Romero Arjona')
	})
})
