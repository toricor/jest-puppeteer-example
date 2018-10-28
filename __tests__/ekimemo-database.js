const timeout = 10000

describe(
  '/ (Home Page)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.setViewport({width: 1024, height: 768});
      await page.goto('https://ekimemo.com/database')
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    it('should have a correct title', async () => {
      const pageTitle = await page.title()
      expect(pageTitle).toMatch('駅メモ！ - ステーションメモリーズ！- 公式サイト')
    })
    it('五反田という駅名で正しく検索できる', async () => {
        const stationName = '五反田';
        await page.type('.text-input', stationName);
        await page.click('.search-btn');
        await page.waitFor('.activity-best-matched-station--result');

        let text = await page.evaluate(() => document.body.textContent)
        expect(text).toContain('JR山手線')
        expect(text).toContain('東急池上線')
        expect(text).toContain('都営浅草線')
        expect(text).toContain('東京都')
        await page.screenshot({path: "database-gotanda.png"});
        await page.click('.activity-best-matched-station--result a.activity-station-article-layout')
        await page.waitFor('.station-name-panel--station-activity')
        await page.screenshot({path: "database-gotanda-detail.png"});

        await page.click('a.activity-anchor.tab-btn.hover')
        await page.screenshot({path: "database-gotanda-detail-area.png"});
    })
    it('午後単打という駅名では一致する検索結果がない', async () => {

    })
  },
  timeout
)