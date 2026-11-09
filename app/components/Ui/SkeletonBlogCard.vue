<template>
  <div class="rounded-lg sm:rounded-xl border border-default bg-elevated p-3 sm:p-5 md:p-6 flex flex-col justify-between h-full min-h-[160px] sm:min-h-64">
    <div>
      <!-- Icon & Badge Header -->
      <div class="flex items-start justify-between gap-1 mb-2 sm:mb-5">
        <USkeleton class="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg" />
        <USkeleton class="w-14 sm:w-20 h-4 sm:h-5 rounded-lg" />
      </div>

      <!-- Title Skeleton -->
      <div class="space-y-1.5 sm:space-y-2 mb-2 sm:mb-4">
        <USkeleton class="w-4/5 h-4 sm:h-5 md:h-6 rounded-lg" />
        <USkeleton class="w-3/5 h-4 sm:h-5 md:h-6 rounded-lg" />
      </div>

      <!-- Description Skeleton (visible on all devices) -->
      <div class="space-y-1.5 sm:space-y-2 mb-3 sm:mb-6">
        <USkeleton class="w-full h-3 sm:h-3.5 rounded-lg" />
        <USkeleton class="w-11/12 h-3 sm:h-3.5 rounded-lg" />
      </div>
    </div>

    <!-- Footer Meta -->
    <div class="flex items-center justify-between pt-2 sm:pt-4 border-t border-default/20">
      <USkeleton class="w-12 sm:w-20 h-3 sm:h-3.5 rounded-lg" />
      <USkeleton class="w-14 sm:w-24 h-3 sm:h-3.5 rounded-lg" />
    </div>
  </div>
</template>
