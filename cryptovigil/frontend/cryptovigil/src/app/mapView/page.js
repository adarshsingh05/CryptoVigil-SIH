"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const MapView = () => {
  const searchParams = useSearchParams();
  const [ip, setIp] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ipParam = searchParams.get('ip'); // Get 'ip' query parameter
    if (ipParam) {
      setIp(ipParam);
      
      // Fetch data from API using the IP address
      const fetchLocationData = async () => {
        try {
          const response = await fetch(`http://api.ipstack.com/${ipParam}?access_key=35a8f5a87c5e5cc158144016e7252821`);
          const data = await response.json();
          setLocationData(data); // Set the API data
        } catch (error) {
          console.error('Error fetching location data:', error);
        } finally {
          setLoading(false); // Set loading to false when done
        }
      };

      fetchLocationData();
    }
  }, [ip, searchParams]);

  return (
    <div>
      <h1>Location Information</h1>
      {loading ? (
        <p>Loading location data...</p>
      ) : locationData ? (
        <div>
          <p>IP Address: {ip}</p>
          <p>Country: {locationData.country_name}</p>
          <p>Region: {locationData.region_name}</p>
          <p>City: {locationData.city}</p>
          <p>Latitude: {locationData.latitude}</p>
          <p>Longitude: {locationData.longitude}</p>

          <Link href={`https://www.google.com/maps/@${locationData.latitude},${locationData.longitude},3082m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI0MTIwOS4wIKXMDSoASAFQAw%3D%3D`}>
          Track
          </Link>
        </div>
       
      ) : (
        <p>Error fetching location data.</p>
      )}
    </div>
  );
};

export default MapView;
