export default defineAppConfig({
  ui: {
    colors: {
      primary: 'cobalt',
      neutral: 'slate',
    },
    button: {
      slots: { base: 'rounded-lg font-semibold' },
    },
    badge: {
      slots: { base: 'rounded-md font-semibold' },
    },
    pageCard: {
      slots: { root: 'rounded-xl border border-default ring-0 shadow-none' },
    },
    card: {
      slots: { root: 'rounded-xl border border-default shadow-none' },
    },
  },
})
