import { test, expect } from '@playwright/test';
import { ProfilePage } from '../pages/ProfilePage';

test.describe("Profile Page Tests", () => {

let profile;

test.beforeEach(async ({ page }) => {

  await page.addInitScript(() => {
    localStorage.setItem("userId","2");
  });

  profile = new ProfilePage(page);

  await profile.navigate();

  // wait for user API
  await page.waitForResponse(res =>
    res.url().includes("/api/users/") && res.status() === 200
  );

  // wait for profile elements
  await page.waitForSelector("#name");

});


test("Profile page loads", async () => {
  await profile.verifyPageLoaded();
});


test("Navbar is visible", async () => {
  await profile.verifyNavbarLoaded();
});


test("User ID is displayed", async () => {
  await profile.verifyUserId();
});


test("Name is displayed", async () => {
  await profile.verifyName();
});


test("Email is displayed", async () => {
  await profile.verifyEmail();
});


test("Profile initial is correct length", async () => {
  await profile.verifyProfileInitial();
});


test("Logout button visible", async () => {
  await profile.verifyLogoutVisible();
});


test("Logout redirects to login", async ({ page }) => {
  await profile.clickLogout();
  await expect(page).toHaveURL(/login/);
});


test("Profile container visible", async ({ page }) => {
  await expect(page.locator(".profile-card")).toBeVisible();
});


test("Profile image visible", async ({ page }) => {
  await expect(page.locator(".profile-img")).toBeVisible();
});


test("Account status is Active", async ({ page }) => {
  await expect(page.locator("text=Active")).toBeVisible();
});


test("User data API call success", async ({ page }) => {

  const response = await page.waitForResponse(res =>
    res.url().includes("/api/users/") && res.status() === 200
  );

  expect(response.ok()).toBeTruthy();

});


test("Page does not crash on load", async ({ page }) => {
  await expect(page.locator("body")).toBeVisible();
});


test("Profile values not empty", async () => {
  await expect(profile.name).not.toBeEmpty();
  await expect(profile.email).not.toBeEmpty();
});


test("Navbar loads correctly", async ({ page }) => {
  await expect(page.locator("#navbar")).toBeVisible();
});

});
