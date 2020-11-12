const puppeteer = require('puppeteer');
const UUID = require('uuid');
const {pngPathToBase64} = require('./core')


const run=async (userName, password) => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 250 // slow down by 250ms
	})
	const page = await browser.newPage()
	await page.goto('https://vcbdigibank.vietcombank.com.vn/#/login?returnUrl=%2Fhome')
	/**
	 * 登录流程获取登录账号和密码
	 */
	await page.type('#username', userName)
	await page.type('#app_password_login', password)



	const $img = await page.$('img[width=\'100\']')
	var imgPath ='captcha/'+ UUID.v1()+'.png'
	await $img.screenshot({
		path:imgPath,
	});

	pngPathToBase64(imgPath)


	await page.type('input[name=\'captcha\']', '151515')
	// const a = await Promise.all([
	// 	page.waitForNavigation(),1
	// 	page.click('#su'),
	// ]);

	console.log(page.url())
	console.log()
	// await browser.close();
}
run('a','b')
