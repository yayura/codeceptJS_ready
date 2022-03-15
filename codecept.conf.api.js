// const { setHeadlessWhen } = require('@codeceptjs/configure');
// // turn on headless mode when running with HEADLESS=true environment variable
// // export HEADLESS=true && npx codeceptjs run
// setHeadlessWhen(process.env.HEADLESS);
const urls = require("./misc/urls");
var request = require("request");
var access_token = request(
  {
    method: "POST",
    url: `${urls.identity()}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      client_id: "auto",
      client_secret: "auto",
      scope: "_api",
      grant_type: "client_credentials",
    },
  },
  function (error, response) {
    if (error) throw new Error(error);
    // console.log(response.body);
    var jsonBody = JSON.parse(response.body);
    access_token = "Bearer " + jsonBody.access_token;
    return access_token;
  }
);

exports.config = {
  name: "CodeceptJS Ready2",
  tests: "./tests/**/*_test.js",
  output: "./output",
  helpers: {
    // BrowserLogsOnFail: {
    //   enabled: true,
    //   uniqueNames: true,
    //   require: 'codeceptjs-browserlogs-plugin',
    // },
    // DbHelper: {
    //   require: './node_modules/codeceptjs-dbhelper',
    // },
    REST: {
      endpoint: `${urls.urls()}/api/v1/`,
      onRequest: (request) => {
        request.headers.Authorization = access_token;
      },
      defaultHeaders: {},
    },
    ChaiWrapper: {
      require: "codeceptjs-chai",
    },
    // https://github.com/codeceptjs/mock-request
    // MockRequestHelper: {
    //   require: '@codeceptjs/mock-request',
    // },
    //
    // WebDriver: {
    //   url: `${urls.testUI()}`,
    //   browser: 'chrome',
    //   smartWait: 20000,
    //   restart: false,
    //   keepCookies: true,
    //   windowSize: 'maximize',
    //   desiredCapabilities: {
    //     chromeOptions: {
    //       args: ["--headless", "--disable-gpu", "--no-sandbox"],
    //     },
    //   },
    // },
    // Protractor: {
    //   url: "https://test/",
    //   // driver: 'hosted',
    //   browser: "chrome",
    //   smartWait: 20000,
    //   restart: false,
    //   windowSize: "maximize",
    //   // capabilities: {
    //   //   chromeOptions: {
    //   //     args: ["--headless", "--disable-gpu", "--no-sandbox"],
    //   //   },
    //   // },
    //   // rootElement: 'body',
    //   // angular: false,
    //   // seleniumAddress: 'http://localhost:4444/wd/hub',
    // },
  },
  include: {
    I: "./steps_file.js",
    // General
    urls: "./misc/urls.js",
    persons: "./misc/persons.js",
    // testUI
    testUI: "./pages/testUI.js",
    appointments: "./pages/appointments.js",
    //
    questionnaire: "./pages/questionnaire.js",
  },
  bootstrap: null,
  mocha: {},
  plugins: {
    wdio: {
      enabled: true,
      services: ["selenium-standalone"],
    },
    pauseOnFail: {
      enabled: false,
    },
    retryFailedStep: {
      enabled: false,
    },
    tryTo: {
      enabled: false,
    },
    screenshotOnFail: {
      enabled: false,
    },
    allure: {},
  },
};
