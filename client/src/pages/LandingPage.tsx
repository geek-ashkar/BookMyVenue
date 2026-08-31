  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { Link } from "react-router-dom";
  import api from "../services/api";
  import "./LandingPage.css";
  import heroImage from "../assets/hero.png";

  import {
    FaBuilding,
    FaGlassCheers,
    FaUsers,
    FaCoffee,
    FaCity,
    FaMicrophone,
    FaCamera,
    FaTree,
    FaUmbrellaBeach,
    FaCheckCircle,
    FaShieldAlt,
    FaBolt,
    FaHeadset,
    FaMapMarkerAlt,
    FaCalendarCheck,
    FaStar,
    FaPhoneAlt,
  } from "react-icons/fa";

  import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
    FaEnvelope,
  } from "react-icons/fa6";

  const categories = [
    {
      title: "Banquet Hall",
      value: "banquet_hall",
      icon: <FaGlassCheers />,
      description: "Perfect for weddings and celebrations.",
    },
    {
      title: "Conference Hall",
      value: "conference_hall",
      icon: <FaBuilding />,
      description: "Professional spaces for conferences and seminars.",
    },
    {
      title: "Meeting Hall",
      value: "meeting_hall",
      icon: <FaUsers />,
      description: "Ideal for meetings and business discussions.",
    },
    {
      title: "Auditorium",
      value: "auditorium",
      icon: <FaMicrophone />,
      description: "Large venues for performances and events.",
    },
    {
      title: "Studio",
      value: "studio",
      icon: <FaCamera />,
      description: "Photography and creative production spaces.",
    },
    {
      title: "Cafe Space",
      value: "cafe_space",
      icon: <FaCoffee />,
      description: "Cozy cafés for private gatherings.",
    },
    {
      title: "Rooftop",
      value: "rooftop",
      icon: <FaCity />,
      description: "Beautiful rooftop venues with city views.",
    },
    {
      title: "Open Space",
      value: "open_space",
      icon: <FaTree />,
      description: "Spacious open venues for every occasion.",
    },
    {
      title: "Outdoor Event Space",
      value: "outdoor_event_space",
      icon: <FaUmbrellaBeach />,
      description: "Perfect outdoor venues for memorable events.",
    },
  ];

  type Venue = {
    id: number;
    name: string;
    city: string;
    category: string;
    capacity: number;
    base_price: string;
    thumbnail: string | null;
  };

  const features = [
    {
      icon: <FaCheckCircle />,
      title: "Verified Venues",
      description:
        "100% verified event spaces.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Booking",
      description:
        "Safe and secure reservations.",
    },
    {
      icon: <FaBolt />,
      title: "Instant Booking",
      description:
        "Book your venue in minutes.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description:
        "We're here whenever you need us.",
    },
  ];

  const statistics = [
    {
      number: "500+",
      title: "Venues",
      icon: <FaBuilding />,
    },
    {
      number: "20+",
      title: "Cities",
      icon: <FaMapMarkerAlt />,
    },
    {
      number: "10K+",
      title: "Bookings",
      icon: <FaCalendarCheck />,
    },
    {
      number: "98%",
      title: "Customer Satisfaction",
      icon: <FaStar />,
    },
  ];

  function LandingPage() {
    const navigate = useNavigate();
    const [featuredVenues, setFeaturedVenues] = useState<Venue[]>([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

    const fetchFeaturedVenues = async () => {

      try {
              const response = await api.get("/venues/featured");

              setFeaturedVenues(response.data.venues);
              } catch (error) {
              console.error(error);
              }
          };
          fetchFeaturedVenues();

          }, []);

    return (
      <>
        {/* Navbar */}

        <header className="landing-navbar">

          <div className="logo">
            <h2>BookMyVenue</h2>
          </div>

          <nav>
            <a href="/">Home</a>
            <Link to="/venues">Venues</Link>
            <a href="#categories">Categories</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="nav-buttons">

            <button
              className="host-btn"
              onClick={() => navigate("/register/owner")}
            >
              Register My Venue
            </button>

            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          </div>

        </header>

        {/* Hero */}

        <section
          className="hero-section"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="hero-overlay">

            <h1>
              Find the Perfect Venue
              
            </h1>

            <p>
              Discover banquet halls, conference rooms, studios,
              cafés and outdoor venues.
            </p>

            <div className="hero-search">

              <input
                  type="text"
                  placeholder="Search venues, cities or categories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                      if (e.key === "Enter") {
                      if (search.trim()) {
                          navigate(`/venues?search=${encodeURIComponent(search.trim())}`);
                      } else {
                          navigate("/venues");
                      }
                      }
                  }}
              />

              <button
                  onClick={() => {
                      if (search.trim()) {
                      navigate(`/venues?search=${encodeURIComponent(search.trim())}`);
                      } else {
                      navigate("/venues");
                      }
                  }}
                  >
                  Search
              </button>

            </div>

          </div>
        </section>

        {/* Categories */}

        <section
          id="categories"
          className="categories-section"
        >

          <h2>Browse by Categories</h2>

          <p>
            Find the perfect venue for every occasion
          </p>

          <div className="categories-grid">

            {categories.map((category) => (

              <div key={category.value}
                  className="category-card"
                  onClick={() =>
                      navigate(`/venues?category=${category.value}`)}>
                <div className="category-icon">
                  {category.icon}
                </div>

                <h3>{category.title}</h3>

                <p>{category.description}</p>

              </div>

            ))}

          </div>

        </section>

        <section  id="venues"
              className="featured-section"
          >
              <h1>Featured Venues</h1>
              <p>
                  Explore our most popular event spaces.
              </p>
              <div className="featured-grid">
                  {featuredVenues.map((venue) => (
                      <div
                          key={venue.id}
                          className="featured-card"
                      >
                        <img
                              src={`http://localhost:5001/${venue.thumbnail}`}
                              alt={venue.name}
                              onError={(e) => {
                                  console.log("Image failed:", e.currentTarget.src);
                              }}
                          />

                          <div className="featured-body">

                              <h3>{venue.name}</h3>

                              <p>📍 {venue.city}</p>

                              <p>{venue.category.replaceAll("_", " ")}</p>

                              <p>👥 {venue.capacity} Guests</p>

                              <h4>
                                  €{Number(venue.base_price).toLocaleString()}
                              </h4>

                              <button
                                      onClick={() => navigate(`/venues/${venue.id}`)} >
                                      View Details
                                  </button>
                          </div>
                      </div>
                  ))}
              </div>
          </section>

          <section className="features-section">

              <h2>Why Choose BookMyVenue?</h2>

              <p>
                  Everything you need to find and book the perfect venue with confidence.
              </p>

              <div className="features-grid">

                  {features.map((feature) => (

                      <div
                          className="feature-card"
                          key={feature.title}
                      >

                          <div className="feature-icon">
                              {feature.icon}
                          </div>

                          <h3>{feature.title}</h3>

                          <p>{feature.description}</p>

                      </div>

                  ))}

              </div>

          </section>

          <section className="stats-section">

              <h2>Trusted by Thousands</h2>

              <p>
                  Thousands of customers trust BookMyVenue to find the perfect event space.
              </p>

              <div className="stats-grid">

                  {statistics.map((stat) => (

                      <div
                          key={stat.title}
                          className="stat-card"
                      >

                          <div className="stat-icon">
                              {stat.icon}
                          </div>

                          <h3>{stat.number}</h3>

                          <p>{stat.title}</p>

                      </div>

                  ))}

              </div>

          </section>

              <footer
                  id="contact"
                  className="footer">

                  <div className="footer-container">

                      <div className="footer-about">

                          <h2>BookMyVenue</h2>

                          <p>
                              Find and book the perfect venue for weddings,
                              conferences, meetings and memorable events.
                          </p>

                          <div className="social-icons">

                              <a href="#">
                                  <FaFacebookF />
                              </a>

                              <a href="#">
                                  <FaInstagram />
                              </a>

                              <a href="#">
                                  <FaLinkedinIn />
                              </a>

                              <a href="#">
                                  <FaXTwitter />
                              </a>

                          </div>

                      </div>

                      <div className="footer-links">

                          <h3>Quick Links</h3>

                          <Link to="/">Home</Link>
                          <Link to="/venues">Venues</Link>
                          <a href="#categories">Categories</a>
                          <a href="#about">About</a>
                          <a href="#contact">Contact</a>

                      </div>

                      <div className="footer-links">

                          <h3>Categories</h3>

                          <a href="#">Banquet Hall</a>
                          <a href="#">Conference Hall</a>
                          <a href="#">Meeting Hall</a>
                          <a href="#">Auditorium</a>
                          <a href="#">Outdoor Space</a>

                      </div>

                      <div className="footer-contact">

                          <h3>Contact</h3>

                          <p>
                              <FaEnvelope />
                              support@bookmyvenue.com
                          </p>

                          <p>
                              <FaPhoneAlt />
                              +49 123 456 789
                          </p>

                          <p>
                              <FaMapMarkerAlt />
                              Berlin, Germany
                          </p>

                      </div>

                  </div>

                  <div className="footer-bottom">

                      © 2026 BookMyVenue. All Rights Reserved.

                  </div>

              </footer>

          

      </>
    );
  }

  export default LandingPage;