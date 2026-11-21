<script setup lang="ts">
import type { PageCollectionItemBase } from '@nuxt/content'

type MarkdownNode = PageCollectionItemBase['body']['value'][number]

const props = defineProps<{
  document: Pick<PageCollectionItemBase, 'body'> & { title?: string }
  repeatedImages?: readonly (string | undefined)[]
}>()

const components = { h1: 'prose-h2' }
const normalize = (text: string) => text.replace(/\s+/g, ' ').trim()

function plainText(node: MarkdownNode): string {
  if (typeof node === 'string') return node
  const [, , ...children] = node
  return children.map(plainText).join('')
}

const duplicate = computed(() => {
  const first = props.document.body?.value?.[0]
  if (!Array.isArray(first) || first[0] !== 'h1' || !props.document.title) return undefined
  return normalize(plainText(first)) === normalize(props.document.title) ? first : undefined
})

const duplicateAnchor = computed(() => {
  const id = duplicate.value?.[1]?.id
  return typeof id === 'string' ? id : undefined
})

const content = computed(() => {
  const document = props.document
  const nodes = document.body?.value
  if (!nodes || (!duplicate.value && !props.repeatedImages?.length)) return document

  const images = new Set(props.repeatedImages)
  const value = nodes.flatMap((node): MarkdownNode[] => {
    if (node === duplicate.value) return []
    if (!images.size || !Array.isArray(node) || node[0] !== 'p') return [node]

    const [tag, attributes, ...children] = node
    const remaining = children.filter(child =>
      !Array.isArray(child) || child[0] !== 'img' || typeof child[1]?.src !== 'string' || !images.has(child[1].src),
    )
    if (remaining.length === children.length) return [node]
    if (remaining.every(child => typeof child === 'string' && !child.trim())) return []
    return [[tag, attributes, ...remaining]]
  })

  return { ...document, body: { ...document.body, value } }
})
</script>

<template>
  <div class="reading-content">
    <span v-if="duplicateAnchor" :id="duplicateAnchor" class="block" aria-hidden="true" />
    <ContentRenderer :value="content" :components="components" />
  </div>
</template>
