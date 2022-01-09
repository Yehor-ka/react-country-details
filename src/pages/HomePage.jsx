import React from 'react';
import Controls from '../components/Controls';
import List from '../components/List';
import { Loader } from '../components/Loader';
import axios from 'axios';
import { ALL_COUNTRIES } from '../config';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, .2);
`;

const HomePage = ({ countries, setCounties }) => {
  const navigate = useNavigate();
  const [filteredCountries, setFilteredCountries] = React.useState(countries);

  React.useEffect(() => {
    if (!countries.length) {
      const fetchCountries = async () => {
        const response = await axios.get(ALL_COUNTRIES);
        setCounties(response.data);
      };
      fetchCountries();
    }
  }, []);

  React.useEffect(() => {
    handleSearch();
  }, [countries]);

  const handleSearch = (search, region) => {
    let data = [...countries];

    if (region) {
      data = data.filter((c) => c.region.includes(region));
    }

    if (search) {
      data = data.filter((c) => c.name.toLowerCase().includes(search.toLowerCase().trim()));
    }

    setFilteredCountries(data);
  };

  return (
    <>
      {countries.length ? (
        <>
          <Controls onSearch={handleSearch} />
          <List>
            {filteredCountries.map((country) => {
              const countyInfo = {
                img: country.flags.png,
                name: country.name,
                info: [
                  { title: 'Population', description: country.population.toLocaleString() },
                  { title: 'Region', description: country.region },
                  { title: 'Capital', description: country.capital },
                ],
              };
              return (
                <Card
                  key={country.name}
                  {...countyInfo}
                  onClick={() => navigate(`/country/${country.name}`)}
                />
              );
            })}
          </List>
        </>
      ) : (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
    </>
  );
};

export default HomePage;
