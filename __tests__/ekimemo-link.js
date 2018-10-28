const timeout = 10000

describe(
  '/ (Home Page)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.setViewport({width: 1024, height: 768});
      await page.goto('https://ekimemo.com')
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    it('should have a correct title', async () => {
      const pageTitle = await page.title()
      expect(pageTitle).toMatch('駅メモ！ - ステーションメモリーズ！- 公式サイト')
    })
    it('should move to is-game', async () => {
      await page.waitForSelector('.tappable-sub-navigation-label.is-game')
      await page.focus('.tappable-sub-navigation-label.is-game')
      await page.hover('.tappable-sub-navigation-label.is-game')
      //await page.waitForSelector('.tappable-sub-navigation-label.is-game.hover')
      await page.focus('.navigation-anchor.is-about')
      await page.hover('.navigation-anchor.is-about')
      await page.click('.navigation-anchor.is-about')
    })
  },
  timeout
)