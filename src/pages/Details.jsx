import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { searchByCountry } from '../config';
import { Button } from '../components/Button';
import Info from '../components/Info';

const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = React.useState(null);

  React.useEffect(() => {
    const fetchCountry = async () => {
      const response = await axios.get(searchByCountry(name));
      setCountry(response.data[0]);
    };
    fetchCountry();
  }, [name]);

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {country && <Info navigate={navigate} {...country} />}
    </div>
  );
};

export default Details;
