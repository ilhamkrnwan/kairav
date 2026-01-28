<template>
    <div class="blank-layout">
      <!-- Slot untuk konten halaman -->
      <slot />
    </div>
  </template>
  
  <script setup>
  // Meta untuk layout
  useHead({
    htmlAttrs: {
      class: 'blank-layout-html'
    },
    bodyAttrs: {
      class: 'blank-layout-body'
    }
  })
  
  // Optional: Disable scroll untuk layout tertentu
  // onMounted(() => {
  //   document.body.style.overflow = 'hidden'
  // })
  
  // onUnmounted(() => {
  //   document.body.style.overflow = ''
  // })
  </script>
  
  <style scoped>
  .blank-layout {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  
  /* Reset default styles */
  .blank-layout * {
    box-sizing: border-box;
  }
  </style>
  
  <style>
  /* Global styles untuk blank layout */
  html.blank-layout-html {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  body.blank-layout-body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  </style>