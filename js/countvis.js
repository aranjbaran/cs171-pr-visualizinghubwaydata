
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
 * CountVis object for HW3 of CS171
 * @param _parentElement -- the HTML or SVG element (D3 node) to which to attach the vis
 * @param _data -- the data array
 * @param _metaData -- the meta-data / data description object
 * @param _eventHandler -- the Eventhandling Object to emit data to (see Task 4)
 * @constructor
 */
var empty = true;
var margin = 75

CountVis = function(_parentElement, _data, _eventHandler) {

    this.parentElement = _parentElement;

    this.data = _data;
    this.eventHandler = _eventHandler;
    this.displayData = [];

    this.margin = {
            top: 100,
            right: 10,
            bottom: 100,
            left: 100
        },
        this.width = 1100 - this.margin.left - this.margin.right,

        this.height = 400;

    // this.wrangleData()

    this.initVis();
}


/**
 * Method that sets up the SVG and the variables
 */
CountVis.prototype.initVis = function() {

    var that = this;

    // TODO: modify this to append an svg element, not modify the current placeholder SVG element
    this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .style("padding", "40px 0px 20px 5px")
        .append("g")

    this.x = d3.scale.linear()

    .range([0, this.width])

    this.xAxis = d3.svg.axis()

    .scale(this.x)
        .ticks(24)


    this.y = d3.scale.pow()
        .range([this.height, 0]);

    // this.xAxis.append("text")      // text label for the x axis
    //     .attr("x", 265 )
    //     .attr("y", 240 )
    //     .style("text-anchor", "middle")
    // .text("Time");

    this.yAxis = d3.svg.axis()
        .scale(this.y)
        .orient("left");

    this.area = d3.svg.area()
        .interpolate("monotone")
        .x(function(d) {
            return that.x(d.time) + margin;
        })
        .y0(this.height)
        .y1(
            function(d) {

                return that.y(d.count / 31);
            })


    this.brush = d3.svg.brush()
        .on("brush", function() {
            empty = that.brush.empty()
            var extent = that.brush.extent();
            var min = extent[0];
            var max = extent[1];


            if (empty) {
                min = that.min
                max = that.max
            }

            $(that.eventHandler).trigger("selectionChanged", {
                "min_time": min,
                "max_time": max
            });


        });

    this.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin + "," + this.height + ")")

    this.svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin + ", 0)")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 7)
        .attr("dy", ".8em")
        .style("text-anchor", "end")


    this.svg.append("g")
        .attr("class", "brush")
        .attr("transform", "translate(" + margin + ", 0)")


    this.svg.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("x", this.x(0))
        .attr("y", this.y(1))
        .attr("width", this.x(1) - this.x(0) + margin)
        .attr("height", this.y(0) - this.y(1));

    this.zoom = d3.behavior.zoom()
        .x(that.x)
        .on("zoom", focus);


    function focus() {
        that.svg.select(".x.axis").call(that.xAxis)
        that.svg.select("path.area").attr("d", that.area);
    }



    // TODO: modify this to append an svg element, not modify the current placeholder SVG element
    this.svg = this.parentElement.select("svg");

    //TODO: implement the slider -- see example at http://bl.ocks.org/mbostock/6452972
    this.addSlider(this.svg)

    // filter, aggregate, modify data
    this.wrangleData();

    this.updateVis();
}

//function weekend_only 



/**
 * Method to wrangle the data. In this case it takes an options object
 */
CountVis.prototype.wrangleData = function() {

    this.displayData = this.data;

}

/**
 * the drawing function - should use the D3 selection, enter, exit
 * @param _options -- only needed if different kinds of updates are needed
 */
CountVis.prototype.updateVis = function() {
    var that = this;
    this.x.domain([0.00001, 23.9])

    this.y.domain(d3.extent(this.displayData, function(d) {
        return d.count / 31;
    }));

    this.yAxis.scale(this.y)

    // updates axis
    this.svg.select(".x.axis")
        .call(this.xAxis);

    this.svg.select(".y.axis")
        .call(this.yAxis)

    // updates graph

    var path = this.svg.selectAll(".area")
        .data([this.displayData])

    path.enter()
        .append("path")
        .attr("class", "area")
        .attr("clip-path", "url(#clip)")


    path
        .transition()
        .attr("d", this.area);

    path.exit()
        .remove();




    this.brush.x(this.x);

    this.svg.select(".brush")
        .call(this.brush)
        .selectAll("rect")
        .attr("height", this.height);

    // TODO: implement update graphs (D3: update, enter, exit)
    // this.addSlider(this.svg)


}

/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
CountVis.prototype.onSelectionChange = function(day) {


}

CountVis.prototype.wrangleData = function(_filterFunction) {

    this.displayData = this.filterAndAggregate(_filterFunction);

}

CountVis.prototype.onCheckboxChanged = function(_filterFunction) {

    var that = this
    that.displaydata = []



    var station_filter = function(d) {
        if (selected_station == 0) {
            return true;
        }

        return d == selected_station
    }
    this.wrangleData(station_filter)

    this.updateVis();

}


CountVis.prototype.onStationChanged = function(d) {


    var station_filter = function(d) {

        return d == selected_station
    }
    this.displaydata = []
    this.wrangleData(station_filter)

    // wrangleData()
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
 * creates the y axis slider
 * @param svg -- the svg element
 */
CountVis.prototype.addSlider = function(svg) {

    var that = this;

    var sliderScale = d3.scale.linear().domain([1, .1]).range([190, 0])

    var sliderDragged = function() {

        var value = Math.max(0, Math.min(190, d3.event.y));


        var sliderValue = sliderScale.invert(value);


        that.y.exponent(sliderValue)
        d3.select(this)
            .attr("y", function() {
                return sliderScale(sliderValue);
            })

        that.updateVis({});
    }
    var sliderDragBehaviour = d3.behavior.drag()
        .on("drag", sliderDragged)

    var sliderGroup = svg.append("g").attr({
        class: "sliderGroup",
        "transform": "translate(" + 0 + "," + 0 + ")"
    })


}

CountVis.prototype.filterAndAggregate = function(_filter) {

    var that = this;

    var filter = function() {
        return true;
    }
    if (_filter != null && selected_station != 0) {
        filter = _filter;
    }


    if (d3.select("#weekday").property("checked") == true) {

        var count;
        var res = []

        for (j = 0; j < intervals_keys.length; j++) {

            count = 0;
            this.data.forEach(function(d) {
                for (i = 0; i < stations.length; i++) {
                    if (d.time == intervals_keys[j]) {

                        d.stationdata.forEach(function(k) {
                            if (filter(k.station)) {
                                count += k.weekday.arrivals
                            }

                        })

                    }

                }
            })



            var data = {
                "time": intervals_keys[j],
                "count": count
            }

            res.push(data)



        }

    }

    if (d3.select("#weekend").property("checked") == true) {

        var count;
        var res = []

        for (j = 0; j < intervals_keys.length; j++) {

            count = 0;
            this.data.forEach(function(d) {
                for (i = 0; i < stations.length; i++) {
                    if (d.time == intervals_keys[j]) {
                        d.stationdata.forEach(function(k) {
                            if (filter(k.station)) {
                                count += k.weekend.arrivals
                            }

                        })
                    }

                }
            })



            var data = {
                "time": intervals_keys[j],
                "count": count
            }

            res.push(data)


        }

    }
    if ((d3.select("#weekend").property("checked") == true && d3.select("#weekday").property("checked") == true) ||
        (d3.select("#weekend").property("checked") == false && d3.select("#weekday").property("checked") == false)) {
        var count;
        var res = []

        for (j = 0; j < intervals_keys.length; j++) {

            count = 0;
            this.data.forEach(function(d) {
                for (i = 0; i < stations.length; i++) {
                    if (d.time == intervals_keys[j]) {

                        d.stationdata.forEach(function(k) {
                            if (filter(k.station)) {
                                count += k.weekend.arrivals
                                count += k.weekday.arrivals
                            }

                        })
                    }

                }
            })

            var data = {
                "time": intervals_keys[j],
                "count": count
            }

            res.push(data)


        }

    }
    return res;

}