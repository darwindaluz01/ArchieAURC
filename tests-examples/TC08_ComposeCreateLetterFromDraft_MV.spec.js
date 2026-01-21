import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains, CreateLetterfromDraft } from '../variables/credentials.js';

test('Archie Compose - Write an email or letter - Create Letter From Draft', async ({ page }) => {
    test.setTimeout(240000);

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
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Draft a letter to Martin Kumagdin    Compose a request letter');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
    await page.waitForTimeout(12000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Change Tone' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('menuitem', { name: 'Optimistic' }).click();
    await page.waitForTimeout(12000);

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Please review the previous response and make the tone more optimistic');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Change Tone' }).nth(1).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('menuitem', { name: 'Concise' }).click();
    await page.waitForTimeout(12000);

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Please review the previous response and make is more concise');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Create a short letter ');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();

    await page.waitForTimeout(12000);

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Create a short letter');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('letter');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Change Length' }).nth(3).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('menuitem', { name: 'Longer' }).click();
    await page.waitForTimeout(12000);

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Please review the previous response and make it more comprehensive');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Change Length' }).nth(4).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('menuitem', { name: 'Shorter' }).click();
    await page.waitForTimeout(12000);

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Please review the previous response and make it more concise');


    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Improve Writing' }).nth(5).click();
    //await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('[id="radix-«rda»"]').click();
    //await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('[id="radix-«rad»"]').click();


    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('menuitem', { name: 'Professional Tone' }).click();
    await page.waitForTimeout(12000);

    //await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('div:nth-child(16) > .w-full.flex.flex-col > .flex.gap-2.items-start > .px-1 > .prose > .relative > .border-\\[\\#D1DDF8\\].border-t > .flex.flex-wrap.gap-1.items-center > .inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.text-secondary-foreground').click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('div:nth-child(12) > .w-full.flex.flex-col > .flex.gap-2.items-start > .px-1 > .prose > .relative > .border-\\[\\#D1DDF8\\].border-t > .flex.flex-wrap.gap-1.items-center > .inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.text-secondary-foreground').click();


    /*
    const frame = await page.frameLocator('iframe[title="sdkEmbedded"]').first();
    const section = frame.locator('div', { hasText: 'Create Letter From Draft' });
    await section.locator('.inline-flex.items-center.justify-center').nth(6).click();
    */

    await page.waitForTimeout(5000);

    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Create in Web' }).click();

    await page.waitForTimeout(20000);

    /*
    const page1 = await page1Promise;
    await page1.goto('https://smokeballus-my.sharepoint.com/:w:/r/personal/darwin_daluz_smokeball_com/_layouts/15/Doc.aspx?sourcedoc=%7B8789765F-7770-4483-AC71-9436FAF16503%7D&file=Letter%20to%20Martin%20Kumagdin.docx&action=default&mobileredirect=true');
    await page1.locator('iframe[name="WacFrame_Word_0"]').contentFrame().locator('#WACViewPanel_EditingElement').click();
    await page1.locator('iframe[name="WacFrame_Word_0"]').contentFrame().getByRole('tab', { name: 'Smokeball - Staging' }).click();
    await page1.locator('iframe[name="WacFrame_Word_0"]').contentFrame().getByRole('button', { name: 'Show Details' }).click();

    await expect(page1.locator('iframe[name="WacFrame_Word_0"]').contentFrame().locator('#AppForOfficePanel0TaskPaneTitle')).toContainText('Smokeball - Staging');
    await page1.close();
    */


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
        path: CreateLetterfromDraft,
        fullPage: true
    });

    //await page.getByRole('button', { name: '' }).click();
    await page.locator('button.close-icon').click();





    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.transition-opacity.duration-100.opacity-100 > .flex > button:nth-child(2)').click();
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Why did you choose this rating? (optional)');
    await page.waitForTimeout(3000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.transition-opacity.duration-100.opacity-100 > .flex > button').first().click();
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Why did you choose this rating? (optional)');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Provide additional feedback..' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Provide additional feedback..' }).fill('This is just a test.');
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Thanks for your feedback!');
    await page.waitForTimeout(3000);



    await page.waitForTimeout(2000);
    console.log('Create Letter from Draft');

    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
