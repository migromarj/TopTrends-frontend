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

function checkSearchEngine() {
	cy.visit('/')
	cy.wait(3000)
	cy.title().should('eq', 'TopTrends | Home')
	cy.get('#autocomplete-1-label').should('exist')
	cy.get('#autocomplete-1-label').should('be.visible')
	cy.get('#autocomplete-1-label').should('have.value', '')
}

function checkYouTubeStatisticsGraph() {
	cy.visit('/trends/ES/youtube')
	cy.title().should('eq', 'TopTrends | Spain | YouTube')
	cy.get('#graphs-container').should('exist')
	cy.get('#graphs-container').should('be.visible')
}

function checkYouTubeTrend() {
	cy.visit('/trends/ES')
	cy.title().should('eq', 'TopTrends | Spain')
	cy.wait(10000)
	cy.get('#YouTube-trend-2').should('exist')
	cy.get('#YouTube-trend-2').should('be.visible')
}

function checkWordGraphs() {
	cy.visit('/trends/ES/words/Messi')
	cy.title().should('eq', 'TopTrends | Spain | Messi')
	cy.get('#word-graphs').should('exist')
	cy.get('#word-graphs').should('be.visible')
}

function checkErrorWordGraphs() {
	cy.visit('/trends/ES/words/FKSJDHFLSKDJGIUVBSDKL')
	cy.wait(10000)
	cy.title().should('eq', 'TopTrends | Spain | FKSJDHFLSKDJGIUVBSDKL')
	cy.get('#word-graphs').should('exist')
	cy.get('#word-graphs').should('be.visible')
}

function checkInterest(title) {
	cy.get('#interest-container').should('exist')
	cy.get('#interest-container').should('be.visible')
	cy.get('#interest-text').should('exist')
	cy.get('#interest-text').should('be.visible')
	cy.get('#interest-text').should('include.text', title)
}

function checkRelatedTopics(text) {
	cy.get('#topics-container').should('exist')
	cy.get('#topics-container').should('be.visible')
	cy.get('#topics-text').should('exist')
	cy.get('#topics-text').should('be.visible')
	cy.get('#topics-text').should('include.text', text)
}

function checkEmotionGraphs() {
	cy.wait(30000)
	cy.get('#emotion-container').should('exist')
	cy.get('#emotion-container').should('be.visible')
	cy.get('#emotion-container-1').should('exist')
	cy.get('#emotion-container-1').should('be.visible')
	cy.get('#emotion-container-2').should('exist')
	cy.get('#emotion-container-2').should('be.visible')
}

function checkErrorEmotionGraphs() {
	cy.wait(30000)
	cy.get('#emotion-container').should('not.exist')
	cy.get('#emotion-container-1').should('not.exist')
	cy.get('#emotion-container-2').should('not.exist')
	cy.get('#error-container').should('exist')
	cy.get('#error-container').should('be.visible')
	cy.get('#error-container').should('include.text', 'Data not found')
}

export {
	checkNavbar,
	checkCountryTitle,
	check404,
	checkBackground,
	checkFooter,
	checkSearchEngine,
	checkYouTubeStatisticsGraph,
	checkYouTubeTrend,
	checkWordGraphs,
	checkErrorWordGraphs,
	checkInterest,
	checkRelatedTopics,
	checkEmotionGraphs,
	checkErrorEmotionGraphs,
}
