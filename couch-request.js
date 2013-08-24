#!/usr/bin/env node

var http = require('http'),
	https = require('https'),
	args = process.argv, 
	util = require('util');



var JsonRequest = function( newOptions ){

	var database = "reqtest";
	var hostname = "localhost";
	var port = 5984;

	if ( newOptions ) {
		if ( newOptions instanceof Object ){
			
			if(newOptions.database) database = newOptions.database;
			if(newOptions.hostname) hostname = newOptions.hostname;
			if(newOptions.port) port = newOptions.port;
			
		} else{
			console.log( "Options must be an object" );
		}
	}
	
	// Options
	var options = {
		hostname: hostname,
		port: port,
		method: "GET",
		path: "/"+database+"/",
		headers: {"Content-Type": "application/json"}
	};	
	
	// The Request function
	var reqFunction = function(){		
		
		//////////////
		// GET stuff
		if( arguments.length == 2 ){
			
			var path = arguments[0];
			var callback = arguments[1];
						
			// Setup the request
			options.path += path;
			
			var req = http.request( options, function(res){
				var data = "";
				res.on('data', function(chunk){	data += chunk; });
				
				// Response finished
				res.on('end', function(){
					
					// Catch non-json stuff
					// ( for example host returning a 404 or a 503 html page )
					var err = false;
					try{
						JSON.parse( data.toString() );
					} catch(e){
						err = true;
					}
	
					// No error, parse the result
					if ( !err ){
						var result = JSON.parse( data.toString() );
						if ( result.error ){
							callback( result.error, null ); // database responded with an error document
						} else{
							// SUCCESS
							callback( null, result ); // ALL GOOD
						}
					} else{
						callback( new Error( "Something's wrong with the options you've specified" ), null );
					}
				});
				
			});
		
			req.on('error', function(e){
				callback(e, null);
			});
			
			req.end();
			

		//////////////
		// POST stuff			
		} else if ( arguments.length == 3 ){
			
			var path = arguments[0];
			var theObject = arguments[1];
			var callback = arguments[2];
			
			// Setup the request
			options.path += path;
			options.method = "POST";
			options.body = JSON.stringify( theObject );
			
			console.log( options );
			var encodingerror = false;
			
			try{
				JSON.parse( options.body );
			} catch(e){
				encodingerror = true;
			}	
			// Valid object passed in		
			if(! encodingerror ) {
				
				var req = http.request( options, function(res){
					
					var data = "";
					res.on('data', function(chunk){	data += chunk; });
					
					// Response finished
					res.on('end', function(){
						
						// Catch non-json stuff
						// ( for example host returning a 404 or a 503 html page )
						var err = false;
						try{
							JSON.parse( data.toString() );
						} catch(e){
							err = true;
						}
		
						// No error, parse the result
						if ( !err ){
							var result = JSON.parse( data.toString() );
							if ( result.error ){
								callback( result.error, null ); // database responded with an error document
							} else{
								// SUCCESS
								callback( null, result ); // ALL GOOD
							}
						} else{
							callback( new Error( "Something's wrong with the options you've specified" ), null );
						}
					});
					
				});
		
				req.on('error', function(e){
					callback(e, null);
				});
				
				req.end();
			
			
			
			// Invalid JSON object passed in
			} else {
				callback( new Error("The object you've passed in is not a valid JSON object"), null );
			}
			
			
		} else{
			console.log( "Not enough parameters specified" );
		}
		
	};
	
	return reqFunction;
};








var options = {
	hostname: 'localhost',
	port: 5984,
	database: "reqtest"
};

/*
var myR = new JsonRequest( options );
myR( '_design/views/_view/names', function( err, data){
	if ( err ) {
		console.log( err );
	} else{
		console.log( util.inspect( data, {colors: true, depth: 10} ) );	
	}
} );
*/
var myR = new JsonRequest( options );
var objectToPost = { name: "peter" };
myR( '', objectToPost, function( err, data){
	if ( err ) {
		console.log( err );
	} else{
		console.log( util.inspect( data, {colors: true, depth: 10} ) );	
	}
} );










/*
var options = {
		hostname: 'eveningscode.cloudant.com',
		port: 80,
		path: "/habitscopy/_all_docs",
		"Content-type": "application/json"
};
*/
