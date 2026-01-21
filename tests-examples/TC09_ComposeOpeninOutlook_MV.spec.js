import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains, OpeninOutlook } from '../variables/credentials.js';

test('Archie Compose - Write an email or letter - Open in Outlook', async ({ page }) => {
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

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Compose' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Select a recipient' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('option', { name: 'Martin Kumagdin (Adoptor)' }).locator('div').click();

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Draft an email to Martin Kumagdin    Compose an email addressing the urgency of this matter');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
    await page.waitForTimeout(15000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('button:nth-child(6)').click();

    
    await page.waitForTimeout(3000);
    const mailLink = page.locator('a[href^="mailto:"]');
    //await expect(mailLink).toHaveAttribute('href', /martin\.kumagdin@mail\.com/i);
    //await expect(mailLink).toHaveAttribute('href', /mailto:martin\.kumagdin@mail\.com/i);

    await page.screenshot({
        path: OpeninOutlook,
        fullPage: true
    });


    await page.waitForTimeout(2000);
    console.log('Create Email from Draft');

    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
