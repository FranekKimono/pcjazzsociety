<template>
  <div
    class="membership-application bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 my-8"
  >
    <div
      class="mb-6 pb-4 border-b border-gray-300 dark:border-gray-600 flex justify-between items-start"
    >
      <div>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Polish Canadian Jazz Society
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          13830 - 33rd Avenue<br />Surrey, BC, V4P 2B4<br />CANADA
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Email: info@pcjazzsociety.ca
        </p>
      </div>
      <div class="ml-4 flex-shrink-0">
        <img
          src="/images/PCJA-logo-blue.png"
          width="150"
          alt="PCJS logo"
          class="dark:invert"
        />
      </div>
    </div>

    <div class="mb-6">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        <span v-if="props.mode === 'edit'" class="text-red-500">*</span>
        Membership Application
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        All members are required to adhere to the Polish Canadian Jazz Society's
        Constitution and Bylaws. The Application should be accompanied by
        payment for the Membership annual fee of $25 - cheque payable to PCJS.
      </p>
    </div>

    <form @submit.prevent="handleSubmit">
      <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
        Applicant's Name
      </h4>
      <div class="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label
            for="firstName"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >First Name:</label
          >
          <input
            v-model="formData.firstName"
            name="firstName"
            type="text"
            id="firstName"
            :required="props.mode === 'edit'"
            :readonly="props.mode === 'print'"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white print-readonly-input"
          />
        </div>
        <div>
          <label
            for="lastName"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Last Name:</label
          >
          <input
            v-model="formData.lastName"
            name="lastName"
            type="text"
            id="lastName"
            :required="props.mode === 'edit'"
            :readonly="props.mode === 'print'"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white print-readonly-input"
          />
        </div>
      </div>

      <hr class="my-6 border-gray-300 dark:border-gray-600" />

      <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
        Address
      </h4>
      <div class="grid md:grid-cols-2 gap-x-4 gap-y-4 mb-6">
        <div>
          <label
            for="unit"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Unit:</label
          >
          <input
            v-model="formData.unit"
            name="unit"
            type="text"
            id="unit"
            :readonly="props.mode === 'print'"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white print-readonly-input"
          />
        </div>
        <div>
          <label
            for="street"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Street:</label
          >
          <input
            v-model="formData.street"
            name="street"
            type="text"
            id="street"
            :required="props.mode === 'edit'"
            :readonly="props.mode === 'print'"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white print-readonly-input"
          />
        </div>
        <div>
          <label
            for="city"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >City:</label
          >
          <input
            v-model="formData.city"
            type="text"
            name="city"
            id="city"
            :required="props.mode === 'edit'"
            :readonly="props.mode === 'print'"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white print-readonly-input"
          />
        </div>
        <div>
          <label
            for="province"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Province:</label
          >
          <input
            v-model="formData.province"
            name="province"
            type="text"
            id="province"
            :required="props.mode === 'edit'"
            :readonly="props.mode === 'print'"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white print-readonly-input"
          />
        </div>
        <div>
          <label
            for="postalCode"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Postal Code:</label
          >
          <input
            v-model="formData.postalCode"
            type="text"
            name="postalCode"
            id="postalCode"
            :required="props.mode === 'edit'"
            :readonly="props.mode === 'print'"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white print-readonly-input"
          />
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label
            for="phone"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Phone:</label
          >
          <input
            v-model="formData.phone"
            type="tel"
            name="phone"
            id="phone"
            :readonly="props.mode === 'print'"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white print-readonly-input"
          />
        </div>
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >E-mail:</label
          >
          <input
            v-model="formData.email"
            type="email"
            name="email"
            id="email"
            :required="props.mode === 'edit'"
            :readonly="props.mode === 'print'"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white print-readonly-input"
          />
        </div>
      </div>

      <!-- Signature section omitted as it requires printing -->

      <div
        v-if="props.mode === 'edit'"
        class="mt-8 text-sm text-gray-500 dark:text-gray-400"
      >
        *Fill this form on your screen, print it out, sign, and mail or e-mail
        it to us.
      </div>

      <div v-if="props.mode === 'edit'" class="mt-6">
        <button
          type="submit"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
        >
          Submit Application Data (Test)
        </button>
        <p
          v-if="statusMessage"
          class="mt-3 text-sm"
          :class="
            isError
              ? 'text-red-600 dark:text-red-400'
              : 'text-green-600 dark:text-green-400'
          "
        >
          {{ statusMessage }}
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, toRefs } from "vue";
import { navigateTo } from "#app";

const props = defineProps({
  mode: {
    type: String,
    default: "edit", // 'edit' or 'print'
    validator: (value) => ["edit", "print"].includes(value),
  },
  initialData: {
    type: Object,
    default: () => ({}),
  },
});

const defaultFormData = {
  firstName: "",
  lastName: "",
  unit: "",
  street: "",
  city: "",
  province: "",
  postalCode: "",
  phone: "",
  email: "",
};

const formData = ref({ ...defaultFormData });

if (props.mode === "print" && props.initialData) {
  // Ensure all keys from defaultFormData are present, even if not in initialData
  const mergedData = { ...defaultFormData, ...props.initialData };
  formData.value = mergedData;
}

const statusMessage = ref("");
const isError = ref(false);

// Watch for initialData changes if the component might be re-used with new print data
// This is more robust if the print page component instance is somehow reused.
watch(
  () => props.initialData,
  (newData) => {
    if (props.mode === "print" && newData) {
      const mergedData = { ...defaultFormData, ...newData };
      formData.value = mergedData;
    }
  },
  { deep: true }
);

async function handleSubmit() {
  if (props.mode === "print") return; // Should not happen if button is hidden

  isError.value = false;
  statusMessage.value = "Preparing printable application...";

  try {
    const serializedData = JSON.stringify(formData.value);
    const encodedData = encodeURIComponent(serializedData);

    statusMessage.value = "Redirecting to printable view...";
    isError.value = false;

    await navigateTo(`/membership-application-print?data=${encodedData}`);
  } catch (error) {
    console.error("Error preparing printable application:", error);
    statusMessage.value =
      "Could not prepare the printable application. Please try again.";
    isError.value = true;
  }
}
</script>

<style scoped>
.print-readonly-input:read-only {
  /* Style read-only inputs to look like normal text for print, remove focus ring */
  /* Tailwind's default readonly often greys them out or changes border. */
  /* We want them to look like filled fields. */
  border-color: #d1d5db; /* Match default border-gray-300 */
  box-shadow: none;
  cursor: default;
  background-color: #f9fafb; /* A very light gray or white, adjust as needed */
}

.dark .print-readonly-input:read-only {
  border-color: #4b5563; /* Match default dark:border-gray-600 */
  background-color: #374151; /* Match dark:bg-gray-700 */
}

/* Ensure the logo is not inverted by dark mode specific CSS when printing */
@media print {
  .dark\:invert {
    filter: none !important; /* Overrides the dark mode invert specifically for print */
  }
  .print-readonly-input:read-only {
    background-color: white !important; /* Ensure white background on print */
    color: black !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
