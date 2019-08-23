var express = require('express');
var router = express.Router();

/* GET users listing. */
const users = []
router.route('/').get(function(req, res, next) {
  res.json(users);
})
.post(function(req, res, next){
  const user = req.body
  users.push(user)
  res.json(user)
})

module.exports = router;
