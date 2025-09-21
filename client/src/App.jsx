import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from './config';
import { IoCartOutline } from "react-icons/io5";

// Header Component
const Header = ({ onSearch, onCategoryFilter, selectedCategory, cartItemCount, onCartClick }) => {
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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="text-3xl font-bold text-meesho-pink lowercase" style={{fontFamily: 'Arial, sans-serif', fontWeight: 'bold'}}>meesho</div>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-meesho-pink focus:border-meesho-pink text-sm"
                style={{fontSize: '14px'}}
              />
              <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-meesho-pink text-white rounded-r-sm hover:bg-pink-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-8">
            <button className="text-gray-700 hover:text-meesho-pink text-sm font-medium">
              Become a Supplier
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <button className="text-gray-700 hover:text-meesho-pink text-sm font-medium">
              Investor Relations
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <button className="text-gray-700 hover:text-meesho-pink flex items-center text-sm font-medium">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <button 
              onClick={onCartClick}
              className="text-gray-700 hover:text-meesho-pink flex items-center text-sm font-medium relative"
            >
              <IoCartOutline />
              Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-meesho-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-meesho-pink-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 py-3">
            <button 
              onClick={() => onCategoryFilter && onCategoryFilter('Women Ethnic')}
              className={`px-2 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === 'Women Ethnic' 
                  ? 'text-white bg-white bg-opacity-20 rounded' 
                  : 'text-white hover:text-gray-200'
              }`}
            >
              Women Ethnic
            </button>
            <button 
              onClick={() => onCategoryFilter && onCategoryFilter('Women Western')}
              className={`px-2 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === 'Women Western' 
                  ? 'text-white bg-white bg-opacity-20 rounded' 
                  : 'text-white hover:text-gray-200'
              }`}
            >
              Women Western
            </button>
            <button 
              onClick={() => onCategoryFilter && onCategoryFilter('Men')}
              className={`px-2 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === 'Men' 
                  ? 'text-white bg-white bg-opacity-20 rounded' 
                  : 'text-white hover:text-gray-200'
              }`}
            >
              Men
            </button>
            <button 
              onClick={() => onCategoryFilter && onCategoryFilter('Kids')}
              className={`px-2 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === 'Kids' 
                  ? 'text-white bg-white bg-opacity-20 rounded' 
                  : 'text-white hover:text-gray-200'
              }`}
            >
              Kids
            </button>
            <button 
              onClick={() => onCategoryFilter && onCategoryFilter('Home & Kitchen')}
              className={`px-2 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === 'Home & Kitchen' 
                  ? 'text-white bg-white bg-opacity-20 rounded' 
                  : 'text-white hover:text-gray-200'
              }`}
            >
              Home & Kitchen
            </button>
            <button 
              onClick={() => onCategoryFilter && onCategoryFilter('Beauty & Health')}
              className={`px-2 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === 'Beauty & Health' 
                  ? 'text-white bg-white bg-opacity-20 rounded' 
                  : 'text-white hover:text-gray-200'
              }`}
            >
              Beauty & Health
            </button>
            <button 
              onClick={() => onCategoryFilter && onCategoryFilter('Jewellery & Accessories')}
              className={`px-2 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === 'Jewellery & Accessories' 
                  ? 'text-white bg-white bg-opacity-20 rounded' 
                  : 'text-white hover:text-gray-200'
              }`}
            >
              Jewellery & Accessories
            </button>
            <button 
              onClick={() => onCategoryFilter && onCategoryFilter('Bags & Footwear')}
              className={`px-2 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === 'Bags & Footwear' 
                  ? 'text-white bg-white bg-opacity-20 rounded' 
                  : 'text-white hover:text-gray-200'
              }`}
            >
              Bags & Footwear
            </button>
            <button 
              onClick={() => onCategoryFilter && onCategoryFilter('Electronics')}
              className={`px-2 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === 'Electronics' 
                  ? 'text-white bg-white bg-opacity-20 rounded' 
                  : 'text-white hover:text-gray-200'
              }`}
            >
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
const StandardProductCard = ({ product, onAddToCart }) => {
  const discount = Math.floor(Math.random() * 50) + 10;
  const originalPrice = Math.floor(product.price * (100 + discount) / 100);
  
  return (
    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <Link to={`/product/${product.id}`} className="block">
      <div className="aspect-square relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
          {/* Discount Badge */}
        <div className="absolute top-2 right-2">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-sm font-medium">
              {discount}% OFF
          </span>
        </div>
          {/* More Images Indicator */}
          <div className="absolute top-2 left-2">
            <span className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-sm font-medium">
              +{Math.floor(Math.random() * 4) + 1} More
            </span>
          </div>
          {/* Timer Badge (for some products) */}
          {Math.random() > 0.7 && (
            <div className="absolute bottom-2 left-2">
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-sm font-medium flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                00h: 15m: 23s
              </span>
            </div>
          )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 leading-tight" style={{fontSize: '13px'}}>
          {product.name}
        </h3>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-meesho-pink" style={{fontSize: '16px'}}>₹{product.price}</span>
              <span className="text-sm text-gray-500 line-through" style={{fontSize: '12px'}}>₹{originalPrice}</span>
          </div>
          </div>
          {/* Delivery Badge */}
          <div className="mb-2">
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
              Free Delivery
            </span>
          </div>
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {product.rating}
              </span>
        </div>
        <div className="text-xs text-gray-500" style={{fontSize: '11px'}}>
              {product.reviews} Reviews
        </div>
          </div>
          {/* Trust Badge */}
          <div className="mt-2">
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
              m Trusted
            </span>
          </div>
        </div>
      </Link>
      {/* Add to Cart Button */}
      <div className="mt-3 p-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart && onAddToCart(product);
          }}
          className="w-full bg-meesho-pink text-white py-2 px-4 rounded-sm text-sm font-medium hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
          <span>Add to Cart</span>
        </button>
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
        const response = await axios.get(`${API_BASE_URL}/api/products/express-cities`);
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
      const response = await axios.get(`${API_BASE_URL}/api/products/express?city=${city}`);
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
const Home = ({ searchQuery: propSearchQuery, selectedCategory: propSelectedCategory, onCategoryFilter, onAddToCart }) => {
  const [standardProducts, setStandardProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(propSelectedCategory || 'All Products');
  const [searchQuery, setSearchQuery] = useState(propSearchQuery || '');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('Relevance');

  const categories = [
    'All Products',
    'Women Ethnic',
    'Women Western',
    'Men',
    'Kids',
    'Home & Kitchen',
    'Beauty & Health',
    'Jewellery & Accessories',
    'Bags & Footwear',
    'Electronics'
  ];

  useEffect(() => {
    const fetchStandardProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products/standard`);
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

  // Handle category changes from header
  useEffect(() => {
    if (propSelectedCategory !== selectedCategory) {
      setSelectedCategory(propSelectedCategory);
      filterProducts(propSelectedCategory, searchQuery);
    }
  }, [propSelectedCategory]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (onCategoryFilter) {
      onCategoryFilter(category);
    }
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
      {/* Meesho Express Banner */}
      <div className="bg-meesho-pink-light text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">⚡</div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Meesho Express</h2>
                <p className="text-lg opacity-90">Get your favorite products delivered in minutes!</p>
              </div>
            </div>
          <Link
            to="/express"
              className="bg-white text-meesho-pink-light px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <span>Try Express</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
          </Link>
          </div>
        </div>
      </div>

      {/* Products For You Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900" style={{fontSize: '24px'}}>
            Products For You
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {loading ? 'Loading...' : `${filteredProducts.length}+ Products`}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-meesho-pink"
              >
                <option value="Relevance">Relevance</option>
                <option value="Price Low to High">Price Low to High</option>
                <option value="Price High to Low">Price High to Low</option>
                <option value="Newest First">Newest First</option>
                <option value="Popularity">Popularity</option>
              </select>
          </div>
        </div>
      </div>

        {/* Products Grid */}
        <div className="w-full">
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
                  <StandardProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={onAddToCart}
                  />
            ))}
          </div>
        )}
        </div>
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

// Product Detail Component
const ProductDetail = ({ onAddToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  console.log('ProductDetail - productId from params:', productId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError('Product not found');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        onAddToCart(product);
      }
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // In a real app, this would redirect to checkout
    alert('Redirecting to checkout...');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-meesho-pink mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Product Not Found</h3>
          <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="bg-meesho-pink text-white px-6 py-2 rounded hover:bg-pink-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const discount = Math.floor(Math.random() * 50) + 10;
  const originalPrice = Math.floor(product.price * (100 + discount) / 100);
  const savings = originalPrice - product.price;

  // Mock product images
  const productImages = [
    product.imageUrl,
    product.imageUrl.replace('text=', 'text=View+2'),
    product.imageUrl.replace('text=', 'text=View+3'),
    product.imageUrl.replace('text=', 'text=View+4')
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-meesho-pink' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-600 text-lg">{product.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">4.2 (1,234 reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-meesho-pink">₹{product.price}</span>
                  <span className="text-xl text-gray-500 line-through">₹{originalPrice}</span>
                  <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full font-medium">
                    Save ₹{savings}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full font-medium">
                    {discount}% OFF
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded-full font-medium">
                    m Trusted
                  </span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-800 font-medium">Free Delivery</span>
                </div>
                <p className="text-green-700 text-sm mt-1">Delivery in 3-5 business days</p>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-meesho-pink text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Product Features */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>High quality materials</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free shipping nationwide</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Easy returns within 30 days</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Customer support available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Component
const Cart = ({ cart, onRemoveFromCart, onUpdateQuantity, onClose }) => {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 max-h-96 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Shopping Cart</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-64">
          {cart.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 border-b pb-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-meesho-pink font-semibold">
                      ₹{item.price}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold text-meesho-pink">
                ₹{getTotalPrice()}
              </span>
            </div>
            <button className="w-full bg-meesho-pink text-white py-2 px-4 rounded-sm font-medium hover:bg-pink-600 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [globalSelectedCategory, setGlobalSelectedCategory] = useState('All Products');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleGlobalSearch = (query) => {
    setGlobalSearchQuery(query);
  };

  const handleGlobalCategoryFilter = (category) => {
    setGlobalSelectedCategory(category);
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Router>
      <div className="App">
        <Header 
          onSearch={handleGlobalSearch} 
          onCategoryFilter={handleGlobalCategoryFilter}
          selectedCategory={globalSelectedCategory}
          cartItemCount={getCartItemCount()}
          onCartClick={() => setShowCart(true)}
        />
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                searchQuery={globalSearchQuery} 
                selectedCategory={globalSelectedCategory}
                onCategoryFilter={handleGlobalCategoryFilter}
                onAddToCart={addToCart}
              /> 
            } 
          />
          <Route path="/express" element={<MeeshoExpress />} />
          <Route path="/seller/:sellerId" element={<SellerStore />} />
          <Route 
            path="/product/:productId" 
            element={<ProductDetail onAddToCart={addToCart} />} 
          />
        </Routes>
        <Footer />
        
        {/* Cart Modal */}
        {showCart && (
          <Cart
            cart={cart}
            onRemoveFromCart={removeFromCart}
            onUpdateQuantity={updateCartQuantity}
            onClose={() => setShowCart(false)}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
