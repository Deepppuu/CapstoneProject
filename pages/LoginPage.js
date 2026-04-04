class LoginPage {

constructor(page){
this.page = page;

this.email = '#email';
this.password = '#password';
this.loginBtn = 'button:has-text("Login")';
}

async openLoginPage(){

await this.page.goto(
'http://127.0.0.1:5500/login.html',
{ waitUntil: 'domcontentloaded' }
);

await this.page.waitForSelector(this.email);

}

async login(email,password){

await this.page.fill(this.email,email);
await this.page.fill(this.password,password);
await this.page.click(this.loginBtn);

}

}

module.exports = LoginPage;
