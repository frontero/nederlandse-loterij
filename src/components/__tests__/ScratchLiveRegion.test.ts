import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ScratchLiveRegion from "../ScratchLiveRegion.vue";

// Testen voor de ScratchLiveRegion component
// Controleert of de live message correct wordt weergegeven en aria-live correct is ingesteld

describe("ScratchLiveRegion", () => {
  // Test: controleert of de live message zichtbaar is en aria-live correct is
  it("toont de live message", () => {
    const wrapper = mount(ScratchLiveRegion, {
      props: { message: "Hoofdprijs gevonden!" },
    });
    // Controleer of de tekst van de live message correct wordt weergegeven
    expect(wrapper.text()).toContain("Hoofdprijs gevonden!");
    // Controleer of het aria-live attribuut op 'polite' staat
    expect(wrapper.find("[aria-live]").attributes("aria-live")).toBe("polite");
  });
});
