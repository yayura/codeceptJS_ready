const { urls } = inject();
const I = actor();

// async function select(name, value) {
//   const select = `//select[@name="${name}"]/following-sibling::*[contains(@class,"dropdown")]`;
//   I.waitForVisible(select, 10);
//   I.click(select);
//   const element = `${select}/ul/li[@title='${value}']`;
//   I.waitForVisible(element, 10);
//   I.click(element);
// }

module.exports = {
  date() {
    var today = new Date();
    var date =
      ("0" + today.getDate()).slice(-2) +
      "." +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "." +
      today.getFullYear();
    return date;
  },
  login(login, password) {
    // Goto site, URL from misc/urls,js, env taken
    I.amOnPage(`${urls.testUI()}`);
    I.seeElement("h1", "welcome");
    I.click("enter");
    // I.amOutsideAngularApp();
    // identity is not  angular, webdriver
    I.waitForText("Enter", 20);
    // I.waitForText("Local Login", 20);
    I.fillField("Username", login);
    I.fillField("Password", password);
    I.click("Enter");
    // I.click("Login");
    I.waitInUrl(`${urls.testUI()}`);
    // I.amInsideAngularApp(); //back to protractor
    I.waitForText("Schedule", 20);
    I.refreshPage();
    I.waitInUrl(urls.testUI());
  },
  logout() {
    I.waitForElement(".dropdown-opener__title");
    I.seeElement(".dropdown-opener__title");
    I.click(".dropdown-opener__title");
    I.waitForText("Exit");
    I.click("Exit");
    I.seeElement("h1", "welcome");
  },
  getQId() {
    let url = I.grabCurrentUrl();
    console.log(`Current URL is [${url}]`);
  },
  e_title: () => "",
  startPage: () => {
    I.amOnPage(`${urls.testUI()}/appointments`);
    I.seeElement('[src="assets/img/logo.svg"]');
    I.click('[src="assets/img/logo.svg"]');
    I.waitInUrl("/appointments", 120);
    I.dontSee("error");
  },
  previousPage(page) {
    I.seeElement("[icon^='icon-arrow-short-left_']");
    I.click("[icon^='icon-arrow-short-left_']");
    I.waitInUrl("/" + page);
  },
  pageCheck(link, url, title) {
    I.click(link);
    I.waitInUrl(url, 120);
    I.dontSee("error");
    I.see(title);
  },

  got_error(text) {
    I.waitForText(text, 120, function (err) {
      if (err) return console.log(err);
      I.refreshPage();
    });
  },
};
