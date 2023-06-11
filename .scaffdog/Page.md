---
name: "Page"
root: "./app"
output: []
ignore: []
questions:
  component: "What is Page name??"
  path: "What is path??(i.e. feature/Timeline)"
---

# `{{ inputs.path }}/{{ inputs.component | pascal }}/page.stories.tsx`

```tsx
{{ "Page/page.stories.tsx" | read }}
```

# `{{ inputs.path }}/{{ inputs.component | pascal }}/page.tsx`

```tsx
{{ "Page/page.tsx" | read }}
```