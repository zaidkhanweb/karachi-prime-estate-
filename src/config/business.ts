// Central business configuration.
// Values marked PLACEHOLDER must be replaced with verified client details.
export const business = {
  name: "DHA KARACHI Real Estate",
  shortName: "DHA Karachi",
  tagline: "Real Estate",
  logoText: "DK",
  address: "4th Sunset St, D.H.A. Phase 4, Sunset Commercial Area, Karachi, Pakistan",
  // PLACEHOLDER — replace with the verified business number
  phoneDisplay: "+92 300 000 0000",
  phone: "+923000000000",
  // PLACEHOLDER — replace with the verified WhatsApp number
  whatsapp: "923000000000",
  // PLACEHOLDER
  email: "hello@example.com",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=4th%20Sunset%20St%2C%20D.H.A.%20Phase%204%2C%20Sunset%20Commercial%20Area%2C%20Karachi&output=embed",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(
      "4th Sunset St, D.H.A. Phase 4, Sunset Commercial Area, Karachi, Pakistan",
    ),
  // PLACEHOLDER — replace with the business's Google reviews link
  googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=DHA+Karachi+Real+Estate",
  socials: {
    instagram: "https://instagram.com/", // PLACEHOLDER
    facebook: "https://facebook.com/", // PLACEHOLDER
    tiktok: "https://tiktok.com/", // PLACEHOLDER
  },
  // PLACEHOLDER hours
  hours: [
    { day: "Monday – Saturday", time: "10:00 AM – 8:00 PM (placeholder)" },
    { day: "Sunday", time: "By appointment (placeholder)" },
  ],
  areasServed: [
    "DHA Karachi",
    "Clifton",
    "Gulshan-e-Iqbal",
    "Bahria Town Karachi",
    "PECHS",
  ],
};

export const waLink = (message?: string) =>
  `https://wa.me/${business.whatsapp}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const telLink = `tel:${business.phone}`;
