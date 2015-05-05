 // Define the tour!
    var tour = {
      id: "hello-hopscotch",
      steps: [
        {
          title: "Welcome",
          content: "Select a hubway station to begin.",
          target: "stationdropdown",
          placement: "bottom"
        },
        {
          title: "Toggle",
          content: "Toggle between weekend or weekday departure data, to update all visualizations.",
          target: "weekend",
          placement: "bottom"
        },
        {
          title: "Brush over time",
          content: "Use the brush to select the time frame you would like the visualize the number of arrivals for a specific station. When no station is selected, the data represents aggregated departues from all stations.",
          target: "countVis",
          placement: "right"
        },
        {
          title: "User representation",
          content: "The demographic of casual vs. registered users is represented here based on the selections previoiusly made. ",
          target: "pieVis",
          placement: "right"
        },
        {
          title: "Age and gender representation",
          content: "The demographic of age and gender is represented here based on the selections previoiusly made. ",
          target: "userVis",
          placement: "right"
        },
        {
          title: "Capacity",
          content: "When you select a station, you can see the capacity of that station",
          target: "capacitybar",
          placement: "bottom"
        },
        {
          title: "Toggle",
          content: "Toggle between the size of the circles on the map representing either capacity or departures",
          target: "capacitybar",
          placement: "bottom"
        },
        {
          title: "Hover Feature",
          content: "Every legend has a hover feature in which elements coresponding to the legend are highlighted so it is more clear to the user",
          target: "legendhere",
          placement: "left"
        },
         {
          title: "Station visualization",
          content: "Each hubway station updates based on selections previously made. The size of the circle of each station represents either the number of departures of that station or the capacity of the station, and the color of the station represents the percent full of bikes at that station.",
          target: "mapVis",
          placement: "left"
        }
      ]
    };
    hopscotch.startTour(tour);

  

        