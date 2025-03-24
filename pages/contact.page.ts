import { Page, Locator, expect } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly openMenuButton: Locator;
  readonly careerLink: Locator;
  readonly careerLinkMobile: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly messageInput: Locator;
  readonly consentCheckbox: Locator;
  readonly submitButton: Locator;
  readonly fileInput: Locator;
  readonly confirmDialogButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openMenuButton = page.locator('button[aria-label="Toggle navigation"]');
    this.careerLink = page.getByRole('navigation').getByRole('link', { name: 'Kariéra' });
    this.careerLinkMobile = page.locator('#offcanvasNavbar').getByRole('link', { name: 'Kariéra' });
    this.nameInput = page.getByRole('textbox', { name: 'Jméno a Příjmení' });
    this.emailInput = page.getByRole('textbox', { name: 'E-mail' });
    this.phoneInput = page.getByRole('textbox', { name: 'Telefon' });
    this.messageInput = page.getByRole('textbox', { name: 'Vaše zpráva' });
    this.consentCheckbox = page.getByText('Souhlas se zpracováním osobních údajů');
    this.submitButton = page.getByRole('button', { name: 'Odeslat' });
    this.fileInput = page.locator('input[type="file"]');
    this.confirmDialogButton = page.getByRole('dialog').getByRole('button', { name: 'OK' });
  }

  async open() {
    await this.page.goto('https://v1-web-git-test-viableone.vercel.app/');
    await expect(this.page).toHaveTitle(/Domů \| Viable One/);
  }

  async openMenu() {
    await this.openMenuButton.click();
  }

  async goToContactForm() {
    await this.careerLink.click();
    await expect(this.nameInput).toBeVisible();
  }

  async goToContactFormMobile() {
    await this.careerLinkMobile.click();
    await expect(this.nameInput).toBeVisible();
  }

  async submitWithoutConsent() {
    await this.submitButton.click();
    await expect(this.page.getByText('Je třeba zaškrtnout políčko Souhlasím se zpracováním osobních údajů')).toBeVisible({ timeout: 10000 });
  }

  async fillForm(testData: { name: string; email: string; phone: string; message: string; filePath: string; }) {
    const path = require('path');
    await this.nameInput.fill(testData.name);
    await this.emailInput.fill(testData.email);
    await this.phoneInput.fill(testData.phone);
    await this.messageInput.fill(testData.message);
    const fileAbsolutePath = path.resolve(__dirname, testData.filePath);
    await this.fileInput.setInputFiles(fileAbsolutePath);
    await this.consentCheckbox.check();
    await this.submitButton.click();
  }

  async confirmDialog() {
    await this.confirmDialogButton.click();
  }
}