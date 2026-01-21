import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains, DraftAClause } from '../variables/credentials.js';

test('Archie Draft - Draft a legal document or clause - Clause', async ({ page }) => {
  test.setTimeout(200000);

    const loginPage = new LoginPage(page);
    const mattersPage = new MattersPage(page);
    const archiePage = new ArchiePage(page);

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
    await page.waitForTimeout(5000);



    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Draft' }).click();
    await page.waitForTimeout(2000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Clause' }).click();
    //await page.waitForTimeout(2000);
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Clause');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Document');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Memo');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByPlaceholder('Type your question here')).toContainText('Draft a clause');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    await page.waitForTimeout(2000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Draft a clause    about keeping information confidential');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
    await page.waitForTimeout(15000);
    console.log("Archie Successfully Responsed to Draft a clause about keeping information confidential");
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Draft a clause about keeping information confidential');
    await page.waitForTimeout(2000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Change Tone' }).click();
    await page.waitForTimeout(2000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('menuitem', { name: 'Assertive' }).click();

    await page.waitForTimeout(15000);
    console.log("Archie Successfully Responsed to Change Tone to Assertive");
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Please review the previous response and make the tone more assertive');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('clause');
    await page.waitForTimeout(2000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Change Length' }).nth(1).click();
    await page.waitForTimeout(2000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('menuitem', { name: 'Shorter' }).click();
    await page.waitForTimeout(15000);
    console.log("Archie Successfully Responsed to Change Length to Shorter");

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Please review the previous response and make it more concise');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Improve Writing' }).nth(2).click();
    await page.waitForTimeout(2000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('menuitem', { name: 'Clarity and conciseness' }).click();
    await page.waitForTimeout(15000);
    console.log("Archie Successfully Responsed to Improve Writing to Clarity and conciseness");


    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Please review the clarity of the previous response and make it more concise');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('clause');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Copy Clause to Clipboard');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Copy Clause to Clipboard' }).nth(3).click();
    console.log("Click Copy Clause to Clipboard");

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Explain this in layman\'s term - ');


    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.waitForTimeout(2000);
    await page.screenshot({
        path: DraftAClause,
        fullPage: true
    });
    await page.waitForTimeout(2000);
    console.log("Screenshot to verify Copy to Clipboard and Paste as Query is Correct");


    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
    await page.waitForTimeout(8000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.transition-opacity.duration-100.opacity-100 > .flex > button').first().click();
    await page.waitForTimeout(2000);
    console.log("Click Good Response");
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Why did you choose this rating? (optional)');
    await page.waitForTimeout(2000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Provide additional feedback..' }).click();
    await page.waitForTimeout(2000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Provide additional feedback..' }).fill('This is just a test.');
    await page.waitForTimeout(2000);
    console.log("Provided Feedback");
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Submit' }).click();
    await page.waitForTimeout(2000);
    console.log("Click Submit");
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Thanks for your feedback!');


    await page.waitForTimeout(2000);
    console.log('Draft > Draft a legal document or clause > Clause Completed');

    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
