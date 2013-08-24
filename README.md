### !In the making and testing!

# Couch-Request
A minimal module that adds just one level of abstraction on top of [Request](https://github.com/mikeal/request).

#### Install:
`npm install couch-request`

#### Configure:

Require the module:
````javascript
var couchrequest = require('couch-request');
````

Configure the database:
````javascript
var database = couchrequest( {databaseUrl: [DATABASE URL] } );
````
Example DATABASE URL if you want to use CouchDB running on localhost: http://127.0.0.1:5984/reqtest


#### Get data:
database( path, callback(err, results) );
````javascript
database("_all_docs", function(err, results){
	if( err ) {
		// an error occurred
	} else{
		// do stuff with results
	}
});
````

#### Post data:
database( path, object(s)ToStore, callback(err, results) );
````javascript
//database("", {name: "peter"}, function(err, data){
	if( err ) {
		// an error occurred
	} else{
		// do stuff with results
	}
});
````


As you can see getting and posting stuff to and from the database is fairly simple.

The database function takes two or three arguments. If you provide two (the path and callback) couch-request will make a GET request for you. If you provide three (path, the object and callback), couch-request will make a POST request for you, posting the object passed in as the request body.


Have fun,
Peter