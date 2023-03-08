describe('Navbar', () => {
	it('Should show the navbar', () => {
		cy.visit('/trends/ES/youtube')
		cy.title().should('eq', 'TopTrends | Spain | YouTube')
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
		cy.visit('/trends/ES/youtube')
		cy.title().should('eq', 'TopTrends | Spain | YouTube')
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
		cy.get('#views-text').should('include.text', 'Views count')
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
		cy.get('#likes-text').should('include.text', 'Likes count')
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
		cy.get('#comments-text').should('include.text', 'Comments count')
		cy.get('#Comments-graph').should('exist')
		cy.get('#Comments-graph').should('be.visible')
	})
})

describe('404 page', () => {
	it('Should show 404 page', () => {
		cy.visit('/trends/NotCountry/youtube')
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
		cy.visit('/trends/ES/youtube')
		cy.title().should('eq', 'TopTrends | Spain | YouTube')
		cy.get('#background').should('exist')
	})
})

describe('Footer', () => {
	it('Should show the footer', () => {
		cy.visit('/trends/ES/youtube')
		cy.title().should('eq', 'TopTrends | Spain | YouTube')
		cy.wait(5000)
		cy.get('#footer').should('exist')
		cy.get('#footer').should('be.visible')
		cy.get('#footer').should('include.text', 'Designed by Miguel Romero Arjona')
	})
})
