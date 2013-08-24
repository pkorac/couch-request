var request = require('request'),
	pathModule = require('path');


function couchrequest( newOptions ){

	if ( newOptions && typeof newOptions == "object" && 
		 newOptions.databaseUrl && newOptions.databaseUrl.length > 0 ) {		
		
		var options = {
			method: "GET",
			url: newOptions.databaseUrl,
			headers: {"Content-Type": "application/json"}
		};
		

	
		var reqFunction = function(){
			// GET //////////////////////////////////////////////////////////////////////
			if ( arguments.length == 2 ){			
				var path = arguments[0];
				var callback = arguments[1];	
				
				options.url += "/" + path;				

				// Make the request
				request( options, function(err, res, body){
														
					if( err ){
						callback( err, null );
					} else{
						var parseerr = false;
						var result;
						try{
							result = JSON.parse( body );
						} catch(e){
							parseerr = true;
						}
						if( parseerr ){
							callback( new Error("The response is not JSON - check the URL"), null );
						}else{
							if( result.error ){
								callback( result, null );
							}else{
								// ALL GOOD
								callback( null, result );								
							}
						}
					}
				});


			// POST //////////////////////////////////////////////////////////////////////
			} else if ( arguments.length == 3 ){
				var path = arguments[0];
				var theObject = arguments[1];
				var callback = arguments[2];
				
				if( theObject && typeof theObject == "object" ){
					var encodedObject = JSON.stringify( theObject );
					options.method = "POST";					
					options.body = encodedObject;
					
					// Make the request
					request( options, function(err, res, body){
															
						if( err ){
							callback( err, null );
						} else{
							var parseerr = false;
							var result;
							try{
								result = JSON.parse( body );
							} catch(e){
								parseerr = true;
							}
							if( parseerr ){
								callback( new Error("The response is not JSON - check the URL"), null );
							}else{
								if( result.error ){
									callback( result, null );
								}else{
									// ALL GOOD
									callback( null, result );								
								}
							}
						}
					});
					
					
				} else{
					callback( new Error("Passed second argument is not a valid JSON object"), null);
				}				
				
			}		
		};
		
		return reqFunction;
		
		
	} else {
		return null;
	}
};


// EXPORTS
module.exports = couchrequest;