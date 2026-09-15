import prop1 from "@/assets/prop-1.jpg";
import prop2 from "@/assets/prop-2.jpg";
import prop3 from "@/assets/prop-3.jpg";
import prop4 from "@/assets/prop-4.jpg";
import prop5 from "@/assets/prop-5.jpg";
import prop6 from "@/assets/prop-6.jpg";

export type Purpose = "sale" | "rent";
export type PropertyType = "house" | "apartment" | "plot" | "commercial";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  typeLabel: string;
  purpose: Purpose;
  price: string;
  priceValue: number; // PKR, for demo budget filtering
  location: string;
  area: string;
  beds: number;
  baths: number;
  description: string;
  longDescription: string;
  features: string[];
  parking: string;
  nearby: string[];
  images: { src: string; alt: string }[];
}

// SAMPLE / DEMO data only — not real, currently available listings.
export const properties: Property[] = [
  {
    id: "dha-phase-4-family-house",
    title: "4-Bedroom Family House",
    type: "house",
    typeLabel: "House",
    purpose: "sale",
    price: "PKR 6.5 Cr (sample)",
    priceValue: 65000000,
    location: "DHA Phase 4, Karachi",
    area: "500 sq. yd",
    beds: 4,
    baths: 5,
    description:
      "Sample listing: a bright double-storey house with a landscaped front garden and covered car porch.",
    longDescription:
      "Example property profile: a double-storey family home arranged around a central lounge, with a landscaped front garden, covered porch and a separate guest area on the ground floor.",
    features: [
      "Double-storey layout",
      "Separate guest lounge",
      "Modular kitchen",
      "Standby power backup",
      "Landscaped front garden",
      "Servant quarter",
    ],
    parking: "Covered porch for 2 cars plus street parking",
    nearby: ["Schools", "Sunset Commercial Area", "Parks", "Pharmacies", "Supermarkets"],
    images: [
      { src: prop1, alt: "Front elevation of a modern family house in DHA Karachi" },
      { src: prop6, alt: "Evening view of the house lawn and car porch" },
      { src: prop5, alt: "Interior living and dining area of the house" },
    ],
  },
  {
    id: "clifton-sea-view-apartment",
    title: "3-Bedroom Sea-Facing Apartment",
    type: "apartment",
    typeLabel: "Apartment",
    purpose: "rent",
    price: "PKR 350,000 / month (sample)",
    priceValue: 350000,
    location: "Clifton Block 4, Karachi",
    area: "2,100 sq. ft",
    beds: 3,
    baths: 3,
    description:
      "Sample listing: high-floor apartment with full-height windows and an open sea outlook.",
    longDescription:
      "Example property profile: a high-floor apartment in a managed building with open-plan living and dining, full-height glazing, three bedrooms with attached baths, lifts and 24-hour security.",
    features: [
      "High floor with open outlook",
      "Open-plan living and dining",
      "Attached baths in all bedrooms",
      "Two lifts",
      "24-hour building security",
      "Backup generator",
    ],
    parking: "1 dedicated basement parking bay",
    nearby: ["Seaview promenade", "Restaurants", "Clinics", "Schools", "Retail"],
    images: [
      { src: prop2, alt: "Sea-facing apartment living room with full-height windows" },
      { src: prop5, alt: "Apartment kitchen and dining area" },
      { src: prop4, alt: "Exterior of the apartment building" },
    ],
  },
  {
    id: "gulshan-residential-plot",
    title: "240 sq. yd Residential Plot",
    type: "plot",
    typeLabel: "Plot",
    purpose: "sale",
    price: "PKR 1.8 Cr (sample)",
    priceValue: 18000000,
    location: "Gulshan-e-Iqbal, Karachi",
    area: "240 sq. yd",
    beds: 0,
    baths: 0,
    description:
      "Sample listing: level corner plot on a paved residential street, suitable for a custom build.",
    longDescription:
      "Example property profile: a level, walled plot on a paved residential street with utility connections shown at the boundary.",
    features: [
      "Corner position",
      "Level and walled",
      "Paved street access",
      "Utilities at boundary",
      "Residential zoning",
    ],
    parking: "Space for driveway parking after construction",
    nearby: ["Main road access", "Schools", "Local markets", "Mosque"],
    images: [
      { src: prop3, alt: "Empty residential plot with boundary wall on a paved street" },
      { src: prop6, alt: "Neighbouring homes near the residential plot" },
    ],
  },
  {
    id: "sunset-commercial-shop",
    title: "Ground-Floor Commercial Space",
    type: "commercial",
    typeLabel: "Commercial",
    purpose: "rent",
    price: "PKR 500,000 / month (sample)",
    priceValue: 500000,
    location: "Sunset Commercial Area, DHA Karachi",
    area: "1,600 sq. ft",
    beds: 0,
    baths: 2,
    description:
      "Sample listing: corner retail unit with a glass frontage on a busy commercial street.",
    longDescription:
      "Example property profile: a ground-floor corner unit with wide glass frontage, suitable for retail, a showroom or a customer-facing office. Mezzanine potential would be subject to relevant approvals.",
    features: [
      "Corner unit",
      "Wide glass frontage",
      "Two washrooms",
      "Three-phase power",
      "Roll-up shutter",
      "Mezzanine potential",
    ],
    parking: "Shared frontage parking for customers",
    nearby: ["Cafés", "Banks", "Offices", "Residential blocks"],
    images: [
      { src: prop4, alt: "Corner commercial building with glass storefront" },
      { src: prop2, alt: "Bright interior space suitable for a showroom" },
    ],
  },
  {
    id: "pechs-two-bed-apartment",
    title: "2-Bedroom Apartment",
    type: "apartment",
    typeLabel: "Apartment",
    purpose: "sale",
    price: "PKR 2.4 Cr (sample)",
    priceValue: 24000000,
    location: "PECHS, Karachi",
    area: "1,250 sq. ft",
    beds: 2,
    baths: 2,
    description:
      "Sample listing: compact, well-lit apartment in a low-rise building close to main routes.",
    longDescription:
      "Example property profile: a compact apartment in a low-rise block with a practical layout, combined living and dining area, two bedrooms and a fitted kitchen.",
    features: [
      "Fitted kitchen",
      "Combined living and dining",
      "Lift access",
      "Water storage",
      "Boundary security",
    ],
    parking: "1 allotted parking space",
    nearby: ["Main routes", "Schools", "Hospitals", "Markets"],
    images: [
      { src: prop5, alt: "Apartment living and kitchen area in PECHS" },
      { src: prop2, alt: "Bright apartment interior with large windows" },
    ],
  },
  {
    id: "bahria-town-bungalow",
    title: "5-Bedroom Bungalow",
    type: "house",
    typeLabel: "House",
    purpose: "rent",
    price: "PKR 250,000 / month (sample)",
    priceValue: 250000,
    location: "Bahria Town Karachi",
    area: "350 sq. yd",
    beds: 5,
    baths: 5,
    description:
      "Sample listing: family bungalow with a lawn, covered parking and a gated community setting.",
    longDescription:
      "Example property profile: a bungalow inside a gated community with a front lawn, covered parking and a spacious first-floor family lounge. The example also highlights nearby security, parks and commercial areas.",
    features: [
      "Front lawn",
      "First-floor family lounge",
      "Gated community",
      "Backup power",
      "Community parks nearby",
    ],
    parking: "Covered parking for 2 cars",
    nearby: ["Community park", "Grand Mosque", "Schools", "Commercial area"],
    images: [
      { src: prop6, alt: "Bungalow exterior with lawn at dusk in Bahria Town Karachi" },
      { src: prop1, alt: "Street view of the bungalow frontage" },
      { src: prop5, alt: "Interior lounge of the bungalow" },
    ],
  },
];

export const getProperty = (id: string) => properties.find((p) => p.id === id);

export const locations = [
  "DHA Karachi",
  "Clifton",
  "Gulshan-e-Iqbal",
  "Bahria Town Karachi",
  "PECHS",
];
