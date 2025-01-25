import { createClient } from "next-sanity";

const client = createClient({
  projectId: "rvjgczr8",
  dataset: "production",
  apiVersion: "2025-01-13", // Use the latest API version
  useCdn: true, // Set to true in production
});
