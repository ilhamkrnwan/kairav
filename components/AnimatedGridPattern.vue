<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
    
    interface Props {
      width?: number
      height?: number
      x?: number
      y?: number
      strokeDasharray?: number
      numSquares?: number
      maxOpacity?: number
      duration?: number
      repeatDelay?: number
    }
    
    const props = withDefaults(defineProps<Props>(), {
      width: 40,
      height: 40,
      x: -1,
      y: -1,
      strokeDasharray: 0,
      numSquares: 50,
      maxOpacity: 0.5,
      duration: 4,
      repeatDelay: 0.5,
    })
    
    const containerRef = ref<SVGSVGElement | null>(null)
    const dimensions = ref({ width: 0, height: 0 })
    const squares = ref<Array<{ id: number; pos: [number, number]; opacity: number }>>([])
    const patternId = `pattern-${Math.random().toString(36).substr(2, 9)}`
    
    const getPos = (): [number, number] => {
      return [
        Math.floor((Math.random() * dimensions.value.width) / props.width),
        Math.floor((Math.random() * dimensions.value.height) / props.height),
      ]
    }
    
    const generateSquares = (count: number) => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        pos: getPos(),
        opacity: 0,
      }))
    }
    
    const animateSquare = (index: number) => {
      const square = squares.value[index]
      if (!square) return
    
      // Fade in
      const fadeIn = setInterval(() => {
        if (square.opacity < props.maxOpacity) {
          square.opacity += 0.05
        } else {
          clearInterval(fadeIn)
          // Fade out after duration
          setTimeout(() => {
            const fadeOut = setInterval(() => {
              if (square.opacity > 0) {
                square.opacity -= 0.05
              } else {
                clearInterval(fadeOut)
                // Update position and restart
                square.pos = getPos()
                square.opacity = 0
                setTimeout(() => animateSquare(index), props.repeatDelay * 1000)
              }
            }, 50)
          }, props.duration * 1000)
        }
      }, 50)
    }
    
    watch(
      () => [dimensions.value.width, dimensions.value.height, props.numSquares],
      () => {
        if (dimensions.value.width && dimensions.value.height) {
          squares.value = generateSquares(props.numSquares)
          squares.value.forEach((_, index) => {
            setTimeout(() => animateSquare(index), index * 100)
          })
        }
      }
    )
    
    onMounted(() => {
      if (!containerRef.value) return
    
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          dimensions.value = {
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          }
        }
      })
    
      resizeObserver.observe(containerRef.value)
    
      onUnmounted(() => {
        if (containerRef.value) {
          resizeObserver.unobserve(containerRef.value)
        }
      })
    })
    </script>
    
    <template>
      <svg
        ref="containerRef"
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30"
      >
        <defs>
          <pattern
            :id="patternId"
            :width="width"
            :height="height"
            patternUnits="userSpaceOnUse"
            :x="x"
            :y="y"
          >
            <path
              :d="`M.5 ${height}V.5H${width}`"
              fill="none"
              :stroke-dasharray="strokeDasharray"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" :fill="`url(#${patternId})`" />
        <svg :x="x" :y="y" class="overflow-visible">
          <rect
            v-for="({ pos: [px, py], id, opacity }, index) in squares"
            :key="`${px}-${py}-${index}`"
            :width="width - 1"
            :height="height - 1"
            :x="px * width + 1"
            :y="py * height + 1"
            fill="currentColor"
            stroke-width="0"
            :opacity="opacity"
          />
        </svg>
      </svg>
    </template>