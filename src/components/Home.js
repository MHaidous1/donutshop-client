import React, {useState, useEffect} from 'react';
import '../App.css';
import Donut from "./Donut";

function Home() {

  const [donuts, setDonuts] = useState([]);
  const getUrl = "http://localhost:8080/projects/donut-shop/server/getDonuts.php";

  //This use effect will fetch the donuts from the backend
  useEffect(() => {

    fetch(getUrl)
      .then(response => response.json())
      .then(data => setDonuts(data))
      .catch(error => console.error('Error fetching donuts: ', error));
  }, []);

  return (
    <div className="Home">

      <h1>Donut Selection</h1>
      <div className='donut-list'>
        {donuts.map(donut => (
          <Donut key={donut.ID} name={donut.Name} description={donut.Description} price={donut.Price} />
        ))}
      </div>

        <footer>
          <p className='copyright'>© Copyright 2024 Dom's Donuts LLC</p>
        </footer>

    </div>
  );
}

export default Home;
