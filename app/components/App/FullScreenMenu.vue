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
      <ul class="text-4xl text-white space-y-4">
        <li v-for="(menuItem, index) in menuItems" :key="index">
          <UiStyleButton class="style-button">
            <NuxtLink :to="menuItem.route" @click="closeMenu">
              {{ menuItem.name }}
            </NuxtLink>
          </UiStyleButton>
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
}

/* Stagger animation */
.wrapper ul li {
  opacity: 0;
  transform: translateX(50px);
  transition: all 0.3s ease;
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
    right: 15px;
    top: 15px;
    height: 45px;
    width: 45px;
  }
  
  .wrapper {
    clip-path: circle(0px at calc(100% - 37px) 37px);
  }
}

@media (min-width: 768px) {
  .wrapper {
    clip-path: circle(0px at calc(100% - 45px) 45px);
  }
}

@media (min-width: 1024px) {
  .wrapper {
    clip-path: circle(0px at calc(100% - 45px) 45px);
  }
}
</style>
