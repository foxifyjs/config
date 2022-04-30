import CONFIG from "@foxify/config";
import { DEFAULT } from "@foxify/config/constants";

it("should use default config", () => {
  expect(CONFIG).toEqual(DEFAULT);
});
