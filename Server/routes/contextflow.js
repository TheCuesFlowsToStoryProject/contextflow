const Express = require('express');
const router = Express.Router();
const Context = require('../model/ContextFlow');
const WordPhrases = require('../model/WordPhrase');
const Domain = require('../model/Domain');
const Ds = require('../model/DyanamicSchema');
const ObjectId = require('mongodb').ObjectID;

router.delete('/delete', async (req, res) => {
  const data = req.body;
  if (data) {
    const id = await getIds(data.flow);
    var check1 = await Context.find({
      $and: [{'contexts.flow': id._id}, {'contexts.uid': data.uid}],
    });
    var Id = check1[0]._id;
    Context.findByIdAndDelete({_id: Id}, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
      }
    });
  }
});
router.get('/contexts', async (req, res) => {
  const objs = await Context.find();

  if (objs) {
    (async () => {
      var arr = [];
      var c = 0;
      for (const i of objs) {
        const obj3 = {};
        for (let j in i.contexts) {
          if (j === 'uid') {
            obj3['_id'] = i._id;
            obj3[j] = i.contexts[j];
          } else if (j === 'FlowAnchor') {
            const FlowAnchor = await getAnchorByID({
              id: i.contexts[j],
              model_name: j,
            });

            obj3[j] = FlowAnchor.anchor;
          } else if (j === 'DomainAnchor') {
            const DomainAnchor = await getAnchorByID({
              id: i.contexts[j],
              model_name: j,
            });

            obj3[j] = DomainAnchor.anchor;
          } else if (j === 'UserAnchor') {
            const UserAnchor = await getAnchorByID({
              id: i.contexts[j],
              model_name: j,
            });

            obj3[j] = UserAnchor.anchor;
          } else {
            let s = await getWordphrasesById(i.contexts[j]);
            obj3[j] = s.wp;
          }
        }

        arr.push(obj3);
        c = c + 1;
      }
      res.send({arr});
    })();
  }
});

router.post('/context', (req, res) => {
  const data = req.body;

  const arr = [];
  var UID = data.find(({uid}) => uid);
  const len = data.length;
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
                const l = {wordId: res._id};
                arr.push(l);
              } else {
                const s = {w_data: j, uid: UID.uid};
                const res = await createAndGetId(s);
                const j = {wordId: res._id};
                arr.push(j);
              }
            }
          } else if (typeof d === 'object') {
            var obj_name = Object.keys(d).toString();
            //checking and saving domain
            if (obj_name === 'domain') {
              let check_domain = await checkWordIfExist(d.domain);
              if (check_domain) {
                const domain = await getIds(d.domain);
                const j = {domain: domain._id};
                arr.push(j);
              } else {
                const s = {w_data: d.domain, uid: UID.uid};
                let k = await createAndGetId(s);
                const j = {domain: k._id};
                arr.push(j);
              }
            }
            //checking and saving flow
            else if (obj_name === 'flow') {
              let check_flow = await checkWordIfExist(d.flow);
              if (check_flow) {
                const flow = await getIds(d.flow);
                const flow_obj = {flow: flow._id};
                arr.push(flow_obj);
              } else {
                const flow = {dw_data: flow, uid: UID.uid};
                const flow_id = await createAndGetId(flow);
                const flow_obj = {flow: flow_id._id};
                arr.push(flow_obj);
              }
            }
            //checking and saving flow anchor
            else if (obj_name === 'FlowAnchor') {
              const check_flow_anchor = await checkAnchor(d);
              const flow_anchor_obj = {flow_anchor: check_flow_anchor._id};
              arr.push(flow_anchor_obj);
            }
            //checking and saving domain anchor
            else if (obj_name === 'DomainAnchor') {
              const check_domain_anchor = await checkAnchor(d);
              const domain_anchor_obj = {
                domain_anchor: check_domain_anchor._id,
              };
              arr.push(domain_anchor_obj);
            }
            //checking and saving user anchor
            else if (obj_name === 'UserAnchor') {
              const check_user_anchor = await checkAnchor(d);
              const user_anchor_obj = {
                user_anchor: check_user_anchor._id,
              };
              arr.push(user_anchor_obj);
            } else {
              const j = {uid: d.uid};
              arr.push(j);
            }
          }
        }

        var obj = await createObject(arr);

        const check_context = await Context.find({contexts: obj});

        var checkFlow = await Context.find({
          $and: [
            {'contexts.UserAnchor': obj.UserAnchor},
            {'contexts.domain': obj.domain},
            {'contexts.flow': obj.flow},
          ],
        });
        const id = String(obj.domain);
        if (check_context.length === 0) {
          var checkDomain = await Domain.exists({domain: id});
          if (!checkDomain) {
            createDomain(id);
          }
          if (checkFlow.length === 0) {
            const newContent = new Context({
              contexts: obj,
            });
            newContent
              .save()
              .then(() => {
                res.send({json: 'contxt saved successfully'});
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            return res.send({
              err: 'Useranchor,domain and flow name is already exist..',
            });
          }
        } else {
          return res.send({err: 'this context already exist'});
        }
      } catch (error) {
        return res.status(500).send(error);
      }
    })();
  }
});
//add module entity
router.put('/add-module-entity', async (req, res) => {
  const data = req.body;
  const contx_data = await Context.findById(data.contextId).then((res) => {
    return res;
  });

  contx_data.contexts[`${data.key}`] = ObjectId(data.value);

  if (contx_data.contexts.uid === data.owner) {
    const moduleContext = new Context(contx_data);
    moduleContext
      .save()
      .then((response) => {
        res.send({json: 'contxt saved successfully'});
      })
      .catch((error) => {
        console.log(error);
        res.send({msg: 'contxt saved successfully'});
      });
  } else {
    return res.send({err: 'only owner can update'});
  }
});

function createObject(arr) {
  const obj = {};
  var c = 1;
  for (let i of arr) {
    var ind = Object.keys(i).toString();
    if (ind === 'wordId') {
      obj[`atn${c}`] = i.wordId;
      c = c + 1;
    } else if (ind === 'flow') {
      obj['flow'] = i.flow;
    } else if (ind === 'domain') {
      obj[`domain`] = i.domain;
    } else if (ind === 'flow_anchor') {
      obj['FlowAnchor'] = i.flow_anchor;
    } else if (ind === 'domain_anchor') {
      obj['DomainAnchor'] = i.domain_anchor;
    } else if (ind === 'user_anchor') {
      obj['UserAnchor'] = i.user_anchor;
    } else {
      obj['uid'] = i.uid;
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
      console.log('Domain saved succesfully');
    })
    .catch((err) => {
      console.log(err);
    });
}

function checkWordIfExist(d) {
  return WordPhrases.exists({wp: d});
}
function getIds(d) {
  return WordPhrases.findOne({wp: d});
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

async function checkAnchor(d) {
  var key_name = Object.keys(d).toString();
  var value = Object.values(d).toString();
  const modelName = await Ds.data.getAnchorModel(key_name);
  const check = await modelName.exists({anchor: value});
  if (check) {
    return modelName.findOne({anchor: value});
  } else {
    var newAnchor = new modelName();
    newAnchor.anchor = value;
    newAnchor.save();
    return newAnchor;
  }
}
async function getAnchorByID(data) {
  const modelName = await Ds.data.getAnchorModel(data.model_name);
  return modelName.findById(data.id).then((res) => {
    return res;
  });
}
module.exports = router;
