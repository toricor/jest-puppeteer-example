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

    it('should have a description', async () => {
      let text = await page.evaluate(() => document.body.textContent)
      expect(text).toContain('おでかけをもっとたのしく。')
    })

    it('should have another description', async () => {
      let text = await page.evaluate(() => document.body.textContent)
      expect(text).toContain('個性的なパートナーキャラ「でんこ」と一緒に、日本全国の駅を巡ってみよう！')
    })

    it('should move to appstore', async () => {
       const res = await Promise.all([
         page.waitForNavigation(),
         page.click('a.appstore-anchor')  // 最初にマッチした要素を選ぶ
       ])

       const pageTitle = await page.title()
       console.log(pageTitle)
       expect(pageTitle).toMatch('iTunes')
    })

    it('should move to playstore ekimemo page', async () => {
      // 新規ページ
      page = await global.__BROWSER__.newPage()
      await page.goto('https://ekimemo.com', {waitUntil: "domcontentloaded"})

      const res = await Promise.all([
        page.waitForNavigation(),
        page.click('a.playstore-anchor') // 最初にマッチした要素を選ぶ
      ])

      const pageTitle = await page.title()
      expect(pageTitle).toMatch('Google Play')

      let text = await page.evaluate(() => document.body.textContent)
      expect(text).toContain('駅メモ！ - ステーションメモリーズ！- 位置ゲーム')
    })
  },
  timeout
)