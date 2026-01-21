import { Page, expect } from '@playwright/test';
import { envurl } from '../variables/credentials.js';


export class LoginPage {
  constructor(private page: Page) { }

  async goto() {

    
    await this.page.setViewportSize({ width: 1536, height: 864 });
    await this.page.evaluate(() => {
      document.body.style.zoom = '0.8'; // 80%
      //document.body.style.zoom = '1'; // 100%
    });
    await this.page.goto(envurl);
    await this.page.waitForTimeout(3000);
    console.log('Navigated to SmokeBall URL');
  }

  async login(email: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Email Address' }).fill(email);
    console.log('Email Address Entered');

    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    console.log('Password Entered');

    await this.page.locator('label').filter({ hasText: 'This is a private computer' }).locator('label div').click();
    console.log('This is a private computer checkbox clicked');

    await this.page.waitForTimeout(3000);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await this.page.waitForTimeout(3000);
    console.log('Clicked Log in button');


  }
}
