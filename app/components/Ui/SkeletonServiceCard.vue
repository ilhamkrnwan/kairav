<template>
  <div class="rounded-sm border border-border/40 bg-background/40 backdrop-blur-sm p-3 sm:p-5 md:p-6 flex flex-col justify-between h-full min-h-[160px] sm:min-h-64">
    <div>
      <!-- Icon & Category Badge -->
      <div class="flex items-start justify-between gap-1 mb-2 sm:mb-4 md:mb-8">
        <UiSkeletonBase class="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-sm" />
        <UiSkeletonBase class="w-14 sm:w-20 md:w-24 h-4 sm:h-5 rounded-sm" />
      </div>

      <!-- Title Skeleton -->
      <div class="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
        <UiSkeletonBase class="w-3/4 h-5 sm:h-6 md:h-7 rounded-sm" />
        <UiSkeletonBase class="w-1/2 h-5 sm:h-6 md:h-7 rounded-sm" />
      </div>

      <!-- Description Skeleton (visible on all devices) -->
      <div class="space-y-1.5 sm:space-y-2 mb-3 sm:mb-6 md:mb-8">
        <UiSkeletonBase class="w-full h-3 sm:h-3.5 rounded-sm" />
        <UiSkeletonBase class="w-11/12 h-3 sm:h-3.5 rounded-sm" />
      </div>

      <!-- Tags Skeleton -->
      <div class="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-6 md:mb-8">
        <UiSkeletonBase class="w-10 sm:w-16 h-3.5 sm:h-5 rounded-sm" />
        <UiSkeletonBase class="w-12 sm:w-20 h-3.5 sm:h-5 rounded-sm" />
      </div>
    </div>

    <!-- Footer Skeleton -->
    <div class="flex items-center justify-between pt-2 sm:pt-4 border-t border-border/20">
      <UiSkeletonBase class="w-12 sm:w-20 h-3 sm:h-3.5 rounded-sm" />
      <UiSkeletonBase class="w-14 sm:w-28 h-3 sm:h-3.5 rounded-sm" />
    </div>
  </div>
</template>
