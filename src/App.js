import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  // Define useState values
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([]);

  // Create a single list removal function
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  }

  // Create Async function to toggle useState values
  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
      // console.log(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  // Create a useEffect to run once
  useEffect(() => {
    fetchTours();
    // return () => {
    //   cleanup
    // }
  }, [])
  
  // Set Loading to a spinner to indicate working behind the scenes
  if(loading){
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if(tours.length === 0){
    return (
      <main>
        <div className="title">
            <h2>No Tours Left</h2>
            <div className="underline"></div>
            <button className="btn" onClick={() => fetchTours()}>Refresh</button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App
