import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ScratchCell from "../ScratchCell.vue";

// Testen voor de ScratchCell component
// Controleert de weergave van symbolen afhankelijk van de status en prijs

describe("ScratchCell", () => {
  // Test: toont een vraagteken als de cel niet open is
  it("toont een vraagteken als niet open", () => {
    const wrapper = mount(ScratchCell, {
      props: {
        id: "cell-1",
        isOpen: false,
        prize: null,
        index: 1,
        tabindex: 0,
        isActive: false,
        ariaRowindex: 1,
        ariaColindex: 1,
        animateScratch: false,
        disabled: false,
        role: "gridcell",
        isUserCell: false,
        alreadyScratched: false,
      },
    });
    // Controleer of het vraagteken zichtbaar is voor gesloten cellen
    expect(wrapper.text()).toContain("?");
  });

  // Test: toont de hoofdprijs als de cel open is en de prijs 25000 is
  it("toont de hoofdprijs als open", () => {
    const wrapper = mount(ScratchCell, {
      props: {
        id: "cell-2",
        isOpen: true,
        prize: 25000,
        index: 2,
        tabindex: 0,
        isActive: false,
        ariaRowindex: 1,
        ariaColindex: 2,
        animateScratch: false,
        disabled: false,
        role: "gridcell",
        isUserCell: false,
        alreadyScratched: false,
      },
    });
    // Controleer of het bedrag van de hoofdprijs correct wordt weergegeven
    expect(wrapper.text()).toContain("\u20ac25.000");
  });

  // Test: toont een kruisje als de cel open is en geen prijs bevat
  it("toont een kruisje als geen prijs", () => {
    const wrapper = mount(ScratchCell, {
      props: {
        id: "cell-3",
        isOpen: true,
        prize: null,
        index: 3,
        tabindex: 0,
        isActive: false,
        ariaRowindex: 1,
        ariaColindex: 3,
        animateScratch: false,
        disabled: false,
        role: "gridcell",
        isUserCell: false,
        alreadyScratched: false,
      },
    });
    // Controleer of het kruisje zichtbaar is voor cellen zonder prijs
    expect(wrapper.text()).toContain("\u2717");
  });
});
