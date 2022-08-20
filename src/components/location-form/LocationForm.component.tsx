import React from 'react';

interface LocationFormProps {
	locationQuery: string,
	setLocationQuery: (newQuery: string) => void,
	handleCheckLocation: () => void,
}

export const LocationForm = ({ locationQuery, setLocationQuery, handleCheckLocation }: LocationFormProps) => {
	return (
		<>
			<label htmlFor="locationQuery">Location:</label>
			<input
				defaultValue={locationQuery}
				type="text"
				id='locationQuery'
				onChange={(event) => setLocationQuery(event.target.value)}
			/>
			<button
				onClick={handleCheckLocation}
				disabled={!locationQuery}
			>
				Check location
			</button>
		</>
	)
}
