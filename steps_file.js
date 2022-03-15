// in this file you can append custom step methods to 'I' object

module.exports = function () {
  return actor({
    updateField(fieldName, value) {
      this.appendField(fieldName, '');
      this.pressKey(['Shift', 'Home']);
      this.pressKey(value);
    },
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

  });
};
