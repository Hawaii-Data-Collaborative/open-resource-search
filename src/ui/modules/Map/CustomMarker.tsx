import { Marker } from 'google-maps-react'

class CustomMarker extends Marker {
  [x: string]: any

  componentDidUpdate(prevProps) {
    if (
      this.props.map !== prevProps.map ||
      (this.props.icon as any).url !== prevProps.icon.url ||
      this.props.position.lat !== prevProps.position.lat ||
      this.props.position.lng !== prevProps.position.lng
    ) {
      if (this.marker) {
        this.marker.setMap(null)
      }
      this.renderMarker()
    }
  }
}

export default CustomMarker
