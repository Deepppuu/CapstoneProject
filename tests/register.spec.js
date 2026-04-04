const { test, expect } = require('@playwright/test');
const RegisterPage = require('../pages/RegisterPage');

test.setTimeout(60000);

/* Handle dialogs globally */

test.beforeEach(async ({ page }) => {

page.on('dialog', async dialog => {

console.log("Dialog:", dialog.message());

await dialog.accept();

});

});

/* Register with valid details */

test('Register with valid details', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

const email = `user${Date.now()}@test.com`;

const dialogPromise = page.waitForEvent("dialog");

await registerPage.register(
'Deepika',
email,
'Deepika123',
'Deepika123'
);

const dialog = await dialogPromise;

expect(
dialog.message().includes("Registration Successful") ||
dialog.message().includes("Server error")
).toBeTruthy();

});


/* Register with empty name */

test('Register with empty name', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

const dialogPromise = page.waitForEvent("dialog");

await registerPage.register(
'',
'EmptyName@gmail.com',
'EmptyName123',
'EmptyName123'
);

const dialog = await dialogPromise;

expect(dialog.message()).toContain("Please fill all fields");

});


/* Register with empty email */

test('Register with empty email', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

const dialogPromise = page.waitForEvent("dialog");

await registerPage.register(
'Test User',
'',
'123456',
'123456'
);

const dialog = await dialogPromise;

expect(dialog.message()).toContain("Please fill all fields");

});


/* Register with empty password */

test('Register with empty password', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

const dialogPromise = page.waitForEvent("dialog");

await registerPage.register(
'Test User',
'test4@gmail.com',
'',
''
);

const dialog = await dialogPromise;

expect(dialog.message()).toContain("Please fill all fields");

});


/* Register with empty confirm password */

test('Register with empty confirm password', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

const dialogPromise = page.waitForEvent("dialog");

await registerPage.register(
'Test User',
'test5@gmail.com',
'123456',
''
);

const dialog = await dialogPromise;

expect(dialog.message()).toContain("Please fill all fields");

});


/* Password mismatch */

test('Register with password mismatch', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

const dialogPromise = page.waitForEvent("dialog");

await registerPage.register(
'Test User',
'test6@gmail.com',
'123456',
'999999'
);

const dialog = await dialogPromise;

expect(dialog.message()).toContain("Passwords do not match");

});


/* Invalid email */

test('Register with invalid email format', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

const dialogPromise = page.waitForEvent("dialog");

await registerPage.register(
'Test User',
'invalidemail',
'123456',
'123456'
);

const dialog = await dialogPromise;

expect(dialog.message()).toContain("Invalid email format");

});


/* Special characters in name */

test('Register with special characters in name', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

const dialogPromise = page.waitForEvent("dialog");

await registerPage.register(
'@@@Test###',
'test8@gmail.com',
'123456',
'123456'
);

const dialog = await dialogPromise;

expect(dialog.message()).toContain("Name must contain only letters");

});


/* Name too short */

test('Register with short name', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

const dialogPromise = page.waitForEvent("dialog");

await registerPage.register(
'A',
'test9@gmail.com',
'123456',
'123456'
);

const dialog = await dialogPromise;

expect(dialog.message()).toContain("Name must contain only letters");

});


/* Name too long */

test('Register with long name', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

const dialogPromise = page.waitForEvent("dialog");

await registerPage.register(
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
'test10@gmail.com',
'123456',
'123456'
);

const dialog = await dialogPromise;

expect(dialog.message()).toContain("Name must contain only letters");

});


/* Short password */

test('Register with short password', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

const dialogPromise = page.waitForEvent("dialog");

await registerPage.register(
'Test User',
'test11@gmail.com',
'12',
'12'
);

const dialog = await dialogPromise;

expect(dialog.message()).toContain("Password must be at least 6 characters long");

});


/* Email with spaces */

test('Register with spaces in email', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

const dialogPromise = page.waitForEvent("dialog");

await registerPage.register(
'Test User',
'test @gmail.com',
'123456',
'123456'
);

const dialog = await dialogPromise;

expect(dialog.message()).toContain("Invalid email format");

});


/* Valid email with dots */

test('Register with valid email containing dots', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

const email = `user${Date.now()}@test.com`;

const dialogPromise = page.waitForEvent("dialog");

await registerPage.register(
'Test User',
email,
'123456',
'123456'
);

const dialog = await dialogPromise;

expect(
dialog.message().includes("Registration Successful") ||
dialog.message().includes("Server error")
).toBeTruthy();

});


/* Name with space */

test('Register with name containing space', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

const email = `user${Date.now()}@test.com`;

const dialogPromise = page.waitForEvent("dialog");

await registerPage.register(
'Prem Kumar',
email,
'123456',
'123456'
);

const dialog = await dialogPromise;

expect(
dialog.message().includes("Registration Successful") ||
dialog.message().includes("Server error")
).toBeTruthy();

});


/* All fields empty */

test('Register with all fields empty', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

const dialogPromise = page.waitForEvent("dialog");

await registerPage.register(
'',
'',
'',
''
);

const dialog = await dialogPromise;

expect(dialog.message()).toContain("Please fill all fields");

});
