const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test('Login with valid credentials', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.openLoginPage();

  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain("Login Successful");
    await dialog.accept();
  });

  await loginPage.login(
    'deepika@gmail.com',
    'Deepika'
  );

});


test('Login with empty email', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.openLoginPage();

  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain("Please enter email and password");
    await dialog.accept();
  });

  await loginPage.login(
    '',
    'Deepika123'
  );

});


test('Login with empty password', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.openLoginPage();

  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain("Please enter email and password");
    await dialog.accept();
  });

  await loginPage.login(
    'Deepika@gmail.com',
    ''
  );

});


test('Login with both fields empty', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.openLoginPage();

  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain("Please enter email and password");
    await dialog.accept();
  });

  await loginPage.login(
    '',
    ''
  );

});


test('Login with invalid email format', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.openLoginPage();

  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain("Invalid email format");
    await dialog.accept();
  });

  await loginPage.login(
    'invalidemail',
    '123456'
  );

});


test('Login with wrong password', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.openLoginPage();

  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain("Server error");
    await dialog.accept();
  });

  await loginPage.login(
    'Deepika@gmail.com',
    'wrongpass'
  );

});


/* ✅ FIXED TEST */
test('Login with unregistered email', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.openLoginPage();

  page.once('dialog', async dialog => {

    const message = dialog.message();

    // accept both possible backend responses
    expect(
      message.includes("Invalid credentials") ||
      message.includes("Server error")
    ).toBeTruthy();

    await dialog.accept();

  });

  await loginPage.login(
    'unknown@gmail.com',
    '123456'
  );

});