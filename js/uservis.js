/**
 * Created by Hendrik Strobelt (hendrik.strobelt.com) on 1/28/15.
 */
/**
 * Created by Hendrik Strobelt (hendrik.strobelt.com) on 1/28/15.
 */
/*
 *
 * ======================================================
 * We follow the vis template of init - wrangle - update
 * ======================================================
 *
 * */
/**
 * AgeVis object for HW3 of CS171
 * @param _parentElement -- the HTML or SVG element (D3 node) to which to attach the vis
 * @param _data -- the data array
 * @param _metaData -- the meta-data / data description object
 * @constructor
 */

 var agelabels = ["16-25", "26-35", "36-45", "46-55", "56-65", "66-75"]
 var classes = ["female", "male", "female", "male", "female", "male", "female", "male", "female", "male", "female", "male"]

UserVis = function(_parentElement, _data, _eventHandler) {

  
    this.parentElement = _parentElement;
    this.data = _data;
    this.eventHandler = _eventHandler;

    this.displayData = [];
    // this.displayData = _data;

    this.margin = {
            top: 100,
            right: 100,
            bottom: 100,
            left: 100
        },
  
    this.width = 500
    this.contentWidth = 450

    this.height = 480 - this.margin.top - this.margin.bottom;
    

    this.initVis();
}


/**
 * Method that sets up the SVG and the variables
 */



UserVis.prototype.initVis = function() {

    var that = this;


      var filter = function() {
            return true;
        }



 var stationfilter = function() {
            return true;
        }

        this.wrangleData(filter, stationfilter);
        
    //TODO: construct or select SVG
    this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .attr("class", "addborder")

        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        //  .attr("stroke", "black")
        // .attr("stroke-width", 3)
 


    // d3.selectAll("#uservis")
        // .attr("stroke", "black")
        // .attr("stroke-width", 3)
 
    this.x = d3.scale.ordinal()
        .rangeBands([0, this.width], .6)
        .domain(d3.range(0, 6))

     this.xAxis = d3.svg.axis()
        .scale(this.x)

    this.y = d3.scale.linear()
        .range([this.height, 0]);


    this.yAxis = d3.svg.axis()
        .scale(this.y)
        .orient("left");

    this.z = d3.scale.linear()
        .range([0, this.height]);


   

    this.svg.append("g")
        .attr("class", "xAxis axis")
        .attr("transform", "translate(0," + this.height + ")")
        .call(this.xAxis)
        .selectAll("text")
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start")
        .text(function(d, i) {
            return agelabels[i];
        })
        .style("font-size", "20px")



    this.y.domain([0, d3.max(this.displayData)]);
    this.yAxis.scale(this.y);



    this.svg.append("g")
        .attr("class", "yAxis axis")
        .attr("transform", "translate(0," + 0 + ")")
        .call(this.yAxis)
        .selectAll("text")

    this.svg.append("g").attr("class", "yAxis axis")
   

    this.updateVis();
}


/**
 * Method to wrangle the data. In this case it takes an options object
 * @param _filterFunction - a function that filters data or "null" if none
 */
UserVis.prototype.wrangleData = function(_filterFunction, _stationfilter) {

this.displayData = this.filterAndAggregate(_filterFunction, _stationfilter)



}



/**
 * the drawing function - should use the D3 selection, enter, exit
 */
UserVis.prototype.updateVis = function() {

    var that = this;

     this.y.domain(d3.extent(this.displayData, function(d) {
        return d;
    }))


    this.x.domain([0, this.displayData.length])
    this.svg.select(".yAxis")
        .call(that.yAxis)


    var hover = this.svg.selectAll(".bars")
        .data(this.displayData, function(d) {

            return d;
        });

    var hover_enter = hover.enter().append("g");


    hover_enter.append("rect")
    

    // create hover element
    hover
        .attr("id", function(d, i) {
            return classes[i]
        })
        .attr("transform", function(d, i) {
            return "translate(" + ((that.contentWidth/12) * (i) + (Math.floor(i / 2) * (that.width - that.contentWidth)/5)) + ", 0)";
        })
        .style("fill", function(d, i) {
            if(i%2 == 0 ){
                return "HotPink"
            }
            else{
                return "LightSlateGray"
            }
            
        })
        .attr("class", function(d, i) {
            return "bars hover " + classes[i] + ""
        })
    .on("mouseover", function(d) {
       
        d3.selectAll(".hover")
            .style("opacity", function(k) {
                return .1;
            })
        d3.selectAll('.' + this.id).style("opacity", 1)
    })
    .on("mouseout", function(d) {
        d3.selectAll(".hover")
            .style("opacity", function(k) {
                return 1;
            })
    })

    hover.exit().remove();

       
    

    hover.selectAll("rect")
        .attr("y", function(d) {
           
            return that.y(d)
        })

        .attr("height", function(d) {
            return that.height - that.y(d) 
        })
        .attr("z-index", 100000)



   
  
    hover.selectAll("rect")
      .attr("width", this.contentWidth / (12))
          .attr("transform", function(d, i) {
              return "translate(0, 0)";
          })


 

    var bar_colors = ["HotPink", "LightSlateGray"]
    var bar_labels = ["Females", "Males"]

    var legendRectSize = 18;
    var legendSpacing = 4;

    var legend = this.svg.selectAll('.legend')
        .data(bar_colors)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing ;
            var offset = height;
            var horz = 10+ legendRectSize;
            var vert = i * height + offset - 10;
            return 'translate(' + horz + ',' + vert + ')';
        })
        .attr("id", function(d, i) {
            return classes[i];
        })
        .on("mouseover", function(d) {
           
            d3.selectAll(".hover")
                .style("opacity", function(k) {
                    return .1;
                })
            d3.selectAll('.' + this.id).style("opacity", 1)
    
        })
        .on("mouseout", function(d) {
            d3.selectAll(".hover")
                .style("opacity", function(k) {
                    return 1;
                })
        })

   
    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d, i) {
            return bar_labels[i];
        })
        .attr("class", function(d, i) {
            return "hover " + classes[i] + ""
        })

   legend.append('rect')
          .attr('width', legendRectSize)
          .attr('height', legendRectSize)
          .style('fill', function(d, i) {
              return bar_colors[i];
          })
           .attr("class", function(d, i) {
            return "hover " + classes[i] + ""
        })



}




/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
UserVis.prototype.onSelectionChange = function(selection) {
// TODO: call wrangle function
    var that =this
    if (!selection.min_time || !selection.max_time)
    {
        selection.min_time = 0;
        selection.max_time = 24;
    }

    that.timeEnd = selection.max_time;
    that.timeStart = selection.min_time;
   
    var f = function(d) {

        return d >= Math.round(that.timeStart) && d <= Math.round(that.timeEnd)
    }

    var station_filter = function(d) {

        return d == selected_station
    }

this.wrangleData(f, station_filter)
    this.updateVis();


}

UserVis.prototype.onStationChanged = function(selection, d) {
 var that = this;


                 var filt = function(d) {
                    if (that.timeStart == null || that.timeEnd == null)
                    {
                        that.timeStart = 0
                        that.timeEnd = 24
                    }
        return d >= Math.round(that.timeStart) && d <= Math.round(that.timeEnd)
    }

     var station_filter = function(d) {

        return d == selected_station
    }

this.wrangleData(filt, station_filter)
this.updateVis();

   

}


/*
 *
 * ==================================
 * From here on only HELPER functions
 * ==================================
 *
 * */


UserVis.prototype.doesLabelFit = function(datum, label) {
    var pixel_per_character = 6; // obviously a (rough) approximation
    return datum.prios.length * pixel_per_character < this.x(datum.count);
}

/**
 * The aggregate function that creates the counts for each age for a given filter.
 * @param _filter - A filter can be, e.g.,  a function that is only true for data of a given time range
 * @returns {Array|*}
 */

UserVis.prototype.onCheckboxChanged = function(_filterFunction) {
var that = this
 that.displaydata = []
   
                var filt = function(d) {
                    if (that.timeStart == null || that.timeEnd == null)
                    {
                        that.timeStart = 0
                        that.timeEnd = 24
                    }
        return d >= Math.round(that.timeStart) && d <= Math.round(that.timeEnd)
    }

     var station_filter = function(d) {
        if (selected_station == 0)
        {
            return true;
        }

        return d == selected_station
    }
             this.wrangleData(filt, station_filter)

           
            this.updateVis();

        }


UserVis.prototype.filterAndAggregate = function(_filter, _stationfilter) {

   var that = this;
        
        var filter = function() {
            return true;
        }
        if (_filter != null) {
            filter = _filter;
        }



 var station_filter = function() {
            return true;
        }

        if (station_filter != null && selected_station != 0) {
            station_filter = _stationfilter;
        }

 

//sort data into appropriate age and gender groups
if (d3.select("#weekday").property("checked") == true) {
        
        var male16_35 = 0;
        var male26_35 = 0;
        var male36_45 = 0;
        var male46_55 = 0;
        var male56_65 = 0;
        var male66_75 = 0;

         var female16_35 = 0;
        var female26_35 = 0;
        var female36_45 = 0;
        var female46_55 = 0;
        var female56_65 = 0;
        var female66_75 = 0;

        
                for (j = 0; j < intervals_keys.length; j++) {
                    
                    this.data.forEach(function(d) {

                    for (i = 0; i < stations.length; i++) {
                             if (d.time == intervals_keys[j])
                                {
                                    if (filter(d.time))
                                    {
                                        
                                    d.stationdata.forEach(function (k) {
                                        if (station_filter(k.station))
                                        {
                                            
                                       male16_35 += k["16-25"].weekday.male
                                    female16_35 += k["16-25"].weekday.female
                                      male26_35 += k["26-35"].weekday.male
                                    female26_35 += k["26-35"].weekday.female
                                    male36_45 += k["36-45"].weekday.male
                                    female36_45 += k["36-45"].weekday.female
                                      male46_55 += k["46-55"].weekday.male
                                    female46_55 += k["46-55"].weekday.female
                                      male56_65 += k["56-65"].weekday.male
                                    female56_65 += k["56-65"].weekday.female
                                      male66_75 += k["66-75"].weekday.male
                                    female66_75 += k["66-75"].weekday.female
                                }
                                        })

                                    
                                    
                                }
                            }
                        
                    }
                })
              

                }

            }

          if (d3.select("#weekend").property("checked") == true) {
       
        var male16_35 = 0;
        var male26_35 = 0;
        var male36_45 = 0;
        var male46_55 = 0;
        var male56_65 = 0;
        var male66_75 = 0;

         var female16_35 = 0;
        var female26_35 = 0;
        var female36_45 = 0;
        var female46_55 = 0;
        var female56_65 = 0;
        var female66_75 = 0;


        
                for (j = 0; j < intervals_keys.length; j++) {
                    
                    this.data.forEach(function(d) {

                    for (i = 0; i < stations.length; i++) {
                             if (d.time == intervals_keys[j])
                                {
                                    if (filter(d.time))
                                    {
                                    d.stationdata.forEach(function (k) {
                                         if (station_filter(k.station))
                                        {
                                       male16_35 += k["16-25"].weekend.male
                                    female16_35 += k["16-25"].weekend.female
                                      male26_35 += k["26-35"].weekend.male
                                    female26_35 += k["26-35"].weekend.female
                                    male36_45 += k["36-45"].weekend.male
                                    female36_45 += k["36-45"].weekend.female
                                      male46_55 += k["46-55"].weekend.male
                                    female46_55 += k["46-55"].weekend.female
                                      male56_65 += k["56-65"].weekend.male
                                    female56_65 += k["56-65"].weekend.female
                                      male66_75 += k["66-75"].weekend.male
                                    female66_75 += k["66-75"].weekend.female

                                }
                                    })
                                    
                                }
                            }
                        
                    }
                })

                }
            }
              if ((d3.select("#weekend").property("checked") == true && d3.select("#weekday").property("checked") == true) || 
                (d3.select("#weekend").property("checked") == false && d3.select("#weekday").property("checked") == false)){


       var male16_35 = 0;
        var male26_35 = 0;
        var male36_45 = 0;
        var male46_55 = 0;
        var male56_65 = 0;
        var male66_75 = 0;

         var female16_35 = 0;
        var female26_35 = 0;
        var female36_45 = 0;
        var female46_55 = 0;
        var female56_65 = 0;
        var female66_75 = 0;


        
                for (j = 0; j < intervals_keys.length; j++) {
                    
                    // count = 0;
                    this.data.forEach(function(d) {

                    for (i = 0; i < stations.length; i++) {
                             if (d.time == intervals_keys[j])
                                {
                                    if (filter(d.time))
                                    {
                                    d.stationdata.forEach(function (k) {
                                         if (station_filter(k.station))
                                        {
                                       male16_35 += k["16-25"].weekend.male
                                       male16_35 += k["16-25"].weekday.male
                                    female16_35 += k["16-25"].weekend.female
                                     female16_35 += k["16-25"].weekday.female
                                      male26_35 += k["26-35"].weekend.male
                                       male26_35 += k["26-35"].weekday.male
                                    female26_35 += k["26-35"].weekend.female
                                       female26_35 += k["26-35"].weekday.female
                                    male36_45 += k["36-45"].weekend.male
                                     male36_45 += k["36-45"].weekday.male
                                    female36_45 += k["36-45"].weekend.female
                                       female36_45 += k["36-45"].weekday.female
                                      male46_55 += k["46-55"].weekend.male
                                        male46_55 += k["46-55"].weekday.male
                                    female46_55 += k["46-55"].weekend.female
                                     female46_55 += k["46-55"].weekday.female
                                      male56_65 += k["56-65"].weekend.male
                                      male56_65 += k["56-65"].weekday.male
                                    female56_65 += k["56-65"].weekend.female
                                      female56_65 += k["56-65"].weekday.female
                                      male66_75 += k["66-75"].weekend.male
                                         male66_75 += k["66-75"].weekday.male
                                    female66_75 += k["66-75"].weekend.female
                                      female66_75 += k["66-75"].weekday.female

}
                                    })
                                    
                                }
                            }
                        
                    }
                })

                }

            }
           
            var  res = [female16_35/31, male16_35/31, female26_35/31, male26_35/31, female36_45/31, male36_45/31, female46_55/31, male46_55/31, female56_65/31, male56_65/31, female66_75/31, male66_75/31]

            this.displayData = res
          
            return res;


}