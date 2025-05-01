<template>
  <div v-if="page">
    <br /><br />
    <FullWidthSection variant="default" padding="sm" :pattern-overlay="true">
      <TwoColumn>
        <template #left>
          <br />
          <NuxtImg
            v-if="page.image"
            :src="page.image"
            :alt="page.imageAlt || page.title"
            class="rounded-lg shadow-lg"
            width="600"
            densities="x1 x2"
          />
        </template>
        <template #right>
          <h1>{{ page.title }}</h1>
          <p v-if="page.artist"><strong>Artist:</strong> {{ page.artist }}</p>
          <p><strong>Date:</strong> {{ formatDate(page.date) }}</p>
          <p><strong>Location:</strong> {{ page.location }}</p>
          <p v-if="page.price"><strong>Price:</strong> {{ page.price }}</p>
          <br />
          <ProseButton
            v-if="page.ticketUrl"
            :to="page.ticketUrl"
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Ticket
          </ProseButton>
        </template>
      </TwoColumn>
    </FullWidthSection>
    <br /><br />

    <!-- Render the main Markdown content below -->
    <FullWidthSection padding="sm">
      <ContentRenderer :value="page" />
    </FullWidthSection>
  </div>
  <div v-else class="text-center py-12">
    <p>Event details not found.</p>
  </div>
</template>

<script setup>
import { computed } from "vue"; // Import computed if needed elsewhere
import { useRoute } from "vue-router";
import { ContentRenderer } from "#components"; // Explicitly import ContentRenderer
// Make sure FullWidthSection, TwoColumn, NuxtImg, ProseButton are auto-imported or explicitly imported if needed

const route = useRoute();
// const id = computed(() => route.params.id); // No longer needed here
// const contentPath = computed(() => `/events/${id.value}`); // No longer needed here

// Fetch the specific event content document
const { data: page, error } = await useAsyncData(
  `event-${route.params.id}`,
  async () => {
    const currentId = route.params.id;
    const queryPath = `/events/${currentId}`;
    console.log(`[Server] Attempting to fetch event with path: ${queryPath}`);
    try {
      // Use queryCollection API (v3) based on docs
      const specificEvent = await queryCollection("events")
        .path(queryPath)
        .first();
      console.log(`[Server] Query result for ${queryPath}:`, !!specificEvent);
      if (!specificEvent) {
        console.warn(`[Server] Event not found for path: ${queryPath}`);
      }
      return specificEvent;
    } catch (err) {
      console.error(
        `[Server] Error fetching event for path ${queryPath}:`,
        err
      );
      // Optionally re-throw or return null/error object
      return null;
    }
  }
);
if (error.value) {
  console.error("[Server/Client] Error from useAsyncData:", error.value);
}

// Optional: Helper function to format the date nicely
function formatDate(isoString) {
  if (!isoString) return "Date TBD";
  try {
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch (e) {
    return "Invalid Date";
  }
}

// SEO Meta (using fetched page data)
if (page.value) {
  useSeoMeta({
    title: page.value.title ?? "Event Details",
    description: page.value.description ?? "Find out more about this event.",
    ogImage: page.value.ogImage,
  });
} else {
  // Also log if page data is missing after fetch attempt
  console.warn(
    `[Server/Client] Page data is null/undefined for event id: ${route.params.id}. Rendering 'Not Found'.`
  );
  useSeoMeta({ title: "Event Not Found" });
}
</script>

<style scoped>
/* Add styles as needed */
main {
  padding: 1rem;
}
img {
  max-width: 100%;
  height: auto;
  margin-top: 1rem;
}
hr {
  margin: 1rem 0;
}
</style>
