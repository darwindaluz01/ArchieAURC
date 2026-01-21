import { Page, expect, Locator, FrameLocator } from '@playwright/test';

export class ArchiePage {
  private frame: FrameLocator;

  constructor(private page: Page) {
    this.frame = page.frameLocator('iframe[title="sdkEmbedded"]');
  }



  

  async verifyArchieUI() {


    await expect(this.frame.getByRole('tab', { name: 'Chat & Draft' })).toBeVisible();
    console.log('Chat & Draft is Visible');

    await expect(this.frame.getByRole('button', { name: 'Ask Archie a New Question' })).toBeVisible();
    console.log('Ask Archie a New Question is Visible');

    await expect(this.frame.getByText('Find, summarise or reviewAsk')).toBeVisible();
    console.log('Find, summarize or review is Visible');

    await expect(this.frame.getByText('Analyse or reviewa documentBrowse')).toBeVisible();
    console.log('Analyze or review a document Browse is Visible');

    await expect(this.frame.getByText('Write an emailor letterCompose')).toBeVisible();
    console.log('Write an email or letter Compose is Visible');

    await expect(this.frame.getByText('Draft a legaldocument or clauseDraft')).toBeVisible();
    console.log('Draft a legal document or clause Draft is Visible');

    await expect(this.frame.getByRole('button', { name: 'New Chat' })).toBeVisible();
    console.log('New Chat button is Visible');

    await expect(this.frame.getByRole('button', { name: 'Prompt Library' })).toBeVisible();
    console.log('Prompt Library button is Visible');

    await expect(this.frame.getByRole('button', { name: 'Knowledge Sources' })).toBeVisible();
    console.log('Knowledge Sources button is Visible');

    //await expect(this.frame.getByText('Recent Chats')).toBeVisible();
    //console.log('Recent Chats is Visible');

    //await expect(this.frame.getByRole('button', { name: 'Clear History' })).toBeVisible();
    //console.log('Clear History button is Visible');

  }

  async startNewChat() {
    await this.frame.getByRole('button', { name: 'New Chat' }).click();
    console.log('Clicked New Chat button');

    await expect(this.frame.getByRole('textbox', { name: 'Type your question here' })).toBeVisible();
    console.log('Type your question here Textbox is Visible');

    await expect(this.frame.getByLabel('Chat & Draft')).toContainText('Archie does not provide legal advice. AI can make mistakes. Consider checking important information.');
    
    console.log('Archie does not provide legal advice. AI can make mistakes. is Visible');  

    await expect(this.frame.getByRole('button', { name: 'Ask', exact: true })).toBeVisible();
    console.log('Ask button is Visible');

    await expect(this.frame.getByRole('button', { name: 'Browse' })).toBeVisible();
    console.log('Browse button is Visible');

    await expect(this.frame.getByRole('button', { name: 'Compose' })).toBeVisible();
    console.log('Compose button is Visible');

    await expect(this.frame.getByRole('button', { name: 'Draft' })).toBeVisible();
    console.log('Draft button is Visible');
    
  }
}
