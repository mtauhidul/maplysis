const zipCodeDistance = (zipCode1, zipCode2) => {
  const lat1 = zipCode1.lat;
  const lon1 = zipCode1.lng;
  const lat2 = zipCode2.lat;
  const lon2 = zipCode2.lng;

  const R = 3958.8; // Radius of the Earth in miles

  const rlat1 = lat1 * (Math.PI / 180); // Convert degrees to radians
  const rlat2 = lat2 * (Math.PI / 180); // Convert degrees to radians

  const difflat = rlat2 - rlat1; // Radian difference (latitudes)
  const difflon = (lon2 - lon1) * (Math.PI / 180); // Radian difference (longitudes)

  const d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );

  return d;
};

export const targetZipCodesFinder = (zipCodes, radius, minValue) => {
  const targetZipCodes = [];
  const zipCodesLength = zipCodes.length;

  for (let i = 0; i < zipCodesLength; i++) {
    const zipCode1 = zipCodes[i];
    let count = 0;
    for (let j = 0; j < zipCodesLength; j++) {
      if (i !== j) {
        const zipCode2 = zipCodes[j];
        if (zipCodeDistance(zipCode1, zipCode2) <= radius) {
          count++;
        }
      }
    }
    if (count >= minValue) {
      targetZipCodes.push(zipCode1);
    }
  }

  return targetZipCodes;
};
