import { describe, it, expect } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import ScratchGrid from "../ScratchGrid.vue";
import ScratchMessage from "../ScratchMessage.vue";

// Mock localStorage voor deze test (zodat localStorage niet echt wordt gebruikt)
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock de afmetingen van de container zodat virtualisatie werkt in jsdom
Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
  configurable: true,
  value: 800,
});
Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
  configurable: true,
  value: 800,
});
// Mock getBoundingClientRect zodat de virtualizer een geldige grootte ziet
HTMLElement.prototype.getBoundingClientRect = function () {
  return {
    width: 800,
    height: 800,
    top: 0,
    left: 0,
    bottom: 800,
    right: 800,
    x: 0,
    y: 0,
    toJSON: () => {},
  };
};

describe("ScratchGrid", () => {
  it("toont een melding na het openkrassen van een vakje", async () => {
    // Mount de ScratchGrid met simulatie van andere gebruikers uitgeschakeld
    // en koppel aan de echte DOM zodat virtualisatie werkt
    const wrapper = mount(ScratchGrid, {
      props: { disableSimulateUsers: true },
      attachTo: document.body,
    });

    // Geef de grid-container expliciet een grote hoogte/breedte
    const gridEl = wrapper.find(".scratch-grid-container")
      .element as HTMLElement;
    gridEl.style.height = "800px";
    gridEl.style.width = "800px";
    await wrapper.vm.$nextTick();
    // Wacht kort zodat de virtualizer cellen kan renderen
    await new Promise((r) => setTimeout(r, 100));

    // Zoek alle zichtbare cellen in de DOM
    const cells = wrapper.findAll('[aria-live="off"]');
    expect(cells.length).toBeGreaterThan(0);
    // Kras de eerste zichtbare cell open
    const firstCell = cells[0];
    await firstCell.trigger("keydown.enter");
    // Wacht op de animatie en het tonen van de melding
    await new Promise((r) => setTimeout(r, 2500));
    await flushPromises();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    // Zoek de ScratchMessage component of de fallback meldingstekst
    const message = wrapper.findComponent(ScratchMessage);
    const fallback = wrapper.find(".text-lg.font-bold");
    expect(message.exists() || fallback.exists()).toBe(true);
    // Controleer of de melding de verwachte tekst bevat
    const text = message.exists() ? message.text() : fallback.text();
    expect(text).toMatch(/Gefeliciteerd!|Helaas, geen prijs/i);
  });
});
