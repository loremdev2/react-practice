
import React, { useEffect, useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import axios from 'axios';
interface LocationData {
    ip: string;
    city: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
}
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


const IPFinder: React.FC = () => {

    const [location, setLocation]= useState<LocationData | null>(null);
    const [error, setError] = useState<string | null>(null);


    useEffect(()=>{
        const fetchLocation = async ()=>{
            try{
                const ipResponse= await axios.get("https://api64.ipify.org?format=json");
                const userIp= ipResponse.data.ip;

                const locationResponse= await axios.get(`https://ipapi.co/${userIp}/json/`);

                const data= locationResponse.data;
                setLocation({
                    ip: userIp,
                    city: data.city,
                    region: data.region,
                    country: data.country_name,
                    latitude: parseFloat(data.latitude),
                    longitude: parseFloat(data.longitude),
                  });
            }catch(err){
                setError("Error fetching location data");
            }
        };
        fetchLocation();
    },[]);


    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>IP Address Finder</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            {location ? (
                <>
                    <p><strong>IP Address:</strong> {location.ip}</p>
                    <p><strong>Location:</strong> {location.city}, {location.region}, {location.country}</p>
                    {/* Google Maps */}
          <APIProvider apiKey={GOOGLE_MAPS_API_KEY || ''}>
            <Map
              defaultCenter={{ lat: location.latitude, lng: location.longitude }}
              defaultZoom={12}
              style={{ width: "100%", height: "400px" }}
            >
              <Marker position={{ lat: location.latitude, lng: location.longitude }} />
            </Map>
          </APIProvider>
                </>
            ):(
                <p>Fetching IP address and location</p>
            )}
        </div>
    )
}

export default IPFinder;