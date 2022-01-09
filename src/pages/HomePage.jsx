import React from 'react';
import Controls from '../components/Controls';
import List from '../components/List';
import axios from 'axios';
import { ALL_COUNTRIES } from '../config';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

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

  const handleSearch = (search, region) => {
    let data = [...countries];

    if(region) {
        data = data.filter(c => c.region.includes(region))
    }

    if(search) {
        data = data.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase().trim()))
    }

    setFilteredCountries(data)
  }

  

  return (
    <>
      <Controls onSearch={handleSearch} />
      <List>
        {filteredCountries.map((country) => {
          const countyInfo = {
            img: country.flags.png,
            name: country.name.common,
            info: [
              { title: 'Population', description: country.population.toLocaleString() },
              { title: 'Region', description: country.region },
              { title: 'Capital', description: country.capital },
            ],
          };
          return (
            <Card
              key={country.name.common}
              {...countyInfo}
              onClick={() => navigate(`/country/${country.name.common}`)}
            />
          );
        })}
      </List>
    </>
  );
};

export default HomePage;
