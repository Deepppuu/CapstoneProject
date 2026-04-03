import { test, expect } from '@playwright/test';
import { ProfilePage } from '../pages/ProfilePage';

test.describe("Profile Page Tests", () => {

test.beforeEach(async ({ page }) => {

/* MOCK LOGIN */
await page.addInitScript(()=>{
localStorage.setItem("userId","2");
});

});


// TC1
test("Profile page loads", async ({ page }) => {
const profile = new ProfilePage(page);
await profile.navigate();
await profile.verifyPageLoaded();
});


// TC2
test("Navbar is visible", async ({ page }) => {
const profile = new ProfilePage(page);
await profile.navigate();
await profile.verifyNavbarLoaded();
});


// TC3
test("User ID is displayed", async ({ page }) => {
const profile = new ProfilePage(page);
await profile.navigate();
await profile.verifyUserId();
});


// TC4
test("Name is displayed", async ({ page }) => {
const profile = new ProfilePage(page);
await profile.navigate();
await profile.verifyName();
});


// TC5
test("Email is displayed", async ({ page }) => {
const profile = new ProfilePage(page);
await profile.navigate();
await profile.verifyEmail();
});


// TC6
test("Profile initial is correct length", async ({ page }) => {
const profile = new ProfilePage(page);
await profile.navigate();
await profile.verifyProfileInitial();
});


// TC7
test("Logout button visible", async ({ page }) => {
const profile = new ProfilePage(page);
await profile.navigate();
await profile.verifyLogoutVisible();
});


// TC8
test("Logout redirects to login", async ({ page }) => {
const profile = new ProfilePage(page);
await profile.navigate();
await profile.clickLogout();

await expect(page).toHaveURL(/login/);
});


// TC9
test("Profile container visible", async ({ page }) => {
const profile = new ProfilePage(page);
await profile.navigate();

await expect(page.locator(".profile-card")).toBeVisible();
});


// TC10
test("Profile image visible", async ({ page }) => {
const profile = new ProfilePage(page);
await profile.navigate();

await expect(page.locator(".profile-img")).toBeVisible();
});


// TC11
test("Account status is Active", async ({ page }) => {
const profile = new ProfilePage(page);
await profile.navigate();

await expect(page.locator("text=Active")).toBeVisible();
});


// TC12
test("User data API call success", async ({ page }) => {
const profile = new ProfilePage(page);

await profile.navigate();

const response = await page.waitForResponse(res =>
res.url().includes("/api/users/") && res.status() === 200
);

expect(response.ok()).toBeTruthy();
});


// TC13
test("Page does not crash on load", async ({ page }) => {
const profile = new ProfilePage(page);
await profile.navigate();

await expect(page.locator("body")).toBeVisible();
});


// TC14
test("Profile values not empty", async ({ page }) => {
const profile = new ProfilePage(page);
await profile.navigate();

await expect(profile.name).not.toBeEmpty();
await expect(profile.email).not.toBeEmpty();
});


// TC15
test("Navbar loads correctly", async ({ page }) => {
const profile = new ProfilePage(page);
await profile.navigate();

await expect(page.locator("#navbar")).toBeVisible();
});

});