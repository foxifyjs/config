import { CONFIG_FILEPATH, ConfigI } from "#src/constants";

/* ------------------------- Read the config file ------------------------- */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const content: ConfigI = await import(CONFIG_FILEPATH)
  .then((resolved) => resolved.default)
  .catch(() => ({}) as never);

export default content;
