function PieShit(name, objProp,color){
	var width = 600,
    height = 600,
    radius = Math.min(width, height) / 2;

	//console.log(properties);
	//var color = d3.scale.category20c();

	//var color = ['#FF0000', '#0000FF', '#80AA4E', '#50A7F7', '#39944A', '#FFFF00', '#B00000', '#2D338E', '#888888'];
	//console.log(color);
	var pie = d3.layout.pie()
		.value(function(d) { return d.percentage; })
		.sort(null);

	var arc = d3.svg.arc()
		.innerRadius(radius - 275)
		.outerRadius(radius - 150);

	var text = d3.select("#piechart")
					.append("svg:svg")
					.attr("width",width)
					.attr("height",100)
					.attr("transform","translate("+(width/2)+","+50+")")
					.append("svg:text")
					.attr("text-anchor","middle")
					.attr("font-size","30px")
					.text("");
		
	var svg = d3.select("#piechart").append("svg")
		.attr("width", width)
		.attr("height", 400)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + 200 + ")");
		
	var path;
	var pieText;
	
	var legend = d3.select("#piechart")
					.append("svg:svg")
					.attr("width",width)
					.attr("height",300)
					.attr("class","legend")
					.append("g");

	//d3.csv("/alegeri/assets/data/elections-unicode-ordered.csv", function(data) {

    d3.csv("/alegeri/assets/data/Romania2012.csv", function(data) {

        self.data = data;
		//console.log(data);
		//console.log(self.data);
		pieData = selectMunicipality(name);
		//console.log(pieData);
		
		draw(pieData);
		legend.selectAll('rect')
			.data(pieData)
			.enter()
			.append("rect")
			.attr("x",(width/3+width/15))
			.attr("y", function(d, i){return i*30;})
			.attr("width",15)
			.attr("height",15)
			.style("fill",function(d,i){
				return color[i];
			})
			
		legend.selectAll('text')
			.data(pieData)
			.enter()
			.append("text")
			.attr("x",(width/3+width/10)+20)
			.attr("y", function(d,i){
				return i*30+10;
			})
			.text(function(d,i){
				return d.party;
			})
	});
	
	function draw(pieData){
		path = svg.datum(pieData).selectAll("path")
			.data(pie)
			.enter().append("path")
			.attr("fill", function(d, i) { return color[i]; })
			.style("stroke-width","2px")
			.style("stroke","#FFFFFF")
			.attr("d", arc)
			.each(function(d) { this._current = d; }); // store the initial angles
		//console.log(pieData);
		pieText = svg.datum(pieData).selectAll("text")
				.data(pie)
				.enter()
				.append("text")
				.attr("transform", function(d,i) {                    //set the label's origin to the center of the arc
													//we have to make sure to set these before calling arc.centroid
					d.innerRadius = 450;
					d.outerRadius = 450;
					var rotation;
					var dir = new Array(2);
					dir[0] = Math.cos((d.startAngle+d.endAngle)/2);
					dir[1] = Math.sin((d.startAngle+d.endAngle)/2);
					if((Math.degrees((d.startAngle+d.endAngle)/2) > 180)){
						rotation = Math.degrees((d.startAngle+d.endAngle)/2) + 90;
					}
					else{
						rotation = Math.degrees((d.startAngle+d.endAngle)/2) - 90;				
					}
				
					return "translate(" + [arc.centroid(d)[0], arc.centroid(d)[1]] + ") rotate(" + rotation + " " + 0 + " " + 0 + ")";        //this gives us a pair of coordinates like [50, 50]
				})
				/*.attr("transform", function(d){
					d.innerRadius = 0;
					d.outerRadius = radius;
					//console.log(arc.centroid(d));
					return "translate(" + arc.centroid(d) + ")";
				})*/
				.attr("font-weight","bold")
				.attr("font-size","15px")
				.attr("fill","#000000")
				.attr("text-anchor", function(d) {
					var anchor = "";
					if(Math.degrees((d.startAngle+d.endAngle)/2) < 180)
						anchor = "start";
					else
						anchor = "end";
					return anchor;
				})
				//.attr("text-anchor", "start")
				.text(function(d){
					//console.log(d);
					if(d.data.percentage<0.5) return "";
					return d.data.percentage;
				})
	}
	function change(name) {
		pieData = selectMunicipality(name);
		//console.log(pieData);
		path.data(pie(pieData));
		path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
		text.text(name);
		pieText.data(pie(pieData));
		
		pieText.transition().duration(750)
			.text(function(d){
					//console.log(d);
					if(d.data.percentage<0.5) return "";
					return d.data.percentage;
				})
			.attr("transform", function(d,i) {                    //set the label's origin to the center of the arc
													//we have to make sure to set these before calling arc.centroid
					d.innerRadius = 450;
					d.outerRadius = 450;
					var rotation;
					var dir = new Array(2);
					var angle = (d.startAngle+d.endAngle);
					angle = Math.degrees(angle);
					
					dir[0] = Math.cos((d.startAngle+d.endAngle)/2);
					dir[1] = Math.sin((d.startAngle+d.endAngle)/2);
					//console.log(d);
					//console.log(angle);
					//console.log(dir);
					if((Math.degrees((d.startAngle+d.endAngle)/2) > 180)){
						rotation = Math.degrees((d.startAngle+d.endAngle)/2) +90;
					}
					else{
						rotation = Math.degrees((d.startAngle+d.endAngle)/2) -90;				
					}
					var translateX = arc.centroid(d)[0] * 2;
					var translateY = arc.centroid(d)[1] * 2;
					
					//console.log(translateX);
					//console.log(translateY);
					return "translate(" + [translateX, translateY] + ") rotate(" + rotation + " " + 0 + " " + 0 + ")";        //this gives us a pair of coordinates like [50, 50]
				})
				.attr("text-anchor","middle");

	}
	
	function arcTween(a) {
		var i = d3.interpolate(this._current, a);
		//console.log(i);
		this._current = i(0);
		return function(t) {
			return arc(i(t));
		};
	}
	
	this.muniSelect = selectMunicipality;
	function selectMunicipality(name){
		var row = 0;
		console.log(name);
		for(i=0; i<self.data.length; i++)
		{
			//console.log(self.data[i]["region"]);
			if(data[i]["region"] == name)
			{
				row = i;
				break;
			}
		}
		//console.log(row);
		//console.log(data[row]);
		pieData = [];

		for(var index = 0; index < objProp.length; index++){
				pieData[index-1] = {"region":name, "party":objProp[index], "percentage":parseFloat(self.data[row][objProp[index]])};
		}

		//console.log(pieData);
		return pieData;
	}
	
	Math.degrees = function(rad)
	{
		return rad*(180/Math.PI);
	}
	
	absoluteValue = function(value){
		if(value>=0)
			return value;
		else
			return value*(-1);
	}
	
	this.changeMethod = change
}
