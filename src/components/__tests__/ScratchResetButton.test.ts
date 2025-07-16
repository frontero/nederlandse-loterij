import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ScratchResetButton from "../ScratchResetButton.vue";

// Testen voor de ScratchResetButton component
// Controleert de weergave van tekst en het emitten van events

describe("ScratchResetButton", () => {
  // Test: controleert of de standaardtekst wordt weergegeven
  it("toont standaardtekst", () => {
    const wrapper = mount(ScratchResetButton);
    // Controleer of de standaardtekst zichtbaar is
    expect(wrapper.text()).toContain("Speel opnieuw");
  });
  // Test: controleert of slottekst wordt weergegeven als deze is meegegeven
  it("toont slottekst", () => {
    const wrapper = mount(ScratchResetButton, {
      slots: { default: "Opnieuw proberen" },
    });
    // Controleer of de slottekst zichtbaar is
    expect(wrapper.text()).toContain("Opnieuw proberen");
  });
  // Test: controleert of het click-event wordt geëmiteerd bij klikken op de knop
  it("emitteert click", async () => {
    const wrapper = mount(ScratchResetButton);
    await wrapper.find("button").trigger("click");
    // Controleer of het click-event daadwerkelijk is geëmiteerd
    expect(wrapper.emitted("click")).toBeTruthy();
  });
});
