// import { formatDistance, parseISO } from "date-fns";
// import { differenceInDays } from "date-fns/esm";

// // We want to make this function work for both Date objects and strings (which come from Supabase)
// export const subtractDates = (dateStr1, dateStr2) =>
//   differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

// export const formatDistanceFromNow = (dateStr) =>
//   formatDistance(parseISO(dateStr), new Date(), {
//     addSuffix: true,
//   })
//     .replace("about ", "")
//     .replace("in", "In");

// // Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
// export const getToday = function (options = {}) {
//   const today = new Date();

//   // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
//   if (options?.end)
//     // Set to the last second of the day
//     today.setUTCHours(23, 59, 59, 999);
//   else today.setUTCHours(0, 0, 0, 0);
//   return today.toISOString();
// };

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'egp' }).format(
    value
  )

export const formatText = (value: string) => {
  return value.trim().toLocaleLowerCase()
}

export function randomYear(min: number, max: number): number {
  // Generate a random number between 0 and 1
  const random = Math.random()
  // Multiply it by the difference between the maximum and minimum year, and add the minimum year
  let year = random * (max - min) + min
  // Round down the result to an integer
  year = Math.floor(year)
  // Return the random year
  return year
}

const clothKeywords = [
  'shirt',
  'pants',
  'dress',
  'skirt',
  'jacket',
  'cloth',
  'clothing',
  'coat',
  'sweater',
  'hat',
  'scarf',
  'gloves',
  'socks',
  'shoes',
  'boots',
  'belt',
  'tie',
  'jeans',
  't-shirt',
  'hoodie',
  'blouse',
  'shorts',
]

// Define a function that takes a string as a parameter and returns a boolean
export function hasClothKeywords(str: string): boolean {
  // Use the some method to check if any of the keywords are included in the string
  return clothKeywords.some((keyword) => str.includes(keyword))
}

const electronicKeywords = [
  'laptop',
  'phone',
  'tablet',
  'camera',
  'TV',
  'monitor',
  'keyboard',
  'mouse',
  'printer',
  'speaker',
  'headphone',
  'charger',
  'battery',
  'USB',
  'HDMI',
  'Bluetooth',
  'WiFi',
  'LED',
  'LCD',
  'RAM',
  'CPU',
  'GPU',
]

// Define a function that takes a product object as a parameter and returns a boolean
export function isItElectronic(str: string): boolean {
  // Use the some method to check if any of the keywords are included in the string
  return electronicKeywords.some((keyword) => str.includes(keyword))
}

export function validateEgyptianPhoneNumber(phoneNumber: string) {
  // define the regex
  const regex = /^01[0125][0-9]{8}$/
  // test the string against the regex
  if (regex.test(phoneNumber)) {
    // return true if it matches
    return true
  } else {
    // return false if it doesn't
    return false
  }
}

export function scrollToTheTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

export function validateEmail(email: string) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function removeAllSpacesFrom(str: string, toUpperCase?: boolean) {
  const updatedStr = str
    // remove all spaces.
    .replace(/\s+/g, '')
    .split(',')
    .filter((el) => el !== '')
    .join(',')

  return toUpperCase ? updatedStr.toLocaleUpperCase() : updatedStr
}
