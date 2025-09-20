import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

// Header Component
const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Primary Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-meesho-pink" style={{fontFamily: 'Arial, sans-serif'}}>Meesho</div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Try Saree, Kurti or Search by Product Code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-meesho-pink focus:border-meesho-pink text-sm"
                style={{fontSize: '14px'}}
              />
              <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-meesho-pink text-white rounded-r-sm hover:bg-pink-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-700 hover:text-meesho-pink flex flex-col items-center text-xs">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Profile</span>
            </button>
            <button className="text-gray-700 hover:text-meesho-pink flex flex-col items-center text-xs">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span>Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-meesho-pink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-6 py-2.5">
            <Link to="/" className="text-white hover:text-gray-200 px-2 py-1.5 text-sm font-medium">
              Home
            </Link>
            <Link to="/express" className="text-white hover:text-gray-200 px-2 py-1.5 text-sm font-medium flex items-center">
              <span className="mr-1">⚡</span>
              Meesho Express
            </Link>
            <button className="text-white hover:text-gray-200 px-2 py-1.5 text-sm font-medium">
              Women Ethnic
            </button>
            <button className="text-white hover:text-gray-200 px-2 py-1.5 text-sm font-medium">
              Women Western
            </button>
            <button className="text-white hover:text-gray-200 px-2 py-1.5 text-sm font-medium">
              Men
            </button>
            <button className="text-white hover:text-gray-200 px-2 py-1.5 text-sm font-medium">
              Kids
            </button>
            <button className="text-white hover:text-gray-200 px-2 py-1.5 text-sm font-medium">
              Home & Kitchen
            </button>
            <button className="text-white hover:text-gray-200 px-2 py-1.5 text-sm font-medium">
              Beauty & Health
            </button>
            <button className="text-white hover:text-gray-200 px-2 py-1.5 text-sm font-medium">
              Bags & Footwear
            </button>
            <button className="text-white hover:text-gray-200 px-2 py-1.5 text-sm font-medium">
              Electronics
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Express Product Card Component
const ExpressProductCard = ({ product, onSellerClick }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="aspect-square relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-meesho-pink text-white text-xs px-2 py-1 rounded-sm font-medium">
            ⚡ {product.deliveryTime}
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 leading-tight" style={{fontSize: '13px'}}>
          {product.name}
        </h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-meesho-pink" style={{fontSize: '16px'}}>₹{product.price}</span>
          <div className="flex items-center text-xs text-gray-500">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">4.2</span>
          </div>
        </div>
        <button
          onClick={() => onSellerClick(product.sellerId, product.seller)}
          className="text-xs text-gray-500 hover:text-meesho-pink cursor-pointer w-full text-left"
          style={{fontSize: '11px'}}
        >
          Sold by: {product.seller}
        </button>
      </div>
    </div>
  );
};

// Standard Product Card Component
const StandardProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="aspect-square relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-sm font-medium">
            {Math.floor(Math.random() * 50) + 10}% OFF
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 leading-tight" style={{fontSize: '13px'}}>
          {product.name}
        </h3>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-meesho-pink" style={{fontSize: '16px'}}>₹{product.price}</span>
            <span className="text-sm text-gray-500 line-through" style={{fontSize: '12px'}}>₹{Math.floor(product.price * 1.3)}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{product.rating}</span>
          </div>
        </div>
        <div className="text-xs text-gray-500" style={{fontSize: '11px'}}>
          {product.reviews} reviews
        </div>
      </div>
    </div>
  );
};

// Meesho Express Page
const MeeshoExpress = () => {
  const [expressProducts, setExpressProducts] = useState([]);
  const [filteredExpressProducts, setFilteredExpressProducts] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [locationSuccess, setLocationSuccess] = useState(false);

  const categories = [
    'All Products',
    'Electronics',
    'Fashion',
    'Grocery',
    'Home',
    'Beauty',
    'Kids'
  ];

  // Function to get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    setLocationLoading(true);
    setLocationError(null);
    setLocationSuccess(false);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Use reverse geocoding to get city name
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          
          const data = await response.json();
          const detectedCity = data.city || data.locality || data.principalSubdivision;
          
          // Try to match the detected city with available cities (case-insensitive)
          const matchedCity = availableCities.find(availableCity => 
            availableCity.toLowerCase() === detectedCity.toLowerCase()
          );
          
          if (matchedCity) {
            setSelectedCity(matchedCity);
            setLocationError(null);
            setLocationSuccess(true);
            // Hide success message after 3 seconds
            setTimeout(() => setLocationSuccess(false), 3000);
          } else {
            setLocationError(`Location detected: ${detectedCity}, but Meesho Express is not available in this city yet. Available cities: ${availableCities.join(', ')}`);
            setLocationSuccess(false);
          }
        } catch (err) {
          setLocationError('Failed to get location details');
          console.error('Error getting location:', err);
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        let errorMessage = 'Failed to get your location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
          default:
            errorMessage = 'Failed to get your location';
            break;
        }
        setLocationError(errorMessage);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  useEffect(() => {
    const fetchAvailableCities = async () => {
      try {
        const response = await axios.get('/api/products/express-cities');
        setAvailableCities(response.data);
        // Set default city to first available city
        if (response.data.length > 0) {
          setSelectedCity(response.data[0]);
        }
      } catch (err) {
        console.error('Error fetching cities:', err);
      }
    };

    fetchAvailableCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchExpressProducts(selectedCity);
    }
  }, [selectedCity]);

  const fetchExpressProducts = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/products/express?city=${city}`);
      setExpressProducts(response.data);
      setFilteredExpressProducts(response.data);
    } catch (err) {
      setError('Failed to fetch express products');
      console.error('Error fetching express products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All Products') {
      setFilteredExpressProducts(expressProducts);
    } else {
      const filtered = expressProducts.filter(product => 
        product.category === category
      );
      setFilteredExpressProducts(filtered);
    }
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setShowLocationModal(false);
  };

  const handleSellerClick = (sellerId, sellerName) => {
    // Navigate to seller page (simplified for now)
    alert(`Opening ${sellerName}'s store...`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-meesho-pink mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading express products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Express Banner */}
      <div className="bg-meesho-pink text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3 flex items-center justify-center" style={{fontSize: '28px'}}>
              <span className="mr-2">⚡</span>
              Meesho Express
            </h1>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <p className="text-base opacity-90" style={{fontSize: '16px'}}>
                Delivering to: {selectedCity || 'Select Location'}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={getUserLocation}
                  disabled={locationLoading}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-2"
                  style={{fontSize: '13px'}}
                >
                  {locationLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                      Detecting...
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Use My Location
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowLocationModal(true)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1.5 rounded text-sm font-medium transition-colors"
                  style={{fontSize: '13px'}}
                >
                  Change Location
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Status Messages */}
      {locationSuccess && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-800 text-sm">Location detected successfully! Showing products for {selectedCity}.</p>
            </div>
          </div>
        </div>
      )}

      {locationError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-yellow-800 text-sm">{locationError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Category Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex space-x-6 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`pb-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'text-meesho-pink border-b-2 border-meesho-pink'
                    : 'text-gray-600 hover:text-meesho-pink'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1" style={{fontSize: '20px'}}>
              {selectedCategory === 'All Products' ? 'Express Delivery Products' : `${selectedCategory} - Express Delivery`}
            </h2>
            <p className="text-gray-600 text-sm" style={{fontSize: '14px'}}>Get your favorite products delivered in minutes!</p>
          </div>
          <div className="text-sm text-gray-500">
            {loading ? 'Loading...' : `${filteredExpressProducts.length} products`}
          </div>
        </div>

        {expressProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {selectedCity ? 'No Express Delivery Available' : 'Select Your Location'}
            </h3>
            <p className="text-gray-500 mb-4">
              {selectedCity 
                ? `Meesho Express is not available in ${selectedCity} yet. We're expanding to more cities soon!`
                : 'Choose your city to see express delivery products'
              }
            </p>
            <button
              onClick={() => setShowLocationModal(true)}
              className="bg-meesho-pink text-white px-6 py-2 rounded hover:bg-pink-600 transition-colors"
            >
              {selectedCity ? 'Try Another City' : 'Select Location'}
            </button>
          </div>
        ) : filteredExpressProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-4">
              No {selectedCategory.toLowerCase()} products available for express delivery in {selectedCity}.
            </p>
            <button
              onClick={() => handleCategoryFilter('All Products')}
              className="bg-meesho-pink text-white px-6 py-2 rounded hover:bg-pink-600 transition-colors"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filteredExpressProducts.map((product) => (
              <ExpressProductCard
                key={product.id}
                product={product}
                onSellerClick={handleSellerClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Location Selection Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Select Your City</h3>
            
            {/* Location Detection Option */}
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">Quick Setup</p>
                  <p className="text-xs text-blue-700">Use your current location</p>
                </div>
                <button
                  onClick={getUserLocation}
                  disabled={locationLoading}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1"
                >
                  {locationLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                      Detecting...
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Detect
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCityChange(city)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedCity === city
                      ? 'border-meesho-pink bg-pink-50 text-meesho-pink'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{city}</span>
                    {selectedCity === city && (
                      <span className="text-meesho-pink">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              <p>📍 Your location is only used to show relevant products and is not stored.</p>
            </div>
            
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setShowLocationModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Home Page
const Home = ({ searchQuery: propSearchQuery }) => {
  const [standardProducts, setStandardProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState(propSearchQuery || '');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All Products',
    'Electronics',
    'Fashion',
    'Grocery',
    'Home',
    'Beauty',
    'Kids'
  ];

  useEffect(() => {
    const fetchStandardProducts = async () => {
      try {
        const response = await axios.get('/api/products/standard');
        setStandardProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        console.error('Error fetching standard products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStandardProducts();
  }, []);

  // Handle search query changes from header
  useEffect(() => {
    if (propSearchQuery !== searchQuery) {
      setSearchQuery(propSearchQuery);
      filterProducts(selectedCategory, propSearchQuery);
    }
  }, [propSearchQuery]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    filterProducts(category, searchQuery);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterProducts(selectedCategory, query);
  };

  const filterProducts = (category, search) => {
    let filtered = standardProducts;

    // Filter by category
    if (category !== 'All Products') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Filter by search query
    if (search.trim()) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-meesho-pink text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-3" style={{fontSize: '36px'}}>Welcome to Meesho</h1>
          <p className="text-lg mb-6" style={{fontSize: '18px'}}>Online Shopping Made Easy</p>
          <Link
            to="/express"
            className="inline-flex items-center bg-white text-meesho-pink px-6 py-2.5 rounded font-semibold hover:bg-gray-100 transition-colors"
            style={{fontSize: '14px'}}
          >
            <span className="mr-2">⚡</span>
            Try Meesho Express
          </Link>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex space-x-6 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`pb-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'text-meesho-pink border-b-2 border-meesho-pink'
                    : 'text-gray-600 hover:text-meesho-pink'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900" style={{fontSize: '24px'}}>
            {searchQuery ? `Search results for "${searchQuery}"` : 
             selectedCategory === 'All Products' ? 'Featured Products' : selectedCategory}
          </h2>
          <div className="text-sm text-gray-500">
            {loading ? 'Loading...' : `${filteredProducts.length} products`}
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-sm overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-3">
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchQuery 
                ? `No products found for "${searchQuery}"`
                : `No products available in the ${selectedCategory} category.`
              }
            </p>
            <div className="flex gap-3 justify-center">
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    handleSearch('');
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  Clear Search
                </button>
              )}
              <button
                onClick={() => handleCategoryFilter('All Products')}
                className="bg-meesho-pink text-white px-6 py-2 rounded hover:bg-pink-600 transition-colors"
              >
                View All Products
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filteredProducts.map((product) => (
              <StandardProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Seller Store Page
const SellerStore = ({ sellerId, sellerName }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{sellerName}'s Store</h1>
          <p className="text-gray-600">This is where the seller's products would be displayed.</p>
          <p className="text-sm text-gray-500 mt-4">Seller ID: {sellerId}</p>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Meesho</h3>
            <p className="text-gray-400 text-sm mb-4">
              India's #1 Online Shopping Destination
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">SHOP BY CATEGORY</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button className="hover:text-white">Women Ethnic</button></li>
              <li><button className="hover:text-white">Women Western</button></li>
              <li><button className="hover:text-white">Men</button></li>
              <li><button className="hover:text-white">Kids</button></li>
              <li><button className="hover:text-white">Home & Kitchen</button></li>
              <li><button className="hover:text-white">Beauty & Health</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">CUSTOMER SERVICES</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button className="hover:text-white">Contact Us</button></li>
              <li><button className="hover:text-white">Track Your Order</button></li>
              <li><button className="hover:text-white">Return Order</button></li>
              <li><button className="hover:text-white">Cancel Order</button></li>
              <li><button className="hover:text-white">Help Center</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">ABOUT MEESHO</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button className="hover:text-white">About Us</button></li>
              <li><button className="hover:text-white">Careers</button></li>
              <li><button className="hover:text-white">Press</button></li>
              <li><button className="hover:text-white">Become a Supplier</button></li>
              <li><button className="hover:text-white">Meesho Express</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Meesho. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  const handleGlobalSearch = (query) => {
    setGlobalSearchQuery(query);
    // You can add global search logic here if needed
  };

  return (
    <Router>
      <div className="App">
        <Header onSearch={handleGlobalSearch} />
        <Routes>
          <Route path="/" element={<Home searchQuery={globalSearchQuery} />} />
          <Route path="/express" element={<MeeshoExpress />} />
          <Route path="/seller/:sellerId" element={<SellerStore />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
