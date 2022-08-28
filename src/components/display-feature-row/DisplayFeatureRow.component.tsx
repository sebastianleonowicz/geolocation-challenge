import React from 'react';

import './DisplayFeatureRow.styles.css'

interface DisplayFeatureRowProps {
    featureType: string,
    featureId: string,
    featureName: string,
}

export const DisplayFeatureRow = ({ featureType, featureId, featureName }: DisplayFeatureRowProps) => {
    return (
        <li>
            <p
                className='featureRow_paragraph'
            >
                {featureType} <span className='featureRow_span'>{featureId} {featureName ?? featureName}</span>
            </p>
        </li>
    )
}