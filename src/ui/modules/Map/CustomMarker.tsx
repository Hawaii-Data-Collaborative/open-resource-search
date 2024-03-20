import { Marker } from 'google-maps-react'

class CustomMarker extends Marker {
  componentDidUpdate(prevProps) {
    if (
      // @ts-expect-error it's fine
      this.props.map !== prevProps.map ||
      // @ts-expect-error I need to check this later. Not sure how to fix ts errors here
      this.props.icon.url !== prevProps.icon.url ||
      // @ts-expect-error it's fine
      this.props.position.lat !== prevProps.position.lat ||
      // @ts-expect-error it's fine
      this.props.position.lng !== prevProps.position.lng
    ) {
      // @ts-expect-error I need to check this later. Not sure how to fix ts errors here
      if (this.marker) {
        // @ts-expect-error I need to check this later. Not sure how to fix ts errors here
        this.marker.setMap(null)
      }
      // @ts-expect-error I need to check this later. Not sure how to fix ts errors here
      this.renderMarker()
    }
  }
}

export default CustomMarker
