//BeforeALL
const urls = require("./misc/urls");
const fs = require("fs");
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
      client_secret: "auto!",
      scope: "api",
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
fs.truncate("./participants.csv", 0, function () {
  console.log("Participants.csv clear...");
});
////

//Config
exports.config = {
  name: "CodeceptJs Ready2",
  tests: "./tests/**/*_test.js",
  output: "./output",
  helpers: {
    WebDriver: {
      url: `${urls.testUI()}`,

      browser: "chrome",
      host: "10.100.7.170",
      selenoid: {
        options: {
          enableVNC: true,
          enableVideo: false,
        },
      },

      smartWait: 55000,
      waitForTimeout: 55000,
      restart: false,
      keepCookies: true,
      keepBrowserState: true,

      windowSize: "1920x1080",
      desiredCapabilities: {
        chromeOptions: {
          args: ["--headless", "--disable-gpu", "--no-sandbox"],
        },
      },
    },
    BrowserLogsOnFail: {
      enabled: true,
      uniqueNames: true,
      require: "codeceptjs-browserlogs-plugin",
    },

    // DbHelper: {
    //   require: "./node_modules/codeceptjs-dbhelper",
    // },
    ChaiWrapper: {
      require: "codeceptjs-chai",
    },

    REST: {
      endpoint: `${urls.testUI()}/api/v1/`,
      onRequest: (request) => {
        request.headers.Authorization = access_token;
      },
    },
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
    plugins: {
      selenoid: {
        enabled: true,
        deletePassed: true,
        autoCreate: true,
        autoStart: true,
        sessionTimeout: "2m",
        enableVideo: false,
        enableLog: true,
      },
    },
    wdio: {
      enabled: true,
      // services: ["selenium-standalone"],
    },
    pauseOnFail: {
      enabled: false,
    },
    retryFailedStep: {
      enabled: false,
    },
    tryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
    allure: {},
    autoDelay: {
      enabled: true,
    },
  },
};
