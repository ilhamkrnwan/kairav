<template>
  <div class="logo-wrapper">
    <NuxtLink to="/" class="logo-link">
      <!-- Logo Image -->
      <img 
        src="/kairav.webp" 
        alt="Kairav Logo" 
        class="logo-image"
      />
      
      <!-- Text - Hidden on mobile, visible on desktop -->
      <span class="logo-text">KAIRAV</span>
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.logo-image {
  width: 40px;
  height: 40px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  display: none;
}

:global(.dark) .logo-text {
  color: #ffffff;
}

.logo-link:hover .logo-image {
  transform: scale(1.1);
}

.logo-link:hover .logo-text {
  opacity: 0.8;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 640px) {
  .logo-wrapper {
    top: 15px;
    left: 20px;
    height: 45px;
  }
  
  .logo-image {
    width: 35px;
    height: 35px;
  }
  
  .logo-text {
    display: none;
  }
}

@media (min-width: 641px) {
  .logo-text {
    display: block;
  }
}

@media (min-width: 768px) {
  .logo-wrapper {
    left: 90px;
  }
  
  .logo-image {
    width: 40px;
    height: 40px;
  }
  
  .logo-text {
    font-size: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .logo-wrapper {
    left: 90px;
  }
}
</style>