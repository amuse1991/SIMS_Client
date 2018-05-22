import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, OverlayView } from "react-google-maps"
import OverlaySatellite from "./OverlaySatellite"

const GmapComponent = compose(
  withProps({
    //googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAwBPNEdjd9oJh5MaOE7F2EpRtkh7Q007A",
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {/*props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} >*/}
    <OverlayView 
        position={{ lat: -34.397, lng: 150.644 }}
        mapPaneName={OverlayView.OVERLAY_LAYER}
        getPixelPositionOffset={getPixelPositionOffset}
      >
        <OverlaySatellite imgSrc="http://pds.joins.com/news/component/newsis/201406/16/NISI20140616_0009799793_web.jpg"/>
      </OverlayView>
  </GoogleMap>
  
)

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2),
})

class Gmap extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }
  

  render() {
    return (
      <GmapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}

export default Gmap