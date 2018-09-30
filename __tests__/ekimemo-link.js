const timeout = 10000

describe(
  '/ (Home Page)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.setViewport({width: 1024, height: 768});
      await page.goto('https://ekimemo.com', {waitUntil: "domcontentloaded"})
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    it('should have a correct title', async () => {
      const pageTitle = await page.title()
      expect(pageTitle).toMatch('駅メモ！ - ステーションメモリーズ！- 公式サイト')
    })
    it('should move to is-game', async () => {
      await page.waitForSelector(".tappable-sub-navigation-label.is-game")
     await page.hover('.tappable-sub-navigation-label.is-game')
     await page.waitFor(3000)
     await page.waitForSelector(".tappable-sub-navigation-label.is-game.is-active")
     await page.waitFor(3000)

     await page.hover('.tappable-sub-navigation-label.is-special')
     await page.waitFor(3000)
     //expect("hoge").toMatch('駅メモ！ - ステーションメモリーズ！- 公式サイト')
    })
  },
  timeout
)