import axios from 'axios';
import osmtogeojson from 'osmtogeojson';

export const getGeoJsonFeatures = async (minLng: number, minLat: number, maxLon: number, maxLat: number): Promise<Record<string, unknown>> => {
	console.log('minLng', minLng, 'minLat', minLat, 'maxLon', maxLon, 'maxLat', maxLat)
	const { data } = await axios.get(
		`https://www.openstreetmap.org/api/0.6/map?bbox=${minLng},${minLat},${maxLon},${maxLat}`,
	)

	/**
	 * missing osmtogeojson typings
	 */
	// @ts-ignore
	return osmtogeojson(data);
}
