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
        <span class="text-red-500">*</span> Membership Application
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
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <!-- Signature section omitted as it requires printing -->

      <div class="mt-8 text-sm text-gray-500 dark:text-gray-400">
        *Fill this form on your screen, print it out, sign, and mail or e-mail
        it to us.
      </div>

      <div class="mt-6">
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
import { ref } from "vue";

const formData = ref({
  firstName: "",
  lastName: "",
  unit: "",
  street: "",
  city: "",
  province: "",
  postalCode: "",
  phone: "",
  email: "",
});

const statusMessage = ref("");
const isError = ref(false);

async function handleSubmit() {
  statusMessage.value = "Submitting...";
  isError.value = false;
  console.log("Form Data Submitted:", formData.value);

  // ** TODO: Replace console.log with API call to Nuxt server route **
  // Example:
  // try {
  //   const response = await $fetch('/api/submit-membership', {
  //     method: 'POST',
  //     body: formData.value
  //   });
  //   statusMessage.value = 'Application data submitted successfully! Please print, sign, and send.';
  //   // Optionally clear form: Object.keys(formData.value).forEach(key => formData.value[key] = '')
  // } catch (error) {
  //   console.error('Submission error:', error);
  //   statusMessage.value = 'Error submitting application. Please try again.';
  //   isError.value = true;
  // }

  // Simulating submission for now
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  statusMessage.value =
    "Test submission logged to console. Please print, sign, and send the actual form.";
  // Reset form fields if needed
  // Object.keys(formData.value).forEach(key => formData.value[key] = '')
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
.dark .dark\:invert {
  filter: invert(1) hue-rotate(180deg);
}
</style>
