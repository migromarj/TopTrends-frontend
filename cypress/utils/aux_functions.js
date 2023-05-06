function checkNavbar(title) {
	cy.title().should('eq', title)
	cy.get('#navBar').should('exist')
	cy.get('#navBar').should('be.visible')
	cy.get('#brandIcon').should('exist')
	cy.get('#brandIcon').should('be.visible')
	cy.get('#brand').should('exist')
	cy.get('#brand').should('be.visible')
	cy.get('#brand').should('include.text', 'TopTrends')
}

function checkCountryTitle(
	visit,
	title,
	previousURL,
	previousTitle,
	visitPage = true
) {
	if (visitPage) {
		cy.visit(visit)
	}
	cy.title().should('eq', title)
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
	cy.url().should('include', previousURL)
	cy.title().should('eq', previousTitle)
}

function check404(visit) {
	cy.visit(visit)
	cy.wait(5000)
	cy.title().should('eq', 'TopTrends | Country not found')
	cy.get('#not-found-container').should('exist')
	cy.get('#not-found-container').should('be.visible')
	cy.get('#error-icon').should('exist')
	cy.get('#error-icon').should('be.visible')
	cy.get('#not-found-text').should('exist')
	cy.get('#not-found-text').should('be.visible')
	cy.get('#not-found-text').should('include.text', 'Country not found')
}

function checkBackground(visit, title) {
	cy.visit(visit)
	cy.title().should('eq', title)
	cy.wait(5000)
	cy.get('#background').should('exist')
}

function checkFooter(visit, title) {
	cy.visit(visit)
	cy.title().should('eq', title)
	cy.wait(5000)
	cy.get('#footer').should('exist')
	cy.get('#footer').should('be.visible')
	cy.get('#footer').should('include.text', 'Designed by Miguel Romero Arjona')
}

export {
	checkNavbar,
	checkCountryTitle,
	check404,
	checkBackground,
	checkFooter,
}
