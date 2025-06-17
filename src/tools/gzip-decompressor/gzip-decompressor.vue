<script lang="ts" setup>
import { ref } from 'vue';
import { decompress } from './gzip-decompressor.service';

const userInput = ref('');
const decompressedOutput = ref('');
const error = ref<string | null>(null);

watch(userInput, async (val) => {
  error.value = null;
  decompressedOutput.value = '';

  if (!val.trim()) {
    return;
  }

  try {
    decompressedOutput.value = await decompress(val);
  }
  catch (err: any) {
    error.value = 'Decompression failed. Please ensure the input is valid GZip.';
  }
});
</script>

<template>
  <c-card title="GZip Decompressor">
    <c-input-text
      v-model:value="userInput"
      label="GZipped User Input"
      placeholder="Paste your GZipped string here..."
      multiline
      autosize
      rows="6"
      raw-text
      monospace
      class="mb-6"
    />

    <c-alert v-if="error" type="error" title="Error while decompressing" class="mt-4">
      {{ error }}
    </c-alert>

    <c-input-text
      label="Decompressed Output"
      :value="decompressedOutput"
      placeholder=""
      readonly
      multiline
      autosize
      monospace
      rows="6"
      class="mt-4"
    />
  </c-card>
</template>
