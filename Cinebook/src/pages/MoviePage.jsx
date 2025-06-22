import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MoviePage.css";

const MoviePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [watchProviders, setWatchProviders] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);

  // Using environment variables
 // Replace the process.env lines with:
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TMDB_IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE;
  // Helper function to get complete image URL
  const getImageUrl = (path, size = "w500") => {
    if (!path) return "https://via.placeholder.com/300x450?text=No+Poster";
    return `${TMDB_IMAGE_BASE}${size}${path}`;
  };

  // Fetch trending movies
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}`
        );
        setTrendingMovies(response.data.results.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch trending movies:", err);
        setError("Couldn't load trending movies");
      }
    };
    fetchTrendingMovies();
  }, []);

  // Search movies using TMDb
  const searchMovies = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setSelectedMovie(null);

    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
      );
      setMovies(response.data.results);
    } catch (err) {
      setError("Failed to search movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Generate streaming service links
  const getStreamingLink = (providerName, movieTitle) => {
    const encodedTitle = encodeURIComponent(movieTitle);
    switch (providerName.toLowerCase()) {
      case 'netflix':
        return `https://www.netflix.com/search?q=${encodedTitle}`;
      case 'prime video':
        return `https://www.primevideo.com/search?phrase=${encodedTitle}`;
      case 'hotstar':
        return `https://www.hotstar.com/in/search?q=${encodedTitle}`;
      default:
        return `https://www.google.com/search?q=${encodedTitle}+${providerName}+streaming`;
    }
  };

  // Fetch movie details from TMDb
  const fetchMovieDetails = async (id) => {
    setLoading(true);
    setError("");
    
    try {
      const [detailsResponse, providersResponse] = await Promise.all([
        axios.get(`${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`),
        axios.get(`${TMDB_BASE_URL}/movie/${id}/watch/providers?api_key=${TMDB_API_KEY}`)
      ]);

      const movieData = detailsResponse.data;
      setSelectedMovie(movieData);
      
      // Format watch providers with proper links
      const providers = providersResponse.data.results?.IN || {};
      setWatchProviders({
        streaming: providers.flatrate?.map(p => ({
          name: p.provider_name,
          logo: p.logo_path ? getImageUrl(p.logo_path, "w45") : null,
          link: getStreamingLink(p.provider_name, movieData.title)
        })) || [],
        theaters: providers.buy?.map(p => ({
          name: p.provider_name,
          logo: p.logo_path ? getImageUrl(p.logo_path, "w45") : null,
          link: `https://www.google.com/search?q=${encodeURIComponent(movieData.title)}+${encodeURIComponent(p.provider_name)}+tickets`
        })) || [],
      });
    } catch (err) {
      setError("Failed to load movie details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(searchTerm);
  };

  return (
    <div className="movie-db-container">
      <h1>🎬 Movies & Showtimes</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {/* Trending Movies */}
      {!searchTerm && !selectedMovie && (
        <div className="trending-section">
          <h2>🔥 Trending Now</h2>
          <div className="trending-movies">
            {trendingMovies.map((movie) => (
              <div
                key={movie.id}
                className="trending-movie"
                onClick={() => fetchMovieDetails(movie.id)}
              >
                <img
                  src={getImageUrl(movie.poster_path, "w300")}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200x300?text=No+Poster";
                  }}
                />
                <h3>{movie.title} ({movie.release_date?.substring(0, 4)})</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchTerm && !selectedMovie && movies.length > 0 && (
        <div className="movie-list">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => fetchMovieDetails(movie.id)}
            >
              <img
                src={getImageUrl(movie.poster_path, "w200")}
                alt={movie.title}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150x225?text=No+Poster";
                }}
              />
              <h3>{movie.title} ({movie.release_date?.substring(0, 4)})</h3>
            </div>
          ))}
        </div>
      )}

      {/* Movie Details */}
      {selectedMovie && (
        <div className="movie-details">
          <button onClick={() => setSelectedMovie(null)}>← Back</button>
          <h2>{selectedMovie.title} ({selectedMovie.release_date?.substring(0, 4)})</h2>
          <div className="details-content">
            <img
              src={getImageUrl(selectedMovie.poster_path, "w500")}
              alt={selectedMovie.title}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x450?text=No+Poster";
              }}
            />
            <div className="details-text">
              <p><strong>Rating:</strong> {selectedMovie.vote_average}/10</p>
              <p><strong>Plot:</strong> {selectedMovie.overview || "No overview available."}</p>
              
              {/* Watch Providers */}
              <div className="watch-providers">
                <h3>Where to Watch:</h3>
                
                {watchProviders?.streaming?.length > 0 ? (
                  <div className="streaming">
                    <h4>Streaming:</h4>
                    <div className="providers-list">
                      {watchProviders.streaming.map((provider) => (
                        <a
                          key={provider.name}
                          href={provider.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="provider"
                        >
                          {provider.logo && (
                            <img 
                              src={provider.logo} 
                              alt={provider.name}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          )}
                          <span>{provider.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>No streaming options found.</p>
                )}

                {watchProviders?.theaters?.length > 0 ? (
                  <div className="theaters">
                    <h4>Theaters:</h4>
                    <div className="providers-list">
                      {watchProviders.theaters.map((provider) => (
                        <a
                          key={provider.name}
                          href={provider.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="provider"
                        >
                          {provider.logo && (
                            <img 
                              src={provider.logo} 
                              alt={provider.name}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          )}
                          <span>{provider.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>Not currently in theaters.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;