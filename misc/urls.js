const URI_PREFIX = process.env.URI_PREFIX || "dev";
console.log(URI_PREFIX);
if (`${URI_PREFIX}` === "dev") {
  module.exports = {
    url1: () => `https://${URI_PREFIX}.test`,
    cdsWaiting: () => 59
  };
} else {
  module.exports = {
    url1: () => `https://${URI_PREFIX}.test`,
    cdsWaiting: () => 59
}
}