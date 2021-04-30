const Express = require("express");
const router = Express.Router();
const Context = require("../model/ContextFlow");
const WordPhrases = require("../model/WordPhrase");
const Domain = require("../model/Domain");
const Ds = require("../model/DyanamicSchema");
const ContextValue = require("../model/ContextValue");
const ObjectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");
router.delete("/delete", async (req, res) => {
  const data = req.body;
  if (data) {
    const id = await getIds(data.flow);
    var check1 = await Context.find({
      $and: [{ "contexts.flow": id._id }, { "contexts.uid": data.uid }],
    });
    var Id = check1[0]._id;
    Context.findByIdAndDelete({ _id: Id }, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
      }
    });
  }
});
router.get("/contexts", async (req, res) => {
  // Context.collection.dropAllIndexes(function (err, results) {
  //   console.log(err, results);
  //   // Handle errors
  // });
  // Context.collection
  //   .getIndexes({ full: true })
  //   .then((indexes) => {
  //     console.log("indexes:", indexes);
  //   })
  //   .catch(console.error);
  const anchorData = JSON.parse(req.query.payload);
  var objs;
  anchorData.anchor
    ? (objs = await Context.find({}))
    : (objs = await Context.find({
        $and: [
          { "contexts.UserAnchor": anchorData.userAnchor },
          { "contexts.DomainAnchor": anchorData.domainAnchor },
          { "contexts.FlowAnchor": anchorData.flowAnchor },
        ],
      }));

  if (objs) {
    (async () => {
      var arr = [];
      var c = 0;
      for (const i of objs) {
        const obj3 = {};
        for (let j in i.contexts) {
          obj3["_id"] = i._id;
          if (j === "FlowAnchor") {
            obj3[j] = i.contexts[j];
          } else if (j === "DomainAnchor") {
            obj3[j] = i.contexts[j];
          } else if (j === "UserAnchor") {
            obj3[j] = i.contexts[j];
          } else if (j === "type") {
            obj3[j] = i.contexts[j];
          } else if (j === "atttentionentities") {
            var attention = [];
            const arr = i.contexts[j];
            for (const l of arr) {
              let s = await getWordphrasesById(l);
              attention.push(s.wp);
            }
            obj3["atttentionentities"] = attention;
          } else if (j === "domain") {
            let s = await getWordphrasesById(i.contexts[j]);
            obj3[j] = s.wp;
          } else if (j === "flow") {
            let s = await getWordphrasesById(i.contexts[j]);
            obj3[j] = s.wp;
          } else if (j === "owner") {
            obj3[j] = i.contexts[j];
          } else if (j === "contexttype") {
            obj3[j] = i.contexts[j];
          }
        }
        arr.push(obj3);
        c = c + 1;
      }
      res.send({ arr });
    })();
  }
});

router.post("/context", (req, res) => {
  const data = req.body;
  const arr = [];
  const atttentionentities = [];
  var UID = data.find(({ uid }) => uid);
  // const len = data.length;
  if (data) {
    (async () => {
      try {
        var count = 0;
        for (let i of data) {
          var d = i;
          count = count + 1;
          if (Array.isArray(d)) {
            for (const j of d) {
              let checkIfdataExist = await checkWordIfExist(j);
              if (checkIfdataExist) {
                const res = await getIds(j);

                atttentionentities.push(res._id.toString());
              } else {
                const s = { w_data: j, uid: UID.uid };
                const res = await createAndGetId(s);
                atttentionentities.push(res._id);
              }
            }
          } else if (typeof d === "object") {
            var obj_name = Object.keys(d).toString();
            //checking and saving domain
            if (obj_name === "domain") {
              let check_domain = await checkWordIfExist(d.domain);
              if (check_domain) {
                const domain = await getIds(d.domain);
                const j = { domain: domain._id.toString() };
                arr.push(j);
              } else {
                const s = { w_data: d.domain, uid: UID.uid };
                let k = await createAndGetId(s);
                const j = { domain: k._id.toString() };
                arr.push(j);
              }
            }
            //checking and saving flow
            else if (obj_name === "flow") {
              let check_flow = await checkWordIfExist(d.flow);
              if (check_flow) {
                const flow = await getIds(d.flow);
                const flow_obj = { flow: flow._id };
                arr.push(flow_obj);
              } else {
                const flow = { dw_data: flow, uid: UID.uid };
                const flow_id = await createAndGetId(flow);
                const flow_obj = { flow: flow_id._id };
                arr.push(flow_obj);
              }
            }
            //checking and saving flow anchor
            else if (obj_name === "FlowAnchor") {
              const flow_anchor_obj = { flow_anchor: d.FlowAnchor };
              arr.push(flow_anchor_obj);
            }
            //checking and saving domain anchor
            else if (obj_name === "DomainAnchor") {
              const domain_anchor_obj = {
                domain_anchor: d.DomainAnchor,
              };
              arr.push(domain_anchor_obj);
            }
            //checking and saving user anchor
            else if (obj_name === "UserAnchor") {
              const user_anchor_obj = {
                user_anchor: d.UserAnchor,
              };
              arr.push(user_anchor_obj);
            } else if (obj_name === "uid") {
              const j = { uid: d.uid };
              arr.push(j);
            } else if (obj_name === "contexttype") {
              const context_type = {
                contexttype: d.contexttype,
              };
              arr.push(context_type);
            }
          }
        }

        var obj = await createObject(arr, atttentionentities);
        const check_context = await Context.find({ contexts: obj });
        const id = String(obj.domain);
        if (check_context.length === 0) {
          var checkDomain = await Domain.exists({ domain: id });
          if (!checkDomain) {
            createDomain(id);
          }
          const newContent = new Context({
            contexts: obj,
          });

          newContent
            .save()
            .then(() => {
              res.send({ json: "contxt saved successfully" });
            })
            .catch((err) => {
              if (err.name === "MongoError" && err.code === 11000) {
                res.send({ err: "duplicate context" });
              } else {
                console.log(err);
              }
            });
        } else {
          return res.send({ err: "this context already exist" });
        }
      } catch (error) {
        return res.status(500).send(error);
      }
    })();
  }
});
//add module entity
router.put("/add-module-entity", async (req, res) => {
  const data = req.body;

  var checkData = await Context.find({
    $and: [{ "contexts.owner": data.currentUser }, { _id: data.contextId }],
  });
  if (checkData.length > 0) {
    const contxt = checkData[0];
    const entity = contxt.contexts.atttentionentities;
    if (!entity.includes(data.wpId)) {
      entity.push(data.wpId);

      const modelContext = new Context(contxt);
      modelContext
        .save()
        .then((response) => {
          res.send({ json: "contxt saved successfully" });
        })
        .catch((error) => {
          console.log(error);
          res.send({ msg: "contxt saved successfully" });
        });
    } else {
      return res.send({ err: "this entity is already exist" });
    }
  } else {
    return res.send({ err: "only owner can update" });
  }
});

router.put("/shuffle-entity", async (req, res) => {
  const data = req.body;
  var checkData = await Context.find({
    $and: [{ "contexts.owner": data.user }, { _id: data.contextId }],
  });
  var Ids = [];
  if (checkData.length > 0) {
    for (const i of data.drag) {
      var Id = await getIds(i);
      Ids.push(Id._id);
    }
    const contxt = checkData[0];
    contxt.contexts.atttentionentities = Ids;
    const modelContext = new Context(contxt);
    modelContext
      .save()
      .then((response) => {
        res.send({ json: "contxt saved successfully" });
      })
      .catch((error) => {
        console.log(error);
        res.send({ msg: "contxt saved successfully" });
      });
  } else {
    return res.send({ err: "only owner can update" });
  }
});

router.put("/remove-attention", async (req, res) => {
  const data = req.body;
  var contxtId = mongoose.Types.ObjectId(data.contextId);
  var checkData = await Context.find({
    $and: [{ "contexts.owner": data.user }, { _id: contxtId }],
  });

  if (checkData.length > 0) {
    var wpId = await getIds(data.atttentionentity);

    const contxt = checkData[0];
    var atnentity = contxt.contexts.atttentionentities;
    const arrs = atnentity.filter((item) => item !== wpId._id.toString());
    contxt.contexts.atttentionentities = arrs;
    const modelContext = new Context(contxt);
    modelContext
      .save()
      .then((response) => {
        res.send({ json: "contxt saved successfully" });
      })
      .catch((error) => {
        console.log(error);
        res.send({ msg: "contxt saved successfully" });
      });
  } else {
    return res.send({ err: "only owner can update" });
  }
});
router.put("/change-context", async (req, res) => {
  const data = req.body;
  var contxtId = mongoose.Types.ObjectId(data.contextId);
  var checkData = await Context.find({
    $and: [{ "contexts.owner": data.user }, { _id: contxtId }],
  });
  if (checkData.length > 0) {
    const old_one = await getIds(data.old_entity);
    const domainId = await getIds(data.domain);
    const flowId = await getIds(data.flow);
    const modelEntityId = await getIds(data.model_entity);
    const contxt = checkData[0];
    var atnentities = contxt.contexts.atttentionentities;
    var counts = 0;
    for (let d of atnentities) {
      if (d === old_one._id.toString()) {
        atnentities[counts] = modelEntityId._id.toString();
        break;
      }
      counts = counts + 1;
    }
    contxt.contexts.flow = flowId._id;
    contxt.contexts.domain = domainId._id;
    contxt.contexts.contexttype = data.contexttype;
    const modelContext = new Context(contxt);
    // console.log(modelContext);
    modelContext
      .save()
      .then((response) => {
        res.send({ json: "contxt saved successfully" });
      })
      .catch((err) => {
        if (err.name === "MongoError" && err.code === 11000) {
          res.send({ err: "context already exist with this attribute" });
        } else {
          console.log(err);
        }
      });
  } else {
    return res.send({ err: "only owner can update" });
  }
});

router.post("/context-type", async (req, res) => {
  const data = req.body;
  var checkData = await Context.find({
    $and: [{ "contexts.owner": data.user }, { _id: data.context._id }],
  });
  if (checkData.length > 0) {
    const contxt = checkData[0];
    contxt.contexts["type"] = data.context.type;
    const modelContext = new Context(contxt);
    modelContext
      .save()
      .then((response) => {
        res.send({ json: "contxt saved successfully" });
      })
      .catch((error) => {
        console.log(error);
        res.send({ msg: "contxt saved successfully" });
      });
  } else {
    return res.send({ err: "only owner can update" });
  }
});

function createObject(arr, atntn) {
  const obj = {};
  for (let i of arr) {
    obj["atttentionentities"] = atntn;
    var ind = Object.keys(i).toString();
    if (ind === "flow") {
      obj["flow"] = i.flow;
    } else if (ind === "domain") {
      obj[`domain`] = i.domain;
    } else if (ind === "flow_anchor") {
      obj["FlowAnchor"] = i.flow_anchor;
    } else if (ind === "domain_anchor") {
      obj["DomainAnchor"] = i.domain_anchor;
    } else if (ind === "user_anchor") {
      obj["UserAnchor"] = i.user_anchor;
    } else if (ind === "uid") {
      obj["owner"] = i.uid;
    } else if (ind === "contexttype") {
      obj["contexttype"] = i.contexttype;
    }
  }
  return obj;
}
function createDomain(domain) {
  const newDomain = new Domain({
    domain: domain,
  });
  newDomain
    .save()
    .then(() => {
      console.log("Domain saved succesfully");
    })
    .catch((err) => {
      console.log(err);
    });
}

function checkWordIfExist(d) {
  return WordPhrases.exists({ wp: d });
}
function getIds(d) {
  return WordPhrases.findOne({ wp: d });
}
function createAndGetId(d) {
  var newContext = new WordPhrases();
  newContext.wp = d.w_data;
  newContext.owner = d.uid;
  newContext.save();
  return newContext;
}
function getWordphrasesById(id) {
  return WordPhrases.findById(id).then((res) => {
    return res;
  });
}

// async function getContextValueByID(data) {
//   return ContextValue.findById(data).then((res) => {
//     return res;
//   });
// }
module.exports = router;
