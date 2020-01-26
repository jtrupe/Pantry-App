module.exports = {
  beginRow: function(conditional, options) {
    if (conditional % 2 === 0) {
      console.log(options.data.last);
      return options.fn(this);
    }
  },
  endRow: function(conditional, options) {
    if (conditional % 2 !== 0 || options.data.last === true) {
      return options.fn(this);
    }
  }
};