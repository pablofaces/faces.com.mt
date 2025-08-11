"use client";
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import mapboxgl from "mapbox-gl";
import FacesMarker from "./FacesMarker";
import Location from "@/interfaces/location";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

interface MapProps {
  locations?: Location[];
  selectedLocation: { latitude: number; longitude: number } | null;
}

const Map = ({ locations, selectedLocation }: MapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<
    { marker: mapboxgl.Marker; popup: mapboxgl.Popup }[]
  >([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [14.5146, 35.8997], // Valletta, Malta
      zoom: 12,
      attributionControl: false,
      logoPosition: "bottom-right",
      renderWorldCopies: false,
    });

    mapRef.current = map;
    markersRef.current = []; // Reset markers reference

    map.on("load", () => {
      map.resize();
      // 🔥 Remueve cualquier control que pueda estar dejando espacio en blanco
      map._controls.forEach((control) => map.removeControl(control));

      // 🔥 Elimina elementos de Mapbox que pueden estar afectando el diseño
      document
        .querySelectorAll(
          ".mapboxgl-ctrl-bottom-left, .mapboxgl-ctrl-bottom-right"
        )
        .forEach((el) => el.remove());

      const bounds = new mapboxgl.LngLatBounds();

      if(locations) {
        locations.forEach((location) => {
          const markerElement = document.createElement("div");
          createRoot(markerElement).render(<FacesMarker />);
  
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 25,
          }).setHTML(
            `<div class='flex flex-col'>
              <div class='text-sm font-bold text-center'>${location.assetName}</div>
              <div class='text-sm font text-center'>${location.assetCode} - ${location.regionName}</div>
            </div>`
          );
  
          const marker = new mapboxgl.Marker(markerElement)
            .setLngLat([location.longitude, location.latitude])
            .setPopup(popup)
            .addTo(map);
  
          markersRef.current.push({ marker, popup });
          bounds.extend([location.longitude, location.latitude]);
        });

        map.fitBounds(bounds, { padding: 50, maxZoom: 15, duration: 0 });
      }

    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [locations]);

  // 🔥 Mueve el mapa al centro de la ubicación seleccionada y abre el popup sobre el marcador
  useEffect(() => {
    if (mapRef.current && selectedLocation) {
      mapRef.current.flyTo({
        center: [selectedLocation.longitude, selectedLocation.latitude],
        zoom: 14,
        essential: true,
      });

      // Cerrar todos los popups antes de abrir el seleccionado
      markersRef.current.forEach(({ popup }) => popup.remove());

      // Encontrar y abrir el popup del marcador seleccionado
      markersRef.current.forEach(({ marker, popup }) => {
        const markerLngLat = marker.getLngLat();
        if (
          markerLngLat.lng === selectedLocation.longitude &&
          markerLngLat.lat === selectedLocation.latitude
        ) {
          popup.addTo(mapRef.current!);
        }
      });
    }
  }, [selectedLocation]);

  return <div ref={mapContainerRef} className="map-container" />;
};

export default Map;
