const Express = require('express');
const router = Express.Router();
const Context = require('../model/ContextFlow');
const WordPhrases = require('../model/WordPhrase');
const Domain = require('../model/Domain');
const Ds = require('../model/DyanamicSchema');

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
          //  else {
          //   let checkIfdataExist = await checkWordIfExist(d);
          //   if (checkIfdataExist) {
          //     let id = await getIds(d);
          //     const j = {wordId: id._id};
          //     arr.push(j);
          //   } else {
          //     const s = {w_data: d, uid: UID.uid};
          //     let id = await createAndGetId(s);

          //     const j = {wordId: id._id};
          //     arr.push(j);
          //   }
          // }
        }

        var obj = await createObject(arr);

        var check1 = await Context.find({
          $and: [{'contexts.flow': obj.flow}, {'contexts.uid': obj.uid}],
        });
        const id = String(obj.domain);
        var checkDomain = await Domain.exists({domain: id});
        if (!checkDomain) {
          createDomain(id);
        }
        if (check1.length === 0) {
          const newContent = new Context({
            contexts: obj,
          });
          newContent
            .save()
            .then(() => {
              console.log('context saved successfully');
              res.send({json: 'contxt saved successfully'});
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return res.send({err: 'this flow name already used by you..'});
        }
      } catch (error) {
        return res.status(500).send(error);
      }
    })();
  }
});

function createObject(arr) {
  const obj = {};
  var c = 0;
  for (let i of arr) {
    c = c + 1;
    var ind = Object.keys(i).toString();
    if (ind === 'wordId') {
      obj[`atn${c}`] = i.wordId;
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
  console.log(d);
  return WordPhrases.exists({wp: d});
}
function getIds(d) {
  return WordPhrases.findOne({wp: d});
}
function createAndGetId(d) {
  console.log(d);
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

// const Express = require('express');
// const router = Express.Router();
// const Context = require('../model/ContextFlow');
// const WordPhrases = require('../model/WordPhrase');
// const Domain = require('../model/Domain');
// const Ds = require('../model/DyanamicSchema');

// router.delete('/delete', async (req, res) => {
//   const data = req.body;
//   if (data) {
//     const id = await getIds(data.flow);
//     var check1 = await Context.find({
//       $and: [{'contexts.flow': id._id}, {'contexts.uid': data.uid}],
//     });
//     var Id = check1[0]._id;
//     Context.findByIdAndDelete({_id: Id}, function (err, response) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(response);
//       }
//     });
//   }
// });
// router.get('/contexts', async (req, res) => {
//   const objs = await Context.find();
//   if (objs) {
//     (async () => {
//       var arr = [];
//       var c = 0;
//       for (const i of objs) {
//         const obj3 = {};
//         for (let j in i.contexts) {
//           if (j === 'uid') {
//           } else if (j === 'FlowAnchor') {
//             const FlowAnchor = await getAnchorByID({
//               id: i.contexts[j],
//               model_name: j,
//             });

//             obj3[j] = FlowAnchor.anchor;
//           } else if (j === 'DomainAnchor') {
//             const DomainAnchor = await getAnchorByID({
//               id: i.contexts[j],
//               model_name: j,
//             });

//             obj3[j] = DomainAnchor.anchor;
//           } else if (j === 'UserAnchor') {
//             const UserAnchor = await getAnchorByID({
//               id: i.contexts[j],
//               model_name: j,
//             });

//             obj3[j] = UserAnchor.anchor;
//           } else {
//             let s = await getWordphrasesById(i.contexts[j]);
//             obj3[j] = s.wp;
//           }
//         }
//         arr.push(obj3);
//         c = c + 1;
//       }
//       res.send({arr});
//     })();
//   }
// });

// router.post('/context', (req, res) => {
//   const data = req.body;
//   const arr = [];
//   var UID = data.find(({uid}) => uid);
//   const len = data.length;
//   if (data) {
//     (async () => {
//       try {
//         var count = 0;
//         for (let i of data) {
//           var d = i;
//           count = count + 1;
//           if (typeof d === 'object') {
//             var obj_name = Object.keys(d).toString();
//             //checking and saving domain
//             if (obj_name === 'domain') {
//               let check_domain = await checkWordIfExist(d.domain);
//               if (check_domain) {
//                 const domain = await getIds(d.domain);
//                 const j = {domain: domain._id};
//                 arr.push(j);
//               } else {
//                 const s = {d: d.domain, uid: UID.uid};
//                 let k = await createAndGetId(s);
//                 const j = {domain: k._id};
//                 arr.push(j);
//               }
//             }
//             //checking and saving flow
//             else if (obj_name === 'flow') {
//               let check_flow = await checkWordIfExist(d.flow);
//               if (check_flow) {
//                 const flow = await getIds(d.flow);
//                 const flow_obj = {flow: flow._id};
//                 arr.push(flow_obj);
//               } else {
//                 const flow = {d: d.flow, uid: UID.uid};
//                 const flow_id = await createAndGetId(flow);
//                 const flow_obj = {flow: flow_id._id};
//                 arr.push(flow_obj);
//               }
//             }
//             //checking and saving flow anchor
//             else if (obj_name === 'FlowAnchor') {
//               const check_flow_anchor = await checkAnchor(d);
//               const flow_anchor_obj = {flow_anchor: check_flow_anchor._id};
//               arr.push(flow_anchor_obj);
//             }
//             //checking and saving domain anchor
//             else if (obj_name === 'DomainAnchor') {
//               const check_domain_anchor = await checkAnchor(d);
//               const domain_anchor_obj = {
//                 domain_anchor: check_domain_anchor._id,
//               };
//               arr.push(domain_anchor_obj);
//             }
//             //checking and saving user anchor
//             else if (obj_name === 'UserAnchor') {
//               const check_user_anchor = await checkAnchor(d);
//               const user_anchor_obj = {
//                 user_anchor: check_user_anchor._id,
//               };
//               arr.push(user_anchor_obj);
//             } else {
//               const j = {uid: d.uid};
//               arr.push(j);
//             }
//           } else {
//             let checkIfdataExist = await checkWordIfExist(d);
//             if (checkIfdataExist) {
//               let id = await getIds(d);
//               const j = {wordId: id._id};
//               arr.push(j);
//             } else {
//               const s = {d: d, uid: UID.uid};
//               let id = await createAndGetId(s);

//               const j = {wordId: id._id};
//               arr.push(j);
//             }
//           }
//         }

//         var obj = await createObject(arr);

//         var check1 = await Context.find({
//           $and: [{'contexts.flow': obj.flow}, {'contexts.uid': obj.uid}],
//         });
//         const id = String(obj.domain);
//         var checkDomain = await Domain.exists({domain: id});
//         if (!checkDomain) {
//           createDomain(id);
//         }
//         if (check1.length === 0) {
//           console.log(obj);
//           // const newContent = new Context({
//           //   contexts: obj,
//           // });
//           // newContent
//           //   .save()
//           //   .then(() => {
//           //     console.log('context saved successfully');
//           //     res.send({json: 'contxt saved successfully'});
//           //   })
//           //   .catch((err) => {
//           //     console.log(err);
//           //   });
//         } else {
//           return res.send({err: 'this flow name already used by you..'});
//         }
//       } catch (error) {
//         return res.status(500).send(error);
//       }
//     })();
//   }
// });

// function createObject(arr) {
//   const obj = {};
//   var c = 0;
//   for (let i of arr) {
//     c = c + 1;
//     var ind = Object.keys(i).toString();
//     if (ind === 'wordId') {
//       obj[`key${c}`] = i.wordId;
//     } else if (ind === 'flow') {
//       obj['flow'] = i.flow;
//     } else if (ind === 'domain') {
//       obj[`domain`] = i.domain;
//     } else if (ind === 'flow_anchor') {
//       obj['FlowAnchor'] = i.flow_anchor;
//     } else if (ind === 'domain_anchor') {
//       obj['DomainAnchor'] = i.domain_anchor;
//     } else if (ind === 'user_anchor') {
//       obj['UserAnchor'] = i.user_anchor;
//     } else {
//       obj['uid'] = i.uid;
//     }
//   }
//   return obj;
// }
// function createDomain(domain) {
//   const newDomain = new Domain({
//     domain: domain,
//   });
//   newDomain
//     .save()
//     .then(() => {
//       console.log('Domain saved succesfully');
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// function checkWordIfExist(d) {
//   return WordPhrases.exists({wp: d});
// }
// function getIds(d) {
//   return WordPhrases.findOne({wp: d});
// }
// function createAndGetId(d) {
//   var newContext = new WordPhrases();
//   newContext.wp = d.d;
//   newContext.owner = d.uid;
//   newContext.save();
//   return newContext;
// }
// function getWordphrasesById(id) {
//   return WordPhrases.findById(id).then((res) => {
//     return res;
//   });
// }

// async function checkAnchor(d) {
//   var key_name = Object.keys(d).toString();
//   var value = Object.values(d).toString();
//   const modelName = await Ds.data.getAnchorModel(key_name);
//   const check = await modelName.exists({anchor: value});
//   if (check) {
//     return modelName.findOne({anchor: value});
//   } else {
//     var newAnchor = new modelName();
//     newAnchor.anchor = value;
//     newAnchor.save();
//     return newAnchor;
//   }
// }
// async function getAnchorByID(data) {
//   const modelName = await Ds.data.getAnchorModel(data.model_name);
//   return modelName.findById(data.id).then((res) => {
//     return res;
//   });
// }
// module.exports = router;
