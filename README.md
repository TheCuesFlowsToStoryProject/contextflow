# contextflow

We are building on two basic JSON structures :

1. WordphrasesCollection 

[
{"phraseid" : "764443sxsx",
 "phrase" : "delivery date" ,
 "owner":"uuu"
},
{"phraseid" : "8764443sx9x"
 "phrase" : "pay as you go" ,
 "owner: : "vvvvv"
} 
]

2. ContextCollection  [{
	"contextid": "55xccdssd7",
	"atttentionentities": [
		"55xxxxxx999", "55xxxxxx999", "55xxxxxx555", "55xxxxxx555"
	],
	"flow": "55rtxxxxx999",
	"domain": "55jdxxxxx555",
	"flow anchor": "smart service",
	"domain anchor": "data sets",
	"owner":"bbbb"
}]


The above structure can translate to mongo DB , where the collection indexes are set up as below:

1. For WordphrasesCollection, phrasedid and phrase are both indexed as unique index ; 
2. For ContextCollection , contextid is indexed unique , domain+flow is a compund unique index ; attentionentities is an indexed array field as described here for tags: https://docs.mongodb.com/manual/tutorial/query-arrays/ . The above approach does not put upfront limit on how many attentionentities are present in the contextcollection doument.
