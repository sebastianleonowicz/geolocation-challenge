import React from 'react';

import { fetchGeoJSON } from '@/screens/home-page/HomePage.slice';
import { useAppDispatch, useTypedSelector } from '@/store';
import './DatasetDisplay.styles.css';

export const DatasetDisplay = () => {
  const dispatch = useAppDispatch();
  const { coordinateBounds, geoJson } = useTypedSelector((state) => state.homePage);
  console.log('geoJson', geoJson);
  console.log('length', geoJson?.features.length);
  return (
      <>
        <button
            className='datasetDisplay_fetchButton'
            onClick={() => dispatch(fetchGeoJSON())}
        >
            Fetch Geojson
        </button>
        <p
            className='datasetDisplay_paragraph'
        >
            Set Coordinates([lat, lng]):
        </p>
        <p
            className='datasetDisplay_paragraph'
        >
            [{coordinateBounds.southWest.lat}, {coordinateBounds.southWest.lng}],
            [{coordinateBounds.northEast.lat}, {coordinateBounds.northEast.lng}]
        </p>
        <ul style={{
            overflow: 'scroll',
            height: 'calc(100% - 10rem)',
        }}>
        {geoJson && geoJson.features.map((feature) => {
          return (
              <li>
                  <p>{feature.type}</p>
              </li>
          )
        })}
        </ul>
      </>
  )
};