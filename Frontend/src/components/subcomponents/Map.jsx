import { useMap, MapContainer, TileLayer} from "react-leaflet";

const Animation = () => {
  const map = useMap();
    
  map.flyTo([51.2562,7.150], 9);
  return <></>
}


const Map = ({opacity}) => {
  
    return ( <>
    {       
    <MapContainer center={[53.2562,9.150]} zoom={3} style={{height: "100vh"}}
      doubleClickZoom= {false} 
      closePopupOnClick= {false} 
      dragging= {true}
      zoomSnap= {false} 
      zoomDelta= {false} 
      trackResize= {false}
      touchZoom= {false}
      scrollWheelZoom= {false}
      zoomControl={false}
    >
      <Animation />
    
    <TileLayer
      url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      attribution= {`&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,
        &copy; <a href="https://carto.com/attributions">CARTO</a>`}
      opacity={opacity} 
    />


 
 </MapContainer>
  }
    
    
    </> );
}
 
export default Map;