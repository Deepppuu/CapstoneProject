export class SlotsPage {

constructor(page){
this.page = page;

this.serviceInfo = page.locator("#serviceInfo");
this.serviceName = page.locator("#serviceInfo h4");
this.serviceDescription = page.locator("#serviceInfo p");
this.servicePrice = page.locator("#serviceInfo b");

this.dateInput = page.locator("#bookingDate");
this.slots = page.locator(".slot");

this.confirmButton = page.locator(".confirm-btn");
}


/* OPEN PAGE */

async open(){

await this.page.goto(
  "http://127.0.0.1:5500/Capstone-Frontend/slots.html?serviceId=1"
);

}


/* WAIT FOR PAGE */

async waitForPage(){

await this.page.waitForLoadState("networkidle");

await this.serviceInfo.waitFor({
  state: "visible",
  timeout: 60000
});

await this.serviceName.waitFor({
  state: "visible",
  timeout: 60000
});

}


/* SLOT COUNT */

async getSlotCount(){
return await this.slots.count();
}


/* SLOT TEXT */

async getAllSlotsText(){
return await this.slots.allTextContents();
}


/* SELECT SLOT */

async selectFirstSlot(){

const count = await this.getSlotCount();

if(count > 0){
await this.slots.first().click();
}

}


async selectLastSlot(){

const count = await this.getSlotCount();

if(count > 0){
await this.slots.last().click();
}

}


/* DATE */

async getDateValue(){
return await this.dateInput.inputValue();
}

async getMinDate(){
return await this.dateInput.getAttribute("min");
}


/* CLEAR LOGIN */

async clearLogin(){

await this.page.evaluate(() => {
localStorage.clear();
});

}

}
