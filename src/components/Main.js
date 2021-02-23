import React, { useState } from 'react';

import axios from 'axios';

import WeatherSearch from './WeatherSearch';

import Content from './Content';

import Context from '../Context';

import Error from './Error';

import TagLine from './TagLine';

import DateTime from './DateTime';

import WeatherData from './WeatherData';

import Header from './Header';

const Main = () => {
	const [weather, setWeather] = useState();

	const [city, setCity] = useState();

	const [error, setError] = useState();

	const api_call = async (e) => {
		e.preventDefault();

		const location = e.target.elements.location.value;

		if (!location) {
			setWeather(null);
			return setError('Please enter the name of the city');
		}

		const API_KEY = '16443f6f99a5eeb1a6246065e5cec72e';

		const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

		const request = axios.get(url);

		const response = await request;

		setWeather(response.data.main);

		setError(null);

		setCity(response.data.name);
	};

	return (
		<div className='main'>
			<Header />

			<Content>
				<DateTime />

				<TagLine />

				<Context.Provider value={{ api_call, weather, city, error }}>
					<WeatherSearch />

					{weather && <WeatherData />}

					{error && <Error />}
				</Context.Provider>
			</Content>
		</div>
	);
};

export default Main;
