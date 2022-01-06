import { useMemo, useState } from "react";
import { useSubscription } from "@apollo/client";
import { Marker, useGoogleMap, OverlayView } from "@react-google-maps/api";
import MarkerIcon from "./Car.png";
import gql from "graphql-tag";

type TCoordinates = {
  latitude: number,
    longitude: number,
}

export type TCarsUpdated = {
  id: string,
  location: TCoordinates,
  destination: TCoordinates,
  distanceToDestination: number,
}

const CARS_SUBSCRIPTION = gql`
  subscription CarsUpdated {
    carsUpdated {
      id
      location {
        latitude
        longitude
      }
      destination {
        latitude
        longitude
      }
      distanceToDestination
    }
  }
`;

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15,
  height: 150,
  width: 300,
  marginTop: -150
};

const Markers = () => {
  const { data, loading } = useSubscription<{carsUpdated: [TCarsUpdated]}>(CARS_SUBSCRIPTION);
  const map = useGoogleMap();
  const swCorner = map?.getBounds()?.getSouthWest();
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)
  const selectedCar = useMemo(() => {
    return data?.carsUpdated.find(item => item.id === selectedId)
  }, [data, selectedId])
  
  return (
    <>
      <OverlayView
        position={{
          lat: swCorner?.lat() || 0,
          lng: swCorner?.lng() || 0
        }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div style={divStyle}>
          <h1>Car #{selectedId}</h1>
          <p>Location: {selectedCar?.location.latitude}, {selectedCar?.location.longitude}</p>
          <p>Distance to Destication: {selectedCar?.distanceToDestination}</p>
        </div>
      </OverlayView>
      {
          !loading && data && data.carsUpdated.map(item => 
            <Marker
              key={item.id}
              position={{
                lat: item.location.latitude,
                lng: item.location.longitude
              }}
              icon={{
                scaledSize: {
                  height: 35,
                  width: 35,
                  equals: () => false
                },
                url: MarkerIcon
              }}
              onClick={() => setSelectedId(item.id)}
            />
          )
        }
    </>
  )
}

export default Markers;
