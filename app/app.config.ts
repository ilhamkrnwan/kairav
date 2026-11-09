export default defineAppConfig({
  ui: {
    colors: {
      primary: 'cobalt',
      neutral: 'slate',
    },
    button: {
      slots: { base: 'rounded-md font-semibold' },
    },
    badge: {
      slots: { base: 'rounded-md font-semibold' },
    },
    pageCard: {
      slots: { root: 'rounded-lg border border-default ring-0 shadow-sm dark:shadow-none' },
    },
    card: {
      slots: { root: 'rounded-lg border border-default shadow-sm dark:shadow-none' },
    },
  },
})
