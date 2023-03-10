describe('Navbar', () => {
	it('Should show the navbar', () => {
		cy.visit('/trends/ES')
		cy.title().should('eq', 'TopTrends | Spain')
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
		cy.visit('/trends/ES')
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
	})
})

describe('Twitter container', () => {
	it('Should show Twitter container of a country', () => {
		cy.visit('/trends/ES')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.wait(10000)

		cy.get('#Twitter-title-container').should('exist')
		cy.get('#Twitter-title-container').should('be.visible')
		cy.get('#twitter-icon').should('exist')
		cy.get('#twitter-icon').should('be.visible')
		cy.get('#Twitter-title').should('exist')
		cy.get('#Twitter-title').should('be.visible')
		cy.get('#Twitter-title').should('have.text', 'Twitter')

		cy.get('#container-Twitter').should('exist')
		cy.get('#container-Twitter').should('be.visible')

		for (let i = 1; i < 11; i++) {
			cy.get('#Twitter-trend-' + i).should('exist')
			cy.get('#Twitter-trend-' + i).should('be.visible')
			cy.get('#Twitter-trend-' + i).should('include.text', `#${i} -`)
		}
		cy.get('#Twitter-trend-1').click()
		cy.wait(5000)
		cy.url().should('include', '/trends/ES/words/')
	})
	it("Shouldn't show Twitter container of a country", () => {
		cy.visit('/trends/RO')
		cy.title().should('eq', 'TopTrends | Romania')
		cy.wait(10000)
		cy.get('#container-Twitter').should('not.exist')
	})
})

describe('Google container', () => {
	it('Should show Google container of a country', () => {
		cy.visit('/trends/RO')
		cy.title().should('eq', 'TopTrends | Romania')
		cy.wait(10000)

		cy.get('#Google-title-container').should('exist')
		cy.get('#Google-title-container').should('be.visible')
		cy.get('#google-icon').should('exist')
		cy.get('#google-icon').should('be.visible')
		cy.get('#Google-title').should('exist')
		cy.get('#Google-title').should('be.visible')
		cy.get('#Google-title').should('have.text', 'Google')

		cy.get('#container-Google').should('exist')
		cy.get('#container-Google').should('be.visible')

		for (let i = 1; i < 11; i++) {
			cy.get('#Google-trend-' + i).should('exist')
			cy.get('#Google-trend-' + i).should('be.visible')
			cy.get('#Google-trend-' + i).should('include.text', `#${i} -`)
		}
		cy.get('#Google-trend-1').click()
		cy.wait(5000)
		cy.url().should('include', '/trends/RO/words/')
	})
	it("Shouldn't show Google container of a country", () => {
		cy.visit('/trends/ES')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.wait(10000)
		cy.get('#container-Google').should('not.exist')
	})
})

describe('YouTube container', () => {
	it('Should show YouTube container of a country', () => {
		cy.visit('/trends/ES')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.wait(10000)

		cy.get('#YouTube-title-container').should('exist')
		cy.get('#YouTube-title-container').should('be.visible')
		cy.get('#youtube-icon').should('exist')
		cy.get('#youtube-icon').should('be.visible')
		cy.get('#YouTube-title').should('exist')
		cy.get('#YouTube-title').should('be.visible')
		cy.get('#YouTube-title').should('have.text', 'YouTube')

		cy.get('#container-YouTube').should('exist')
		cy.get('#container-YouTube').should('be.visible')

		for (let i = 1; i < 11; i++) {
			cy.get('#YouTube-Trend-' + i).should('exist')
			cy.get('#YouTube-Trend-' + i).should('be.visible')
			cy.get('#YouTube-Trend-' + i).should('include.text', `#${i} -`)
		}

		cy.get('#dropdownYouTube').should('exist')
		cy.get('#dropdownYouTube').should('be.visible')
		cy.get('#dropdownYouTube').should('have.value', 'Default')
		cy.get('#dropdownYouTube').select('Sports')
		cy.get('#dropdownYouTube').should('have.value', 'Sports')

		cy.get('#YouTube-more-info').should('exist')
		cy.get('#YouTube-more-info').should('be.visible')
		cy.get('#YouTube-more-info').should('have.text', 'More info')
		cy.get('#YouTube-more-info').click()
		cy.wait(5000)
		cy.url().should('include', '/trends/ES/youtube')
	})
})

describe('404 page', () => {
	it('Should show 404 page', () => {
		cy.visit('/trends/NotCountry')
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
		cy.visit('/trends/ES')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.get('#background').should('exist')
		cy.get('#background').should('be.visible')
	})
})

describe('Footer', () => {
	it('Should show the footer', () => {
		cy.visit('/trends/ES')
		cy.title().should('eq', 'TopTrends | Spain')
		cy.wait(5000)
		cy.get('#footer').should('exist')
		cy.get('#footer').should('be.visible')
		cy.get('#footer').should('include.text', 'Designed by Miguel Romero Arjona')
	})
})
