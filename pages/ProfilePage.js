import { expect } from '@playwright/test';

export class ProfilePage {

constructor(page){
this.page = page;

/* LOCATORS */
this.title = page.locator("h4.profile-title");
this.userId = page.locator("#userId");
this.name = page.locator("#name");
this.email = page.locator("#email");
this.profileInitial = page.locator("#profileInitial");

this.logoutBtn = page.locator(".logout-btn");
this.navbar = page.locator("#navbar");
}

/* NAVIGATION */

async navigate(){
await this.page.goto(
  "http://127.0.0.1:5500/Capstone-Frontend/profile.html",
  { waitUntil: "networkidle" }
);
}

/* VALIDATIONS */

async verifyPageLoaded(){
await expect(this.title).toHaveText("My Profile");
}

async verifyNavbarLoaded(){
await expect(this.navbar).toBeVisible();
}

async verifyUserId(){
await expect(this.userId).not.toBeEmpty();
}

async verifyName(){
await expect(this.name).not.toBeEmpty();
}

async verifyEmail(){
await expect(this.email).not.toBeEmpty();
}

async verifyProfileInitial(){
const text = await this.profileInitial.textContent();
expect(text.length).toBe(1);
}

async verifyLogoutVisible(){
await expect(this.logoutBtn).toBeVisible();
}

/* ACTIONS */

async clickLogout(){
await this.logoutBtn.click();
}

}