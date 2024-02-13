import { navigationRef } from "../../App";

export function navigate(name: string, params: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
