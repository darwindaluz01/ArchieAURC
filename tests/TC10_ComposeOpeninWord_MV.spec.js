import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains, OpeninWord } from '../variables/credentials.js';

test('Archie Compose - Write an email or letter - Create Letter From Draft', async ({ page }) => {
    test.setTimeout(240000);

    const loginPage = new LoginPage(page);
    const mattersPage = new MattersPage(page);
    const archiePage = new ArchiePage(page);

    //Reusable references
    const sdkFrame = page.locator('iframe[title="sdkEmbedded"]').contentFrame();
    const Typeyourquestionhere = sdkFrame.getByRole('textbox', { name: 'Type your question here' });
    const AskArchie = sdkFrame.locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8');

    // Login
    await loginPage.goto();
    await loginPage.login(sbusername, sbpassword);

    // Matters
    await mattersPage.goto();
    await mattersPage.searchMatter(matternamecontains);
    await mattersPage.verifyMenus();
    await mattersPage.openArchie();

    await page.getByRole('button', { name: 'Archie' }).click();
    await page.waitForTimeout(8000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask', exact: true }).click();
    await page.waitForTimeout(1000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Compose' }).click({ force: true });
    await page.waitForTimeout(2000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask', exact: true }).click();
    await page.waitForTimeout(3000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Compose' }).click({ force: true });
    await page.waitForTimeout(3000);


    await sdkFrame.getByRole('button', { name: 'Letter' }).click();
    await page.waitForTimeout(1000);
    // await sdkFrame.getByRole('button', { name: 'Select a recipient' }).click();
    // await page.waitForTimeout(1000);
    // await sdkFrame.getByText('Martin Kumagdin (Adoptor)').click();
    await Typeyourquestionhere.click();
    await page.waitForTimeout(1000);

    await Typeyourquestionhere.fill('Draft a letter to Martin Kumagdin    Create a letter containing important matter details');
    await AskArchie.click();

    await page.waitForTimeout(15000);
    await sdkFrame.locator('button:nth-child(5)').click();
    console.log('Click Open in Word');


    const page1Promise = page.waitForEvent('popup');
    await page.waitForTimeout(5000);
    //await page.getByRole('button', { name: 'Create in Web' }).click();
    //await page.getByRole('link', { name: 'External link Open Document' }).click();



    const page1 = await page1Promise;

    // Wait until the popup has an actual URL (avoid 'about:blank')
    if (!page1.url() || page1.url() === 'about:blank') {
        await page1.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 });
    }

    // Proceed only if SharePoint URL is detected
    if (page1.url().includes('https://smokeballus-my.sharepoint.com/')) {
        console.log('SharePoint page detected:', page1.url());
        await page.waitForTimeout(5000);

        const wacFrame = page1.frameLocator('iframe[name^="WacFrame_Word_"]').first();
        await page.waitForTimeout(5000);

        await wacFrame.getByRole('tab', { name: 'Smokeball - Staging' }).click();
        await page.waitForTimeout(5000);
        await wacFrame.getByRole('button', { name: 'Show Details' }).click();
        await page.waitForTimeout(5000);

        await expect(wacFrame.locator('#AppForOfficePanel0TaskPaneTitle'))
            .toContainText('Smokeball - Staging');

        await page1.close();
    } else {
        console.warn('Unexpected URL, skipping:', page1.url());
        await page1.close();
    }

    await page.screenshot({
        path: OpeninWord,
        fullPage: true
    });

    //await page.getByRole('button', { name: '' }).click();
    await page.locator('button.close-icon').click();


    await page.waitForTimeout(2000);
    console.log('Open in Word');

    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
