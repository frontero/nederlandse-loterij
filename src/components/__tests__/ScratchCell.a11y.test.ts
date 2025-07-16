import { mount } from "@vue/test-utils";
import { configureAxe, toHaveNoViolations } from "jest-axe";
import ScratchCell from "../ScratchCell.vue";

// Voeg de custom matcher van axe-core toe aan Vitest
expect.extend(toHaveNoViolations);

// Helper component om ScratchCell in een grid/row te wrappen
const CellInGridRow = {
  components: { ScratchCell },
  props: ["cellProps"],
  template: `
    <div role="grid">
      <div role="row">
        <ScratchCell v-bind="cellProps" />
      </div>
    </div>
  `,
};

// Accessibility tests voor ScratchCell
// Controleert of de component in verschillende states geen a11y-violations heeft

describe("Accessibility (axe-core): ScratchCell", () => {
  it("heeft geen a11y-violations (gesloten cell)", async () => {
    const wrapper = mount(CellInGridRow, {
      props: {
        cellProps: {
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
      },
      attachTo: document.body,
    });
    const axe = configureAxe();
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
  it("heeft geen a11y-violations (hoofdprijs)", async () => {
    const wrapper = mount(CellInGridRow, {
      props: {
        cellProps: {
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
      },
      attachTo: document.body,
    });
    const axe = configureAxe();
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
  it("heeft geen a11y-violations (geen prijs)", async () => {
    const wrapper = mount(CellInGridRow, {
      props: {
        cellProps: {
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
      },
      attachTo: document.body,
    });
    const axe = configureAxe();
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
