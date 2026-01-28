<template>
    <span class="inline-block relative text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 font-bold no-underline cursor-pointer group hover:text-slate-950 transition-colors duration-300">
      <slot />
    </span>
  </template>
  
  <style scoped>
  .group::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 105%;
    padding: 2px 0;
    height: 0; 
    background-color: currentColor;
    transition: height 0.3s ease-in-out; /* Transisi untuk ketinggian */
    z-index: -1; /* Pastikan berada di belakang teks */
    transform: translateX(-50%); /* Geser ke kiri sebesar setengah lebarnya */

  }
  
  .group:hover::before {
    height: 100%; /* Mengisi seluruh tinggi elemen saat hover */
    background-image: linear-gradient(to right, #f59e0b, #f97316);
  }
  </style>
  