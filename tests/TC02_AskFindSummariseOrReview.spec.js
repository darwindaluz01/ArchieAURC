import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains } from '../variables/credentials.js';


test('Archie Ask Find Summarise Review', async ({ page }) => {
    test.setTimeout(200000);

    const loginPage = new LoginPage(page);
    const mattersPage = new MattersPage(page);
    const archiePage = new ArchiePage(page);

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
    await page.waitForTimeout(5000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask', exact: true }).click();
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Compose' }).click({ force: true });
    await page.waitForTimeout(2000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask', exact: true }).click();
    await page.waitForTimeout(2000);
    await sdkFrame.getByRole('button', { name: 'About This Matter' }).click();
    await Typeyourquestionhere.click();
    await Typeyourquestionhere.fill('Tell me about this matter');
    await AskArchie.click();

    await page.waitForTimeout(10000);
    console.log('Archie Responded Successfully - Tell me about this matter');


    await expect(sdkFrame.getByRole('button', { name: 'Ask Archie a New Question' })).toBeVisible();
    await sdkFrame.getByRole('button', { name: 'Ask Archie a New Question' }).click();
    await sdkFrame.getByRole('button', { name: 'Ask', exact: true }).click();
    await sdkFrame.getByRole('button', { name: 'A General Legal Question' }).click();
    await Typeyourquestionhere.click();
    await Typeyourquestionhere.fill('Who are the persons involved in this matter?');
    await AskArchie.click();

    await page.waitForTimeout(10000);
    console.log('Archie Responded Successfully - Who are the persons involved in this matter?');



    await sdkFrame.getByRole('button', { name: 'Ask Archie a New Question' }).click();
    await sdkFrame.getByRole('button', { name: 'Ask', exact: true }).click();
    await sdkFrame.getByRole('button', { name: 'A General Legal Question' }).click();
    await Typeyourquestionhere.click();
    await Typeyourquestionhere.fill('What are the legal requirements for a valid purchase agreement?');
    await AskArchie.click();
    await page.waitForTimeout(10000);
    console.log('Archie Responded Successfully - What are the legal requirements for a valid purchase agreement?');

    await sdkFrame.getByRole('button', { name: 'Ask Archie a New Question' }).click();
    await sdkFrame.getByRole('button', { name: 'Ask', exact: true }).click();
    await Typeyourquestionhere.click();
    await Typeyourquestionhere.fill('Summarize your answer');
    await AskArchie.click();
    await page.waitForTimeout(10000);
    console.log('Archie Responded Successfully - Summarize your answer');

    await sdkFrame.getByRole('button', { name: 'Ask Archie a New Question' }).click();
    await sdkFrame.getByRole('button', { name: 'Ask', exact: true }).click();
    await Typeyourquestionhere.click();
    await Typeyourquestionhere.fill('Review the role of the client');
    await AskArchie.click();
    await page.waitForTimeout(10000);
    console.log('Archie Responded Successfully - Review the role of the client');


    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
