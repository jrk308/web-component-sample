import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styles } from "./my-switch.styles";

/**
 * Switches allow the user to toggle an option on or off.
 *
 * @tag my-switch
 *
 * @cssprop [--size=1rem] - Controls the size of the switch
 * 
 * @csspart control - controls styles for the switch button
 * @csspart track - controls styles for the switch track
 * @csspart checked - controls styles for the switch track when checked
 * @csspart switch - controls styles for the switch
 * 
 * @event switch-change - Emitted when switch is toggled
 * 
 * @slot checked - Displays when switch is on
 * @slot unchecked - Displays when switch is off
 *
 */
@customElement("my-switch")
export class MySwitch extends LitElement {
  static styles = styles;

  /** Adds a description for the switch */
  @property() label?: string;

  /** Used to determine if the switch is on or off */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** Prevents switch form changing value */
  @property({ type: Boolean }) disabled = false;

  /** Identifies where in relation to the switch the label should be placed */
  @property({ attribute: "label-position" }) labelPosition:
    | "top"
    | "start"
    | "end"
    | "bottom" = "top";

  public toggle() {
    if (this.disabled) {
      return;
    }

    this.checked = !this.checked;
    this.emitChange();
  }

  private emitChange() {
    this.dispatchEvent(
      new CustomEvent("switch-change", {
        detail: {
          checked: this.checked,
        },
        bubbles: true,
      })
    );
  }

  private getLabelDirection() {
    return (
      {
        top: "column",
        start: "row",
        end: "row-reverse",
        bottom: "column-reverse",
      }[this.labelPosition] || "column"
    );
  }

  render() {
    return html`
      <span class="base" style="flex-direction: ${this.getLabelDirection()}">
        <label id="label" class="label">${this.label}</label>
        <button
          class="control"
          role="switch"
          aria-checked="${this.checked}"
          aria-labelledby="label"
          @click=${this.toggle}
          ?disabled=${this.disabled}
          part="control"
        >
          <slot name=${this.checked ? 'checked' : 'unchecked'}>
            <div class="track" part="track ${this.checked ? 'checked' : ''}">
              <div class="switch" part="switch"></div>
            </div>
          </slot>
        </button>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-switch": MySwitch;
  }
}
