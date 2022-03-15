const URI_PREFIX = process.env.URI_PREFIX || "dev";
if (`${URI_PREFIX}` === "dev") {
  module.exports = {
    // practitioners
    login: () => "",
    password: () => "",
  };
} else {
  module.exports = {
    // practitioners
    login: () => "auto_test",
    password: () => "Test1!",
  };
}
