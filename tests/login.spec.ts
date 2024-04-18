import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  

  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/'
    await page.goto(url);
  });


  test('successful login with correct credentials', async ({ page }) => {
    //Arrange

    const userId = 'test1234'
    const userPassword = '123456789'
    const expectedUserName = 'Jan Demobankowy';
    //Act
    //await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    //Arrange
    const incorrectUserId = 'test'
    const userPassword = 'test1234'
    const expectedUserErrorMessageText = 'identyfikator ma min. 8 znaków';
    //Act
    //await page.goto(url);
    await page.getByTestId('login-input').fill(incorrectUserId);
    await page.getByTestId('password-input').click();
    //await page.getByTestId('error-login-id').click();
    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(expectedUserErrorMessageText);
  });

  test('unsuccessful login with too short password', async ({ page }) => {

    //Arrange

    const userId = 'test1234'
    const incorrectUserPassword = '1234'
    const expectedPasswordErrorMessageText = 'hasło ma min. 8 znaków';
    //Act
    //await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(incorrectUserPassword);
    await page.getByTestId('password-input').blur();
    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(expectedPasswordErrorMessageText);
  });
});
