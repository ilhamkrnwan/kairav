<template>
  <div class="rounded-xl border border-border/40 bg-background/40 backdrop-blur-sm p-6 flex flex-col justify-between h-full min-h-64">
    <div>
      <!-- Icon & Badge Header -->
      <div class="flex items-start justify-between mb-5">
        <UiSkeletonBase class="w-14 h-14 rounded-sm" />
        <UiSkeletonBase class="w-20 h-5 rounded-sm" />
      </div>

      <!-- Title Skeleton -->
      <div class="space-y-2 mb-4">
        <UiSkeletonBase class="w-4/5 h-6 rounded-sm" />
        <UiSkeletonBase class="w-3/5 h-6 rounded-sm" />
      </div>

      <!-- Description Skeleton -->
      <div class="space-y-2 mb-6">
        <UiSkeletonBase class="w-full h-3.5 rounded-sm" />
        <UiSkeletonBase class="w-11/12 h-3.5 rounded-sm" />
        <UiSkeletonBase class="w-3/4 h-3.5 rounded-sm" />
      </div>
    </div>

    <!-- Footer Meta -->
    <div class="flex items-center justify-between pt-4 border-t border-border/20">
      <UiSkeletonBase class="w-20 h-3.5 rounded-sm" />
      <UiSkeletonBase class="w-24 h-3.5 rounded-sm" />
    </div>
  </div>
</template>
