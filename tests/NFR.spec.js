const { test, expect } = require('@playwright/test');

test.setTimeout(60000);

const LOGIN_URL = "http://127.0.0.1:5500/login.html";
const BOOKING_URL = "http://127.0.0.1:5500/booking.html";
const SERVICES_URL = "http://127.0.0.1:5500/services.html";

test.describe("NFR Tests", () => {

test.beforeEach(async ({ page }) => {

await page.addInitScript(()=>{
localStorage.setItem("userId","1");
localStorage.setItem("bookingDate","2026-04-05");
});

});


// PERFORMANCE

test("Login page load time under 10 seconds", async ({ page }) => {

const start = Date.now();

await page.goto(LOGIN_URL,{waitUntil:"domcontentloaded"});

const loadTime = Date.now()-start;

expect(loadTime).toBeLessThan(10000);

});


test("Booking page load time under 10 seconds", async ({ page }) => {

const start = Date.now();

await page.goto(`${BOOKING_URL}?serviceId=1&slotId=1`,{waitUntil:"domcontentloaded"});

const loadTime = Date.now()-start;

expect(loadTime).toBeLessThan(10000);

});


test("Services page load time under 10 seconds", async ({ page }) => {

const start = Date.now();

await page.goto(SERVICES_URL,{waitUntil:"domcontentloaded"});

const loadTime = Date.now()-start;

expect(loadTime).toBeLessThan(10000);

});


test("Login page DOM loads correctly", async ({ page }) => {

await page.goto(LOGIN_URL,{waitUntil:"domcontentloaded"});

await expect(page.locator("body")).toBeVisible();

});


// SECURITY

test("SQL Injection should fail", async ({ page }) => {

await page.goto(LOGIN_URL,{waitUntil:"domcontentloaded"});

await page.fill("#email","' OR '1'='1");
await page.fill("#password","123");

await page.click("button");

await expect(page).toHaveURL(/login/);

});


test("Invalid login should stay on login page", async ({ page }) => {

await page.goto(LOGIN_URL,{waitUntil:"domcontentloaded"});

await page.fill("#email","fakeuser@gmail.com");
await page.fill("#password","wrongpass");

await page.click("button");

await expect(page).toHaveURL(/login/);

});


test("Direct booking page access", async ({ page }) => {

await page.goto(`${BOOKING_URL}?serviceId=1&slotId=1`,{waitUntil:"domcontentloaded"});

await expect(page.locator("body")).toBeVisible();

});


// USABILITY

test("Email input field visible", async ({ page }) => {

await page.goto(LOGIN_URL,{waitUntil:"domcontentloaded"});

await expect(page.locator("#email")).toBeVisible();

});


test("Password field visible", async ({ page }) => {

await page.goto(LOGIN_URL,{waitUntil:"domcontentloaded"});

await expect(page.locator("#password")).toBeVisible();

});


test("Login button visible", async ({ page }) => {

await page.goto(LOGIN_URL,{waitUntil:"domcontentloaded"});

await expect(page.locator("button")).toBeVisible();

});


test("Services page content visible", async ({ page }) => {

await page.goto(SERVICES_URL,{waitUntil:"domcontentloaded"});

await expect(page.locator("body")).toBeVisible();

});


test("Booking page content visible", async ({ page }) => {

await page.goto(`${BOOKING_URL}?serviceId=1&slotId=1`,{waitUntil:"domcontentloaded"});

await expect(page.locator("body")).toBeVisible();

});


// RELIABILITY

test("Login page loads multiple times", async ({ page }) => {

for(let i=0;i<3;i++){

await page.goto(LOGIN_URL,{waitUntil:"domcontentloaded"});
await expect(page.locator("body")).toBeVisible();

}

});


test("Services page loads repeatedly", async ({ page }) => {

for(let i=0;i<3;i++){

await page.goto(SERVICES_URL,{waitUntil:"domcontentloaded"});
await expect(page.locator("body")).toBeVisible();

}

});


test("Booking page loads repeatedly", async ({ page }) => {

for(let i=0;i<3;i++){

await page.goto(`${BOOKING_URL}?serviceId=1&slotId=1`,{waitUntil:"domcontentloaded"});
await expect(page.locator("body")).toBeVisible();

}

});


// UI STABILITY

test("Page title should exist", async ({ page }) => {

await page.goto(LOGIN_URL,{waitUntil:"domcontentloaded"});

const title = await page.title();

expect(title).not.toBe("");

});


test("Login page should not crash", async ({ page }) => {

await page.goto(LOGIN_URL,{waitUntil:"domcontentloaded"});

await expect(page.locator("body")).toBeVisible();

});


test("Services page should not crash", async ({ page }) => {

await page.goto(SERVICES_URL,{waitUntil:"domcontentloaded"});

await expect(page.locator("body")).toBeVisible();

});


test("Booking page should not crash", async ({ page }) => {

await page.goto(`${BOOKING_URL}?serviceId=1&slotId=1`,{waitUntil:"domcontentloaded"});

await expect(page.locator("body")).toBeVisible();

});


test("Browser navigation back works", async ({ page }) => {

await page.goto(LOGIN_URL,{waitUntil:"domcontentloaded"});
await page.goto(SERVICES_URL,{waitUntil:"domcontentloaded"});

await page.goBack();

await expect(page).toHaveURL(/login/);

});

});