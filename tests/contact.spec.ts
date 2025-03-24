import { test } from '@playwright/test';
import { ContactPage } from '../pages/contact.page';
import { contactTestData } from '../data/contact.data';

test('Contact us form flow with validContact1 data', async ({ page }, testInfo) => {
  const contactPage = new ContactPage(page);
  await contactPage.open();
  if (testInfo.project.name === 'Mobile Chrome' || testInfo.project.name === 'Mobile Safari') {
    await contactPage.openMenu();
    await contactPage.goToContactFormMobile();
  }
  else {
    await contactPage.goToContactForm();
  }
  await contactPage.submitWithoutConsent();

  const testData = contactTestData.find(data => data.id === 'validContact1');
  if (!testData) {
    throw new Error('Test data with id "validContact1" not found!');
  }

  await contactPage.fillForm(testData);
  await contactPage.confirmDialog();
});