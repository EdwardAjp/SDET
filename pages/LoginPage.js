const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.loginButton = 'button[type="submit"]';
    this.flashMessage = '#flash';
  }

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async expectErrorMessage(text) {
    await expect(this.page.locator(this.flashMessage)).toContainText(text);
  }

  async expectSuccessMessage() {
    await expect(this.page.locator(this.flashMessage))
      .toContainText('You logged into a secure area!');
  }
}

module.exports = { LoginPage };
