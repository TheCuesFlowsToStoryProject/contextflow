# contextflow

We are building on two basic JSON structures :

1. WordphrasesCollection 

[
{"phraseid" : "764443sxsx",
 "phrase" : "delivery date" 
},
{"phraseid" : "8764443sx9x"
 "phrase" : "pay as you go" 
} 
]

2. ContextCollection  [{
	"contextid": "55xccdssd7",
	"atttentionentities": [
		"55xxxxxx999", "55xxxxxx999", "55xxxxxx555", "55xxxxxx555"
	],
	"flow": "55xxxxxx999",
	"domain": "55xxxxxx555"
}]


The above structure can translate to mongo DB , where the collection indexes are set up as below:

1. For WordphrasesCollection, phrasedid and phrase are both indexed as unique index ; 
2. For ContextCollection , contextid is indexed unique , flow+domian is a compund unique index ; attentionentities is an indexed array field as described here for tags: https://docs.mongodb.com/manual/tutorial/query-arrays/ . The above approach does not put upfront limit on how many attentionentities are present in the contextcollection doument.
