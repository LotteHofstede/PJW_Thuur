var data = [
	{"PARTY_ID" : "123", "BALANCE_AMOUNT" : "200", "BALANCE_DATE_ID" : "20140708"},
	{"PARTY_ID" : "123", "BALANCE_AMOUNT" : "150", "BALANCE_DATE_ID" : "20140710"},
	{"PARTY_ID" : "123", "BALANCE_AMOUNT" : "32", "BALANCE_DATE_ID" : "20140719"},
	{"PARTY_ID" : "123", "BALANCE_AMOUNT" : "200", "BALANCE_DATE_ID" : "20140812"},
	{"PARTY_ID" : "123", "BALANCE_AMOUNT" : "300", "BALANCE_DATE_ID" : "20140913"},
	{"PARTY_ID" : "123", "BALANCE_AMOUNT" : "500", "BALANCE_DATE_ID" : "20140925"}
];
var width = "200";
var height = "100";

var format = d3.time.format("%Y%m%d");

var xTimeScale = d3.time.scale()
    .domain([d3.min(data, function(d) { return format.parse(d.BALANCE_DATE_ID); }), d3.max(data, function(d) { return format.parse(d.BALANCE_DATE_ID) })])
    .range([0, width]);

var yScale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.BALANCE_AMOUNT })])
    .range([height, 0]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);


var lineFunction = d3.svg.line()
                         .x(function(d) { return  xTimeScale(format.parse(d.BALANCE_DATE_ID)); })
                         .y(function(d) { return  yScale(d.BALANCE_AMOUNT);})
                         .interpolate("step-after");

svg.append("path").attr("d", lineFunction(data));
