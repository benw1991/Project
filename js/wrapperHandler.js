//set global wrapper on page ready
var wrapper;
//on page ready => finish load
$( document ).ready(function() {
	wrapper = new WrapperHandler();
	//on click example
	$("#getExample").on("click",function(event){
		wrapper.showExample();
	});
	//on click submit
	$("#submit").on("click",function(event){
		//dont refresh page
		event.preventDefault();
		wrapper.submitForm();
	});
});
/*----------------------------------------------------
 * wrapperHandler
 * This class wrapp all the other classes and all the system togther
 ----------------------------------------------------*/
function WrapperHandler (){
	//settings parameters 
	this.database  = "http://tdk3.csf.technion.ac.il:8890/sparql";
	this.graph_uri = "http://dbpedia.org";
	//create api
	this.api = new ApiHandler(this);
	//setup wrapper
	this.setup();
}
/***********************
 * here you setup the wrapper on create
 * input:
 * 	- none
 * output:
 *  - none
 ***********************/
WrapperHandler.prototype.setup = function() {
}
/***********************
 * show example and submit it
 * input:
 * 	- none
 * output:
 *  - none
 ***********************/
WrapperHandler.prototype.showExample = function() {
	$("#dataset").val("http://tdk3.csf.technion.ac.il:8890/sparql");
	$("#graph").val("http://dbpedia.org");
	$("#query").val("select distinct ?Concept where {[] a ?Concept} LIMIT 100");
	$("#submit").trigger("click");
}
/***********************
 * on submit form go to this function
 * input:
 * 	- none
 * output:
 *  - none
 ***********************/
WrapperHandler.prototype.submitForm = function() {
	this.database  = $("#dataset").val();
	this.graph_uri = $("#graph").val();
	//here is how you send a query to server ---------
	this.api.query($("#query").val(),function(data){
		//make json to string to put in textarea
		var stringJson = JSON.stringify(data);
		$("#response").val(stringJson);
	});
}



