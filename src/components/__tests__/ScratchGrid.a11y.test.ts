import { mount } from "@vue/test-utils";
import { configureAxe, toHaveNoViolations } from "jest-axe";
import ScratchGrid from "../ScratchGrid.vue";

expect.extend(toHaveNoViolations);

// Accessibility tests voor ScratchGrid
// Controleert of het volledige grid geen a11y-violations heeft in de standaard state

describe("Accessibility (axe-core): ScratchGrid", () => {
  it("heeft geen a11y-violations (standaard grid)", async () => {
    const wrapper = mount(ScratchGrid, {
      props: { disableSimulateUsers: true },
      attachTo: document.body,
    });
    const axe = configureAxe();
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
