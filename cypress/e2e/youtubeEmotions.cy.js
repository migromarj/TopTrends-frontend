import {
	checkNavbar,
	checkCountryTitle,
	check404,
	checkBackground,
	checkFooter,
	checkYouTubeTrend,
	checkEmotionGraphs,
	checkErrorEmotionGraphs,
} from '../utils/aux_functions'

describe('Navbar', () => {
	it('Should show the navbar', () => {
		cy.visit('/trends/ES/youtube/WoE6sG2JBrg')
		checkNavbar('TopTrends | Spain')
	})
})

describe('Country title', () => {
	it('Should show title of a country', () => {
		checkYouTubeTrend()
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

describe('Page content titles', () => {
	it('Should show title of a video', () => {
		checkYouTubeTrend()
		cy.get('#YouTube-trend-2')
			.invoke('text')
			.then(title => {
				title = title.substring(5, title.length - 1)
				cy.get('#YouTube-trend-2').click()
				cy.wait(30000)
				cy.title().should('eq', 'TopTrends | Spain')
				cy.get('#details-video-title').should('exist')
				cy.get('#details-video-title').should('be.visible')
				cy.get('#details-video-title').should('include.text', title)
				cy.get('#video-emotions-title').should('exist')
				cy.get('#video-emotions-title').should('be.visible')
				cy.get('#video-emotions-title').should('include.text', 'Emotions')
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

describe('Video details', () => {
	it('Should show details section', () => {
		checkYouTubeTrend()
		cy.get('#YouTube-trend-2').click()
		cy.title().should('eq', 'TopTrends | Spain')
		cy.get('#video-details-section').should('exist')
		cy.get('#video-details-section').should('be.visible')
	})
	it('Shouldn´t show details section', () => {
		cy.visit('/trends/ES/youtube/FKSJDHFLSKDJGIUVBSDKL')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.get('#video-details-section').should('not.exist')
	})
	it('Should show details section (image)', () => {
		checkYouTubeTrend()
		cy.get('#YouTube-trend-2').click()
		cy.title().should('eq', 'TopTrends | Spain')
		cy.get('#details-video-image').should('exist')
		cy.get('#details-video-image').should('be.visible')
	})
	it('Shouldn´t show details section (image)', () => {
		cy.visit('/trends/ES/youtube/FKSJDHFLSKDJGIUVBSDKL')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.get('#details-video-image').should('not.exist')
	})
	it('Should show details section (title)', () => {
		checkYouTubeTrend()
		cy.get('#YouTube-trend-2').click()
		cy.title().should('eq', 'TopTrends | Spain')
		cy.get('#details-video-section-title').should('exist')
		cy.get('#details-video-section-title').should('be.visible')
		cy.get('#details-video-section-title').should('include.text', 'Upload by')
	})
	it('Shouldn´t show details section (title)', () => {
		cy.visit('/trends/ES/youtube/FKSJDHFLSKDJGIUVBSDKL')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.get('#details-video-section-title').should('not.exist')
	})
	it('Should show details section (statistics)', () => {
		checkYouTubeTrend()
		cy.get('#YouTube-trend-2').click()
		cy.title().should('eq', 'TopTrends | Spain')
		cy.get('#details-video-section-statistics').should('exist')
		cy.get('#details-video-section-statistics').should('be.visible')
		cy.get('#details-video-section-statistics').should('include.text', 'views')
		cy.get('#details-video-section-statistics').should('include.text', 'likes')
		cy.get('#details-video-section-statistics').should(
			'include.text',
			'comments'
		)
	})
	it('Shouldn´t show details section (statistics)', () => {
		cy.visit('/trends/ES/youtube/FKSJDHFLSKDJGIUVBSDKL')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.get('#details-video-section-statistics').should('not.exist')
	})
	it('Should show details section (description)', () => {
		checkYouTubeTrend()
		cy.get('#YouTube-trend-2').click()
		cy.title().should('eq', 'TopTrends | Spain')
		cy.get('#details-video-section-description').should('exist')
		cy.get('#details-video-section-description').should('be.visible')
		cy.get('#details-video-section-description').should(
			'include.text',
			'Description'
		)
	})
	it('Shouldn´t show details section (description)', () => {
		cy.visit('/trends/ES/youtube/FKSJDHFLSKDJGIUVBSDKL')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.get('#details-video-section-description').should('not.exist')
	})
	it('Should show details section (video redirection)', () => {
		checkYouTubeTrend()
		cy.get('#YouTube-trend-2').click()
		cy.title().should('eq', 'TopTrends | Spain')
		cy.get('#details-video-section-redirect').should('exist')
		cy.get('#details-video-section-redirect').should('be.visible')
		cy.get('#details-video-section-redirect').should(
			'include.text',
			'Go to video'
		)
	})
	it('Shouldn´t show details section (video redirection)', () => {
		cy.visit('/trends/ES/youtube/FKSJDHFLSKDJGIUVBSDKL')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.get('#details-video-section-redirect').should('not.exist')
	})
})

describe('Emotion Graphs', () => {
	it('Should show the emotion graphs', () => {
		checkYouTubeTrend()
		cy.get('#YouTube-trend-2').click()
		checkEmotionGraphs()
	})
	it("Shouldn't show the emotion graphs", () => {
		cy.visit('/trends/ES/youtube/FKSJDHFLSKDJGIUVBSDKL')
		cy.title().should('eq', 'TopTrends | Spain')
		checkErrorEmotionGraphs()
	})
})
