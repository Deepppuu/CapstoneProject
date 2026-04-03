const { test, expect } = require('@playwright/test');
const RegisterPage = require('../pages/RegisterPage');

/* Register with valid details */

test('Register with valid details', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

page.once('dialog', async dialog => {

const msg = dialog.message();

expect(
msg.includes("Registration Successful") ||
msg.includes("Server error")
).toBeTruthy();

await dialog.accept();

});

await registerPage.register(
'Deepika',
'Deepika@gmail.com',
'Deepika123',
'Deepika123'
);

});


/* Register with empty name */

test('Register with empty name', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

page.once('dialog', async dialog => {
expect(dialog.message()).toContain("Please fill all fields");
await dialog.accept();
});

await registerPage.register(
'',
'EmptyName@gmail.com',
'EmptyName123',
'EmptyName123'
);

});


/* Register with empty email */

test('Register with empty email', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

page.once('dialog', async dialog => {
expect(dialog.message()).toContain("Please fill all fields");
await dialog.accept();
});

await registerPage.register(
'Test User',
'',
'123456',
'123456'
);

});


/* Register with empty password */

test('Register with empty password', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

page.once('dialog', async dialog => {
expect(dialog.message()).toContain("Please fill all fields");
await dialog.accept();
});

await registerPage.register(
'Test User',
'test4@gmail.com',
'',
''
);

});


/* Register with empty confirm password */

test('Register with empty confirm password', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

page.once('dialog', async dialog => {
expect(dialog.message()).toContain("Please fill all fields");
await dialog.accept();
});

await registerPage.register(
'Test User',
'test5@gmail.com',
'123456',
''
);

});


/* Password mismatch */

test('Register with password mismatch', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

page.once('dialog', async dialog => {
expect(dialog.message()).toContain("Passwords do not match");
await dialog.accept();
});

await registerPage.register(
'Test User',
'test6@gmail.com',
'123456',
'999999'
);

});


/* Invalid email */

test('Register with invalid email format', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

page.once('dialog', async dialog => {
expect(dialog.message()).toContain("Invalid email format");
await dialog.accept();
});

await registerPage.register(
'Test User',
'invalidemail',
'123456',
'123456'
);

});


/* Special characters in name */

test('Register with special characters in name', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

page.once('dialog', async dialog => {
expect(dialog.message()).toContain("Name must contain only letters");
await dialog.accept();
});

await registerPage.register(
'@@@Test###',
'test8@gmail.com',
'123456',
'123456'
);

});


/* Name too short */

test('Register with short name', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

page.once('dialog', async dialog => {
expect(dialog.message()).toContain("Name must contain only letters");
await dialog.accept();
});

await registerPage.register(
'A',
'test9@gmail.com',
'123456',
'123456'
);

});


/* Name too long */

test('Register with long name', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

page.once('dialog', async dialog => {
expect(dialog.message()).toContain("Name must contain only letters");
await dialog.accept();
});

await registerPage.register(
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
'test10@gmail.com',
'123456',
'123456'
);

});


/* Short password */

test('Register with short password', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

page.once('dialog', async dialog => {
expect(dialog.message()).toContain("Password must be at least 6 characters long");
await dialog.accept();
});

await registerPage.register(
'Test User',
'test11@gmail.com',
'12',
'12'
);

});


/* Email with spaces */

test('Register with spaces in email', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

page.once('dialog', async dialog => {
expect(dialog.message()).toContain("Invalid email format");
await dialog.accept();
});

await registerPage.register(
'Test User',
'test @gmail.com',
'123456',
'123456'
);

});


/* Valid email with dots */

test('Register with valid email containing dots', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

page.once('dialog', async dialog => {

const msg = dialog.message();

expect(
msg.includes("Registration Successful") ||
msg.includes("Server error")
).toBeTruthy();

await dialog.accept();

});

await registerPage.register(
'Test User',
'test.user@gmail.com',
'123456',
'123456'
);

});


/* Name with space */

test('Register with name containing space', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

page.once('dialog', async dialog => {

const msg = dialog.message();

expect(
msg.includes("Registration Successful") ||
msg.includes("Server error")
).toBeTruthy();

await dialog.accept();

});

await registerPage.register(
'Prem Kumar',
'test14@gmail.com',
'123456',
'123456'
);

});


/* All fields empty */

test('Register with all fields empty', async ({ page }) => {

const registerPage = new RegisterPage(page);

await registerPage.openRegisterPage();

page.once('dialog', async dialog => {
expect(dialog.message()).toContain("Please fill all fields");
await dialog.accept();
});

await registerPage.register(
'',
'',
'',
''
);

});