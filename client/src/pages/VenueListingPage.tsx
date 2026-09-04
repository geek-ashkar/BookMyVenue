import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import VenueCard from "../components/VenueCard";
import "./VenueListingPage.css";

type Venue = {
  id: number;
  name: string;
  category: string;
  city: string;
  capacity: number;
  base_price: string;
  thumbnail: string | null;
};

function VenueListingPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );

  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await api.get("/venues");
        setVenues(response.data.venues);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const cities = [...new Set(venues.map((v) => v.city))];

  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      const matchesSearch =
        venue.name.toLowerCase().includes(search.toLowerCase()) ||
        venue.city.toLowerCase().includes(search.toLowerCase()) ||
        venue.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "" || venue.category === category;

      const matchesCity =
        city === "" || venue.city === city;

      const venuePrice = Number(venue.base_price);

      const matchesPrice =
        price === "" ||
        (price === "under500" && venuePrice < 500) ||
        (price === "500-1000" &&
          venuePrice >= 500 &&
          venuePrice <= 1000) ||
        (price === "1000-5000" &&
          venuePrice >= 1000 &&
          venuePrice <= 5000) ||
        (price === "5000+" && venuePrice > 5000);

      const matchesCapacity =
        capacity === "" ||
        (capacity === "1-100" &&
          venue.capacity <= 100) ||
        (capacity === "101-300" &&
          venue.capacity >= 101 &&
          venue.capacity <= 300) ||
        (capacity === "301-500" &&
          venue.capacity >= 301 &&
          venue.capacity <= 500) ||
        (capacity === "500+" &&
          venue.capacity > 500);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCity &&
        matchesPrice &&
        matchesCapacity
      );
    });
  }, [venues, search, category, city, price, capacity]);

  if (loading) {
    return (
      <h2 className="loading">
        Loading venues...
      </h2>
    );
  }

  return (
    <div className="venue-page">

      <div className="page-header">

        <h1>Browse Venues</h1>

        <p>
          Discover the perfect venue for weddings,
          meetings, conferences and celebrations.
        </p>

      </div>

      <div className="filter-container">

        <input
          type="text"
          placeholder="Search venue..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="">
            All Categories
          </option>

          <option value="banquet_hall">
            Banquet Hall
          </option>

          <option value="conference_hall">
            Conference Hall
          </option>

          <option value="meeting_room">
            Meeting Room
          </option>

          <option value="studio">
            Studio
          </option>

          <option value="rooftop">
            Rooftop
          </option>

          <option value="cafe_space">
            Cafe Space
          </option>

          <option value="auditorium">
            Auditorium
          </option>

        </select>

        <select
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
        >

          <option value="">
            All Cities
          </option>

          {cities.map((city) => (
            <option
              key={city}
              value={city}
            >
              {city}
            </option>
          ))}

        </select>

        <select
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        >

          <option value="">
            Any Price
          </option>

          <option value="under500">
            Under €500
          </option>

          <option value="500-1000">
            €500 - €1000
          </option>

          <option value="1000-5000">
            €1000 - €5000
          </option>

          <option value="5000+">
            Above €5000
          </option>

        </select>

        <select
          value={capacity}
          onChange={(e) =>
            setCapacity(e.target.value)
          }
        >

          <option value="">
            Any Capacity
          </option>

          <option value="1-100">
            1 - 100
          </option>

          <option value="101-300">
            101 - 300
          </option>

          <option value="301-500">
            301 - 500
          </option>

          <option value="500+">
            500+
          </option>

        </select>

      </div>

      <div className="results-count">
        {filteredVenues.length} venue
        {filteredVenues.length !== 1 && "s"} found
      </div>

      {filteredVenues.length === 0 ? (

        <div className="empty-state">

          <h2>No venues found</h2>

          <p>
            Try changing your search or filters.
          </p>

        </div>

      ) : (

        <div className="venue-grid">

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

export default VenueListingPage;