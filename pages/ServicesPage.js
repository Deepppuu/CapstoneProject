export class ServicesPage {

constructor(page){
this.page = page;

this.pageTitle = page.locator("h2.page-title");
this.servicesContainer = page.locator("#servicesContainer");
this.serviceCards = page.locator(".service-card");

this.serviceNames = page.locator(".service-card h5");
this.serviceDescriptions = page.locator(".service-card p");
this.servicePrices = page.locator(".price");

this.serviceImages = page.locator(".service-img");
this.bookButtons = page.locator(".book-btn");

this.navbar = page.locator(".navbar");
this.navHome = page.getByRole('link', { name: 'Home' });
this.navServices = page.locator("a[href='services.html']");
this.navBookings = page.locator("a[href='bookings.html']");
this.navProfile = page.locator("a[href='profile.html']");
this.navLogin = page.locator("a[href='login.html']");
}

async openServicesPage(){
await this.page.goto("http://127.0.0.1:5500/Capstone-Frontend/services.html");
await this.page.waitForSelector('.service-card', { timeout: 15000 });
}

async getServiceCount(){
return await this.serviceCards.count();
}

async clickBookButton(index){
await this.bookButtons.nth(index).click();
}

}