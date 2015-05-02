   


   


LegendVis = function(_parentElement) {
    // console.log(_data)
    this.parentElement = _parentElement;
    // // this.data = _data;
    // // // console.log(this.data)
    // // // this.metaData = _metaData;
    // // this.eventHandler = _eventHandler;

    // this.displayData = [];
    // this.displayData = _data;

    this.margin = {
            top: 100,
            right: 100,
            bottom: 100,
            left: 100
        },
  
    this.width = 1500
     

    this.height = 400 - this.margin.top - this.margin.bottom;


    this.initVis();
}


/**
 * Method that sets up the SVG and the variables
 */
LegendVis.prototype.initVis = function() {
    // console.log("gender", gender_final)

    var that = this; 


    var spacing = 6.5;
    var maplegendrect = 17;

var color = ["#FFFFFF", "#FFB5B5", "#FF5959", "#CF3A3A", "#B80000"]

        var maplabels = ["less than 20% full", "20-40% full", "40-60% full", "60-80% full", "80-100% full"]

  

this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .style("padding", "40px 0px 20px 5px")
        .append("g")

 // var svg = d3.selectAll("#maplegend")
 //        .append("svg")
 //        .attr("class", "pieBrushAvg secondsvg")
 //        .attr("transform", "translate(" + 700 + ", " + 700 + ")")
 //         .attr("width", 600)
 //        .attr("height", 500)


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


 // .attr('x', maplegendrect + spacing)
 //        .attr('y', function (d, i) {
 //            return i*5
 //        })
        

        var maplabels = ["less than 20% full", "20-40% full", "40-60% full", "60-80% full", "80-100% full"]

 maplegend.append('text')

        .text(function(d, i) {
            return maplabels[i];
        })
    maplegend.append('rect')
        .attr('width', maplegendrect)
        .attr('height', maplegendrect)
        .style('fill', function(d, i) {
            return color[i];
        })
        .style('stroke', "black")
        .attr("class", "a;sldkfj")
      .attr('transform', function(d, i) {
            var height = maplegendrect + spacing;
            var offset = height;
            var x = -20;
            var y = -maplegendrect + 5;
            return 'translate(' + x + ',' + y + ')';
        })



}


