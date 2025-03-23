import { test, expect } from '@playwright/test';

test('Contact us', async ({ page }) => {
  await page.goto('https://v1-web-git-test-viableone.vercel.app/');

  await page.evaluate(() => {
    document.querySelectorAll('video, audio').forEach(el => {
      (el as HTMLMediaElement).muted = true;
      (el as HTMLMediaElement).volume = 0;
    });
  });

  await expect(page).toHaveTitle(/Domů | Viable One/);

  await page.getByRole('navigation').getByRole('link', { name: 'Kariéra' }).click();

  expect(page.getByRole('textbox', { name: 'Jméno a Příjmení' })).toBeVisible();

  await page.getByRole('button', { name: 'Odeslat' }).click();

  const checkBox = page.getByText('Souhlas se zpracováním osobních údajů');
  if (!(await checkBox.isChecked())) {
    expect(page.getByText('Je třeba zaškrtnout políčko Souhlasím se zpracováním osobních údajů')).toBeVisible();
  }

  await page.getByRole('textbox', { name: 'Jméno a Příjmení' }).fill('Magda Březinová');
  await page.getByRole('textbox', { name: 'E-mail' }).fill('test@test.test');
  await page.getByRole('textbox', { name: 'Telefon' }).fill('777777777');
  await page.getByRole('textbox', { name: 'Vaše zpráva' }).fill('Lorem ipsum dolor sit amet consectetur adipisicing elit. ' +
            'Sed minus doloribus, aliquam natus a voluptates iure officia nemo.' +
            'Corporis, praesentium ex enim porro natus facere sit quam suscipit' +
            'repellendus iure.');

const fileInput = page.locator('input[type="file"]');
const path = require('path');
const filePath = path.resolve(__dirname, '../data/testZivotopis.docx');
await fileInput.setInputFiles(filePath);

await page.getByRole('checkbox', { name: 'Souhlas se zpracováním osobní' }).check();

await page.getByRole('button', { name: 'Odeslat' }).click();

await page.pause();

await page.getByRole('dialog').getByRole('button', { name: 'OK' }).click({ timeout: 60000 });
  
});