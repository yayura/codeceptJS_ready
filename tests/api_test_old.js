const { urls, persons, testUI } = inject();
var request = require("request");
const fs = require("fs");

// fs.truncate
Feature("api");
Scenario("Clear token file", ({ I }) => {
  fs.truncate( './access_token.csv', 0, function(){console.log('./access_token.csv clear...')})
}).tag("@a0");

Scenario("Get access token", ({ I }) => {
  var options = {
    method: "POST",
    url: "https://dev-test.online/connect/token",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      client_id: "test_service",
      client_secret: "test_service!",
      scope: "test_api testir__api",
      grant_type: "client_credentials",
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    // console.log(response.body);
    var jsonBody = JSON.parse(response.body);
    console.log(jsonBody);
    fs.writeFileSync(
      "./access_token.csv",
      `Bearer ${jsonBody.access_token}`,
      "utf8"
    );
  });
}).tag("@a1");


xScenario("Get", ({ I }) => {
  const str = fs.readFileSync('./participants.csv', 'utf8');
  const q_id = str.split('\n')[0]; 
  I.sendGetRequest(
    // "Questionings/00d18b0e-4ec7-42f2-9f7d-7874c52f9164/participants?PageSize=1&Category=NOT_AVAILABLE&HealthGroup=NOT_AVAILABLE"
    "Questionings/"+`${q_id}`+"/participants?PageSize=1&Category=NOT_AVAILABLE&HealthGroup=NOT_AVAILABLE"
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
}).tag("@a2");

Scenario("Get waiting Clients before overdue", ({ I }) => {
  I.sendGetRequest(
    "WaitingList/Summary"
  ).then((response) => {
    console.log(response.data.overdue.total);
    return response.data.overdue.total
  });
}).tag("@a3");

Scenario("Get waiting Clients before needAppointment", ({ I }) => {
  I.sendGetRequest(
    "WaitingList/Summary"
  ).then((response) => {
    console.log(response.data.needAppointment.total);
    return response.data.needAppointment.total
  });
}).tag("@a3");

// Scenario("Get access token", ({ I }) => {
//   var options = {
//     method: "POST",
//     url: "https://dev-identity-testproject.testcompany.online/connect/token",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     form: {
//       client_id: "test_service",
//       client_secret: "test_service!",
//       scope: "test_api testir__api",
//       grant_type: "client_credentials",
//     },
//   };
//   request(options, function (error, response) {
//     if (error) throw new Error(error);
//     // console.log(response.body);
//     var jsonBody = JSON.parse(response.body);
//     console.log(jsonBody);
//     fs.writeFileSync(
//       "./access_token.csv",
//       "Bearer " + jsonBody.access_token,
//       "utf8"
//     );
//   });
// }).tag("@s_token");