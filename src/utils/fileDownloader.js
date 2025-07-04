import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Radius of the earth in miles
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in miles
  return distance;
}

function calculateZipCodesUnderRadius(targetZipCode, zipCodes, radius) {
  return zipCodes
    .map((zipCode) => {
      const distance = calculateDistance(
        targetZipCode.lat,
        targetZipCode.lng,
        zipCode.lat,
        zipCode.lng
      );
      return { ...zipCode, distance };
    })
    .filter((zipCode) => zipCode.distance <= radius);
}

export function createAndDownloadExcelFile(targetZipCodes, zipCodes, radius) {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  targetZipCodes.forEach((targetZipCode) => {
    // Calculate the zip codes under the given radius for the target zip code
    const zipCodesUnderRadius = calculateZipCodesUnderRadius(
      targetZipCode,
      zipCodes,
      radius
    );

    // Remove zip code from the array if it's same to the target zip code (it's not a neighbor) so it's distance is 0 (zero)
    const filteredZipCodesUnderRadius = zipCodesUnderRadius.filter(
      (zipCode) => zipCode.zip !== targetZipCode.zip
    );

    // Sort the zip codes by distance (ascending)
    filteredZipCodesUnderRadius.sort((a, b) => a.distance - b.distance);

    // Convert the data to a 2D array
    const data = filteredZipCodesUnderRadius.map((zipCode) => [
      zipCode.zip,
      zipCode.dre,
      zipCode.distance,
    ]);

    // Add a header row
    data.unshift(['Zip Code', 'DRE', 'Distance']);

    // Create a new worksheet from the data
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Add the worksheet to the workbook if it doesn't already exist
    const sheetName = String(targetZipCode.zip);
    if (!wb.SheetNames.includes(sheetName)) {
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    }
  });

  // Write the workbook to a binary string
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

  // Convert the binary string to a blob
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

  // Download the blob as a file
  saveAs(blob, 'zipCodesUnderRadius.xlsx');
}

// Convert a binary string to an array buffer (needed to create a blob)
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}
