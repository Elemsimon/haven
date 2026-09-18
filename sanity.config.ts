import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

export default defineConfig({
  name: "default",
  title: "Ryan Hotel",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: {
    types: [
      {
        name: "hotelRoom", title: "Hotel Room", type: "document",
        fields: [
          { name: "name", title: "Room Name", type: "string" },
          { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
          { name: "description", title: "Description", type: "text" },
          { name: "price", title: "Price (per night)", type: "number" },
          { name: "discount", title: "Discount (%)", type: "number", initialValue: 0 },
          { name: "type", title: "Room Type", type: "string", options: { list: ["Basic", "Luxury", "Suite"] } },
          { name: "dimension", title: "Dimension", type: "string" },
          { name: "numberOfBeds", title: "Number of Beds", type: "number" },
          { name: "isBooked", title: "Is Booked", type: "boolean", initialValue: false },
          { name: "isFeatured", title: "Is Featured", type: "boolean", initialValue: false },
          { name: "specialNote", title: "Special Note", type: "text" },
          { name: "coverImage", title: "Cover Image", type: "object", fields: [{ name: "url", type: "url" }] },
          { name: "images", title: "Gallery Images", type: "array", of: [{ type: "object", fields: [{ name: "url", type: "url" }, { name: "_key", type: "string" }] }] },
          { name: "offeredAmenities", title: "Amenities", type: "array", of: [{ type: "object", fields: [{ name: "amenity", type: "string" }, { name: "icon", type: "string" }, { name: "_key", type: "string" }] }] },
        ],
      },
      {
        name: "user", title: "User", type: "document",
        fields: [
          { name: "name", type: "string" }, { name: "email", type: "string" },
          { name: "password", type: "string" }, { name: "image", type: "url" },
          { name: "about", type: "text" }, { name: "isAdmin", type: "boolean", initialValue: false },
        ],
      },
      {
        name: "booking", title: "Booking", type: "document",
        fields: [
          { name: "user", type: "reference", to: [{ type: "user" }] },
          { name: "hotelRoom", type: "reference", to: [{ type: "hotelRoom" }] },
          { name: "checkinDate", type: "date" }, { name: "checkoutDate", type: "date" },
          { name: "numberOfDays", type: "number" }, { name: "adults", type: "number" },
          { name: "children", type: "number" }, { name: "totalPrice", type: "number" },
          { name: "discount", type: "number" },
        ],
      },
      {
        name: "review", title: "Review", type: "document",
        fields: [
          { name: "user", type: "reference", to: [{ type: "user" }] },
          { name: "hotelRoom", type: "reference", to: [{ type: "hotelRoom" }] },
          { name: "text", type: "text" }, { name: "userRating", type: "number" },
        ],
      },
    ],
  },
});
