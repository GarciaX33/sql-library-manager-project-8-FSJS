var express = require('express');
var router = express.Router();
/** get / - Home route should redirect to the /books route. **/
router.get('/', function(request, response, next) {
  response.redirect("/books")
});

module.exports = router;
