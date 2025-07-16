import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ScratchMessage from "../ScratchMessage.vue";

// Testen voor de ScratchMessage component
// Controleert de zichtbaarheid en inhoud van de melding

describe("ScratchMessage", () => {
  // Test: toont de melding als de message-prop gevuld is
  it("toont de melding als message is gevuld", () => {
    const wrapper = mount(ScratchMessage, {
      props: { message: "Gefeliciteerd!" },
    });
    // Controleer of de tekst van de melding correct wordt weergegeven
    expect(wrapper.text()).toContain("Gefeliciteerd!");
  });
  // Test: toont geen melding als de message-prop leeg is
  it("toont niets als message leeg is", () => {
    const wrapper = mount(ScratchMessage, { props: { message: "" } });
    // Controleer of het meldingselement niet wordt gerenderd
    expect(wrapper.html()).not.toContain("mb-4");
  });
});
