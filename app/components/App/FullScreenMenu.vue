<script setup>
const { t } = useI18n()
const isOpen = ref(false)

const menuItems = computed(() => [
  { name: t('Home'), route: '/' },
  { name: t('Portofolio'), route: '/portofolio' },
  { name: t('Gallery'), route: '/gallery' },
  { name: t('About'), route: '/about' }
])

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <div>
    <!-- Toggle Button -->
    <button class="menu-btn" @click="toggleMenu">
      <Icon
        v-if="!isOpen"
        name="streamline-ultimate-color:navigation-menu-1"
        class="w-6 h-6"
      />
      <Icon
        v-else
        name="streamline-stickies-color:cancel-2-duo"
        class="w-8 h-8"
      />
    </button>

    <!-- Menu Wrapper -->
    <div class="wrapper" :class="{ open: isOpen }">
      <ul class="menu-list text-white">
        <li v-for="(menuItem, index) in menuItems" :key="index">
          <NuxtLink :to="menuItem.route" @click="closeMenu" class="menu-link-wrapper">
            <UiStyleButton class="style-button">
              {{ menuItem.name }}
            </UiStyleButton>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
/* Menu button - Right Side - Blob Style */
.menu-btn {
  position: fixed;
  z-index: 10001;
  right: 20px;
  top: 20px;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  background: transparent;
}

.menu-btn::before {
  content: '';
  position: absolute;
  inset: -25%;
  width: 150%;
  height: 150%;
  background-image: url('/blob-lb.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  transition: all 0.3s ease;
}

.menu-btn:hover {
  transform: scale(1.1);
}

.menu-btn:hover::before {
  transform: rotate(10deg);
}

/* Wrapper animation - Full Screen Behind Button */
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  clip-path: circle(0px at calc(100% - 45px) 45px);
  transition: all 0.35s ease-in-out;
  z-index: 9998;
  pointer-events: none;
  background: linear-gradient(-135deg, #ffa011, #fff12e);
}

.wrapper.open {
  clip-path: circle(150%);
  pointer-events: auto;
}

/* Menu list */
.wrapper ul {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  gap: clamp(0.75rem, 2vw, 1.5rem);
  padding: 2rem clamp(1rem, 5vw, 2rem);
}

.menu-list {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
}

/* Stagger animation */
.wrapper ul li {
  opacity: 0;
  transform: translateX(50px);
  transition: all 0.3s ease;
  width: clamp(280px, 90%, 500px);
  margin: 0 auto;
}

.wrapper ul li .menu-link-wrapper {
  width: 100%;
  display: block;
  text-decoration: none;
}

.wrapper ul li .style-button {
  width: 100%;
}

.wrapper ul li .style-button :deep(button) {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(45px, 10vw, 60px);
  padding: clamp(0.75rem, 2vw, 1.5rem) clamp(1.5rem, 4vw, 3rem);
  font-size: inherit;
}

.wrapper ul li .style-button :deep(span) {
  background-image: none !important;
  background-clip: border-box !important;
  -webkit-background-clip: border-box !important;
  -webkit-text-fill-color: #1a1a1a !important;
  color: #1a1a1a !important;
  opacity: 1 !important;
}

.wrapper ul li .style-button :deep(button:hover span) {
  -webkit-text-fill-color: white !important;
  color: white !important;
}

.wrapper.open ul li {
  opacity: 1;
  transform: translateX(0);
}

.wrapper.open ul li:nth-child(1) { transition-delay: 0.1s }
.wrapper.open ul li:nth-child(2) { transition-delay: 0.2s }
.wrapper.open ul li:nth-child(3) { transition-delay: 0.3s }
.wrapper.open ul li:nth-child(4) { transition-delay: 0.4s }
.wrapper.open ul li:nth-child(5) { transition-delay: 0.5s }

/* Responsive */
@media (max-width: 640px) {
  .menu-btn {
    right: clamp(10px, 3vw, 15px);
    top: clamp(10px, 3vw, 15px);
    height: clamp(40px, 10vw, 45px);
    width: clamp(40px, 10vw, 45px);
  }
  
  .wrapper {
    clip-path: circle(0px at calc(100% - 37px) 37px);
  }

  .wrapper ul li {
    width: 95%;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .wrapper ul li {
    width: 85%;
  }
}
</style>
