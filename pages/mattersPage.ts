import { Page, expect } from '@playwright/test';
import { envurlmatters, matterdesc } from '../variables/credentials.js'; 

export class MattersPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(envurlmatters);
       
  }

  async searchMatter(name: string) {
      
    await this.page.getByRole('textbox', { name: 'Search' }).fill(name);
    console.log('Login Successful, SmokeBall Dashboard is Visible');
    
    await this.page.locator('a').filter({ hasText: matterdesc }).click();
    
    console.log('Matter Opened: ' + matterdesc);
    
  }

  async verifyMenus() {
    await expect(this.page.getByRole('button', { name: 'Overview' })).toBeVisible();
    console.log('Overview Menu is Visible');
    await expect(this.page.getByRole('button', { name: 'Archie' })).toBeVisible();
    console.log('Archie Menu is Visible');
  }

  async openArchie() {
    await this.page.getByRole('button', { name: 'Archie' }).click();
    console.log('Click Archie Menu');
  }
}
