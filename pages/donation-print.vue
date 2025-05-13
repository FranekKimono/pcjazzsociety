<template>
  <div class="printable-donation p-8 max-w-2xl mx-auto bg-white text-black">
    <div v-if="donationData">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-900">
        Donation Summary
      </h1>
      <DonationForm :mode="'print'" :initialData="donationData" />

      <!-- E-Transfer Instructions -->
      <section class="mt-10 pt-6 border-t border-gray-300">
        <h3 class="section-title text-center !mb-6 text-gray-900">
          How to Complete Your Donation
        </h3>
        <div class="space-y-4 text-md text-gray-800">
          <p>
            <strong class="text-gray-900">Send an Interac e-Transfer to:</strong
            ><br />
            <span class="font-mono text-primary-700"
              >info@pcjazzsociety.ca</span
            >
          </p>
          <p>
            <strong class="text-gray-900">Amount:</strong>
            <span v-if="formattedAmount">
              {{ formattedAmount }}
            </span>
          </p>
          <p>
            <strong class="text-gray-900">Message/Memo:</strong><br />
            <span class="font-mono">
              Donation for Polish Canadian Jazz Society from
              <template
                v-if="
                  donationData.listName &&
                  donationData.recognitionName &&
                  donationData.recognitionName.trim() !== ''
                "
              >
                {{ donationData.recognitionName }}
              </template>
              <template v-else> __________ </template>
            </span>
          </p>
          <p>
            <strong class="text-gray-900">Important:</strong> Please use the
            same email address as entered in the form above, if possible, so we
            can match your donation.
          </p>
        </div>
      </section>

      <footer class="mt-12 pt-6 border-t border-gray-300 print-instructions">
        <p class="text-lg font-semibold text-center text-red-600">
          IMPORTANT INSTRUCTIONS
        </p>
        <p class="text-md text-center text-gray-700 mt-2">
          Please print this page (File &gt; Print, or Ctrl/Cmd+P), then select
          "Save as PDF".<br />
          Email the completed and signed summary to:
          <strong class="text-gray-900">info@pcjazzsociety.ca</strong>.
        </p>
      </footer>
    </div>
    <div v-else class="text-center py-10">
      <p class="text-xl text-red-500">
        Could not load donation data. Please try submitting the form again.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import DonationForm from "@/components/content/DonationForm.vue";

definePageMeta({ layout: "print" });

const route = useRoute();
const donationData = ref(null);

onMounted(() => {
  if (route.query.data) {
    try {
      const decodedData = decodeURIComponent(route.query.data);
      donationData.value = JSON.parse(decodedData);
    } catch (error) {
      console.error("Error parsing donation data:", error);
      donationData.value = null;
    }
  }
});

const formattedAmount = computed(() => {
  if (
    !donationData.value ||
    donationData.value.amount == null ||
    donationData.value.amount === ""
  )
    return "";
  return (
    "$" +
    Number(donationData.value.amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
});
</script>

<style scoped>
@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    font-size: 10pt;
  }
  .printable-donation {
    margin: 0;
    padding: 10mm;
    max-width: 100%;
    box-shadow: none;
    border: none;
    background-color: white !important;
  }
  .print-instructions {
    display: none !important;
  }
  .printable-donation,
  .printable-donation :deep(*) {
    color: black !important;
    background-color: transparent !important;
  }
  .printable-donation :deep(.donation-form > div),
  .printable-donation section {
    page-break-inside: avoid;
  }
  .printable-donation :deep(h2),
  .printable-donation :deep(h3),
  .printable-donation .section-title {
    margin-top: 0.5rem !important;
    margin-bottom: 0.25rem !important;
    font-size: 12pt !important;
  }
  .printable-donation :deep(p),
  .printable-donation p {
    margin-top: 0.15rem !important;
    margin-bottom: 0.15rem !important;
    font-size: 9pt !important;
    line-height: 1.3 !important;
  }
  .printable-donation :deep(.grid) {
    gap: 0.25rem !important;
  }
  .printable-donation :deep(input.print-readonly-input),
  .printable-donation :deep(label) {
    font-size: 9pt !important;
  }
  .printable-donation :deep(input.print-readonly-input) {
    padding-top: 2px !important;
    padding-bottom: 2px !important;
    border-color: #6b7280 !important;
    background-color: white !important;
    box-shadow: none !important;
  }
  .office-use-only h3 {
    font-size: 11pt !important;
  }
  .office-use-only div > span {
    font-size: 9pt !important;
  }
}
</style>
