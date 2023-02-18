import * as ControlledInputTypes from "./controlled-input-types";

const HOST_ID = "inputHost";
export const SUPPORTED_EVENTS: ControlledInputTypes.SupportedEventTypes[] = ["keyup", "blur", "focus"];

/** Safer alternative to eval that is used to calculate string expressions - falls back to "?" on invalid expression */
const calculateExpression = (exp: string) => {
  // ? indicates invalid mathematical expression
  try {
    const result = Function(`return (${exp})`)();
    return isNaN(result) ? "?" : result;
  } catch (error) {
    return "?";
  }
}

/** Helper function that injects the controlled input in host container - HOST_ID (which is hard-coded) is being utilized in instantiation */
const initControlledInput = (hostId: string) => {
  const hostEl = <HTMLDivElement>document.querySelector(`#${hostId}`);

  if (!hostEl) {
    throw new Error("Host element not found.")
  }

  const controlledInputContainer = document.createElement("div");
  controlledInputContainer.className = "input-container idle";

  const controlledInput = document.createElement("input");
  controlledInput.classList.add("input-container__input");
  controlledInput.setAttribute("type", "text");
  controlledInput.setAttribute("placeholder", "Please enter a simple mathematical expression...");
  controlledInput.setAttribute("value", "");

  const controlledOutput = document.createElement("span");
  controlledOutput.classList.add("input-container__output");
  controlledOutput.innerText = "-";

  controlledInputContainer.appendChild(controlledInput);
  controlledInputContainer.appendChild(controlledOutput);

  hostEl.appendChild(controlledInputContainer);

  return {
    containerEl: controlledInputContainer,
    inputEl: controlledInput,
    outputEl: controlledOutput,
  }
}

const setVisualFeedback = (
  targetEl: HTMLElement | undefined,
  type: ControlledInputTypes.SupportedEventTypes,
  value: string) => {
  const expression = calculateExpression(value);

  let inputValidationType: ControlledInputTypes.InputValidationTypes
  let inputActionType: ControlledInputTypes.InputActionTypes
  inputValidationType = expression === "?" ? "invalid" : "valid";
  inputActionType = type === "blur" ? "blur" : "focus"

  if (!targetEl) {
    throw new Error("Cannot update visual indicator.")
  }

  const derivedClassName: ControlledInputTypes.CompositeClassNames = `input-container ${inputActionType}-${inputValidationType}`;

  targetEl.className = derivedClassName;
}
const setValue = (targetEl: HTMLSpanElement | undefined, value: string) => {
  const expression = calculateExpression(value);

  if (!targetEl) {
    throw new Error("Cannot update value");
  }

  targetEl.innerText = expression;
}

/** Helper function that attaches required listeners to target input element (of controlled input) */
const initEventListeners = (targetEl: HTMLInputElement | undefined, updaterFunc: (e: Event) => void) => {
  if (targetEl === undefined) {
    throw new Error("Input element not found...");
  }

  SUPPORTED_EVENTS.forEach((listener) => targetEl.addEventListener(listener, (e: Event) => updaterFunc(e)))
}

export const ControlledInputUtils = {
  HOST_ID,
  SUPPORTED_EVENTS,
  initControlledInput,
  initEventListeners,
  calculateExpression,

  setVisualFeedback,
  setValue
}