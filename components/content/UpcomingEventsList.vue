<template>
  <div class="upcoming-events mt-12">
    <h2 class="text-3xl font-bold mb-6 text-center">Upcoming Events</h2>
    <ClientOnly>
      <ContentList path="/events" :query="query">
        <template #default="{ list }">
          <div
            v-if="list.length"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <div
              v-for="event in list"
              :key="event._path"
              class="event-card border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <NuxtLink :to="event._path">
                <NuxtImg
                  v-if="event.image"
                  :src="event.image"
                  :alt="event.imageAlt || event.title"
                  class="w-full h-48 object-cover"
                  provider="ipx"
                  width="400"
                  height="200"
                  format="webp"
                  loading="lazy"
                />
                <div class="p-4">
                  <h3 class="text-xl font-semibold mb-2">{{ event.title }}</h3>
                  <p
                    v-if="event.artist"
                    class="text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {{ event.artist }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(event.date) }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
          <div v-else class="text-center text-gray-500 dark:text-gray-400">
            <p>No upcoming events scheduled at the moment. Check back soon!</p>
          </div>
        </template>
        <template #not-found>
          <div class="text-center text-gray-500 dark:text-gray-400">
            <p>Looking for events...</p>
          </div>
        </template>
      </ContentList>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";

// Define the query to fetch upcoming events
const query: QueryBuilderParams = {
  path: "/events",
  where: [
    // Filter for future events (date greater than or equal to today)
    { date: { $gte: new Date().toISOString().split("T")[0] } },
  ],
  sort: [{ date: 1 }], // Sort by date ascending (soonest first)
  only: ["title", "artist", "date", "image", "imageAlt", "_path"], // Only fetch necessary fields
};

// Helper function to format date
const formatDate = (isoDateString: string): string => {
  if (!isoDateString) return "Date TBC";
  try {
    const date = new Date(isoDateString);
    // Example format: October 26, 2024, 8:00 PM
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short", // Consider adding timezone awareness if needed
    });
  } catch (e) {
    console.error("Error formatting date:", isoDateString, e);
    return "Invalid Date";
  }
};
</script>

<style scoped>
/* Add any component-specific styles here if needed */
.event-card a {
  text-decoration: none;
  color: inherit;
  display: block; /* Ensure the link covers the whole card */
}
</style>
