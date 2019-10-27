
//Helping material used 
//Read D3 Tips and Tricks v4.x. (n.d.). Retrieved from https://leanpub.com/d3-t-and-t-v4/read.
// set the dimensions and margins of the graph
  var graphMargin = {top:30, bottom:30, right:30, left:100}
{
    width = 800 - graphMargin.left - graphMargin.right;
    height = 300 - graphMargin.top - graphMargin.bottom;
}
 // parse the date/time and get Date in date time format and price as a number
 var parseDate = d3.timeParse("%Y-%m-%d");
 //reading csv from github
d3.csv('https://raw.githubusercontent.com/IsmailShahzadMirza/Datopian_Challenge/master/Henry_Hub_Gas_Prices_Daily.csv')
.row(function(d){return{date:parseDate(d.Date),price:Number(d.Price)};})
.get(function(error,data)
{
    //finding min,max of date and price
    var maxDate = d3.max(data,function(d){ return d.date;});
    var minDate = d3.min(data,function(d){ return d.date;});
    var maxPrice = d3.max(data,function(d){ return d.price;});
    //setting ranges by giving minDate and maxDate as a domain and using width
    // and height as range for scaled values
    var y = d3.scaleLinear()
    .domain([0,maxPrice])
    .range([height,0]);

    var x = d3.scaleTime()
    .domain([minDate,maxDate])
    .range([0,width]);

    // define the line
    var linegenerator = d3.line()
    .x(function(d) { return x(d.date); })  
    .y(function(d) { return y(d.price); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")   
    .attr("width", width + graphMargin.left + graphMargin.right  )
    .attr("height", height + graphMargin.top + graphMargin.bottom +20 )
  .append("g")
  .attr("transform",
      "translate(" + graphMargin.left + "," + graphMargin.top + ")");

  // Add the linegenerator path.
  svg.append("path")
      .data([data])
      .attr("class", "lines")
      .attr("d", linegenerator);

  // Add the x Axis
  svg.append("g")
   //   .attr("transform", "translate(0,280)")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // text label for the x axis
  svg.append("text")              
      .attr("transform",
            "translate(" + (width/2) + " ," + (height + graphMargin.top + 5) + ")")
            .style("text-anchor", "middle")
      .text("Date");
  // Add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
  // text label for the y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 50)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Price");      

});

