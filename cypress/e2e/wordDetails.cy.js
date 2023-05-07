import {
	checkNavbar,
	checkCountryTitle,
	check404,
	checkBackground,
	checkFooter,
	checkWordGraphs,
	checkErrorWordGraphs,
	checkInterest,
	checkRelatedTopics,
	checkEmotionGraphs,
	checkErrorEmotionGraphs,
} from '../utils/aux_functions'

describe('Navbar', () => {
	it('Should show the navbar', () => {
		cy.visit('/trends/ES/words/Messi')
		checkNavbar('TopTrends | Spain | Messi')
	})
})

describe('Country title', () => {
	it('Should show title of a country', () => {
		checkCountryTitle(
			'/trends/ES/words/Messi',
			'TopTrends | Spain | Messi',
			'/trends/ES',
			'TopTrends | Spain'
		)
	})
})

describe('Word title', () => {
	it('Should show title of a word', () => {
		cy.visit('/trends/ES/words/Messi')
		cy.title().should('eq', 'TopTrends | Spain | Messi')
		cy.get('#statistics-word-title').should('exist')
		cy.get('#statistics-word-title').should('be.visible')
		cy.get('#statistics-word-title').should(
			'include.text',
			'Messi word details'
		)
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
		checkWordGraphs()
		checkInterest('Messi interest')
		cy.get('#wordInterestGraph').should('exist')
		cy.get('#wordInterestGraph').should('be.visible')
	})
	it("Shouldn't show the word interest topics graph", () => {
		checkErrorWordGraphs()
		checkInterest('FKSJDHFLSKDJGIUVBSDKL interest')
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
		checkWordGraphs()
		checkRelatedTopics('Messi related topics')
		cy.get('#wordTopicsGraph').should('exist')
		cy.get('#wordTopicsGraph').should('be.visible')
	})
	it("Shouldn't show the word related topics graph", () => {
		checkErrorWordGraphs()
		checkRelatedTopics('FKSJDHFLSKDJGIUVBSDKL related topics')
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
		check404('/trends/NotCountry/words/Messi')
	})
})

describe('Background', () => {
	it('It should show the background', () => {
		checkBackground('/trends/ES/words/Messi', 'TopTrends | Spain | Messi')
	})
})

describe('Footer', () => {
	it('Should show the footer', () => {
		checkFooter('/trends/ES/words/Messi', 'TopTrends | Spain | Messi')
	})
})

describe('Emotion Graphs', () => {
	it('Should show the emotion graphs', () => {
		cy.visit('/trends/ES/words/Messi')
		cy.title().should('eq', 'TopTrends | Spain | Messi')
		cy.get('#emotion-title').should('exist')
		cy.get('#emotion-title').should('be.visible')
		cy.get('#emotion-title').should('include.text', 'Messi emotions')
		checkEmotionGraphs()
	})
	it("Shouldn't show the emotion graphs", () => {
		cy.visit('/trends/ES/words/FKSJDHFLSKDJGIUVBSDKL')
		cy.wait(15000)
		cy.title().should('eq', 'TopTrends | Spain | FKSJDHFLSKDJGIUVBSDKL')
		cy.get('#emotion-title').should('exist')
		cy.get('#emotion-title').should('be.visible')
		cy.get('#emotion-title').should(
			'include.text',
			'FKSJDHFLSKDJGIUVBSDKL emotions'
		)
		checkErrorEmotionGraphs()
	})
})
