class RegisterPage {

constructor(page){
this.page = page;

this.name = '#name';
this.email = '#email';
this.password = '#password';
this.confirmPassword = '#confirmPassword';
this.registerBtn = 'button:has-text("Register")';
}

async openRegisterPage(){
await this.page.goto('http://127.0.0.1:5500/Capstone-Frontend/register.html');
await this.page.waitForSelector(this.name);
}

async register(name,email,password,confirmPassword){
await this.page.fill(this.name,name);
await this.page.fill(this.email,email);
await this.page.fill(this.password,password);
await this.page.fill(this.confirmPassword,confirmPassword);
await this.page.click(this.registerBtn);
}

}

module.exports = RegisterPage;