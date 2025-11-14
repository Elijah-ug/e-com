import harvesine from "haversine-distance";

export const getDistance = (lat1, lon1, lat2, lon2) => {
  try {
    const a = { lat: lat1, lon: lon1 };
    const b = { lat: lat2, lon: lon2 };
    const distanceInMetres = harvesine(a, b);
    const distanceInKm = (distanceInMetres * 0.001).toFixed(2);
    console.log("point A==>", a, "Point b==>", b);
    console.log("Distance in metres==>", distanceInMetres, "distance in km==>", distanceInKm);
    return distanceInKm;
  } catch (error) {
    console.log("Error==>", error);
  }
};
