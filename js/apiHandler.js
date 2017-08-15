/*----------------------------------------------------
 * apiHandler
 * connect between client and database
 * input:
 * 	- (object type WrapperHandler) get wrapperHandler
 ----------------------------------------------------*/
function ApiHandler (wrapperHandler){
	this.wrapperHandler 	= wrapperHandler;
	this.query_id           = 0;
	this.running_requests   = {};
	this.max_tries          = 3;
	this.systemCache     	= false; 
	this.result_format      = "application/sparql-results+json"; // to format parmater
	this.dataType           = "jsonp"; //jsonp for cross domain
	this.method             = "GET";
}
/***********************
 * call database with new query 
 * input:
 * 	- (string) sparql query to send
 *  - (function) return data to function
 * output:
 *  - none
 ***********************/
ApiHandler.prototype.query = function(query,callback) {
	//check if same request already running and add it to callback
	for(query_id in this.running_requests){
		var request = this.running_requests[query_id];
		if(request.query == query && request["graph_uri"] == this.wrapperHandler.graph_uri && request["database"] == this.wrapperHandler.database ){
			request.callbacks.push(callback);
			return;
		}
	}
	//create new request
	var id = this.query_id++;
	this.running_requests[id] = new Request(this,id,query,callback);
}
/***********************
 * remove all requests from running_requests
 * input:
 * 	- none
 * output:
 *  - none
 ***********************/
ApiHandler.prototype.removeAll = function() {
	for (request_id in this.running_requests){
		this.remove(request_id);
	} 
}
/***********************
 * remove one request from running_requests
 * input:
 * 	- (int) request id
 * output:
 *  - none
 ***********************/
ApiHandler.prototype.remove = function(request_id) {
	var running_request = this.running_requests[request_id];
	delete this.running_requests[request_id];
}
/*----------------------------------------------------
 * request
 * send request to server and save the request data
 * input:
 * 	- (object type apihandler) my apihandler
 *  - (int) id of current request
 *  - (string) sparql query to send
 *  - (function) return data to function
 ----------------------------------------------------*/
function Request(apiHandler,id,query,callback) {
	this.try_to_send                = 0;
	this.id                         = id;
	this.receivedData 				= false;
	this.apiHandler     			= apiHandler;
	this.query 						= query;
	this.default_graph_uri 			= apiHandler.wrapperHandler.graph_uri;
	this.database 					= apiHandler.wrapperHandler.database;
	//create array for callback functions
	this.callbacks                  = [callback]; 
	//save ajax request 
	this.xhr                        = null ;
	//setup the request
	this.setup();
}
/***********************
 * setup the request for sending to server
 * input:
 * 	- none
 * output:
 *  - none
 ***********************/
Request.prototype.setup = function() {
	this.try_to_send++;
	var sendData = {};
	sendData["default-graph-uri"] 	= this.default_graph_uri;
	sendData["query"] 				= this.query;
	sendData["format"] 				= this.apiHandler.result_format; 
	var request_settings = {
		 method		: this.apiHandler.method,
		 dataType	: this.apiHandler.dataType,
		 url		: this.database,
		 cache 		: this.apiHandler.systemCache ,
		 data 		: sendData
	}
	var self = this;
	this.xhr = $.ajax( request_settings)
	  .done(function(data) {
	   	 self.done(data);
	  })
	  .fail(function() {
	     self.fail();
	  });
}
/***********************
 * request done - send data to callbacks
 * input:
 * 	- (object type json) data from  server
 * output:
 *  - none
 ***********************/
Request.prototype.done = function(data) {
	if(this.receivedData) return;
	this.receivedData 	= true;
	this.xhr 			= null;
	var result 			= data.results.bindings;
	//send data to callbacks
	for(index in this.callbacks){
		this.callbacks[index](result);
	}
	this.apiHandler.remove(this.id);
}
/***********************
 * request fail - try again if you can
 * input:
 * 	- none
 * output:
 *  - none
 ***********************/
Request.prototype.fail = function() {
	this.xhr = null;
	if(this.try_to_send < this.apiHandler.max_tries){
		this.sendRequest();
	}else{
		//if you cant send again send empty value
		for(index in this.callbacks){
			this.callbacks[index]([]);
		}
		this.apiHandler.remove(this.id);
	}
}






