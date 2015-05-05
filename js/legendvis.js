
LegendVis = function(_parentElement) {
    
    this.parentElement = _parentElement;
    

    this.margin = {
            top: 100,
            right: 100,
            bottom: 100,
            left: 100
        },
  
    this.width = 200
     

    this.height = 400 - this.margin.top - this.margin.bottom;


    this.initVis();
}


/**
 * Method that sets up the SVG and the variables
 */
LegendVis.prototype.initVis = function() {

    var that = this; 
    var spacing = 6.5;
    var maplegendrect = 17;

var color = ["#FFFFFF", "#FFB5B5", "#FF5959", "#CF3A3A", "#B80000"]

var ids = ["FFFFFF", "FFB5B5", "FF5959", "CF3A3A", "B80000"]
        var maplabels = ["less than 20% full", "20-40% full", "40-60% full", "60-80% full", "80-100% full"]

  

this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .style("padding", "40px 0px 20px 5px")
        .append("g")
        .attr("id", "legendhere")


var maplegend = this.svg.selectAll('.maplegend')
        .data(color)
        .enter()
        .append('g')
        .attr('class', 'maplegend')
        .attr('transform', function(d, i) {
            var height = maplegendrect + spacing;
            var offset = height;
            var x = 17 * maplegendrect + 30;
            var y = i * height + offset;
            return 'translate(' + x + ',' + y + ')';
        })

        var maplabels = ["less than 20% full", "20-40% full", "40-60% full", "60-80% full", "80-100% full"]

 maplegend.append('text')

        .text(function(d, i) {
            return maplabels[i];
        })
        .attr("class", function(d, i) {
            return "circle " +ids[i];
        })
        .attr("id", function(d, i) {
            return ids[i] })
        .on("mouseover", function(d) {
           
            d3.selectAll(".circle")
                .style("opacity", function(k) {
                    return .1;
                })
            d3.selectAll('.' + this.id).style("opacity", 1)
    
        })
        .on("mouseout", function(d) {
            d3.selectAll(".circle")
                .style("opacity", function(k) {
                    return 1;
                })
        })

    maplegend.append('rect')
        .attr('width', maplegendrect)
        .attr('height', maplegendrect)
        .style('fill', function(d, i) {
            return color[i];
        })
        .style('stroke', "black")
        .attr("class",  function(d, i) {
            return "circle " +ids[i];
        })
        .attr("id", function(d, i) {
            return ids[i] })
      .attr('transform', function(d, i) {
            var height = maplegendrect + spacing;
            var offset = height;
            var x = -20;
            var y = -maplegendrect + 5;
            return 'translate(' + x + ',' + y + ')';
        })
      .on("mouseover", function(d) {
           
            d3.selectAll(".circle")
                .style("opacity", function(k) {
                    return .1;
                })
            d3.selectAll('.' + this.id).style("opacity", 1)
    
        })
        .on("mouseout", function(d) {
            d3.selectAll(".circle")
                .style("opacity", function(k) {
                    return 1;
                })
        })


}


