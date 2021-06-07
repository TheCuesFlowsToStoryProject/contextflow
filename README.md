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
With the current state of service orientation in the industry there is no standard way of referencing these request / response data content by themselves , nor there is a way of capturing them dynamically and distributing them to other interested services at run time. Although technology like ESB (Enterprise Service Bus) has tried to address this issue in different proprietary fashion ( IBM Web-sphere , Mule-soft Any point  etc) , we have chosen “Context Flow” as a integration specification which can be platform independent and hence can be re-positioned for different use cases and different technology. Although ContextFlow concept addressees a broader issue in software design and transparency , it fits well as a conceptual basis for service composition in the microservice composition  requirement with minimal implementation of identifying input and output of services dynamically and redirect them as needed for service composition. 
In a most general term Context flow empowers every unit of software at run time to identify itself through a unique identity ,using the context knowledge embedded  in the unit at design time.
Context flow  maintains the registries for different contexts in the development process e.g when entities  are belonging to a physical file , when entities are coming out of a service ,when entity is being used as a piece of code etc. Each such entity occurrence in the whole dynamics of the application development gets a unique context identity URL that gets translated into unique use of the entity at the run time of the software . Any entity name (referred to as an element) is considered as the smallest element for the construction of context URL which are stored in the context flow data base.


SOFTWARE DEVELOPMENT : DESIGN BEFORE CODE 
Role of Context Flow  
1. Introduction
Context Flow allows software objects to relate to their environment through the design goals enumerated before software is developed. 
Consider a simple example within the transport domain where a ‘dataset d1’ and ‘map m2’ are software objects that are produced through a ‘module p’ in a component called ‘track Visualiser’. These objects can be related to one another by the design goal “show tram tracks in greater city zone”:
Design goal: “show tram tracks in greater city zone” 
Product -> ‘track Visualiser’
Object -> ‘dataset d1’
Module -> p
Other Object -> ‘map m2’

Design goals in software generally follow what are called patterns. In the example above, the goal “show tram tracks in greater city zone” can be expressed as a pattern “show X tracks in Y zone”, because x and y can vary (x can be ‘tram’ or ‘train’ and y can be ‘greater city’ ,’inner city’ etc.) , or more generally as  ‘show _ tracks in _ zone’ where only spaces are acting as place holders  . With this understanding, patterns are important for both design time to facilitate software development and execution at run time, and it is here that Context Flow contribute capability.
 In traditional software development there is no direct way of representing design goals in the software code itself nor is there any direct way of identifying which software module is responsible for which design goal. In the past this information has been represented in supporting documentation that is typically designed for human readers only and can have various issues such as accuracy, hence often goes unused. 
2. Definitions, anchors , context table and  pattern tables
Context Flow treats patterns in design goals as part of software dynamics and as such can play an important role. It seeks to capture these goals through patterns defined at design time before coding starts. For each pattern, Context Flow maintains a pattern table of four columns: product, domain, flow and entity-sets. The product column is any part of the software that can exist as a component or an application such as ‘track Visualiser ‘, the domain column holds the first object (e.g. the ‘data set name’), the flow column holds a cause or designed factor for the relation (e.g. ‘the module name p’) and the entity-sets column has the entry ‘map m2’ as the other object(s) in the relation.
As there can be many patterns that emerge during design time that are not known beforehand, Context Flow dynamically maintains an pattern table for each one as they emerge. Context Flow captures the pattern in the pattern table, while captures the design goals for the pattern in the context table which ‘anchors’ the column header from the pattern table row . Values for these headers are selected from a set of column values called anchors corresponding to the four columns of the pattern table. This approach allows a software designer to set up the right anchor for a pattern during design time. For example, the pattern ‘show tracks in zone’ pattern maps uniquely to product anchor as ‘product’, the domain anchor as ‘dataset’, flow anchor as ‘module name’ and entity set anchor as ‘map produced’  (or simply ‘maps’). The relationships between the pattern and context tables are represented in Figure below

3. Searching:
The Context Flow approach allows a search engine to be employed to search for a particular set of columns that exist for all the patterns and produce a result by analysing all the existing answers available. 
Within Context Flow this facility is referred to as a uniform search facility, which maintains a context by sequencing the names available in the Context Flow data base, while at the same time ensuring there is always only one entry per name or sequence of names. This ensures the developer can follow a design guideline about finding related objects such as “find the attributes to a dataset  x” using a uniform context locator (UCL) formed as follows:  
‘product.dataset.dataformat.attributlist.[product].[domianvalue].[flow value]’  
The UCL approach will be sufficient to pull the required parameter sequence from the Context Flow data base. This means that instead of constructing a custom relational query, as would be required by standard query language (SQL) to search through joining the anchor table and pattern tables, the UCL simply allows an API call to be issued to the Context Flow Database by sequencing the known entries from the anchor table and the context table.

4. Meta-call for extending existing design:
This UCL scheme is called a meta-call protocol, as it allows querying or updating at design time when associations are created. Here the meta-call context locator uses the sequence defined above, and the Context Flow database’s integrity of only one entry per name or sequence of names for a fully specified UCL, akin to an index to a table in database (this also serves to provide the benefit of a regular expression for navigation through cross pattern occurrence of entity names). Meta-call is used by the software components to ascertain the entity sets designated for input or output, relevant environment parameters such as output filename, port numbers or registering elapsed time for monitoring purpose, etc. With maturity, this API will allow future intelligent linking of resources with services requiring coordination of entities. Smart answers to queries such as this will help future developers to proactively build new services from old ones while doing mapping of entities output from one service to entities input to the next service.
