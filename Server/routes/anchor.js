const Express = require('express');
const router = Express.Router();
const ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const method = require('../model/DyanamicSchema');

router.post('/post-anchor', async (req, res) => {
  const c_name = req.body.anchorType;
  const d = c_name;
  const Anchor = await method.data.getAnchorModel(d);
  const data = req.body;
  const anAnchor = new Anchor({
    anchor: req.body.anchor,
  });
  anAnchor
    .save()
    .then((response) => {
      console.log('an anchor saved succesfully');
      res.send({data: response});
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/get-anchor', async (req, res) => {
  const c_name = JSON.parse(req.query.payload);
  const d = c_name.anchorType;
  const Anchor = await method.data.getAnchorModel(d);
  Anchor.find().then((data) => {
    res.send(data);
  });
});

router.delete('/delete', async (req, res) => {
  const data = req.body;
  const c_name = data.anchorType;
  const d = c_name;
  const Anchor = await method.data.getAnchorModel(d);

  var id = ObjectId(data.id);
  if (data) {
    Anchor.findByIdAndDelete({_id: id}, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        res.send({msg: 'delete successfully'});
      }
    });
  }
});

router.put('/update', async (req, res) => {
  const data = req.body;
  const c_name = data.anchorType;
  const d = c_name;
  const Anchor = await method.data.getAnchorModel(d);

  var id = ObjectId(data.id);
  Anchor.findByIdAndUpdate(id, {anchor: data.data}, {new: true})
    .then((response) => {
      res.json({data: response});
    })
    .catch((err) => {
      res.status(400).json({err: 'Unable to update the Database'});
    });
});

module.exports = router;
