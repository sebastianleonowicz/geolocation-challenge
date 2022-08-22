import axios from "axios";
import osmtogeojson from "osmtogeojson";

export const getGeoJsonFeatures = async (minLon: number, minLat: number, maxLon: number, maxLat: number) => {
	const { data } = await axios.get(
		`https://www.openstreetmap.org/api/0.6/map?bbox=${minLon},${minLat},${maxLon},${maxLat}`,
		{
			//@ts-ignore
			'Content-Type': 'application/xml; charset=utf-8'
		}
	)

	const geoJSON = osmtogeojson(data)
	console.log('geoJSON', geoJSON)
	return geoJSON;
}
