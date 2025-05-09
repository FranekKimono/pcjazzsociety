<template>
  <div class="printable-application p-8 max-w-4xl mx-auto bg-white text-black">
    <div v-if="applicationData" class="space-y-6">
      <!-- The MembershipApplication component will render the society header and form fields -->
      <MembershipApplication :mode="'print'" :initialData="applicationData" />

      <!-- Declaration & Signature section - specific to the print page -->
      <section class="mt-8 pt-6 border-t border-gray-300">
        <h3 class="section-title">Declaration & Signature</h3>
        <p class="text-sm text-gray-700">
          I, the undersigned, hereby apply for membership in the Polish Canadian
          Jazz Society. I agree to abide by the Constitution and Bylaws of the
          Society. I understand that the annual membership fee is $25.00.
        </p>
        <div class="mt-12 grid grid-cols-2 gap-8">
          <div>
            <div class="signature-line"></div>
            <p class="text-sm text-gray-700 text-center">
              Signature of Applicant
            </p>
          </div>
          <div>
            <div class="signature-line"></div>
            <p class="text-sm text-gray-700 text-center">Date</p>
          </div>
        </div>
      </section>

      <!-- Office Use Only Section -->
      <section class="mt-10 pt-6 border-t border-gray-300 office-use-only">
        <h3 class="section-title text-center !mb-6">For Office Use Only</h3>
        <div class="space-y-6 text-sm text-gray-700">
          <div class="flex items-end">
            <span class="whitespace-nowrap">Application received by:</span>
            <div
              class="flex-grow border-b border-gray-400 mx-2"
              style="min-width: 150px"
            ></div>
            <span class="whitespace-nowrap">Date:</span>
            <div
              class="border-b border-gray-400 ml-2"
              style="width: 120px"
            ></div>
          </div>
          <div class="flex items-end">
            <span class="whitespace-nowrap">Application approved by:</span>
            <div
              class="flex-grow border-b border-gray-400 mx-2"
              style="min-width: 150px"
            ></div>
            <span class="whitespace-nowrap">Date:</span>
            <div
              class="border-b border-gray-400 ml-2"
              style="width: 120px"
            ></div>
          </div>
        </div>
      </section>

      <!-- IMPORTANT INSTRUCTIONS footer - specific to the print page -->
      <footer class="mt-12 pt-6 border-t border-gray-300 print-instructions">
        <p class="text-lg font-semibold text-center text-red-600">
          IMPORTANT INSTRUCTIONS
        </p>
        <p class="text-md text-center text-gray-700 mt-2">
          Please print this page (File > Print, or Ctrl/Cmd+P), then select
          "Save as PDF".<br />
          Sign the printed form or the PDF digitally if you have the
          capability.<br />
          Email the completed and signed application, along with proof of
          payment (or cheque details if mailing), to:
          <strong class="text-gray-900">info@pcjazzsociety.ca</strong>.
        </p>
        <p class="text-md text-center text-gray-700 mt-2">
          Alternatively, mail the printed form and cheque (payable to PCJS) to
          the address above.
        </p>
      </footer>
    </div>
    <div v-else class="text-center py-10">
      <p class="text-xl text-red-500">
        Could not load application data. Please try submitting the form again.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import MembershipApplication from "@/components/content/MembershipApplication.vue"; // Import the component

definePageMeta({
  layout: "print",
});

const route = useRoute();
const applicationData = ref(null);

onMounted(() => {
  if (route.query.data) {
    try {
      const decodedData = decodeURIComponent(route.query.data);
      applicationData.value = JSON.parse(decodedData);
    } catch (error) {
      console.error("Error parsing application data:", error);
      applicationData.value = null;
    }
  }
});
</script>

<style scoped>
.printable-application {
  font-family: Arial, sans-serif;
}

.section-title {
  @apply text-xl font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-300;
}

.signature-line {
  @apply h-px bg-gray-500 mt-8 mb-1 mx-auto w-3/4;
}

/* Print-specific styles */
@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    font-size: 10pt; /* General smaller font for print if needed */
  }
  .printable-application {
    margin: 0;
    padding: 10mm; /* Reduced padding for print */
    max-width: 100%;
    box-shadow: none;
    border: none;
    background-color: white !important;
  }
  .print-instructions {
    display: none !important;
  }
  .printable-application,
  .printable-application :deep(*) {
    color: black !important;
    background-color: transparent !important;
  }

  /* Attempt to keep sections from breaking */
  .printable-application :deep(.membership-application > div), /* Targets main divs within the rendered form component */
  .printable-application section {
    page-break-inside: avoid;
  }

  /* Reduce spacing for elements rendered by MembershipApplication and print page itself */
  .printable-application :deep(h2),
  .printable-application :deep(h3),
  .printable-application :deep(h4),
  .printable-application .section-title {
    /* section-title is local to print page */
    margin-top: 0.5rem !important;
    margin-bottom: 0.25rem !important;
    font-size: 12pt !important; /* Adjust heading sizes for print */
  }
  .printable-application :deep(header h1) {
    font-size: 14pt !important;
    margin-bottom: 0.2rem !important;
  }
  .printable-application :deep(header h2) {
    font-size: 13pt !important;
    margin-top: 0.3rem !important;
  }
  .printable-application :deep(header p) {
    font-size: 8pt !important;
    line-height: 1.2 !important;
    margin-top: 0.1rem !important;
  }

  .printable-application :deep(p),
  .printable-application p {
    /* Paragraphs local to print page too */
    margin-top: 0.15rem !important;
    margin-bottom: 0.15rem !important;
    font-size: 9pt !important; /* Smaller paragraph font for print */
    line-height: 1.3 !important;
  }

  .printable-application :deep(.grid) {
    /* Reduce gaps in grids */
    gap: 0.25rem !important;
  }
  .printable-application :deep(input.print-readonly-input),
  .printable-application :deep(label) {
    font-size: 9pt !important;
  }
  .printable-application :deep(input.print-readonly-input) {
    padding-top: 2px !important;
    padding-bottom: 2px !important;
  }

  .printable-application :deep(hr) {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }

  .printable-application :deep(img.dark\:invert) {
    filter: none !important;
  }
  .printable-application :deep(.print-readonly-input) {
    border-color: #6b7280 !important;
    background-color: white !important;
    box-shadow: none !important;
  }
  .office-use-only h3 {
    font-size: 11pt !important; /* Specific for Office Use Only heading */
  }
  .office-use-only div > span {
    font-size: 9pt !important; /* Text within office use lines */
  }
}
</style>
