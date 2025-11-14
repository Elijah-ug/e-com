export const getUserGeoLocationCordinates = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Browser coords:", position.coords),
            resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => {
          console.log("Error in==>", error);
          reject(error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      reject(new Error("Geolocation not supported"));
    }
  });
};
