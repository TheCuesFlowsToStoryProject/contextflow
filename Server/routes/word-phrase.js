const Express = require("express");
const router = Express.Router();
const ObjectId = require("mongodb").ObjectID;
const WordPhrase = require("../model/WordPhrase");

router.post("/post-wordphrase", async (req, res) => {
  const data = req.body;
  const Wordphrase = new WordPhrase({
    wp: data.wp,
    owner: data.owner,
  });
  Wordphrase.save()
    .then((response) => {
      res.send({ data: response });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/get-wordphrase", async (req, res) => {
  WordPhrase.find().then((data) => {
    res.send(data);
  });
});

router.delete("/wordphrase/delete", async (req, res) => {
  const data = req.body;
  var id = ObjectId(data.id);
  var check = await WordPhrase.find({
    $and: [{ owner: data.owner }, { _id: id }],
  });
  if (check.length > 0) {
    WordPhrase.findByIdAndDelete({ _id: id }, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        res.send({ msg: "delete successfully" });
      }
    });
  } else {
    return res.send({ err: "you are not the owner to delete this phrase" });
  }
});

router.put("/wordphrase/update", async (req, res) => {
  const data = req.body;
  var id = ObjectId(data.id);
  var check = await WordPhrase.find({
    $and: [{ owner: data.owner }, { _id: id }],
  });
  if (check.length > 0) {
    WordPhrase.findByIdAndUpdate(id, { wp: data.data }, { new: true })
      .then((response) => {
        res.json({ data: response });
      })
      .catch((err) => {
        res.send({ err: "Unable to update " });
      });
  } else {
    return res.send({ err: "Only owner can edit" });
  }
});

module.exports = router;
