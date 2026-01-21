import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains, OpeninWord } from '../variables/credentials.js';
import path from 'path';

test('Archie Knowledge Source - Add Knowledge Source and Ask Achie using the KS', async ({ page }) => {
    test.setTimeout(300000);

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

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Knowledge Sources' }).click();
    await page.waitForTimeout(3000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Add Knowledge Source' }).click();
    await page.waitForTimeout(3000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('input[name="name"]').click();
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('input[name="name"]').fill('Animal Cruelty Knowledge Source');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('textarea[name="description"]').click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('textarea[name="description"]').fill('This is just a test');
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Create Knowledge Source' }).click();
    await page.waitForTimeout(5000);


    const frame = page
        .getByRole('dialog')
        .filter({ hasText: 'Archie' })
        .locator('iframe[title="sdkEmbedded"]')
        .contentFrame();

    await frame.getByText('Browse').click();

    const fileInput = frame.locator('input[type="file"]').first();

    await fileInput.setInputFiles('C:\\Users\\DarwinDaluz\\Documents\\Smokeball Files\\Archie Centralised Documents\\Chronologies\\Animal Cruelty Case.pdf');
    // or better: await fileInput.setInputFiles('tests/files/AnimalCrueltyCase.pdf');




    // await page.waitForTimeout(80000);

    // await expect(page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().locator('tbody')).toContainText('Complete');


    // await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('switch').click();
    // //await page.getByRole('button', { name: '' }).click();

    await page.locator('button.close-icon').click();
    await page.waitForTimeout(5000);

    // await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('tbody')).toContainText('Animal Cruelty Knowledge Source');
    // await page.waitForTimeout(5000);

    // await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'New Chat' }).click();
    // await page.waitForTimeout(5000);

    // // This single command safely finds the first element whose ID starts with 'radix-'
    // // within the iframe and clicks it.
    // await page.locator('iframe[title="sdkEmbedded"]')
    //     .contentFrame()
    //     .locator('[id^="radix-"]')
    //     .first() // Ensures only one element is selected and clicked
    //     .click();


    // await page.waitForTimeout(5000);
    // await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('radio', { name: 'Select Knowledge Sources' }).click();
    // await page.waitForTimeout(5000);



    // await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('checkbox', { name: 'Animal Cruelty Knowledge' }).click();
    // await page.waitForTimeout(5000);



    // await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    // await page.waitForTimeout(2000);

    // await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('What are the details of the animal cruelty knowledge source?');
    // await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
    // await page.waitForTimeout(15000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'New Chat' }).click();
    await page.waitForTimeout(5000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Knowledge Sources' }).click();
    await page.waitForTimeout(5000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('searchbox', { name: 'Search' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('searchbox', { name: 'Search' }).fill('Animal Cruelty Knowledge Source');
    await page.waitForTimeout(5000);
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('tbody')).toContainText('Animal Cruelty Knowledge Source');
    await page.waitForTimeout(5000);

    //await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Open menu' }).click();
    await page.locator('iframe[title="sdkEmbedded"]')
        .contentFrame()
        .getByRole('button', { name: 'Open menu' })
        .first() // Selects the first matching element, regardless of how many exist
        .click();

    await page.waitForTimeout(2000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Open menu').getByText('Delete').click();
    await page.waitForTimeout(3000);

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('heading')).toContainText('Delete Knowledge Source');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('paragraph')).toContainText('Deleting "Animal Cruelty Knowledge Source" cannot be undone. Are you sure you want to delete it?');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Delete Knowledge Source')).toContainText('Cancel');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Delete Knowledge Source')).toContainText('Delete');
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Delete' }).click();
    await page.waitForTimeout(1000);
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('status')).toContainText('Knowledge library deleted successfully');
    await page.waitForTimeout(3000);



    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
