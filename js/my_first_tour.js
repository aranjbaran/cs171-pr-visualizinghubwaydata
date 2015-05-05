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
          title: "Station visualization",
          content: "Each hubway station updates based on selections previously made. The size of the circle of each station represents either the number of departures of that station or the capacity of the station, and the color of the station represents the percent full of bikes at that station.",
          target: "mapVis",
          placement: "left"
        },
      ]
    };
     // Define the tour!
    // var Story = {
    //   id: "hello-hopscotch",
    //   steps: [
    //     {
    //       title: "My Header",
    //       content: "This is the header of my page.",
    //       target: "day",
    //       placement: "right"
    //     },
    //     {
    //       title: "My content",
    //       content: "Here is info for mapVis",
    //       target: "mapVis",
    //       placement: "left"
    //     }
    //   ]
    // };

    // Start the tour!
    hopscotch.startTour(tour);

  

        // hopscotch.startTour(story);

    // {
    //   id: "hello-hopscotch",
    //   steps: [
    //     {
    //       target: "hopscotch-title",
    //       title: "Welcome to Hopscotch!",
    //       content: "Hey there! This is an example Hopscotch tour. There will be plenty of time to read documentation and sample code, but let's just take some time to see how Hopscotch actually works.",
    //       placement: "bottom",
    //       xOffset: 'center',
    //       arrowOffset: 'center'
    //     },
    //     {
    //       target: document.querySelectorAll("#general-use-desc code")[1],
    //       title: "Where to begin",
    //       content: "At the very least, you'll need to include these two files in your project to get started.",
    //       placement: "right",
    //       yOffset: -20
    //     },
    //     {
    //       target: "my-first-tour-file",
    //       placement: "top",
    //       title: "Define and start your tour",
    //       content: "Once you have Hopscotch on your page, you're ready to start making your tour! The biggest part of your tour definition will probably be the tour steps."
    //     },
    //     {
    //       target: "start-tour",
    //       placement: "right",
    //       title: "Starting your tour",
    //       content: "After you've created your tour, pass it in to the startTour() method to start it.",
    //       yOffset: -25
    //     },
    //     {
    //       target: "basic-options",
    //       placement: "left",
    //       title: "Basic step options",
    //       content: "These are the most basic step options: <b>target</b>, <b>placement</b>, <b>title</b>, and <b>content</b>. For some steps, they may be all you need.",
    //       arrowOffset: 100,
    //       yOffset: -80
    //     },
    //     {
    //       target: "api-methods",
    //       placement: "top",
    //       title: "Hopscotch API methods",
    //       content: "Control your tour programmatically using these methods.",
    //     },
    //     {
    //       target: "demo-tour",
    //       placement: "top",
    //       title: "This tour's code",
    //       content: "This is the JSON for the current tour! Pretty simple, right?",
    //     },
    //     {
    //       target: "hopscotch-title",
    //       placement: "bottom",
    //       title: "You're all set!",
    //       content: "Now go and build some great tours!",
    //       xOffset: 'center',
    //       arrowOffset: 'center'
    //     }
    //   ],
    //   showPrevButton: true,
    //   scrollTopMargin: 100
    // }
    //     