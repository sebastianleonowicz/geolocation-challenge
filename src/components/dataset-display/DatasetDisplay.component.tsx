import React from 'react';

import { fetchGeoJSON } from '@/screens/home-page/HomePage.slice';
import { useAppDispatch, useTypedSelector } from '@/store';
import { DisplayFeatureRow } from '@/components';
import './DatasetDisplay.styles.css';

export const DatasetDisplay = () => {
  const dispatch = useAppDispatch();
  const { coordinateBounds, geoJson } = useTypedSelector((state) => state.homePage);

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
        <ul className='datasetDisplay_featureList'>
        {geoJson && geoJson.features.map((feature) => {
            const id = String(feature.id);
            return (
                <DisplayFeatureRow
                    key={id}
                    featureType={id.split('/')[0]}
                    featureId={id.split('/')[1]}
                    /**
                    * { FeatureCollection } from 'geojson' is missing optional name key in properties
                    */
                    //@ts-ignore
                    featureName={feature.properties.name}
                />
            )
        })}
        </ul>
      </>
  )
};