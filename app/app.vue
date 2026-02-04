<template>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
        <NuxtPage/>
    </NuxtLayout>
</template>

<style scoped>
/* Global styles can be added here if needed */
.nuxt-page-enter-active, .nuxt-page-leave-active {
  transition: opacity 0.5s;
}
.nuxt-page-enter-from, .nuxt-page-leave-to {
  opacity: 0;
}
.nuxt-page-enter-to, .nuxt-page-leave-from {
  opacity: 1;
}

</style>
