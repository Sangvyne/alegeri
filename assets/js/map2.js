var s;
var p;

var objProp = [];
var tmpI = 0;
var color = [];

function map(){

    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 128])
        .on("zoom", move);

    var mapDiv = $("#map");

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = mapDiv.width() - margin.right - margin.left,
        height = mapDiv.height() - margin.top - margin.bottom;

    //initialize color scale
    //...
    
    //initialize tooltip
    //...

    var projection = d3.geo.mercator()
        .center([10, 66.5 ])
        .scale(1000);

    var svg = d3.select("#map").append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .call(zoom);

    var path = d3.geo.path()
        .projection(projection);

    g = svg.append("g");

    d3.csv("/alegeri/assets/data/colors.csv", function(error, data){
        temp = data[0];
        var tmpIndex = 0;
        for(var prop in temp){
            color[tmpIndex++] = temp[prop];
        }
        color.shift();
    });

    //d3.csv("/alegeri/assets/data/elections-unicode-ordered.csv", function(error, data) {

	d3.csv("/alegeri/assets/data/Romania2012.csv", function(error, data) {
        self.data2 = data;
            //console.log(self.data2);
            var temp = data[0];
            for(var prop in temp){
                objProp[tmpI++] = prop;
            }
            //console.log(objProp);
        }
        );
    var municipalities;
    // load data and draw the map
    d3.json("/alegeri/assets/data/Romania.topojson", function(error, country) {
        municipalities = topojson.feature(country, country.objects.counties).features;
        for(var temp in municipalities)
            temp["name"] = temp["woe_name"];
        console.log(municipalities);
		
		p = new PieShit("", objProp,color);
		d3.select("#piechart")
			.style("visibility","hidden");
		draw(municipalities,self.data2,12); 
    });	
	
	d3.select("#dropdown").on("change", function() {
        var selection = parseInt(this.value);
        draw(municipalities, self.data2, selection);
        });
	
    function draw(municipalities,data,selected)
    {
        var municipality = g.selectAll(".municipality").data(municipalities);

        municipality.enter().insert("path")
            .attr("class", "municipality")
            .attr("d", path)
            .attr("title", function(d) { return d.properties.name; })
			.on("click",function(d){
                var tempName;
                if(d.properties.woe_name)
                    tempName = d.properties.woe_name;
                else
                    tempName = d.properties.name;
				name = d.properties.name;
				d3.select("#piechart")
						.style("visibility","visible");
				p.changeMethod(tempName);
				d3.select("#map").selectAll("path")
					.each(function(d){
						if(d.properties.name == tempName){
							d3.select(this)
								.style("stroke-width","2px")
                                .style("stroke","#888888");
						}
						else{
							d3.select(this)
								.style("stroke","#888888")
								.style("stroke-width","0.3px");
						}
					});
				
			})
            .append("svg:title")
			.text(function(d){
                var tempName;
                if(d.properties.woe_name)
                    tempName = d.properties.woe_name;
                else
                    tempName = d.properties.name;
                return tempName
            });
		
    }
    
    //zoom and panning method
    function move() {

        var t = d3.event.translate;
        var s = d3.event.scale;

        zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");

    }
    
    //method for selecting features of other components
    function selFeature(value){
        //...
    }
}

	