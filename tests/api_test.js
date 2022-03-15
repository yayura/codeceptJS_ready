const { urls, persons, testUI } = inject();

Feature("api");

Scenario("Get waiting clients before overdue", ({ I }) => {
  I.sendGetRequest(
    "WaitingList/Summary"
  ).then((response) => {
    console.log(response.data.overdue.total);
    return response.data.overdue.total
  });
}).tag("@a3");
