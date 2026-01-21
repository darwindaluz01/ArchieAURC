import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains, PasteCopiedFromClipboard } from '../variables/credentials.js';

test('Archie - Compose - Write an email or letter - Save as Memo', async ({ page }) => {
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
    await page.waitForTimeout(8000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask', exact: true }).click();
    await page.waitForTimeout(1000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Compose' }).click({ force: true });
    await page.waitForTimeout(2000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask', exact: true }).click();
    await page.waitForTimeout(3000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Compose' }).click({ force: true });
    await page.waitForTimeout(3000);

    // await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Select a recipient' }).click();
    // await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByText('Martin Kumagdin (Adoptor)').click();
    // await page.waitForTimeout(2000);
    //await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Draft an email to Martin Kumagdin    Compose an email addressing concerns for this matter');
    await page.waitForTimeout(2000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
    await page.waitForTimeout(20000);
    console.log('Archie Responded Successfully - Draft an email - Compose an email addressing concerns for this matter');

    //Copy to Clipboard
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.hover\\:bg-accent.hover\\:text-accent-foreground.h-10').first().click();
    //await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.hover\\:bg-accent.hover\\:text-accent-foreground.h-10').first().click();
    await page.waitForTimeout(2000);
    console.log('Copy to Clipboard');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Summarise this - ');

    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.waitForTimeout(2000);
        await page.screenshot({
            path: PasteCopiedFromClipboard,
            fullPage: true
        });
    await page.waitForTimeout(2000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.transition-opacity.duration-100.opacity-100 > .flex > button:nth-child(4)').click();
    await page.waitForTimeout(2000);
    await expect(page.locator('sbb-view-matter-memos-route')).toContainText('New Memo');

    await page.getByRole('button', { name: 'Archie' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask Archie a New Question' }).click();
    await page.waitForTimeout(2000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Compose' }).click();

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Letter' }).click();
    await page.waitForTimeout(2000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Draft a letter to    Create a short letter for the vendor about the next steps required for this matter');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();

    await page.waitForTimeout(12000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.flex.items-center > button:nth-child(4)').click();
    await expect(page.locator('sbb-view-matter-memos-route')).toContainText('New Memo');


    await page.waitForTimeout(2000);



    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
