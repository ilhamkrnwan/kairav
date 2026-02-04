<script setup lang="ts">
interface Props {
  doc: any
}

defineProps<Props>()
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 lg:px-8 pb-16">
    <div class="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-code:text-amber-400 prose-code:bg-amber-400/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
      <ContentRenderer :value="doc" />
    </div>
  </div>
</template>

<style>
.prose h2 {
  font-size: 1.875rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.dark .prose h2 {
  border-bottom-color: #374151;
}

.prose h3 {
  font-size: 1.5rem;
}

.prose img {
  border-radius: 0.75rem;
}

.prose .slider-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.prose .slider-container::-webkit-scrollbar {
  display: none;
}

.prose .slider-container img {
  border: 1px solid #e5e7eb;
}

.dark .prose .slider-container img {
  border-color: #4b5563;
}
</style>
