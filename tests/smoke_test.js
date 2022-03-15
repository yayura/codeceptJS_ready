const { urls, persons, testUI } = inject();
const { answerInput, answerYn, answerDate } = require("../pages/page_objects_modules_2_selector");
const fs = require("fs");
var overdueClients;
var needAppointmentClients;

Feature("smoke");
Scenario("Login/Logout", ({ I }) => {
  testUI.login(`${persons.login()}`, `${persons.password()}`);
  testUI.logout();
}).tag("@s_login");

Scenario("Check Tabs", ({ I }) => {
  testUI.login(`${persons.login()}`, `${persons.password()}`);
  I.waitInUrl("/", 59);
  
  testUI.pageCheck("Tab1", "/tab1", "Tab1");
  I.seeElement("kendo-scheduler");
  I.seeElement("kendo-calendar");
  
  I.grabTextFrom("span.dropdown-opener__title");
  I.seeElement('[placeholder="Enter data"]');
 }).tag("@s_section");

Scenario("New PAGE", async ({ I }) => {
  testUI.startPage();
    I.click(`${urls.q_css()}`); // regular #2
 }).tag("@s_q_new");

Scenario("Get id", async ({ I }) => {
  let url = await I.grabCurrentUrl();
  console.log(`Current URL is ${url.split("/")[5].split("?")[0]}`);
  let q_id = url.split("/")[5].split("?")[0];
  fs.appendFile("./participants.csv", `${q_id}\r\n`, function (err) {
    if (err) return console.log(err);
  });
}).tag("@s_questionnaire");

Scenario("check new", async ({ I }) => {
  const str = fs.readFileSync("./participants.csv", "utf8");
  const q_id = str.split("\n")[0];
  I.amOnPage(`${urls.testUIQ()}/questionings/${q_id}`);
  let url = await I.grabCurrentUrl();
  console.log(`Current URL is ${url}`);
}).tag("@s_qcheck");

Scenario("Get patient questionnaire id", ({ I }) => {
  const str = fs.readFileSync("./participants.csv", "utf8");
  const q_id = str.split("\n")[0];
  I.sendGetRequest(
    `Questionings/${q_id}/participants?PageSize=1&Category=NOT_AVAILABLE&HealthGroup=NOT_AVAILABLE`
  ).then((response) => {
    console.log(response.data.content[0].id);
    fs.appendFile(
      "./participants.csv",
      `${response.data.content[0].id}\r\n`,
      function (err) {
        if (err) return console.log(err);
      }
    );
  });
}).tag("@s_get_id");

Scenario("Run Q", async ({ I }) => {
  const str = fs.readFileSync("./participants.csv", "utf8");
  const q_id = str.split("\n")[0];
  const q_version = str.split("\n")[1];
  I.amOnPage(
    `${urls.employerUI()}/questionings/${q_id}/${q_version}/participant`
  );
  let url = await I.grabCurrentUrl();
  console.log(`Current URL is [${url}]`);
 }).tag("@s_v2q1");

Scenario("Check run", async ({ I }) => {
  const str = fs.readFileSync("./participants.csv", "utf8");
  const q_id = str.split("\n")[0];
  I.amOnPage(`${urls.testUIQ()}/questionings/${q_id}`);
  let url = await I.grabCurrentUrl();
  console.log(`Current URL is [${url}]`);
 }).tag("@s_questionnaire_check");

Scenario("Improve run", async ({ I }) => {
  const str = fs.readFileSync("./participants.csv", "utf8");
  const q_id = str.split("\n")[0];
  I.amOnPage(`${urls.testUIQ()}/questionings/${q_id}`);
  let url = await I.grabCurrentUrl();
  console.log(`Current URL is [${url}]`);
}).tag("@s_questionnaire_patient");

Scenario("Get waiting Clients after, overdue, needAppointment", ({ I }) => {
  I.sendGetRequest("WaitingList/Summary").then((response) => {
    console.log(response.data.overdue.total);
    I.assertEqual(response.data.overdue.total, overdueClients - 1);
  });
  I.sendGetRequest("WaitingList/Summary").then((response) => {
    console.log(response.data.needAppointment.total);
    I.assertEqual(
      needAppointmentClients - 1,
      response.data.needAppointment.total
    );
  });
}).tag("@s_api_w2");
