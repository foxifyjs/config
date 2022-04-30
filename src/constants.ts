import qs from "node:querystring";

export const CONFIG_FILEPATH = `${process.cwd()}/foxify.config.js`;

export enum ENV {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TEST = "test",
}

export enum SERVER_PROTOCOL {
  HTTP = "http",
  HTTPS = "https",
}

export const DEFAULT: ConfigI = {
  env: process.env.NODE_ENV as ENV ?? ENV.DEVELOPMENT,
  xPoweredBy: true,
  workers: 1,
  server: {
    protocol: SERVER_PROTOCOL.HTTP,
    hostname: "localhost",
    port: 3000,
  },
  subdomain: {
    offset: 2,
  },
  json: {
    escape: false,
    spaces: 0,
  },
  jsonp: {
    callback: "callback",
  },
  query: {
    parser: qs.parse,
  },
  proxy: {
    trust: () => false,
  },
};

/* ------------------------- Interfaces ------------------------- */

export interface ConfigI {
  /**
   * Node.js environment.
   */
  readonly env: ENV;

  /**
   * Indicates whether the "X-Powered-By" header should be present or not.
   */
  readonly xPoweredBy: boolean;

  /**
   * Number of Node.js cluster workers to be created.
   * In case of `1` Node.js cluster workers won't be used.
   */
  readonly workers: number;

  /**
   * ETag response header value generator.
   */
  readonly etag?: (body: string | Buffer, encoding?: BufferEncoding) => string;

  /**
   * Server config.
   */
  readonly server: ServerConfigI;

  /**
   * Subdomain config.
   */
  readonly subdomain: SubdomainConfigI;

  /**
   * JSON config.
   */
  readonly json: JsonConfigI;

  /**
   * JSONP config.
   */
  readonly jsonp: JsonpConfigI;

  /**
   * Request query string config.
   */
  readonly query: QueryConfigI;

  /**
   * Proxy config.
   */
  readonly proxy: ProxyConfigI;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly [config: string]: any;
}

export interface ServerConfigI {
  /**
   * Server protocol.
   */
  readonly protocol: SERVER_PROTOCOL;

  /**
   * Server hostname.
   */
  readonly hostname: string;

  /**
   * Server port.
   */
  readonly port: number;
}

export interface SubdomainConfigI {
  /**
   * The number of dot-separated parts of the host to remove to access subdomain.
   */
  readonly offset: number;
}

export interface JsonConfigI {
  /**
   * Enable escaping JSON responses from the `res.json`, `res.jsonp`, and `res.send` APIs.
   */
  readonly escape: boolean;

  /**
   * The `replacer` argument used by `JSON.stringify`.
   */
  readonly replacer?: (key: string, value: unknown) => unknown;

  /**
   * The `space` argument used by `JSON.stringify`.
   * This is typically set to the number of spaces to use to indent prettified JSON.
   */
  readonly spaces: number;
}

export interface JsonpConfigI {
  /**
   * The JSONP callback name.
   */
  readonly callback: string;
}

export interface QueryConfigI {
  /**
   * A custom query string parsing function will receive the complete query string,
   * and must return an object of query keys and their values.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly parser: (str: string) => Record<string, any>;
}

export interface ProxyConfigI {
  /**
   * Indicates whether the app is behind a front-facing proxy,
   * and to use the X-Forwarded-* headers to determine the connection and the IP address of the client.
   */
  readonly trust: (ip: string, hopIndex: number) => boolean;
}
