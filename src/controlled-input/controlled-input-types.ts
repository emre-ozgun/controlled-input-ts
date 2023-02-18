export type InputValidationTypes =
  | "valid"
  | "invalid";
export type InputActionTypes =
  | "blur"
  | "focus";
export type CompositeClassNames = `input-container ${InputActionTypes}-${InputValidationTypes}`;
export type SupportedEventTypes =
  | "keyup"
  | "blur"
  | "focus";