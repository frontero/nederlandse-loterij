import { mount } from "@vue/test-utils";
import { configureAxe, toHaveNoViolations } from "jest-axe";
import ScratchResetButton from "../ScratchResetButton.vue";

expect.extend(toHaveNoViolations);

// Accessibility tests voor ScratchResetButton
// Controleert of de resetknop geen a11y-violations heeft

describe("Accessibility (axe-core): ScratchResetButton", () => {
  it("heeft geen a11y-violations (standaard)", async () => {
    const wrapper = mount(ScratchResetButton, {
      attachTo: document.body,
    });
    const axe = configureAxe();
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
