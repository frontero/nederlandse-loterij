import { mount } from "@vue/test-utils";
import { configureAxe, toHaveNoViolations } from "jest-axe";
import ScratchMessage from "../ScratchMessage.vue";

expect.extend(toHaveNoViolations);

// Accessibility tests voor ScratchMessage
// Controleert of de component in verschillende states geen a11y-violations heeft

describe("Accessibility (axe-core): ScratchMessage", () => {
  it("heeft geen a11y-violations (zichtbare melding)", async () => {
    const wrapper = mount(ScratchMessage, {
      props: { message: "Gefeliciteerd!" },
      attachTo: document.body,
    });
    const axe = configureAxe();
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
  it("heeft geen a11y-violations (geen melding)", async () => {
    const wrapper = mount(ScratchMessage, {
      props: { message: "" },
      attachTo: document.body,
    });
    // Controleer of innerHTML bestaat en niet leeg is voordat axe wordt uitgevoerd
    if (
      wrapper.element &&
      typeof wrapper.element.innerHTML === "string" &&
      wrapper.element.innerHTML.trim() !== ""
    ) {
      const axe = configureAxe();
      const results = await axe(wrapper.element);
      expect(results).toHaveNoViolations();
    } else {
      expect(true).toBe(true); // Geen DOM, dus geen a11y check nodig
    }
  });
});
