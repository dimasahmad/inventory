var express = require("express");
var router = express.Router();
var jsonfile = require("jsonfile");
var tokens = require("../tokens.js");
var graph = require("../graph.js");

const file = "./items.json";
var items = jsonfile.readFileSync(file);

console.dir(items);

function findId(data, id) {
  var arr = data;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id == id) {
      return arr[i];
      console.dir(arr[i]);
    }
  }
}

/* GET /items*/
router.get("/", async function(req, res) {
  if (!req.isAuthenticated()) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    let params = {
      active: { items: true },
      items: items
    };

    res.render("items", params);
  }
});

router.get("/:id", function(req, res, next) {
  let params = {
    active: { home: true },
    item: findId(items, req.params.id)
  };

  res.render("items", params);
});

module.exports = router;
