import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, OverlayView} from "react-google-maps"
import OverlaySatellite from "./OverlaySatellite"


const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  })

export const GmapComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAC460fE9QJu8X8C1ajGyzCqKw8cB_waRE",
      //googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>{
    let {Lat,Long,Alt,SatelliteCode} = props.orbitData;
    return(
        <GoogleMap
        defaultZoom={2}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
          { <OverlayView 
            position={{ lat: Lat, lng: Long }}
            //position={{ lat: -34.397, lng: 150.644 }}
            mapPaneName={OverlayView.OVERLAY_LAYER}
            getPixelPositionOffset={getPixelPositionOffset}
          >
            <OverlaySatellite 
              imgSrc={window.location.origin+'/img/ds2.png'}
              satelliteCode={SatelliteCode}
              lat={Lat}
              lng={Long}
              alt={Alt}
            />
          </OverlayView>}
          { <OverlayView 
            //position={{ lat: Lat, lng: Long }}
            position={{ lat: -35.00, lng: 150.644 }}
            mapPaneName={OverlayView.OVERLAY_LAYER}
            getPixelPositionOffset={getPixelPositionOffset}
          >
            <OverlaySatellite 
              imgSrc={window.location.origin+'/img/csat.jpg'}
              //satelliteCode={SatelliteCode}
              //lat={Lat}
              //lng={Long}
              //alt={Alt}
            />
          </OverlayView>}
        </GoogleMap>
      );
    }
  )