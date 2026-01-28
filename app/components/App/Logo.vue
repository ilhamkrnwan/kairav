<template>
  <div class="logo-wrapper">
    <NuxtLink to="/" class="logo-link">
      KAIRAV
    </NuxtLink>
  </div>
</template>

<style scoped>
.logo-wrapper {
  position: fixed;
  top: 20px;
  left: 90px;
  z-index: 100;
  display: flex;
  align-items: center;
  height: 50px;
  transition: all 0.3s ease;
}

.logo-link {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  text-decoration: none;
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
}

:global(.dark) .logo-link {
  color: #ffffff;
}

.logo-link:hover {
  opacity: 0.8;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 640px) {
  .logo-wrapper {
    top: 15px;
    left: 75px;
    height: 45px;
  }
  
  .logo-link {
    font-size: 1.25rem;
  }
}

@media (min-width: 768px) {
  .logo-wrapper {
    left: 90px;
  }
}

@media (min-width: 1024px) {
  .logo-wrapper {
    left: 90px;
  }
}
</style>
