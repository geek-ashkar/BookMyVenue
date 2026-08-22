import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import VenueCard from "./VenueCard";
import "./CustomerDashboard.css";
import { useAuth } from "../../context/AuthContext";

type Venue = {
  id: number;
  name: string;
  category: string;
  city: string;
  capacity: number;
  base_price: string;
  thumbnail: string | null;

};

function CustomerDashboard() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [capacityRange, setCapacityRange] = useState("");
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await api.get("/venues");

        setVenues(response.data.venues);
      } catch (error) {
        console.error(error);
        setError("Failed to load venues.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  
  if (loading) {
    return <h2>Loading venues...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

const filteredVenues = venues.filter((venue) => {
  const matchesSearch =
    venue.name.toLowerCase().includes(search.toLowerCase());

  const matchesCategory =
    category === "" || venue.category === category;

  const matchesCity =
    city === "" || venue.city === city;

  const price = Number(venue.base_price);

  const matchesPrice =
    priceRange === "" ||
    (priceRange === "under500" && price < 500) ||
    (priceRange === "500-1000" && price >= 500 && price <= 1000) ||
    (priceRange === "1000-5000" && price >= 1000 && price <= 5000) ||
    (priceRange === "5000+" && price > 5000);
  
  const capacity = venue.capacity;
  const matchesCapacity =
    capacityRange === "" ||
    (capacityRange === "1-100" && capacity >= 1 && capacity <= 100) ||
    (capacityRange === "101-300" && capacity >= 101 && capacity <= 300) ||
    (capacityRange === "301-500" && capacity >= 301 && capacity <= 500) ||
    (capacityRange === "500+" && capacity > 500);


  return matchesSearch && matchesCategory && matchesCity && matchesPrice && matchesCapacity;
});

const cities = [...new Set(venues.map((venue) => venue.city))];

  return (
    <div style={{ padding: "20px" }}>
     <div className="dashboard-top">

  <div className="dashboard-header">

    <h1>Welcome back, {user?.name} 👋</h1>

    <p>Find the perfect venue for your next event.</p>

  </div>

  <button
    className="my-bookings-btn"
    onClick={() => navigate("/customer/my-bookings")}
  >
    📅 My Bookings
  </button>

  </div>  
    
      <div className="filter-bar">

  <div className="filter-row">

    <input
      className="search-input"
      type="text"
      placeholder="Search venues..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <select
      className="category-filter"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      <option value="conference_hall">Conference Hall</option>
      <option value="banquet_hall">Banquet Hall</option>
      <option value="studio">Studio</option>
      <option value="meeting_room">Meeting Room</option>
      <option value="cafe_space">Cafe Space</option>
      <option value="rooftop">Rooftop</option>
      <option value="auditorium">Auditorium</option>
    </select>

  </div>

  <div className="filter-row">

    <select
      className="city-filter"
      value={city}
      onChange={(e) => setCity(e.target.value)}
    >
      <option value="">All Cities</option>

      {cities.map((cityName) => (
        <option
          key={cityName}
          value={cityName}
        >
          {cityName.charAt(0).toUpperCase() +
            cityName.slice(1)}
        </option>
      ))}

    </select>

    <select
      className="price-filter"
      value={priceRange}
      onChange={(e) => setPriceRange(e.target.value)}
    >
      <option value="">Any Price</option>
      <option value="under500">Under €500</option>
      <option value="500-1000">€500 - €1000</option>
      <option value="1000-5000">€1000 - €5000</option>
      <option value="5000+">Above €5000</option>
    </select>

    <select
      className="capacity-filter"
      value={capacityRange}
      onChange={(e) => setCapacityRange(e.target.value)}
    >
      <option value="">Any Capacity</option>
      <option value="1-100">1 - 100</option>
      <option value="101-300">101 - 300</option>
      <option value="301-500">301 - 500</option>
      <option value="500+">500+</option>
    </select>

  </div>

</div>

    {venues.length === 0 ? (
  <p>No venues available.</p>
) : (
  <div className="venues-grid">

    {filteredVenues.map((venue) => (
      <VenueCard
        key={venue.id}
        venue={venue}
      />
    ))}

  </div>
)}
    
    </div>
  );
}

export default CustomerDashboard;