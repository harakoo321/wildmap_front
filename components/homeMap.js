import React from "react";
import { useState } from "react";
import GoogleMapReact from 'google-map-react';

export default function HomeMap(props) {
  const handleApiLoaded = async({ map, maps }) => {
    const infoWindow = new maps.InfoWindow();
    console.log("map:" + props.posData);
    props.posData.forEach(([position, title], i) => {
        const marker = new maps.Marker({
          position,
          map,
          title: `${i + 1}. ${title}`,
          label: `${i + 1}`,
          optimized: false,
        });
    
        // Add a click listener for each marker, and set up the info window.
        marker.addListener("click", () => {
          infoWindow.close();
          infoWindow.setContent(marker.getTitle());
          infoWindow.open(marker.getMap(), marker);
        });
      });
  };

  return props.posData != null ? (
    <div style={props.size}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        onGoogleApiLoaded={handleApiLoaded}
      />
    </div>
  )
  :
  <div style={props.size}></div>
};