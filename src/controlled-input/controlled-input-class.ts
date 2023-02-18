
import { SupportedEventTypes } from "./controlled-input-types";
import { SUPPORTED_EVENTS, ControlledInputUtils } from "./controlled-input-utils";

export class ControlledInput {
  private _hostId;
  private _containerEl: HTMLDivElement | undefined;
  private _inputEl: HTMLInputElement | undefined;
  private _outputEl: HTMLSpanElement | undefined;

  constructor(hostId: string) {
    this._hostId = hostId;
    this.initializeControlledInput();
    this.initializeEventListeners();
  }

  initializeControlledInput() {
    const { containerEl, inputEl, outputEl } = ControlledInputUtils.initControlledInput(this._hostId);
    this._containerEl = containerEl
    this._inputEl = inputEl;
    this._outputEl = outputEl;
  }

  initializeEventListeners() {
    ControlledInputUtils.initEventListeners(this._inputEl, this.update.bind(this))
  }

  update(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    const eventType = e.type as SupportedEventTypes;

    if (!SUPPORTED_EVENTS.includes(eventType)) {
      return;
    }

    ControlledInputUtils.setValue(this._outputEl, val);
    ControlledInputUtils.setVisualFeedback(this._containerEl, eventType, val);
  }
}