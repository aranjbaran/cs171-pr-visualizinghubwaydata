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
 * MapVis object for HW3 of CS171
 * @param _parentElement -- the HTML or SVG element (D3 node) to which to attach the vis
 * @param _data -- the data array
 * @param _metaData -- the meta-data / data description object
 * @param _eventHandler -- the Eventhandling Object to emit data to (see Task 4)
 * @constructor
 */
var empty = true;
var margin = 75


MapVis = function(_whole, _parentElement, _data, _tripdata, _capacitydata, _eventHandler) {
    circle_padding = 10
    this.parentElement = _parentElement;
    this.whole = _whole
    this.data = _data;
    this.capacitydata = _capacitydata;
    this.tripdata = _tripdata
    this.eventHandler = _eventHandler;
    this.displayData = [];


    this.margin = {
            top: 100,
            right: 20,
            bottom: 100,
            left: 100
        }

 this.wrangleData(null)

        this.initVis();
       
}


/**
 * Method that sets up the SVG and the variables
 */
MapVis.prototype.initVis = function() {


    var that = this;

    var map = new google.maps.Map(d3.select("#mapVis").node(), {
        zoom: 15,
        center: new google.maps.LatLng(42.358431, -71.059773),
        mapTypeId: google.maps.MapTypeId.TERRAIN,
    });




    var overlay = new google.maps.OverlayView();

    overlay.onAdd = function() {
        
        var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
            .attr("class", "stations");

        overlay.draw = function() {
            var projection = this.getProjection(),
                padding = 50;

            var marker = layer.selectAll("svg")
                .data(that.data["objects"])
                .each(transform) 
                .enter().append("svg:svg")
                  .attr("width", 1000)
                  .attr("height", 1000)
                .each(transform)
                .attr("class", "marker")
                 .attr("id", function(d) {
                    return "svg-" +d.id;
                })
             

            marker.append("circle")
                .attr("cx", padding)
                .attr("cy", padding)
                .attr("stroke", "black")
                   .attr("id", function(d) {
                    return "station-" +d.id;
                })

       that.displayData.forEach(function (k){

        if (d3.select("#totaldepartures").property("checked") == true) {
            console.log("helpme")



                  d3.select("#station-"+k.station).attr("r", function(d){
                    return Math.sqrt(k.departures/5 +circle_padding)
                  })
              }

if (d3.select("#capacity").property("checked") == true) {
console.log("arrivals")
               d3.select("#station-"+k.station).attr("r", function(d){
                    return circle_padding + Math.pow(k.capacity, 2)/60
                  })

}

})


  that.displayData.forEach(function (k){

          d3.select("#station-"+k.station).attr("fill", function(d){
           
            if(k.percent_full <= .2){
                return "#FFFFFF"
            }
            else if(k.percent_full > .2 && k.percent_full<=.4){
               
                return "#FFB5B5"
            }
            else if(k.percent_full > .4 && k.percent_full<=.6){
              
                return "#FF5959"
            }
            else if(k.percent_full > .6 && k.percent_full<=.8){
                
                return "#CF3A3A"
            }
            else {
                return "#B80000"
            }

            
          })


        })


 that.displayData.forEach(function (k){

          d3.select("#station-"+k.station).attr("class", function(d){
            
            if(k.percent_full <= .2){
              
                return "FFFFFF circle"
            }
            else if(k.percent_full > .2 && k.percent_full<=.4){
                
                return "FFB5B5 circle"
            }
            else if(k.percent_full > .4 && k.percent_full<=.6){
                
                return "FF5959 circle"
            }
            else if(k.percent_full > .6 && k.percent_full<=.8){
              
                return "CF3A3A circle"
            }
            else {

                return "B80000 circle"
            }
            
          })


        })


            // Add a label.
            marker.append("svg:text")
                .attr("x", padding + 7)
                .attr("y", padding)
                .attr("dy", ".31em")
                .attr("onclick", "alert('click')")
                .text(function(d) {
                    return (d.name);
                });


            function transform(d) {
                d = new google.maps.LatLng(d.point.coordinates[1], d.point.coordinates[0]);
                d = projection.fromLatLngToDivPixel(d);
                return d3.select(this)
                    .style("left", (d.x - padding) + "px")
                    .style("top", (d.y - padding) + "px");


            }
        };
    };
    overlay.setMap(map)


    this.wrangleData(null);

    this.updateVis();
}

MapVis.prototype.moveMap = function(d){
    var that = this;
     

      for(var i = 0; i<=94; i++){
        name = newData["objects"][i]["name"]
        if (d == name){
            longitude = newData["objects"][i]["point"]["coordinates"][0]
            lat = newData["objects"][i]["point"]["coordinates"][1]
            zoom_set = 17
        }
        if(d=="None"){
            longitude=-71.059773
            lat=42.358431
            zoom_set = 15;
        }
      }

        var map = new google.maps.Map(d3.select("#mapVis").node(), {
        zoom: zoom_set,
        center: new google.maps.LatLng(lat, longitude),
        mapTypeId: google.maps.MapTypeId.TERRAIN,
    });
        var overlay = new google.maps.OverlayView();

    // Add the container when the overlay is added to the map.
    overlay.onAdd = function() {
        
        var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
            .attr("class", "stations");

        overlay.draw = function() {
            var projection = this.getProjection(),
                padding = 50;

            var marker = layer.selectAll("svg")
                .data(that.data["objects"])
                .each(transform) // update existing markers
                .enter().append("svg:svg")
                  .attr("width", 1000)
                  .attr("height", 1000)
                .each(transform)
                .attr("class", "marker")
                 .attr("id", function(d) {
                    return "svg-" +d.id;
                })
             

            // Add a circle.
            marker.append("circle")
                .attr("cx", padding)
                .attr("cy", padding)
                .attr("stroke", "black")
                   .attr("id", function(d) {
                    return "station-" +d.id;
                })

       that.displayData.forEach(function (k){

        if (d3.select("#totaldepartures").property("checked") == true) {
            console.log("helpme")



                  d3.select("#station-"+k.station).attr("r", function(d){
                    return Math.sqrt(k.departures/5 +circle_padding)
                  })
              }

if (d3.select("#capacity").property("checked") == true) {
console.log("arrivals")
               d3.select("#station-"+k.station).attr("r", function(d){
                    return circle_padding + Math.pow(k.capacity, 2)/60
                  })

}

})


  that.displayData.forEach(function (k){

          d3.select("#station-"+k.station).attr("fill", function(d){
           
            if(k.percent_full <= .2){
                return "#FFFFFF"
            }
            else if(k.percent_full > .2 && k.percent_full<=.4){
               
                return "#FFB5B5"
            }
            else if(k.percent_full > .4 && k.percent_full<=.6){
              
                return "#FF5959"
            }
            else if(k.percent_full > .6 && k.percent_full<=.8){
                
                return "#CF3A3A"
            }
            else {
                return "#B80000"
            }
            
          })


        })

 that.displayData.forEach(function (k){

          d3.select("#station-"+k.station).attr("class", function(d){
            
            if(k.percent_full <= .2){
              
                return "FFFFFF circle"
            }
            else if(k.percent_full > .2 && k.percent_full<=.4){
                
                return "FFB5B5 circle"
            }
            else if(k.percent_full > .4 && k.percent_full<=.6){
                
                return "FF5959 circle"
            }
            else if(k.percent_full > .6 && k.percent_full<=.8){
              
                return "CF3A3A circle"
            }
            else {

                return "B80000 circle"
            }
            
          })


        })

            // Add a label.
            marker.append("svg:text")
                .attr("x", padding + 7)
                .attr("y", padding)
                .attr("dy", ".31em")
                .attr("onclick", "alert('click')")
                .text(function(d) {
                    return (d.name + "test");
                });


            function transform(d) {
                d = new google.maps.LatLng(d.point.coordinates[1], d.point.coordinates[0]);
                d = projection.fromLatLngToDivPixel(d);
                return d3.select(this)
                    .style("left", (d.x - padding) + "px")
                    .style("top", (d.y - padding) + "px");


            }
        };
    };

    // Bind our overlay to the map…
    overlay.setMap(map)



    this.updateVis()
        // this.initVis();
    
}

MapVis.prototype.onRadioChanged = function () {
    var that = this
console.log("he")


 // that.displayData.forEach(function (k){
 //    console.log("HHH")
 //             if (d3.select("#totaldepartures").property("checked") == true) {

 //                  d3.select("#station-"+k.station).attr("r", function(d){
 //                    return Math.sqrt(k.departures/5 +circle_padding)
 //                  })
 //              }

 //               d3.select("#station-"+k.station).attr("r", function(d){
 //                    return Math.sqrt(k.arrivals/5 +circle_padding)
 //                  })




 //        })
this.updateVis()

}

MapVis.prototype.updateVis = function() {

        var that = this;

        that.displayData.forEach(function (k){

        if (d3.select("#totaldepartures").property("checked") == true) {
            console.log("helpme")



                  d3.select("#station-"+k.station).attr("r", function(d){
                    return Math.sqrt(k.departures/5 +circle_padding)
                  })
              }

if (d3.select("#capacity").property("checked") == true) {
// console.log("arrivals")
               d3.select("#station-"+k.station).attr("r", function(d){
                    return circle_padding + Math.pow(k.capacity, 2)/60
                  })



}

})
        


        that.displayData.forEach(function (k){

          d3.select("#station-"+k.station).attr("fill", function(d){
            
            if(k.percent_full <= .2){
              
                return "#FFFFFF"
            }
            else if(k.percent_full > .2 && k.percent_full<=.4){
                
                return "#FFB5B5"
            }
            else if(k.percent_full > .4 && k.percent_full<=.6){
                
                return "#FF5959"
            }
            else if(k.percent_full > .6 && k.percent_full<=.8){
              
                return "#CF3A3A"
            }
            else {

                return "#B80000"
            }
            
          })


        })

       

          that.displayData.forEach(function (k){

          d3.select("#station-"+k.station).attr("class", function(d){
            
            if(k.percent_full <= .2){
              
                return "FFFFFF circle"
            }
            else if(k.percent_full > .2 && k.percent_full<=.4){
                
                return "FFB5B5 circle"
            }
            else if(k.percent_full > .4 && k.percent_full<=.6){
                
                return "FF5959 circle"
            }
            else if(k.percent_full > .6 && k.percent_full<=.8){
              
                return "CF3A3A circle"
            }
            else {

                return "B80000 circle"
            }
            
          })


        })




    }
    /**
     * Method to wrangle the data. In this case it takes an options object
     */

MapVis.prototype.givedepartures = function (d)
{

    that.displayData.forEach(function (k){
            if (k.id = d.id)
            {

                  alert(  "There were" + k.departures + "departures during this time.");
            }

   
})
}

MapVis.prototype.wrangleData = function(_filterFunction) {

    
    this.displayData = this.filterAndAggregate(_filterFunction);
    


}

MapVis.prototype.onStationChanged = function(_filterFunction) {
  
    var that = this

       
    this.wrangleData()
    this.updateVis();

}

MapVis.prototype.onCheckboxChanged = function(_filterFunction) {
    

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


MapVis.prototype.onSelectionChange = function(selection) {

//    
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



MapVis.prototype.capacity = function(k) {
    console.log(k)
    
     var that =this
    var station;
    var capacity;
     for(var i = 0; i<=94; i++){
     name = newData["objects"][i]["name"]
        if (k == name)
            { 
                station = newData["objects"][i]["id"]
            }
}
console.log(station)
//    
   
//    var filt = function(d) {
//                     if (that.timeStart == null || that.timeEnd == null)
//                     {
//                         that.timeStart = 0
//                         that.timeEnd = 24
//                     }
//         return d >= Math.round(that.timeStart) && d <= Math.round(that.timeEnd)
//     }
//     var station_filter = function(d) {

//         return d == selected_station
//     }

// this.wrangleData(filt, station_filter)
//     this.updateVis();
//     var departures;
    this.displayData.forEach(function (d) {


        if (station == d.station)
        {
            console.log(d)
            capacity = d.capacity
        }
        // if (d )


    })

    console.log(capacity)

  d3.select("#departures").text(capacity);// 
    // console.log(departures)

     

}
MapVis.prototype.filterAndAggregate = function(_filter) {
    

    var that = this;

    var that = this;

    var filter = function() {
        return true;
    }
    if (_filter != null) {
        filter = _filter;
    }

    var tripSummary = {
        "station": 0,
        "departures": 0,
        "percent_full": 0
    };



    if (d3.select("#weekday").property("checked") == true) {

        var departures;
        var arrivals;
        var station;
        var capacity;
        var res = []


        stations.forEach(function(k) {
            departures = 0
            arrivals = 0

            for (j = 0; j < intervals_keys.length; j++) {

                that.tripdata.forEach(function(d) {

             
                    if (d.time == intervals_keys[j]) {
                        if (filter(d.time))

                        {
                           
                            d.stationdata.forEach(function(m) {

                                if (k == m.station) {

                                    arrivals += m.weekday.arrivals
                                    departures += m.weekday.departures
                                }


                            })
                        }

                    }
                })

              
                that.capacitydata.forEach(function(s)

                    {
                        if (s.stationid == k) {
                            capacity = s.capacity
                        }

                    }
                )

            }

            station = k
            percent_full = (arrivals - departures) / capacity

            var tripSummary = {
                "station": station,
                "departures": departures,
                "arrivals": arrivals,
                "percent_full": percent_full
            };

            res.push(tripSummary)


        })

    }

    if (d3.select("#weekend").property("checked") == true) {
        
        var departures;
        var arrivals;
        var station;
        var capacity;
        var res = []


        stations.forEach(function(k) {
            departures = 0
            arrivals = 0

            for (j = 0; j < intervals_keys.length; j++) {

                that.tripdata.forEach(function(d) {

            
                    if (d.time == intervals_keys[j]) {
                        if (filter(d.time))
   
                        {

                            d.stationdata.forEach(function(m) {

                                if (k == m.station) {

                                    arrivals += m.weekend.arrivals
                                    departures += m.weekend.departures
                                }

                            })
                        }

                    }
                })

                that.capacitydata.forEach(function(s)

                    {
                        if (s.stationid == k) {
                            capacity = s.capacity
                        }

                    }
                )

            }

            station = k
            percent_full = (arrivals - departures) / capacity

            var tripSummary = {
                "station": station,
                "departures": departures,
                "arrivals": arrivals,
                "percent_full": percent_full
            };

            res.push(tripSummary)

        })

    }



    if ((d3.select("#weekend").property("checked") == true && d3.select("#weekday").property("checked") == true) ||
        (d3.select("#weekend").property("checked") == false && d3.select("#weekday").property("checked") == false)) {

        var departures;
        var arrivals;
        var station;
        var capacity;
        var res = []


        stations.forEach(function(k) {
            departures = 0
            arrivals = 0

            for (j = 0; j < intervals_keys.length; j++) {

                that.tripdata.forEach(function(d) {

                    
                    if (d.time == intervals_keys[j]) {
                        if (filter(d.time))
                      
                        {
                      

                            d.stationdata.forEach(function(m) {

                                if (k == m.station) {

                          
                                    arrivals += m.weekend.arrivals
                                    departures += m.weekend.departures
                                    arrivals += m.weekday.arrivals
                                    departures += m.weekday.departures
                                }

                            })
                        }

                    }
                })
 
                that.capacitydata.forEach(function(s)

                    {
                        if (s.stationid == k) {
                            capacity = s.capacity
                        }

                    }
                )

            }

            station = k
            percent_full = (arrivals - departures) / capacity

            var tripSummary = {
                "station": station,
                "departures": departures,
                "arrivals": arrivals,
                "percent_full": percent_full,
                "capacity": capacity
            };

            res.push(tripSummary)

        })




    }
     console.log(res)
    this.displayData = res
    return res
   
}
