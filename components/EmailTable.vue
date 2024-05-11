<template>
  <table class="table-auto w-full border-collapse border border-gray-400">
    <thead class="bg-gray-200">
      <tr>
        <th class="border border-gray-400 px-2">Index</th>
        <th class="border border-gray-400 px-2">Email</th>
        <th class="border border-gray-400 px-2">Data utworzenia</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(email, index) in emails" :key="email.id">
        <td class="border border-gray-400 px-2 text-center">
          {{ index + 1 }}
        </td>
        <td class="border border-gray-400 px-2">{{ email.email }}</td>
        <td class="border border-gray-400 px-2">
          {{ formattedDate(email.createdAt) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
interface Email {
  id: number;
  email: string;
  createdAt: string; // 2024-05-06 17:34:33
}

const props = defineProps<{
  emails: Email[];
}>();

const formattedDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return formattedDate;
};
</script>
