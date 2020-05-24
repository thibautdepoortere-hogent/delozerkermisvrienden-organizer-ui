import { Position, Toaster } from "@blueprintjs/core";

const appToaster = Toaster.create({
  className: "toaster nietAfdrukken",
  position: Position.TOP_RIGHT,
});

export function errorToastAanmaken(bericht) {
  appToaster.show({ message: bericht, intent: "danger" });
}

export function infoToastAanmaken(bericht) {
  appToaster.show({ message: bericht, intent: "success" });
}
