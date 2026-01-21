import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains } from '../variables/credentials.js';

test('Archie Browse Analyse or review a document Single File Word and PDF', async ({ page }) => {
    test.setTimeout(200000);

    const loginPage = new LoginPage(page);
    const mattersPage = new MattersPage(page);
    const archiePage = new ArchiePage(page);

    //Reusable references
    const sdkFrame = page.locator('iframe[title="sdkEmbedded"]').contentFrame();
    const Typeyourquestionhere = sdkFrame.getByRole('textbox', { name: 'Type your question here' });
    const AskArchie = sdkFrame.locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8');

    // Login
    //await page.setViewportSize({ width: 1536, height: 864 });
    await loginPage.goto();
    await loginPage.login(sbusername, sbpassword);

    // Matters
    await mattersPage.goto();
    await mattersPage.searchMatter(matternamecontains);
    await mattersPage.verifyMenus();
    await mattersPage.openArchie();


    await page.getByRole('button', { name: 'Archie' }).click();
    await sdkFrame.getByRole('button', { name: 'Ask Archie a New Question' }).click();
    await sdkFrame.getByRole('button', { name: 'Browse' }).click();
    await page.getByText('statutory_declaration').click();
    await page.getByRole('button', { name: 'Select 1 files' }).click();
    await Typeyourquestionhere.click();
    await Typeyourquestionhere.fill('Review this document');
    await AskArchie.click();

    await page.waitForTimeout(10000);
    console.log('Archie Responded Successfully - Review this document');

    await expect(sdkFrame.getByLabel('Chat & Draft')).toContainText('Currently chatting with documentstatutory_declaration.docx');
    await Typeyourquestionhere.click();
    await Typeyourquestionhere.fill('What is this document about?');
    await AskArchie.click();

    await page.waitForTimeout(10000);
    console.log('Archie Responded Successfully - What is this document about?');


    await sdkFrame.getByRole('button', { name: 'Ask Archie a New Question' }).click();
    await sdkFrame.getByRole('button', { name: 'Browse' }).click();
    await page.getByText('Westpac-Bank-Statement-').click();
    await page.getByRole('button', { name: 'Select 1 files' }).click();
    await sdkFrame.getByText('Currently chatting with documentWestpac-Bank-Statement-BankStatements-net-docx-').click();
    await Typeyourquestionhere.click();
    await Typeyourquestionhere.fill('What are the key points of this document?');
    await AskArchie.click();


    await page.waitForTimeout(10000);
    console.log('Archie Responded Successfully - What are the key points of this document?');


    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
