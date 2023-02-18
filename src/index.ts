import { ControlledInput } from "./controlled-input/controlled-input-class";
import { ControlledInputUtils } from "./controlled-input/controlled-input-utils";

window.addEventListener("load", () => {
  const controlledInput = new ControlledInput(ControlledInputUtils.HOST_ID);

  // const controlledInput2 = new ControlledInput("inputHost2");
  // const controlledInput3 = new ControlledInput("inputHost3");
});