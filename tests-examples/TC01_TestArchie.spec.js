import { test, expect } from '@playwright/test';

test('Archie Menu Validation', async ({ page }) => {

    test.setTimeout(150000); // 120 seconds
    await page.goto('https://rc-app.smokeball.com/');
    console.log("Login Page of Smoke Ball is Opened");

    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill('harold.kabiling@smokeball.com.au');
    console.log("Input Email Address");

    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Carbolic-20220302');
    console.log("Input Password");

    await page.locator('label').filter({ hasText: 'This is a private computer' }).locator('label div').click();
    await expect(page.locator('label').filter({ hasText: 'This is a private computer' }).locator('label div')).toBeVisible();
    await page.getByRole('button', { name: 'Log in' }).click();
    console.log("Click Login Button");

    await page.goto('https://rc-app.smokeball.com/#/billing/matters');
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill('Darwin Daluz');
    console.log("Search for Matter with Darwin Daluz");
    await page.locator('a').filter({ hasText: 'openNH 09102025 - Daluz,' }).click();

    await expect(page.getByRole('button', { name: 'Overview' })).toBeVisible();
    console.log("Verify Overview Menu is Visible");

    await expect(page.getByRole('button', { name: 'Archie' })).toBeVisible();
    console.log("Verify Archie Menu is Visible");

    await page.getByRole('button', { name: 'Archie' }).click();
    console.log("Click Archie Menu");

    await page.waitForTimeout(15000); //10 seconds wait
    //await page.waitForLoadState('networkidle');
    //await page.waitForLoadState();
    
    //await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('[id="radix-«r0»-trigger-chats"]')).toContainText('Chat & Draft');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('tab', { name: 'Chat & Draft' })).toBeVisible();

    //await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('tab', { name: 'Chat & Draft' })).toBeVisible();
    console.log("Chat & Draft is Visible");

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask Archie a New Question' })).toBeVisible();
    console.log("Ask Archie a New Question button is Visible");

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByText('Find, summarize or reviewAsk')).toBeVisible();
    console.log('Find summarize or review Ask is Visible');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByText('Analyze or reviewa documentBrowse')).toBeVisible();
    console.log('Analyze or review a document Browse is Visible');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByText('Write an emailor letterCompose')).toBeVisible();
    console.log('Write an email or letter Compose is Visible');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByText('Draft a legaldocument or clauseDraft')).toBeVisible();
    console.log('Draft a legal document or clause Draft is Visible');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'New Chat' })).toBeVisible();
    console.log('New Chat is Visible');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Prompt Library' })).toBeVisible();
    console.log('Prompt Library is Visible');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Knowledge Sources' })).toBeVisible();
    console.log('Knowledge Sources is Visible');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByText('Recent Chats')).toBeVisible();
    console.log('Recent Chats is Visible');

    //await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Clear History' })).toBeVisible();
    //console.log('Clear History is Visible');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('tab', { name: 'Chat & Draft' })).toBeVisible();
    console.log('Chat & Draft is Visible');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'New Chat' }).click();
    console.log('Click New Chat');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' })).toBeVisible();
    console.log('Type your question here is Visible');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('paragraph')).toContainText('Archie does not provide legal advice. AI can make mistakes. Consider checking important information.');
    console.log('Archie does not provide legal advice. AI can make mistakes. Consider checking important information. is Visible');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask', exact: true })).toBeVisible();
    console.log('Ask button is Visible');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Browse' })).toBeVisible();
    console.log('Browse button is Visible');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Compose' })).toBeVisible();
    console.log('Compose button is Visible');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Draft' })).toBeVisible();
    console.log('Draft button is Visible');


    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("User was Logged Out Successfully");



    page.close();
    console.log("Browser was Closed");



});