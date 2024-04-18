import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {

  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/'
    await page.goto(url);

});

  test('quick payment with correct data', async ({ page }) => {
    //await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester1234');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption('2');
    await page.locator('#widget_1_transfer_amount').fill('120');
    await page.locator('#widget_1_transfer_title').fill('pizza');

    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      'Przelew wykonany! Chuck Demobankowy - 120,00PLN - pizza');
  });

      test('Succesfully phone load with 20 PLN', async ({ page }) => {
     // await page.goto('https://demo-bank.vercel.app/');
      await page.getByTestId('login-input').fill('tester12');
      await page.getByTestId('password-input').fill('password');
      await page.getByTestId('login-button').click();
      await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
      await page.locator('#widget_1_topup_amount').fill('20');
      await page.locator('#uniform-widget_1_topup_agreement span').click();
      await page.getByRole('button', { name: 'doładuj telefon' }).click();
      await page.getByTestId('close-button').click();
    
      await expect(page.locator('#show_messages')).toHaveText(
      'Doładowanie wykonane! 20,00PLN na numer 500 xxx xxx');
  });
});