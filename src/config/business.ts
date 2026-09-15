// Central business configuration.
// Replace temporary contact values with verified client details during final setup.
export const business = {
  name: "DHA KARACHI Real Estate",
  shortName: "DHA Karachi",
  tagline: "Real Estate",
  logoText: "DK",
  address: "4th Sunset St, D.H.A. Phase 4, Sunset Commercial Area, Karachi, Pakistan",
  phoneDisplay: "+92 300 000 0000",
  phone: "+923000000000",
  whatsapp: "923000000000",
  email: "hello@example.com",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=4th%20Sunset%20St%2C%20D.H.A.%20Phase%204%2C%20Sunset%20Commercial%20Area%2C%20Karachi&output=embed",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(
      "4th Sunset St, D.H.A. Phase 4, Sunset Commercial Area, Karachi, Pakistan",
    ),
  googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=DHA+Karachi+Real+Estate",
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
  },
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

// These checks keep temporary template values out of the visitor-facing UI.
export const contactReady = {
  phone: Boolean(business.phone) && !business.phone.includes("000000000"),
  whatsapp: Boolean(business.whatsapp) && !business.whatsapp.includes("000000000"),
  email: Boolean(business.email) && !business.email.toLowerCase().endsWith("@example.com"),
  hours:
    business.hours.length > 0 &&
    business.hours.every((h) => !h.time.toLowerCase().includes("placeholder")),
  instagram: Boolean(business.socials.instagram) && business.socials.instagram !== "https://instagram.com/",
  facebook: Boolean(business.socials.facebook) && business.socials.facebook !== "https://facebook.com/",
  tiktok: Boolean(business.socials.tiktok) && business.socials.tiktok !== "https://tiktok.com/",
};

export const waLink = (message?: string) =>
  `https://wa.me/${business.whatsapp}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const telLink = `tel:${business.phone}`;
