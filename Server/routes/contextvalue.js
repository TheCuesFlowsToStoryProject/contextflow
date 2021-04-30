const Express = require("express");
const router = Express.Router();
const ContextValue = require("../model/ContextValue");
const WordPhrases = require("../model/WordPhrase");
const ObjectId = require("mongodb").ObjectID;
router.post("/context-value", async (req, res) => {
  var contextvalue_id = "_v".concat(req.body.id);
  const value = await getIds(req.body.value);
  var valueId = value._id.toString();
  const obj = {};
  obj[valueId] = req.body.contextvalue;
  const e = await ContextValue.exists({ _id: contextvalue_id });
  if (e) {
    const check = await ContextValue.findOne({ _id: contextvalue_id });
    check.contextvalue[valueId] = req.body.contextvalue;
    var update_contextvalue = new ContextValue(check);
    update_contextvalue.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } else {
    var new_contextvalue = new ContextValue({
      _id: contextvalue_id,
      contextvalue: obj,
    });
    new_contextvalue.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  }
});

router.get("/get-context-value", async (req, res) => {
  const query = JSON.parse(req.query.payload);
  var context_value_id = "_v".concat(query.id);
  const wp = await WordPhrases.findOne({ wp: query.wp });
  const wp_id = wp._id.toString();
  ContextValue.findById(context_value_id, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.send({ value: docs !== null ? docs.contextvalue[wp_id] : null });
    }
  });
});

router.get("/get-all-context-value", async (req, res) => {
  const query = JSON.parse(req.query.payload);
  ContextValue.findOne(
    { _id: "_v".concat(query.id) },
    async function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        if (docs !== null) {
          const arrayOfObj = Object.entries(docs.contextvalue).map((e) => ({
            // [e[0]]: e[1],
            value: e[1],
            id: e[0],
          }));
          var counter = 0;
          for (let f of arrayOfObj) {
            counter = counter + 1;
            var w = await getWpByID(f.id);
            f.wp = w.wp;
            f.sno = counter;
          }
          console.log(arrayOfObj);
          res.send(arrayOfObj);
        } else {
          res.send(null);
        }
      }
    }
  );
});
module.exports = router;

function getIds(d) {
  return WordPhrases.findOne({ wp: d });
}

function getWpByID(data) {
  return WordPhrases.findById(data).then((res) => {
    return res;
  });
}

// const Express = require("express");
// const router = Express.Router();
// const ContextValue = require("../model/ContextValue");
// const WordPhrases = require("../model/WordPhrase");
// const ObjectId = require("mongodb").ObjectID;
// router.post("/context-value", async (req, res) => {
//   var contextvalue_id = "_v".concat(req.body.id);
//   const value = await getIds(req.body.value);
//   var valueId = value._id.toString();
//   const obj = {};
//   obj[valueId] = req.body.contextvalue;
//   const e = await ContextValue.exists({ _id: contextvalue_id });
//   if (e) {
//     const check = await ContextValue.findOne({ _id: contextvalue_id });
//     check.contextvalue[0][valueId] = req.body.contextvalue;
//     var update_contextvalue = new ContextValue(check);
//     update_contextvalue.save(function (err, result) {
//       if (err) {
//         console.log(err);
//       } else {
//       }
//     });
//   } else {
//     var new_contextvalue = new ContextValue({
//       _id: contextvalue_id,
//       contextvalue: [obj],
//     });
//     new_contextvalue.save(function (err, result) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(result);
//       }
//     });
//   }
// });

// router.get("/get-context-value", async (req, res) => {
//   const query = JSON.parse(req.query.payload);
//   var context_value_id = "_v".concat(query.id);

//   const wp = await WordPhrases.findOne({ wp: query.wp });
//   const wp_id = wp._id.toString();
//   await ContextValue.findOne({ _id: context_value_id }, function (err, docs) {
//     if (err) {
//       console.log(err);
//     } else {
//       if (docs !== null) {
//         const cv = docs.contextvalue[0][wp_id];
//         res.send({ value: docs.contextvalue[0][wp_id] });
//       } else {
//         res.send(null);
//       }
//     }
//   });
// });

// router.get("/get-all-context-value", async (req, res) => {
//   const query = JSON.parse(req.query.payload);
//   ContextValue.findOne(
//     { _id: "_v".concat(query.id) },
//     async function (err, docs) {
//       if (err) {
//         console.log(err);
//       } else {
//         if (docs !== null) {
//           const arrayOfObj = Object.entries(docs.contextvalue[0]).map((e) => ({
//             // [e[0]]: e[1],
//             value: e[1],
//             id: e[0],
//           }));
//           var counter = 0;
//           for (let f of arrayOfObj) {
//             counter = counter + 1;
//             var w = await getWpByID(f.id);
//             f.wp = w.wp;
//             f.sno = counter;
//           }
//           console.log(arrayOfObj);
//           res.send(arrayOfObj);
//         } else {
//           res.send(null);
//         }
//       }
//     }
//   );
// });
// module.exports = router;

// function getIds(d) {
//   return WordPhrases.findOne({ wp: d });
// }

// function getWpByID(data) {
//   return WordPhrases.findById(data).then((res) => {
//     return res;
//   });
// }
