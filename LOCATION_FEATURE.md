# 📍 Location Detection Feature

## Overview
The Meesho Express app now includes automatic location detection to provide a seamless user experience. Users can either manually select their city or use their device's GPS to automatically detect their location.

## Features

### 🌍 Automatic Location Detection
- **GPS Integration**: Uses browser's geolocation API to get user's coordinates
- **Reverse Geocoding**: Converts coordinates to city names using BigDataCloud API
- **Smart Matching**: Automatically matches detected city with available express delivery cities
- **Fallback Handling**: Graceful fallback to manual selection if location detection fails

### 🏙️ Available Cities
The app currently supports express delivery in:
- **Roorkee** - 6 express products
- **Delhi** - 6 express products  
- **Mumbai** - 6 express products
- **Bangalore** - 6 express products
- **Chennai** - 3 express products
- **Pune** - 3 express products

### 🎯 User Experience
1. **Location Button**: "Use My Location" button in the header and modal
2. **Loading States**: Shows spinner and "Detecting..." text during location detection
3. **Success Messages**: Green notification when location is detected successfully
4. **Error Handling**: Clear error messages for various failure scenarios
5. **Privacy Notice**: Transparent about location usage

### 🔒 Privacy & Security
- **No Storage**: User location is not stored or saved
- **One-time Use**: Location is only used to set the current city
- **Transparent**: Clear privacy notice in the location modal
- **Optional**: Users can always choose manual city selection

### 🛠️ Technical Implementation
- **Geolocation API**: Browser's native geolocation service
- **Reverse Geocoding**: BigDataCloud API for coordinate-to-city conversion
- **Case-insensitive Matching**: Smart city name matching
- **Error Handling**: Comprehensive error handling for all scenarios

## Usage

### For Users
1. Click "Use My Location" button
2. Allow location access when prompted
3. App automatically detects and sets your city
4. Browse express products available in your area

### For Developers
```javascript
// Location detection function
const getUserLocation = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      // Get coordinates
      const { latitude, longitude } = position.coords;
      
      // Reverse geocode to get city
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      
      const data = await response.json();
      const city = data.city || data.locality || data.principalSubdivision;
      
      // Match with available cities
      const matchedCity = availableCities.find(availableCity => 
        availableCity.toLowerCase() === city.toLowerCase()
      );
      
      if (matchedCity) {
        setSelectedCity(matchedCity);
      }
    }
  );
};
```

## Error Scenarios Handled
- **Permission Denied**: User denies location access
- **Location Unavailable**: GPS/location services disabled
- **Timeout**: Location request takes too long
- **Network Error**: Reverse geocoding API fails
- **City Not Available**: Detected city doesn't have express delivery
- **Browser Not Supported**: Older browsers without geolocation

## Future Enhancements
- **Cached Location**: Remember user's last selected city
- **More Cities**: Expand to more Indian cities
- **District-level**: More granular location detection
- **Offline Support**: Fallback when location services are unavailable
