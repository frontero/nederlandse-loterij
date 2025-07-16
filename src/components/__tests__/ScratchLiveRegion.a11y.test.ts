import { mount } from "@vue/test-utils";
import { configureAxe, toHaveNoViolations } from "jest-axe";
import ScratchLiveRegion from "../ScratchLiveRegion.vue";

expect.extend(toHaveNoViolations);

// Accessibility tests voor ScratchLiveRegion
// Controleert of de live region geen a11y-violations heeft

describe("Accessibility (axe-core): ScratchLiveRegion", () => {
  it("heeft geen a11y-violations (met live message)", async () => {
    const wrapper = mount(ScratchLiveRegion, {
      props: { message: "Hoofdprijs gevonden!" },
      attachTo: document.body,
    });
    const axe = configureAxe();
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
