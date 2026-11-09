<script setup lang="ts">
interface Props {
  type?: 'blog' | 'portfolio' | 'service'
}

withDefaults(defineProps<Props>(), {
  type: 'blog'
})
</script>

<template>
  <div class="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto max-w-4xl">
      <!-- Top Badge & Title Header Skeleton -->
      <div class="flex flex-col items-center text-center mb-12">
        <USkeleton class="w-28 h-6 rounded-lg mb-6" />
        <USkeleton class="w-4/5 h-10 md:h-14 rounded-xl mb-4" />
        <USkeleton class="w-3/5 h-10 md:h-14 rounded-xl mb-6" />
        <USkeleton class="w-2/3 h-5 rounded-xl mb-8" />

        <!-- Meta Bar Skeleton (Date, Read Time / Client, Industry) -->
        <div class="flex flex-wrap items-center justify-center gap-4 py-3 px-6 rounded-lg bg-elevated border border-default w-full max-w-md">
          <USkeleton class="w-24 h-4 rounded-lg" />
          <div class="w-1.5 h-1.5 rounded-full bg-accented/40" />
          <USkeleton class="w-20 h-4 rounded-lg" />
          <div class="w-1.5 h-1.5 rounded-full bg-accented/40" />
          <USkeleton class="w-28 h-4 rounded-lg" />
        </div>
      </div>

      <!-- Featured Cover / Hero Image Skeleton -->
      <div class="mb-12 rounded-lg overflow-hidden border border-default bg-elevated p-2">
        <USkeleton class="w-full aspect-video md:aspect-21/9 rounded-xl" />
      </div>

      <!-- Main Content Skeleton Paragraphs -->
      <div class="space-y-8 max-w-3xl mx-auto">
        <!-- Paragraph 1 -->
        <div class="space-y-3">
          <USkeleton class="w-full h-4 rounded-lg" />
          <USkeleton class="w-11/12 h-4 rounded-lg" />
          <USkeleton class="w-4/5 h-4 rounded-lg" />
          <USkeleton class="w-5/6 h-4 rounded-lg" />
        </div>

        <!-- Section Heading Skeleton -->
        <USkeleton class="w-1/2 h-8 rounded-xl my-6" />

        <!-- Paragraph 2 -->
        <div class="space-y-3">
          <USkeleton class="w-full h-4 rounded-lg" />
          <USkeleton class="w-full h-4 rounded-lg" />
          <USkeleton class="w-3/4 h-4 rounded-lg" />
        </div>

        <!-- Quote / Feature Highlight Box Skeleton -->
        <div class="p-6 rounded-xl border border-default bg-primary/5 space-y-3">
          <USkeleton class="w-full h-4 rounded-lg" />
          <USkeleton class="w-4/5 h-4 rounded-lg" />
        </div>

        <!-- Paragraph 3 -->
        <div class="space-y-3">
          <USkeleton class="w-full h-4 rounded-lg" />
          <USkeleton class="w-10/12 h-4 rounded-lg" />
          <USkeleton class="w-3/5 h-4 rounded-lg" />
        </div>
      </div>

      <!-- Bottom Navigation Skeleton -->
      <div class="mt-16 pt-8 border-t border-default/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <USkeleton class="w-40 h-10 rounded-lg" />
        <USkeleton class="w-40 h-10 rounded-lg" />
      </div>
    </div>
  </div>
</template>
