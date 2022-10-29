import { CONFIG_FILEPATH, ConfigI } from "#src/constants";

/* ------------------------- Read the config file ------------------------- */

let resolved;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  resolved = require(CONFIG_FILEPATH);

  resolved = resolved?.__esModule ? resolved : { default: resolved };
} catch (e) {
  resolved = {};
}

const content: ConfigI = resolved.default ?? {};

export default content;
