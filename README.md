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

CONTEXT FLOW : REALTIME PROCESS IDENTIFIERS
A process in software is the run time unit that is manageable and configurable dynamically.
Adaptation of service oriented architecture has allowed us to define a major portion of software pieces in terms of services and their interaction with each other.
One of the most pervasive piece that influences the interaction between services are the request and response data content that goes into and come out of each service. 
With the current state of service orientation in the industry there is no standard way of referencing these request / response data content by themselves , nor there is a way of capturing them dynamically and distributing them to other interested services at run time. Although technology like ESB (Enterprise Service Bus) has tried to address this issue in different proprietary fashion ( IBM Web-sphere , Mule-soft Any point  etc) , we have chosen “Context Flow” as a integration specification which can be platform independent and hence can be re-positioned for different use cases and different technology. Although ContextFlow concept addressees a broader issue in software design and transparency , it fits well as a conceptual basis for service composition in the ATRC requirement with minimal implementation of identifying input and output of services dynamically and redirect them as needed for service composition. 
In a most general term Context flow empowers every unit of software at run time to identify itself through a unique identity ,using the context knowledge embedded  in the unit at design time.
Context flow  maintains the registries for different contexts in the development process e.g when entities  are belonging to a physical file , when entities are coming out of a service ,when entity is being used as a piece of code etc. Each such entity occurrence in the whole dynamics of the application development gets a unique context identity URL that gets translated into unique use of the entity at the run time of the software . Any entity name (referred to as an element) is considered as the smallest element for the construction of context URL which are stored in the context flow data base.
