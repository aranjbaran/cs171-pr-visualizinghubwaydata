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
 * PieVis object for HW3 of CS171
 * @param _parentElement -- the HTML or SVG element (D3 node) to which to attach the vis
 * @param _data -- the data array
 * @param _metaData -- the meta-data / data description object
 * @param _eventHandler -- the Eventhandling Object to emit data to (see Task 4)
 * @constructor
 */

 var color = ["YellowGreen", "OrangeRed"]

PieVis = function(_parentElement, _data, _eventHandler) {
    this.parentElement = _parentElement;
    this.data = _data;

    this.eventHandler = _eventHandler;

    this.displayData = [];
    this.displayData = _data;

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
PieVis.prototype.initVis = function() {

    var that = this; 

     var filter = function() {
            return true;
        }

 var stationfilter = function() {
            return true;
        }

    this.wrangleData(filter, stationfilter);

    this.updateVis();

}



/**
 * Method to wrangle the data. In this case it takes an options object
 */
PieVis.prototype.wrangleData = function(_filterFunction, station_filter) {

    this.displayData = this.filterAndAggregate(_filterFunction, station_filter)

}

PieVis.prototype.onStationChanged = function(d) {
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

PieVis.prototype.onCheckboxChanged = function(_filterFunction, stationfilter) {
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

/**
 * the drawing function - should use the D3 selection, enter, exit
 * @param _options -- only needed if different kinds of updates are needed
 */
PieVis.prototype.updateVis = function() {

    var that = this; 
    var pie = d3.layout.pie()

    pie(this.displayData)

    var outerRadius = 250 / 2;
    var innerRadius = 0;
    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    d3.selectAll(".pieBrushAvg").remove();

    var svg = this.parentElement
        .append("svg")
        .attr("class", "pieBrushAvg secondsvg")
        .attr("transform", "translate(" + 700 + ", " + 700 + ")")
         .attr("width", 600)
        .attr("height", 500)

    var arcs = svg.selectAll("g.arc")
        .data(pie(this.displayData))
        .enter()
        .append("g")
        .attr("class", function(d, i) {
            return "arc arc" + i
        })
        .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")")


    var secondsvg = d3.select(".secondsvg").append("text")
        .text("User Percentage")
        .attr("class", "text")
        .attr("transform", "translate(" + 80 + ", " + 275 + ")")
        .style("fill", "black")

    arcs.append("path")
        .attr("d", arc)

    arcs.attr("fill", function(d, i) {
        return color[i]
    })
      .attr("id", function(d, i) {
        return "arc" + i + ""
    })



    var spacing = 4.5;
    var legendrect = 17;
   

    var legend = svg.selectAll('.legend')
        .data(color)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
            var height = legendrect + spacing;
            var offset = height;
            var x = 17 * legendrect + 30;
            var y = i * height + offset;
            return 'translate(' + x + ',' + y + ')';
        })
        .attr("id", function(d, i) {
            return "arc" + i + ""
        })
        .attr("class", function(d, i) {
            return "arc arc" + i + ""
        })
        .on("mouseover", function(d) {
            d3.selectAll(".arc")
                .style("opacity", function(k) {
                    return .1;
                })
            d3.selectAll('.' + this.id).style("opacity", 1)
           
        })
    .on("mouseout", function(d) {
        d3.selectAll(".arc")
            .style("opacity", function(k) {
                return 1;

            })
    })

    var labels = ["Registered", "Casual"]

    legend.append('rect')
        .attr('width', legendrect)
        .attr('height', legendrect)
        .style('fill', function(d, i) {
            return color[i];
        })
        .style('stroke', color);

    legend.append('text')
        .attr('x', legendrect + spacing)
        .attr('y', legendrect - spacing)
        .text(function(d, i) {
            return labels[i];
        })
       
    this.svg = this.parentElement.select("svg");

     arcs
        .on("mouseover", function(d) {
            d3.selectAll(".arc")
                .style("opacity", function(k) {
                    return .1;
                })
            d3.selectAll('.' + this.id).style("opacity", 1)
        })

    .on("mouseout", function(d) {
            d3.selectAll(".arc")
                .style("opacity", function(k) {
                    return 1;

                })
        })

    var extent = d3.extent(that.displayData, function(d) {
        return d.time;
    })
    timeEnd= 00
    timeStart = 24

}
      


   

/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */

PieVis.prototype.onSelectionChange = function(selection) {

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


/*
 *
 * ==================================
 * From here on only HELPER functions
 * ==================================
 *
 * */



/**
 * The aggregate function that creates the counts for each age for a given filter.
 * @param _filter - A filter can be, e.g.,  a function that is only true for data of a given time range
 * @returns {Array|*}
 */


PieVis.prototype.filterAndAggregate = function(_filter, _stationfilter) {
   
var that = this;
        
        var filter = function() {
            return true;
        }
        if (_filter != null) {
            filter = _filter;
        }



 var stationfilter = function() {
            return true;
        }

            if (stationfilter != null && selected_station !=0) {
            stationfilter = _stationfilter;
        }

    var tripSummary ={male: 0,
female: 0,
casual: 0,
registered: 0};
var user_final= [0, 0]

if (d3.select("#weekday").property("checked") == true) {

        var registered = 0;
        var casual = 0;
         var res = []
        
                for (j = 0; j < intervals_keys.length; j++) {
                    
                    count = 0;
                    this.data.forEach(function(d) {

                    for (i = 0; i < stations.length; i++) {
                             if (d.time == intervals_keys[j])
                                {
                                    if (filter(d.time))
                                    {

                                    d.stationdata.forEach(function (k) {
                                         
                                        if (stationfilter(k.station))
                                        {

                                       registered += k.usertype.weekday.registered
                                       casual += k.usertype.weekday.casual
                                   }


                                    })
                                    
                                }
                            }
                        
                    }
                })

                user_final[0] = registered/(registered+casual)
                user_final[1] = casual/ (registered+casual); 
              


                }

            }

          if (d3.select("#weekend").property("checked") == true) {
       
        var registered = 0;
        var casual = 0;
         var res = []
        
                for (j = 0; j < intervals_keys.length; j++) {
                    
                    count = 0;
                    this.data.forEach(function(d) {

                    for (i = 0; i < stations.length; i++) {
                             if (d.time == intervals_keys[j])
                                {
                                    if (filter(d.time))
                                    {
                                    d.stationdata.forEach(function (k) {
                                         if (stationfilter(k.station))
                                         {

                                       registered += k.usertype.weekday.registered
                                       casual += k.usertype.weekday.casual

                                   }
                                    })
                                    
                                }
                            }
                        
                    }
                })
               user_final[0] = registered/(registered+casual)
                user_final[1] = casual/ (registered+casual); 

                }
            }
              if ((d3.select("#weekend").property("checked") == true && d3.select("#weekday").property("checked") == true) || 
                (d3.select("#weekend").property("checked") == false && d3.select("#weekday").property("checked") == false)){

        var registered = 0;
        var casual = 0;
         var res = []
        
                for (j = 0; j < intervals_keys.length; j++) {
                    
                    count = 0;
                    this.data.forEach(function(d) {


                    for (i = 0; i < stations.length; i++) {
                             if (d.time == intervals_keys[j])
                                {
                                  
                                    if (filter(d.time))
                                    {

                                    d.stationdata.forEach(function (k) {
                                        
                                         if (stationfilter(k.station))
                                         {

                                       registered += k.usertype.weekday.registered
                                       registered +=k.usertype.weekend.registered
                                       casual += k.usertype.weekday.casual
                                       casual += k.usertype.weekend.casual
                                   }


                                    })
                                    
                                }
                            }
                        
                    }
                })
              user_final[0] = registered/(registered+casual)
                user_final[1] = casual/ (registered+casual); 
               

                }

            }
            var res = user_final
            that.displayData = res
            return res;
}
