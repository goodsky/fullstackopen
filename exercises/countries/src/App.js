import { useState, useEffect } from 'react'
import axios from 'axios'

const CapitalWeather = ({weather}) => {
  if (weather === undefined) {
    return (<div></div>);
  }

  const weatherIconId = weather.weather[0].icon;
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconId}@2x.png`;
  const weatherDescription = weather.weather[0].description;
  if (weather.weather.length > 1) {
    console.warn('Multiple weathers...', weather.weather);
  }

  const tempInFarenheit = weather.main.temp;
  const windSpeedInMph = weather.wind.speed;

  return (
    <div>
      <img src={weatherIconUrl} style={{ border: 'solid'}} />
      <div><b>right now:</b> {weatherDescription}</div>
      <div><b>temperature:</b> {Math.round(tempInFarenheit)} &deg;F</div>
      <div><b>wind:</b> {Math.round(windSpeedInMph)} mph</div>
    </div>
  );
}

const CountryPage = ({ country }) => {
  const countryName = country.name.common;
  const countryFlagUrl = country.flags.svg;
  const countryCapital = country.capital[0];
  if (country.capital.length > 1) {
    console.warn('Multiple capitals...', country.capital);
  }

  const countryPopulation = country.population.toLocaleString("en-US");

  const countryLanguages = Object.values(country.languages);
  
  const openweatherApiKey = process.env.REACT_APP_API_KEY;
  const openweatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryCapital}&units=imperial&appid=${openweatherApiKey}`;

  const [capitalWeather, setCapitalWeather] = useState(undefined);
  useEffect(() => {
    axios
      .get(openweatherUrl)
      .then(result => {
        console.log('Weather', result);
        setCapitalWeather(result.data);
      });
  }, []);

  return (
  <div>
    <h1>{countryName}</h1>

    <img src={countryFlagUrl} width='175' />

    <div><b>capital:</b> {countryCapital}</div>
    <div><b>population:</b> {countryPopulation}</div>

    <h2>Spoken Languages</h2>
    <ul>
      {countryLanguages.map(language => (
        <li key={language}>{language}</li>
      ))}
    </ul>

    <h2>Weather in {countryCapital}</h2>
    <CapitalWeather weather={capitalWeather} />
  </div>);
};

const CountryContent = ({ countries, setSearch }) => {
  if (countries.length === 1) {
    return (<CountryPage country={countries[0]} />)
  }

  if (countries.length > 10) {
    return (<div>Too many matches, specify another filter</div>);
  }

  return countries.map(country => (
    <div key={country.ccn3}>
      {country.name.common}
      <button onClick={() => setSearch(country.name.common)}>show</button>
      </div>
    ));
};

function App() {
  const countriesUrl = 'https://restcountries.com/v3.1/all';

  const [ search, setSearch ] = useState('');
  const [ countries, setCountries ] = useState([]);

  useEffect(() => {
    axios
      .get(countriesUrl)
      .then(result => {
        console.log(`Countries fetched from ${countriesUrl}`, result.data);
        setCountries(result.data);
      });
  }, []);

  const countryMatchesSearch = (country) => {
    const commonName = country.name.common.toLowerCase();
    const searchStr = search.toLowerCase();

    return commonName.includes(searchStr);
  };

  const countryFullyMatchesSearch = (country) => {
    const commonName = country.name.common.toLowerCase();
    const searchStr = search.toLowerCase();

    return commonName === searchStr;
  };

  let countriesToShow = countries.filter(countryMatchesSearch);

  // I know the instructions say to not worry about this... but I do worry!
  for (const country of countriesToShow) {
    if (countryFullyMatchesSearch(country)) {
      countriesToShow = [ country ];
    }
  }

  console.log('Query returned ', countriesToShow.length, 'countries');

  return (
    <>
      <div>
        <label htmlFor="findCountries">find countries: </label>
        <input id="findCountries" value={search} onChange={event => setSearch(event.target.value)} />
      </div>

      <CountryContent countries={countriesToShow} setSearch={setSearch} />
    </>
  );
}

export default App;
