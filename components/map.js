import React from "react";
import { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import GoogleMapReact from 'google-map-react';

export default function Map(props) {
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [marker, setMarker] = useState(null);

  const handleApiLoaded = ({ map, maps }) => {
    new maps.Marker({
      map,
      position: props.center,
    });
  };

  return (
    <div style={props.size}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        onGoogleApiLoaded={handleApiLoaded}
      />
    </div>
  );

  /*
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={props.size}
        center={props.center}
        zoom={props.zoom}
      ></GoogleMap>
    </LoadScript>
  );
  */
};