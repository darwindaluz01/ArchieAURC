import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains, CreateEmailfromDraft } from '../variables/credentials.js';

test('Archie Compose - Write an email or letter - Create Email From Draft', async ({ page }) => {
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


    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Compose' }).click();
    
    
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Select a recipient' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByText('Martin Kumagdin (Adoptor)').click();
    await page.waitForTimeout(2000);
    
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Draft an email to Martin Kumagdin    Create a follow up email');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').dblclick();
    await page.waitForTimeout(10000);
    console.log('Draft an email');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Change Tone' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('menuitem', { name: 'Urgent' }).click();
    await page.waitForTimeout(10000);
    console.log('Archie Successfully Change Tone to Urgent');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Change Tone' }).nth(1).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('menuitem', { name: 'Friendly' }).click();
    await page.waitForTimeout(10000);
    console.log('Archie Successfully Change Tone to Friendly');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Change Length' }).nth(2).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('menuitem', { name: 'Longer' }).click();
    await page.waitForTimeout(10000);
    console.log('Archie Successfully Change Length to Longer');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Change Length' }).nth(3).dblclick();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('menuitem', { name: 'Shorter' }).click();
    await page.waitForTimeout(10000);
    console.log('Archie Successfully Change Length to Shorter');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Improve Writing' }).nth(4).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('menuitem', { name: 'Legal Terminology' }).click();
    await page.waitForTimeout(12000);
    console.log('Archie Successfully Improve Writing using Legal Terminology');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('button:nth-child(8)').click();
    await page.waitForTimeout(10000);
    console.log('Click Regenerate Response');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.transition-opacity.duration-100.opacity-100 > .flex > button').first().click();
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByText('Why did you choose this')).toBeVisible();
    await page.waitForTimeout(1000);
    console.log('Click Good Response');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Provide additional feedback..' })).toBeVisible();
    //await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Provide additional feedback..' }).click();

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Provide additional feedback..' }).fill('This is just a test.');
    console.log('Provide Feedback');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Submit' }).click();
    await page.waitForTimeout(2000);
    console.log('Click Submit');


    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByText('Thanks for your feedback!')).toBeVisible();
    console.log('Verify Thanks for your feedback! is displayed.');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('div:nth-child(12) > .w-full.flex.flex-col > .flex.gap-2.items-start > .px-1 > .prose > .relative > .border-\\[\\#D1DDF8\\].border-t > .flex.flex-wrap.gap-1.items-center > .inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.text-secondary-foreground')).toBeVisible();



    //await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('div:nth-child(13) > .w-full.flex.flex-col > .flex.gap-2.items-start > .px-1 > .prose > .relative > .border-\\[\\#D1DDF8\\].border-t > .flex.flex-wrap.gap-1.items-center > .inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.text-secondary-foreground').click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('div:nth-child(12) > .w-full.flex.flex-col > .flex.gap-2.items-start > .px-1 > .prose > .relative > .border-\\[\\#D1DDF8\\].border-t > .flex.flex-wrap.gap-1.items-center > .inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.text-secondary-foreground').click();
    await page.waitForTimeout(1000);
    const mailLink = page.locator('a[href^="mailto:"]');
    //await expect(mailLink).toHaveAttribute('href', /martin\.kumagdin@mail\.com/i);
    //await expect(mailLink).toHaveAttribute('href', /mailto:martin\.kumagdin@mail\.com/i);

    await page.screenshot({
        path: CreateEmailfromDraft,
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
