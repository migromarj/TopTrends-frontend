import {
	checkNavbar,
	checkCountryTitle,
	check404,
	checkBackground,
	checkFooter,
} from '../utils/aux_functions'

describe('Navbar', () => {
	it('Should show the navbar', () => {
		cy.visit('/trends/ES/youtube/WoE6sG2JBrg')
		checkNavbar('TopTrends | Spain')
	})
})

describe('Country title', () => {
	it('Should show title of a country', () => {
		cy.visit('/trends/ES')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.wait(10000)
		cy.get('#YouTube-trend-2').should('exist')
		cy.get('#YouTube-trend-2').should('be.visible')
		cy.get('#YouTube-trend-2').click()
		cy.wait(10000)
		checkCountryTitle(
			'/trends/ES/youtube/WoE6sG2JBrg',
			'TopTrends | Spain',
			'/trends/ES',
			'TopTrends | Spain',
			false
		)
	})
})

describe('Page content title', () => {
	it('Should show title of a video', () => {
		cy.visit('/trends/ES')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.wait(10000)
		cy.get('#YouTube-trend-2').should('exist')
		cy.get('#YouTube-trend-2').should('be.visible')
		//Get the text that is in #YouTube-trend-2
		cy.get('#YouTube-trend-2')
			.invoke('text')
			.then(title => {
				title = title.substring(5, title.length - 1)
				cy.get('#YouTube-trend-2').click()
				cy.wait(30000)
				cy.title().should('eq', 'TopTrends | Spain')
				cy.get('#statistics-word-title').should('exist')
				cy.get('#statistics-word-title').should('be.visible')
				cy.get('#statistics-word-title').should(
					'include.text',
					title + ' emotions'
				)
			})
	})
})

describe('404 page', () => {
	it('Should show 404 page', () => {
		check404('/trends/NotCountry/youtube/WoE6sG2JBrg')
	})
})

describe('Background', () => {
	it('It should show the background', () => {
		checkBackground('/trends/ES/youtube/WoE6sG2JBrg', 'TopTrends | Spain')
	})
})

describe('Footer', () => {
	it('Should show the footer', () => {
		checkFooter('/trends/ES/youtube/WoE6sG2JBrg', 'TopTrends | Spain')
	})
})

describe('Emotion Graphs', () => {
	it('Should show the emotion graphs', () => {
		cy.visit('/trends/ES')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.wait(10000)
		cy.get('#YouTube-trend-2').should('exist')
		cy.get('#YouTube-trend-2').should('be.visible')
		cy.get('#YouTube-trend-2').click()
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
