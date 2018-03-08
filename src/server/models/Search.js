var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SearchSchema   = new Schema({
  searchUrl: String,
  pushSubscription: Object
});

module.exports = mongoose.model('Search', SearchSchema);
