<template>
    <button 
      type="button" 
      class="border border-border/40 bg-background/50 backdrop-blur-sm text-muted-foreground rounded-sm px-4 py-2 m-2 transition duration-500 ease select-none font-mono tracking-widest uppercase text-[10px]
             hover:border-amber-400/50 hover:text-amber-400 hover:bg-background/80 focus:outline-none focus:shadow-outline"
    >
      <slot />
    </button>
  </template>