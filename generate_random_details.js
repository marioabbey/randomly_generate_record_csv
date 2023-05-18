const fs = require("fs");

// Number of random details to generate
const numDetails = 100000;

// Generate random details
const details = new Array(numDetails);

// Set to store used mobile numbers
const usedMobileNumbers = new Set();

// Generate random PAN
let pan = "";

// Helper function to generate a random BIN based on PAN
const generateRandomBIN = () => {
  const firstDigits = ["103", "506"];
  const randomIndex = Math.floor(Math.random() * firstDigits.length);
  const firstThreeDigits = firstDigits[randomIndex];
  const remainingDigits = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${firstThreeDigits}${remainingDigits}`;
};

// Helper function to generate a random PAN based on BIN
const generateRandomPAN = (bin) => {
  const middleDigits = "******";
  const lastFourDigits = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${bin}${middleDigits}${lastFourDigits}`;
};

// Helper function to generate a random date of birth
const generateRandomDOB = () => {
  const currentYear = new Date().getFullYear();
  const minAge = 20;
  const maxAge = 60;
  const birthYear = currentYear - getRandomNumber(minAge, maxAge);
  const birthMonth = getRandomNumber(1, 12);
  const birthDay = getRandomNumber(1, 28);
  const date = new Date(birthYear, birthMonth - 1, birthDay);
  return date;
};

for (let i = 0; i < numDetails; i++) {
  const recordNumber = i + 1;

  // Generate unique mobile number starting with '234'
  let mobileNumber;
  do {
    mobileNumber =
      "234" + getRandomNumber(100000000, 999999999).toString().padStart(9, "0");
  } while (usedMobileNumbers.has(mobileNumber));
  usedMobileNumbers.add(mobileNumber);

  // Generate random BIN
  const bin = generateRandomBIN();

  // Generate PAN with correct format and matching BIN
  const pan = generateRandomPAN(bin);
  const hashedPan = ""; // Empty hashed PAN field
  // Generate random card expiry date in 'MMYY' format
  const cardExpiryDate =
    getRandomNumber(1, 12).toString().padStart(2, "0") +
    getRandomNumber(24, 50).toString().padStart(2, "0"); // Random month (1-12) and random year (24-50)
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

  details[i] = [
    recordNumber,
    pan,
    hashedPan,
    bin,
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
  ];
  // Log progress
  console.log(`Generated record ${recordNumber}`);
}

// Convert details array to CSV string
const csvContent = details.map((detail) => detail.join(",")).join("\n");

// Save CSV content to a file
fs.writeFileSync("random_details.csv", csvContent, "utf8");

// Helper function to get a random element from an array
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to generate a random number within a range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to format date as 'YYYY-MM-DD'
function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
