import mapboxgl, { LngLatLike } from "mapbox-gl";
import { useRef, useEffect, useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";

export default function NavigationMap() {
  // this is where the map instance will be stored after initialization
  const [map, setMap] = useState<mapboxgl.Map>();

  // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;
    // if the window object is not found, that means
    // the component is rendered on the server
    // or the dom node is not initialized, then return early
    if (typeof window === "undefined" || node === null) return;

    // otherwise, create a map instance
    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken:
        "pk.eyJ1IjoiYWxqb2hhcmExMDEwIiwiYSI6ImNsN2YzenNqcTA2b2szeXBxM3VqaWRsaHYifQ._LcdSCObHTij99vi6g3z_w",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [46.6753, 24.7136],
      zoom: 11,
    });

    const geojson = [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [46.688, 24.7322] as LngLatLike,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [46.6758, 24.71633] as LngLatLike,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [46.7288, 24.6624] as LngLatLike,
        },
      },
    ];

    for (const feature of geojson) {
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = "marker";

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .addTo(mapboxMap);
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<div class="info-container">
                <img class="tooltip-img" src='resturant.svg' height="130px" width="130px"/>

                <div class="menu-container">
                    <p>Resturant name</p>
                    <span>Menu List <a href="/" class="arrow">></a></span>
                </div>
              </div>`
            )
        )
        .addTo(mapboxMap);
    }

    // save the map object to React.useState
    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  return <div ref={mapNode} style={{ minWidth: "100vh", height: "100vh" }} />;
}
