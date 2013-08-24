var couchrequest = require('./couch-request'),
	util = require('util');
	


var database = couchrequest( {databaseUrl: "http://127.0.0.1:5984/reqtest" } );


// Use

//database("_all_docs", "burek", function(err, data){
//database("", {name: "peter"}, function(err, data){
database("_all_docs", function(err, data){
	if( err ) {
		console.log( err );
	} else{
		console.log( util.inspect( data, {colors: true} ) );
		
	}
});