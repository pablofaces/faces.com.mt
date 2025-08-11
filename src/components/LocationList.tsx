"use client";
import React from "react";
import FacesMarker from "./FacesMarker";
import Location from "@/interfaces/location";

interface LocationListProps {
  locations: Location[];
  onSelectLocation: (data: Location) => void;
}

const LocationList: React.FC<LocationListProps> = ({
  locations,
  onSelectLocation,
}) => {
  return (
    <div className="location-list">
      <ul>
        {locations.map((location) => (
          <li
            key={location.id}
            className="location-item flex"
            onClick={() => onSelectLocation(location)}
          >
            <div className="flex">
              <FacesMarker />
              <div className="flex flex-col">
                <p className="font-bold">{location.assetName}</p>
                <p className="text-xs">
                  {location.assetCode} - {location.regionName}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
