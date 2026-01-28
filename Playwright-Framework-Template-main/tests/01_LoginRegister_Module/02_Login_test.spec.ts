import { test, expect } from '@playwright/test';
import { AuthPage } from '../../src/pages/AuthPage';
import { HomePage } from '../../src/pages/HomePage';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Login Flow', () => {
    let authPage: AuthPage;
    let homePage: HomePage;
    const generateEmail = () => `user_${Date.now()}@testmail.com`;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        homePage = new HomePage(page);

        await authPage.goToURL();
        await homePage.clickSignup();
    });

    test('Verify "Login to your account" is visible', async ({ page }) => {
        await expect(page.getByText('Login to your account')).toBeVisible();
    });

    test(" Verify that 'logged in user' is visible", async ({ page }) => {
        await authPage.SignUp('Tajwar', "generateEmail()");
        await authPage.AccountInfo('Uchchhwas', '12345678', '16', 'Feb', '1994', 'Uchchhwas', 'Rahman', 'Softvence', '601/!, Mohakhali',
            'Dhaka', 'Australia', 'Dhaka', 'Dhaka', '1216', '01715898676');
        await authPage.continueButton.click();
        await authPage.logoutButton.click();
        await authPage.Login(generateEmail(), '12345678');
        await expect(authPage.loggedInUser).toBeVisible();
    })

    test(" Verify that 'Account Deleted' is visible", async ({ page }) => {
        await authPage.SignUp('Uchchhwas', 'email2ashfak@gmail.com');
        await authPage.AccountInfo('Uchchhwas', '12345678', '16', 'Feb', '1996', 'Uchchhwas', 'Rahman', 'Softvence', '601/!, Miohakhali',
            'Dhaka', 'Australia', 'Dhaka', 'Dhaka', '1216', '01715898676');
        await authPage.continueButton.click();
        await authPage.logoutButton.click();
        await authPage.Login('email2ashfak@gmail.com', '12345678');
        await expect(authPage.loggedInUser).toBeVisible();
        await authPage.userDeleteBtn.click();
        await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    })

});
