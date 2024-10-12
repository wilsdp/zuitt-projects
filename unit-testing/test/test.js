const {Builder, By} = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')
const path = require("path")
const chai = require("chai")
const {expect} = chai

let totalTests = 0
let passedTests = 0

function parsePixels(value) {
    return parseFloat(value.replace('px', ''))
}

/* Don't update. Uses an online page as URL for testing */
const fs = require('fs')
const data = fs.readFileSync('./test/activity.json')
const jsonData = JSON.parse(data)
let url = jsonData.url

module.exports.activity = function(){
    describe(`landing page test`, function(){
        let driver
        this.timeout(30000)

        const options = new firefox.Options()
        options.headless()
        options.setPreference('browser.download.manager.showWhenStarting', false)
        options.setPreference('browser.download.manager.useWindow', false)

        before(async function() {
            driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
        })

        beforeEach(function() {
            totalTests++
        })

        afterEach(async function() {
            if (this.currentTest.state === "passed") {
                passedTests++
            }
        })
        /*  add test cases here */
        /*  Navbar: */
        //  Test Case 1: Page contains a navbar
        //  Ensure the presence of a navbar element on the portfolio page.
            it('Page contains a navbar', async function() {
                await driver.get(url)
                const navbar = await driver.findElements(By.css('.navbar'))
                expect(navbar.length).to.be.at.least(1, 'No navbar found on the page')
            })

        //  Test Case 2: Navbar background color is rgb(255, 193, 7)
        //  Verify that the background color of the navbar matches the specified RGB value.
            it('Navbar background color is "rgb(255, 193, 7)"', async function() {
                await driver.get(url)
                const navbar = await driver.findElement(By.css('.navbar'))
                const bgColor = await navbar.getCssValue("background-color")
                expect(bgColor).to.equal("rgb(255, 193, 7)", "Navbar background color does not match rgb(255, 193, 7)")
            })

        //  Test Case 3: Page body font is not Times New Roman
        //  Confirm that the body font of the page is not set to Times New Roman.
            it('Page body font is not "Times New Roman"', async function() {
                await driver.get(url)
                const body = await driver.findElement(By.css('body'))
                const fontFamily = await body.getCssValue("font-family")
                expect(fontFamily).to.not.include("Times New Roman", "Page body font should not be Times New Roman")
            })

        //  Test Case 4: Page heading fonts are Montserrat
        //  Validate that heading fonts on the page are set to Montserrat.
            it('Page heading fonts are "Montserrat"', async function() {
                await driver.get(url)
                const headings = await driver.findElements(By.css('h1, h2, h3, h4'));
                for (let heading of headings) {
                    const fontFamily = await heading.getCssValue("font-family")
                    expect(fontFamily).to.include("Montserrat", "Heading font does not include Montserrat")
                }
            })

        //  Test Case 5: Element with client name "Jeff Bezos" is an h1 or h2
        //  Ensure that the element containing the text "Jeff Bezos" is either an h1 or h2 heading.
            it('Element with client name "Jeff Bezos" is an h1 or h2', async function() {
                await driver.get(url)
                const element = await driver.findElement(By.xpath('//*[contains(text(), "Jeff Bezos")]'))
                const tagName = await element.getTagName()
                expect(['h1', 'h2']).to.include(tagName, 'Element with client name "Jeff Bezos" is not an h1 or h2')
            })

        //  Test Case 6: Element with text "Web Developer" is an h3 or h4
        //  Verify that the element containing the text "Web Developer" is either an h3 or h4 heading.
            it('Element with text "Web Developer" is an h3 or h4', async function() {
                await driver.get(url)
                const element = await driver.findElement(By.xpath('//*[contains(text(), "Web Developer")]'))
                const tagName = await element.getTagName()
                expect(['h3', 'h4']).to.include(tagName, 'Element with text "Web Developer" is not an h3 or h4')
            })

        //  Test Case 7: Page has a link to GitLab
        //  Confirm the presence of a link to GitLab on the portfolio page.
            it('Page has a link to GitLab', async function() {
                await driver.get(url)
                const link = await driver.findElement(By.xpath('//a[contains(@href, "gitlab")]'))
                expect(link).to.exist
            })

        //  Test Case 8: Page has a link to GitHub
        //  Ensure the availability of a link to GitHub on the portfolio page.
            it('Page has a link to GitHub', async function() {
                await driver.get(url)
                const link = await driver.findElement(By.xpath('//a[contains(@href, "github")]'))
                expect(link).to.exist
            })

        //  Test Case 9: Page has a link to Facebook
        //  Validate the existence of a link to Facebook on the portfolio page.
            it('Page has a link to Facebook', async function() {
                await driver.get(url)
                const link = await driver.findElement(By.xpath('//a[contains(@href, "facebook")]'))
                expect(link).to.exist
            })

        //  Test Case 10: Page has a link to LinkedIn
        //  Confirm the presence of a link to LinkedIn on the portfolio page.
            it('Page has a link to LinkedIn', async function() {
                await driver.get(url)
                const link = await driver.findElement(By.xpath('//a[contains(@href, "linkedin")]'))
                expect(link).to.exist
            })

        //  Test Case 11: Page has a contact form
        //  Ensure the presence of at least one contact form on the portfolio page.
            it('Page has a contact form', async function() {
                await driver.get(url)
                const contactForms = await driver.findElements(By.css('form'))
                expect(contactForms.length).to.be.at.least(1, "No contact form found on the page")
            })

        //  Test Case 12: Page has a text input in the contact form
        //  Validate the existence of text input fields within the contact form.
            it('Page has a text input in the contact form', async function() {
                await driver.get(url)
                const textInput = await driver.findElements(By.xpath('//form//input[@type="text"]'))
                expect(textInput.length).to.be.at.least(1, "No text input found in the contact form")
            })

        //  Test Case 13: Page has an email input in the contact form
        //  Confirm the presence of email input fields within the contact form.
            it('Page has an email input in the contact form', async function() {
                await driver.get(url)
                const emailInput = await driver.findElements(By.xpath('//form//input[@type="email"]'))
                expect(emailInput.length).to.be.at.least(1, "No email input found in the contact form")
            })

        //  Test Case 14: Page has a textarea in the contact form
        //  Ensure the availability of a textarea element within the contact form.
            it('Page has a textarea in the contact form', async function() {
                await driver.get(url)
                const textArea = await driver.findElements(By.css('textarea'))
                expect(textArea.length).to.be.at.least(1, "No textarea found in the contact form")
            })

        after(async function() {
            await driver.quit();
            console.log("=======================")
            console.log(`Test Results: ${passedTests}/${totalTests}`);
            console.log(`Percentage: ${parseInt((passedTests/totalTests*100).toFixed(2))}%`)
            console.log("=======================")
        })
    })
}

