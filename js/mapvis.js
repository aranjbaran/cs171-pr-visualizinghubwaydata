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
        },


        this.initVis();
        this.wrangleData(null)
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

    // Add the container when the overlay is added to the map.
    overlay.onAdd = function() {
        // console.log("hello")
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
             

            marker.append("circle")
                // .attr("r", 12)
                .attr("cx", padding)
                .attr("cy", padding)
                .attr("stroke", "black")
                .on("click", function(d) {
                    // console.log("hi")
                })
                   .attr("id", function(d) {
                    return "station-" +d.id;
                })

          that.displayData.forEach(function (k){

          d3.select("#station-"+k.station).attr("r", function(d){
            return k.departures/100
          })


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


    // return;

    this.wrangleData(null);

    this.updateVis();
}

MapVis.prototype.moveMap = function(d){
    var that = this;
      console.log(d) 

      for(var i = 0; i<=94; i++){
        name = newData["objects"][i]["name"]
        if (d == name){
            longitude = newData["objects"][i]["point"]["coordinates"][0]
            lat = newData["objects"][i]["point"]["coordinates"][1]
            zoom_set = 17
        }
        console.log(d)
        if(d=="None"){
            console.log("in none")
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
        // console.log("hello")
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
                // .attr("r", 12)
                .attr("cx", padding)
                .attr("cy", padding)
                .attr("onclick", "alert('click')")
                .attr("onmouseover", "alert('mo')")
                .attr("stroke", "black")
                .on("click", function(d) {
                    // console.log("hi")
                })
                   .attr("id", function(d) {
                    return "station-" +d.id;
                })

          that.displayData.forEach(function (k){

          d3.select("#station-"+k.station).attr("r", function(d){
            return k.departures/100
          })


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
        // this.initVis();
    
}

MapVis.prototype.updateVis = function() {

        var that = this;

        that.displayData.forEach(function (k){

          d3.select("#station-"+k.station).attr("r", function(d){
            return k.departures/100
          })


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


    }
    /**
     * Method to wrangle the data. In this case it takes an options object
     */



MapVis.prototype.wrangleData = function(_filterFunction) {

    // var filt = function(d) {
    //     return d >= timeStart && d <= timeEnd
    // }
    // displayData should hold the data which is visualized
    // pretty simple in this case -- no modifications needed
    this.displayData = this.filterAndAggregate(_filterFunction);
    // console.log(this.displayData)


}

MapVis.prototype.onStationChanged = function(_filterFunction) {
    // console.log(this.data)
    var that = this

    console.log("meep")
       
    this.wrangleData()
    console.log(that.displayData)
    // wrangleData()
    this.updateVis();

}

MapVis.prototype.onCheckboxChanged = function(_filterFunction) {
    // console.log(this.data)
    var that = this

    this.wrangleData()
    // console.log(that.displayData)
    // wrangleData()
    this.updateVis();

}


MapVis.prototype.onSelectionChange = function(selection) {

    if ((!selection.min_time || !selection.max_time) && selection.min_time !== 0)
    {
        selection.min_time = 0;
        selection.max_time = 24;
    }
    console.log(selection.max_time)

    timeEnd = selection.max_time;
    timeStart = selection.min_time;
   
  var station_filter = function(d) {

        return d == selected_station
    }


var f = function(d) {

        return d >= timeStart && d <= timeEnd
    }
this.wrangleData(f, station_filter)
this.updateVis();



}

MapVis.prototype.filterAndAggregate = function(_filter) {
    

    var that = this;
    // console.log(_filter)

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
                        // console.log(s)
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
            // console.log(res)


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
                "percent_full": percent_full
            };

            res.push(tripSummary)
            // console.log(res)

        })




    }
    this.displayData = res
    // console.log(this.displayData)
    return res;
    // console.log(res)
}

// }