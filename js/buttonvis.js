
ButtonVis = function(_parentElement) {
    
    this.parentElement = _parentElement;
    

    this.margin = {
            top: 100,
            right: 100,
            bottom: 100,
            left: 100
        },
  
    this.width = 40
     

    this.height = 20


    this.initVis();
}


/**
 * Method that sets up the SVG and the variables
 */
ButtonVis.prototype.initVis = function() {

    var that = this; 
//     var spacing = 6.5;
//     var maplegendrect = 17;

// var color = ["#FFFFFF", "#FFB5B5", "#FF5959", "#CF3A3A", "#B80000"]

// var ids = ["FFFFFF", "FFB5B5", "FF5959", "CF3A3A", "B80000"]
//         var maplabels = ["less than 20% full", "20-40% full", "40-60% full", "60-80% full", "80-100% full"]

  

this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .style("padding", "40px 0px 20px 5px")
        .append("g")




}


