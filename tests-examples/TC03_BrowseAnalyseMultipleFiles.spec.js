import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains } from '../variables/credentials.js';

test('Archie Browse Analyse or review a document - Multiple Files', async ({ page }) => {
  test.setTimeout(200000);

    const loginPage = new LoginPage(page);
    const mattersPage = new MattersPage(page);
    const archiePage = new ArchiePage(page);

    // Login
    //await page.setViewportSize({ width: 1600, height: 900 });
    //await page.setViewportSize({ width: 1536, height: 864 });
    //await page.setViewportSize({ width: 1534, height: 862 });
    await loginPage.goto();
    await loginPage.login(sbusername, sbpassword);

    // Matters
    await mattersPage.goto();
    await mattersPage.searchMatter(matternamecontains);
    await mattersPage.verifyMenus();
    await mattersPage.openArchie();


    await page.getByRole('button', { name: 'Archie' }).click();
    await page.waitForTimeout(5000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Browse' }).click();
    await page.locator('div:nth-child(4) > div > .Modal-module__align-center___2eMPo > .row-checkbox').check();
    await page.waitForTimeout(2000);
    await page.locator('div').filter({ hasText: /^statutory_declaration04:34 pm 01\/10\/202501\/10\/2025$/ }).getByRole('checkbox').check();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Select 2 files' }).click();
    await page.waitForTimeout(2000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Review these documents');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();

    await page.waitForTimeout(20000);
    console.log('Archie Responded Successfully - Review these documents');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('heading', { name: 'Suggested Results' })).toBeVisible();
    await page.waitForTimeout(2000);
    //await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('(1) Westpac-Bank-Statement-BankStatements-net-docx-2025-08-25-21_45_02.pdf');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: '(1) Westpac-Bank-Statement-' })).toBeVisible
    await page.waitForTimeout(2000);

    //await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('(2) statutory_declaration.docx');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: '(2) statutory_declaration.docx' })).toBeVisible();
    await page.waitForTimeout(2000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Start A New Chat' }).first().click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Summarise this file');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();

    await page.waitForTimeout(12000);
    console.log('Archie Responded Successfully - Summarise this file');



    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask Archie a New Question' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Browse' }).click();
    //await page.locator('div').filter({ hasText: /^ANZ-Bank-Statement-2025-08-25-21_40_0602:53 pm 01\/10\/202501\/10\/2025$/ }).getByRole('checkbox').check();
    await page.getByText('ANZ-Bank-Statement-2025-08-25').click();
    await page.waitForTimeout(2000);
    await page.locator('div:nth-child(2) > div > .Modal-module__align-center___2eMPo > .row-checkbox').check();
    await page.waitForTimeout(2000);
    await page.locator('div:nth-child(3) > div > .Modal-module__align-center___2eMPo > .row-checkbox').check();
    await page.waitForTimeout(2000);
    await page.locator('div:nth-child(4) > div > .Modal-module__align-center___2eMPo > .row-checkbox').check();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Select 4 files' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Compare these documents, give a short answer');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();

    await page.waitForTimeout(12000);
    console.log('Archie Responded Successfully - Compare these documents, give a short answer');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Analyse the content of the email');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
    


    await page.waitForTimeout(12000);
    
    console.log('Archie Responded Successfully - Analyse the content of the email');


    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
