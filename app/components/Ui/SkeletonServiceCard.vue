<template>
  <div class="rounded-sm border border-border/40 bg-background/40 backdrop-blur-sm p-6 flex flex-col justify-between h-full min-h-64">
    <div>
      <!-- Icon & Category Badge -->
      <div class="flex items-start justify-between gap-4 mb-8">
        <UiSkeletonBase class="w-14 h-14 rounded-sm" />
        <UiSkeletonBase class="w-24 h-5 rounded-sm" />
      </div>

      <!-- Title Skeleton -->
      <div class="space-y-2 mb-3">
        <UiSkeletonBase class="w-3/4 h-7 rounded-sm" />
        <UiSkeletonBase class="w-1/2 h-7 rounded-sm" />
      </div>

      <!-- Description Skeleton -->
      <div class="space-y-2 mb-8">
        <UiSkeletonBase class="w-full h-3.5 rounded-sm" />
        <UiSkeletonBase class="w-11/12 h-3.5 rounded-sm" />
        <UiSkeletonBase class="w-2/3 h-3.5 rounded-sm" />
      </div>

      <!-- Tags Skeleton -->
      <div class="flex flex-wrap gap-2 mb-8">
        <UiSkeletonBase class="w-16 h-5 rounded-sm" />
        <UiSkeletonBase class="w-20 h-5 rounded-sm" />
        <UiSkeletonBase class="w-14 h-5 rounded-sm" />
      </div>
    </div>

    <!-- Footer Skeleton -->
    <div class="flex items-center justify-between pt-4 border-t border-border/20">
      <UiSkeletonBase class="w-20 h-3.5 rounded-sm" />
      <UiSkeletonBase class="w-28 h-3.5 rounded-sm" />
    </div>
  </div>
</template>
