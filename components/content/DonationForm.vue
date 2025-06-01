<template>
  <form class="donation-form" @submit.prevent="handleSubmit">
    <!-- Donation Amount -->
    <div>
      <label for="donation-amount">Donation Amount: $&nbsp;</label>
      <span v-if="props.mode === 'print'">
        {{ formattedDisplayAmount }}
      </span>
      <input
        v-else
        type="number"
        id="donation-amount"
        v-model.number="formData.amount"
        min="1"
        placeholder="Enter amount"
        :readonly="props.mode === 'print'"
        class="print-readonly-input"
      />
    </div>

    <!-- Recognition -->
    <fieldset class="mt-6">
      <legend class="text-lg font-medium text-gray-900 dark:text-gray-100">
        Recognition
      </legend>
      <div class="mt-2 space-y-2">
        <div>
          <input
            type="checkbox"
            id="list-name"
            v-model="formData.listName"
            @change="handleListNameChange"
            :disabled="props.mode === 'print'"
          />
          <label for="list-name" class="ml-2"
            >I would like my name to be listed as:</label
          >
          <input
            v-if="formData.listName"
            type="text"
            id="recognition-name"
            v-model="formData.recognitionName"
            class="ml-2 mt-1 p-1 border rounded w-full bg-white text-gray-900 dark:text-gray-100 print-readonly-input"
            placeholder="Your name for recognition"
            :readonly="props.mode === 'print'"
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="anonymous-gift"
            v-model="formData.anonymousGift"
            @change="handleAnonymousChange"
            :disabled="props.mode === 'print'"
          />
          <label for="anonymous-gift" class="ml-2"
            >I would prefer to make my gift anonymously.</label
          >
        </div>
      </div>
    </fieldset>

    <!-- Submit Button (Placeholder) -->
    <div class="mt-8" v-if="props.mode === 'edit'">
      <button
        type="submit"
        class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="isProceedDisabled"
      >
        Proceed to Donation
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, watch, computed } from "vue";
import { navigateTo } from "#app";

const props = defineProps({
  mode: {
    type: String,
    default: "edit",
    validator: (value) => ["edit", "print"].includes(value),
  },
  initialData: {
    type: Object,
    default: () => ({}),
  },
});

const defaultFormData = {
  amount: null,
  listName: false,
  recognitionName: "",
  anonymousGift: true,
};

const formData = ref({ ...defaultFormData });

if (props.mode === "print" && props.initialData) {
  formData.value = { ...defaultFormData, ...props.initialData };
}

const formattedDisplayAmount = computed(() => {
  if (formData.value.amount == null || formData.value.amount === "") {
    return "";
  }
  // Ensure it's a number before formatting
  const amountNumber = Number(formData.value.amount);
  if (isNaN(amountNumber)) {
    return ""; // Or handle as an error/default
  }
  return amountNumber.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
});

const isProceedDisabled = computed(() => {
  if (props.mode === "print") return true;

  const amount = Number(formData.value.amount);
  const isAmountInvalid =
    formData.value.amount === null || isNaN(amount) || amount < 1;

  const isRecognitionNameMissing =
    formData.value.listName &&
    (formData.value.recognitionName === null ||
      formData.value.recognitionName.trim() === "");

  return isAmountInvalid || isRecognitionNameMissing;
});

watch(
  () => props.initialData,
  (newData) => {
    if (props.mode === "print" && newData) {
      formData.value = { ...defaultFormData, ...newData };
    }
  },
  { deep: true }
);

const handleListNameChange = () => {
  if (formData.value.listName) {
    formData.value.anonymousGift = false;
  }
};

const handleAnonymousChange = () => {
  if (formData.value.anonymousGift) {
    formData.value.listName = false;
    formData.value.recognitionName = "";
  }
};

watch(
  () => formData.value.listName,
  (newValue) => {
    if (newValue) {
      formData.value.anonymousGift = false;
    }
  }
);

watch(
  () => formData.value.anonymousGift,
  (newValue) => {
    if (newValue) {
      formData.value.listName = false;
      formData.value.recognitionName = "";
    }
  }
);

const handleSubmit = () => {
  if (props.mode === "print") return;
  const serializedData = JSON.stringify(formData.value);
  const encodedData = encodeURIComponent(serializedData);
  navigateTo(`/donation-print?data=${encodedData}`);
};
</script>

<style scoped>
.donation-form div,
.donation-form fieldset {
  margin-bottom: 1rem;
}

.donation-form label {
  display: inline-block;
  margin-bottom: 0.25rem;
}

.donation-form input[type="number"],
.donation-form input[type="text"] {
  @apply p-2 border rounded-md w-full max-w-xs text-gray-900;
  /* Ensure dark mode compatibility for text input */
}

/* Styles for the specific donation amount input */
#donation-amount {
  @apply text-gray-900 border-none bg-white;
  /* Remove spinner buttons from number input */
  -moz-appearance: textfield; /* Firefox */
}

#donation-amount::-webkit-inner-spin-button,
#donation-amount::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0; /* Safari and Chrome */
}

.donation-form input[type="checkbox"] {
  @apply appearance-none h-4 w-4 border border-gray-400 rounded-sm bg-transparent align-middle;
  @apply focus:ring-offset-0 focus:ring-2 focus:ring-primary-500 focus:outline-none;
  @apply transition-all duration-150 ease-in-out;
  position: relative;
  cursor: pointer;
}

.donation-form input[type="checkbox"]:checked {
  @apply bg-zinc-800 border-zinc-800;
}

.donation-form input[type="checkbox"]:checked::after {
  content: "";
  display: block;
  position: absolute;
  /* Adjust position to center the checkmark */
  left: 0.25rem; /* 4px for w-4 (16px) box */
  top: 0.0625rem; /* 1px for h-4 (16px) box */
  width: 0.3rem; /* 4.8px wide checkmark */
  height: 0.6rem; /* 9.6px high checkmark */
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.donation-form fieldset {
  @apply border border-gray-300 dark:border-gray-700 p-4 rounded-md;
}

.donation-form legend {
  @apply px-1 text-lg font-semibold;
}

/* Basic styling, can be enhanced with Tailwind */
.mt-6 {
  margin-top: 1.5rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.ml-2 {
  margin-left: 0.5rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.bg-primary-500 {
  /* Placeholder - ensure your primary-500 is defined in Tailwind config */
  background-color: #007bff;
}

.text-white {
  color: white;
}

.rounded {
  border-radius: 0.25rem;
}

.hover\:bg-primary-600:hover {
  /* Placeholder - ensure your primary-600 is defined in Tailwind config */
  background-color: #0056b3;
}

/* Style for the span to mimic readonly input if needed */
.print-readonly-input-display {
  @apply p-2 border rounded-md w-full max-w-xs text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-gray-300;
  display: inline-block; /* or block depending on layout */
  min-height: calc(
    2.25rem + 2px
  ); /* Approximate height of input with border and padding */
  line-height: 1.5rem; /* Approximate line-height of input */
  /* Add other styles from .print-readonly-input if they apply to non-input elements */
}
</style>
