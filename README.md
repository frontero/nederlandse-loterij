# 🎉 Surprise Calendar – Scratch & Win Grid

![Nederlandse Loterij Logo](src/assets/logo-nederlandse-loterij.png)

A modern, accessible, and highly-performant scratch calendar built with **Vue 3**, **TypeScript**, **TailwindCSS**, and **virtualized rendering**.  
Users can scratch one cell in a 100x100 grid to reveal a prize, with persistent state, beautiful animations, and full keyboard/screenreader support.

---

## ✨ Features

- **100x100 Virtualized Grid**: Ultra-fast rendering with [@tanstack/vue-virtual](https://tanstack.com/virtual/v3).
- **Scratch Logic**: Each user can scratch one cell to reveal a prize (1 grand prize, 100 consolation prizes, rest empty).
- **Accessibility First**: Full ARIA, keyboard navigation, focus management, and live region announcements.
- **Persistent State**: All scratch actions and prizes are saved in `localStorage`.
- **Responsive Design**: Works beautifully on desktop and mobile.
- **Animations**: Smooth scratch-off and reveal effects.
- **Testing & Coverage**: Unit, logic, and accessibility tests with [Vitest](https://vitest.dev/) and [axe-core](https://github.com/dequelabs/axe-core).
- **Component-Driven**: Clean, reusable components and composables.
- **Dutch Branding**: Styled with Nederlandse Loterij colors and logo.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Run all tests (unit + a11y)
npm run test

# Build for production
npm run build
```

---

## 🖥️ Project Structure

```
src/
  components/
    ScratchGrid.vue         # Main grid component (virtualized)
    ScratchCell.vue         # Individual scratchable cell
    ScratchMessage.vue      # Prize/feedback message
    ScratchLiveRegion.vue   # ARIA live region for screenreaders
    ScratchResetButton.vue  # "Play again" button
    scratchGridUtils.ts     # Prize distribution logic
    __tests__/              # Unit, logic, and a11y tests
  assets/
    logo-nederlandse-loterij.png
    style.css               # Tailwind + custom theme colors
main.ts
App.vue
```

---

## ♿ Accessibility

- **Keyboard**: Full navigation with arrow keys, Enter/Space to scratch, focus ring.
- **Screenreader**: Live region announces prize, ARIA roles and labels for grid/cells.
- **Color Contrast**: Custom theme colors meet WCAG AA.
- **Automated a11y tests**: All components tested with axe-core.

---

## 🧪 Testing

- **Unit & Logic**: [Vitest](https://vitest.dev/) + [Vue Test Utils](https://test-utils.vuejs.org/)
- **Accessibility**: [axe-core](https://github.com/dequelabs/axe-core) integration in tests
- **Coverage**: Run `npm run test` for full coverage report

---

## 🛠️ Customization

- **Branding**: Easily adjust theme colors in `src/assets/style.css`
- **Grid Size**: Change `gridSize` in `ScratchGrid.vue` for different layouts
- **Prize Logic**: Edit `generatePrizeDistribution` in `scratchGridUtils.ts`

---

## 📦 Built With

- [Vue 3 + Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [@tanstack/vue-virtual](https://tanstack.com/virtual/v3)
- [Vitest](https://vitest.dev/)
- [axe-core](https://github.com/dequelabs/axe-core)

---

## 📄 License

MIT

---

**Questions or suggestions?**  
Open an issue or contact the maintainer.
