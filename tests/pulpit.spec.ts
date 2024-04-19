import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {

  test.beforeEach(async ({ page }) => {
    const userId = 'test1234'
    const userPassword = '123456789'
    await page.goto('/');

    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

  });

  test('quick payment with correct data', async ({ page }) => {

    const reciever = '2'
    const amountTransfer = '120'
    const transferTitle = 'pizza'
    const expectedTransferMessage = 'Przelew wykonany! Chuck Demobankowy - 120,00PLN - pizza'

    await page.locator('#widget_1_transfer_receiver').selectOption(reciever);
    await page.locator('#widget_1_transfer_amount').fill(amountTransfer);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(expectedTransferMessage);
  });

  test('Succesfully phone load with 20 PLN', async ({ page }) => {

    const phoneNumberfromList = '500 xxx xxx'
    const amountPhoneLoader = '20'
    const expectedPhoneTopUpMessage = 'Doładowanie wykonane! 20,00PLN na numer 500 xxx xxx'
    const initialBalanc = await page.locator('#money_value').innerText();
    const expectedBAlance = Number(initialBalanc) - Number(amountPhoneLoader);

    await page.locator('#widget_1_topup_receiver').selectOption(phoneNumberfromList);
    await page.locator('#widget_1_topup_amount').fill(amountPhoneLoader);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(expectedPhoneTopUpMessage);
  });
});