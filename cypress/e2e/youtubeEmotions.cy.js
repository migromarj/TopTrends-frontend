describe('Navbar', () => {
	it('Should show the navbar', () => {
		cy.visit('/trends/ES/youtube/WoE6sG2JBrg')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.get('#navBar').should('exist')
		cy.get('#navBar').should('be.visible')
		cy.get('#brandIcon').should('exist')
		cy.get('#brandIcon').should('be.visible')
		cy.get('#brand').should('exist')
		cy.get('#brand').should('be.visible')
		cy.get('#brand').should('include.text', 'TopTrends')
	})
})

describe('Country title', () => {
	it('Should show title of a country', () => {
		cy.visit('/trends/ES/youtube/WoE6sG2JBrg')
		cy.title().should('eq', 'TopTrends | Spain')
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

describe('Page content title', () => {
	it('Should show title of a video', () => {
		cy.visit('/trends/ES/youtube/WoE6sG2JBrg')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.get('#statistics-word-title').should('exist')
		cy.get('#statistics-word-title').should('be.visible')
		cy.get('#statistics-word-title').should(
			'include.text',
			'Fran Perea, Despistaos - Uno más uno son 7 (Videoclip oficial) emotions'
		)
	})
})

describe('404 page', () => {
	it('Should show 404 page', () => {
		cy.visit('/trends/NotCountry/youtube/WoE6sG2JBrg')
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
		cy.visit('/trends/ES/youtube/WoE6sG2JBrg')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.get('#background').should('exist')
	})
})

describe('Footer', () => {
	it('Should show the footer', () => {
		cy.visit('/trends/ES/youtube/WoE6sG2JBrg')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.wait(5000)
		cy.get('#footer').should('exist')
		cy.get('#footer').should('be.visible')
		cy.get('#footer').should('include.text', 'Designed by Miguel Romero Arjona')
	})
})

describe('Emotion Graphs', () => {
	it('Should show the emotion graphs', () => {
		cy.visit('/trends/ES/youtube/WoE6sG2JBrg')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.wait(30000)
		cy.get('#emotion-container').should('exist')
		cy.get('#emotion-container').should('be.visible')
		cy.get('#emotion-container-1').should('exist')
		cy.get('#emotion-container-1').should('be.visible')
		cy.get('#emotion-container-2').should('exist')
		cy.get('#emotion-container-2').should('be.visible')
	})
	it("Shouldn't show the emotion graphs", () => {
		cy.visit('/trends/ES/youtube/FKSJDHFLSKDJGIUVBSDKL')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.wait(30000)
		cy.get('#emotion-container').should('not.exist')
		cy.get('#emotion-container-1').should('not.exist')
		cy.get('#emotion-container-2').should('not.exist')
		cy.get('#error-container').should('exist')
		cy.get('#error-container').should('be.visible')
		cy.get('#error-container').should('include.text', 'Data not found')
	})
})
