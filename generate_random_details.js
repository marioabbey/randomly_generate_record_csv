const fs = require("fs");

// Number of random details to generate
const numDetails = 100000;

// Generate random details
const details = [];
const usedMobileNumbers = new Set();
const usedCardExpiryDates = new Set();
for (let i = 0; i < numDetails; i++) {
  const recordNumber = i + 1;

  // Generate unique mobile number starting with '234'
  let mobileNumber;
  do {
    mobileNumber = "234" + getRandomNumber(100000000, 999999999);
  } while (usedMobileNumbers.has(mobileNumber));
  usedMobileNumbers.add(mobileNumber);

  // Generate unique card expiry date in 'MMYY' format
  let cardExpiryDate;
  do {
    const currentDate = new Date();
    cardExpiryDate =
      getRandomNumber(1, 12).toString().padStart(2, "0") +
      currentDate.getFullYear().toString().slice(-2);
  } while (usedCardExpiryDates.has(cardExpiryDate));
  usedCardExpiryDates.add(cardExpiryDate);

  const pan = generateRandomPAN();
  const hashedPan = ""; // Empty hashed PAN field
  const binNumber = generateRandomBIN(pan);
  const customerSegment = getRandomElement([
    "Segment A",
    "Segment B",
    "Segment C",
  ]);
  const customerType = getRandomElement(["Type 1", "Type 2", "Type 3"]);
  const firstName = "First" + getRandomNumber(1, 1000);
  const surname = "Last" + getRandomNumber(1, 1000);
  const middleName = "Middle" + getRandomNumber(1, 1000);
  const address = "Address" + getRandomNumber(1, 1000);
  const otherNumber = "+9876543210";
  const email = "email" + getRandomNumber(1, 1000) + "@example.com";
  const dob = generateRandomDOB();
  const gender = getRandomElement(["Male", "Female", "Other"]);
  const nationality = "Nationality" + getRandomNumber(1, 1000);
  const nationalIdentity = "Identity" + getRandomNumber(1, 1000);
  const bankId = "Bank" + getRandomNumber(1, 1000);
  const profession = "Profession" + getRandomNumber(1, 1000);
  const maritalStatus = getRandomElement(["Single", "Married", "Divorced"]);
  const preferredLanguage = getRandomElement(["English", "French", "Spanish"]);

  details.push([
    recordNumber,
    pan,
    hashedPan,
    binNumber,
    cardExpiryDate,
    customerSegment,
    customerType,
    firstName,
    surname,
    middleName,
    address,
    mobileNumber,
    otherNumber,
    email,
    formatDate(dob),
    gender,
    nationality,
    nationalIdentity,
    bankId,
    profession,
    maritalStatus,
    preferredLanguage,
  ]);
    // Log progress
    console.log(`Generated record ${recordNumber}`);
}

// Helper function to get a random element from an array
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to format a date as "YYYY-MM-DD"
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Helper function to generate a random PAN
function generateRandomPAN() {
  const firstSixDigits = "506970";
  const lastSevenDigits = getRandomNumber(1000000, 9999999);
  return firstSixDigits + "*********" + lastSevenDigits;
}

// Helper function to generate a random BIN based on PAN
function generateRandomBIN(pan) {
  const firstSixDigits = pan.substr(0, 6);
  const validBINPrefixes = ["506", "106"];
  const validBINPrefix = getRandomElement(validBINPrefixes);
  return validBINPrefix + firstSixDigits.substr(3, 3);
}

// Helper function to generate a random date of birth
function generateRandomDOB() {
  const currentYear = new Date().getFullYear();
  const minAge = 20;
  const maxAge = 60;
  const birthYear = currentYear - getRandomNumber(minAge, maxAge);
  const birthMonth = getRandomNumber(1, 12);
  const birthDay = getRandomNumber(1, 28);
  return new Date(birthYear, birthMonth - 1, birthDay);
}

// Convert details array to CSV string
const csvContent = details.map((detail) => detail.join(",")).join("\n");

// Save CSV content to a file
fs.writeFileSync("random_details.csv", csvContent, "utf8");
