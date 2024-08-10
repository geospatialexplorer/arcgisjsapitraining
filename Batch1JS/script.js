require([
  "esri/Map",

  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Sketch",
  "esri/layers/GraphicsLayer",
  "esri/rest/support/Query",
  "esri/Graphic",
  "esri/config",
], (
  Map,
  MapView,
  FeatureLayer,
  Sketch,
  GraphicsLayer,
  Query,
  Graphic,
  esriConfig
) => {
  //API KEY

  esriConfig.apiKey =
    "AAPTxy8BH1VEsoebNVZXo8HurOXwo4HfJWieYxK2-WeqizrGgIiqtXWrRjqOCTtz4fCZKnp8M0zFiBvSXUzXinvjhvNkQ4X4G44qac_nP-ptO1jCJTUISdR_3K8Jf-Sxs0kzqTKrDFGbMvzwjJG6idOMyS2ok2gN22zU2zqgOnKxfFL7-WtFQ_4qWgNVwStjrCyvhLwMxi5p0udSfU8moSSjq8n4nuXhzJhzpR-N0mgPpfcGU4QMKSzMv7NTj5VRLcLHAT1_KRGzZGGu";
  const map = new Map({
    basemap: "topo-vector",
  });

  // const layer = new FeatureLayer({
  //   portalItem: {
  //     id: "84b1cbc8befe4319a5ffc5f3822b028e",
  //   },
  // });

  const layer = new FeatureLayer({
    // URL to the service
    url: "https://services6.arcgis.com/EfHgAJ9Q7kiwtS7u/arcgis/rest/services/indian_cities/FeatureServer",
    // url: "https://services6.arcgis.com/EfHgAJ9Q7kiwtS7u/arcgis/rest/services/india_administrative_boundary/FeatureServer/1",
  });

  map.add(layer);
  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);
  const view = new MapView({
    container: "viewDiv", // Reference to the view div created in step 5
    map: map, // Reference to the map object created before the view
    zoom: 4, // Sets zoom level based on level of detail (LOD)
    center: [15, 65], // Sets center point of view using longitude,latitude
  });

  // First assignment
  //first create point layer-visited places
  //you have publish to the arcgis developer account-->i dont need to login
  //add buttons to the locations
  //whenever i click the button its need to go to the location

  view.when().then((result) => {
    // create a new sketch widget
    map.layers.map((layer) => {
      console.log(layer.title);
    });
    const sketch = new Sketch({
      view,
      layer: graphicsLayer,
    });
    view.ui.add(sketch, "top-right");

    // console.log(result);
    console.log(graphicsLayer.graphics);
  });

  //create query for a layer

  const query = new Query();
  query.where = "1=1";
  query.outFields = ["*"];
  // query.geometry=
  query.returnGeometry = true;

  view.on("click", (event) => {
    let place = prompt("Enter the Place Name");
    let placeID = prompt("Enter the Place ID");
    console.log(event);
    let point = {
      type: "point", // autocasts as new Point()
      longitude: event.mapPoint.longitude,
      latitude: event.mapPoint.latitude,
    };

    // Create a symbol for drawing the point
    let markerSymbol = {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [226, 119, 40],
    };

    // Create a graphic and add the geometry and symbol to it
    let pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
      attributes: {
        ID: placeID,
        PlaceName: place,
      },
    });

    // const addFeatures = {
    //   addFeature: [pointGraphic],
    // };

    // template items.
    // editFeature = new Graphic({
    //   geometry: point,
    //   attributes: {
    //     IncidentType: attributes.IncidentType,
    //   },
    // });

    // Setup the applyEdits parameter with adds.
    const edits = {
      addFeatures: [pointGraphic],
    };

    layer.applyEdits(edits).then((result) => {
      console.log(result);
    });

    // view.graphics.add(pointGraphic);

    // const query = new Query();
    // // query.where = "1=1";
    // query.outFields = ["*"];
    // query.geometry = point;
    // query.returnGeometry = true;

    // layer.queryFeatures(query).then((result) => {
    //   console.log(result);
    //   let resultGeometry = result.features[0].geometry;
    //   let resultGraphic = new Graphic({
    //     geometry: resultGeometry,
    //     symbol: {
    //       type: "simple-fill", // autocasts as SimpleLineSymbol()
    //       color: [226, 119, 40],
    //       width: 4,
    //     },
    //   });
    //   view.graphics.add(resultGraphic);
    // });
  });

  // });

  // view.when().then(() => {
  //   layer.queryFeatures(query).then((result) => {
  //     console.log(result);
  //     let resultGeometry = result.features[0].geometry;
  //     let resultGraphic = new Graphic({
  //       geometry: resultGeometry,
  //       symbol: {
  //         type: "simple-fill", // autocasts as SimpleLineSymbol()
  //         color: [226, 119, 40],
  //         width: 4,
  //       },
  //     });
  //     view.graphics.add(resultGraphic);
  //   });
  // });

  // sketch.on("click", (event) => {
  //   console.log(graphicsLayer.graphics);
  // });
});

// function bubbleSort(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; j < arr.length - i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         let temp = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = temp;
//       }
//     }
//   }
//   console.log(arr);
// }

// bubbleSort([234, -5, 67, 8, 22]);
