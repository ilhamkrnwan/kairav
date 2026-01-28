<script setup lang="ts">
import { Icon } from "#components";

const features = [
  {
    icon: "lucide:database",
    title: "Backend Development",
    description: "Integrating data and APIs to build robust and scalable backend systems.",
    rating: 4.9,
  },
  {
    icon: "lucide:code-2",
    title: "Frontend Development",
    description: "Building dynamic and interactive web applications with modern frameworks.",
    rating: 4.6,
  },
  {
    icon: "lucide:smartphone",
    title: "Web & Mobile App",
    description: "Transforming ideas into exceptional web and mobile app experiences.",
    rating: 4.4,
  },
  {
    icon: "lucide:palette",
    title: "UI/UX Design",
    description: "Crafting visually stunning user interfaces that captivate and engage users.",
    rating: 4.9,
  },
];
</script>

<template>
  <section id="features" class="section py-6">
    <div class="container">
      <div class="max-w-6xl mx-auto">
        <!-- Section Title -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-heading mb-4">
            What I <span class="text-amber-400">Do</span>
          </h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
            Specialized expertise across the full development spectrum
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="group relative p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 hover:border-amber-400/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-400/10"
          >
            <!-- Icon -->
            <div
              class="w-16 h-16 mb-4 rounded-lg bg-linear-to-br from-amber-400/10 to-orange-500/10 flex items-center justify-center group-hover:from-amber-400/20 group-hover:to-orange-500/20 transition-all duration-300"
            >
              <Icon
                :name="feature.icon"
                class="w-8 h-8 text-amber-400"
              />
            </div>

            <!-- Title -->
            <h3 class="text-xl font-semibold mb-2 text-foreground">
              {{ feature.title }}
            </h3>

            <!-- Description -->
            <p class="text-sm text-muted-foreground mb-4 leading-relaxed">
              {{ feature.description }}
            </p>

            <!-- Rating -->
            <div class="flex items-center gap-2">
              <Icon
                name="lucide:star"
                class="w-4 h-4 text-amber-400 fill-amber-400"
              />
              <span class="text-sm font-mono font-semibold text-foreground">
                {{ feature.rating }}
              </span>
            </div>

            <!-- Hover Effect Border -->
            <div
              class="absolute inset-0 rounded-xl bg-linear-to-br from-amber-400/0 to-orange-500/0 group-hover:from-amber-400/5 group-hover:to-orange-500/5 transition-all duration-300 pointer-events-none"
            ></div>
          </div>
        </div>

        <!-- Additional Note -->
        <div class="mt-16 text-center">
          <span class="inline-flex items-center px-4 py-2 space-x-2 text-sm border rounded-full border-border/50 bg-background/50 backdrop-blur-sm dark:border-gray-700 dark:bg-zinc-800/50 hover:border-amber-400/30 transition-colors duration-300">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span class="font-medium text-gray-600 dark:text-gray-200">
              Delivering excellence across all aspects of software development
            </span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Additional hover effects can be added here if needed */
</style>
