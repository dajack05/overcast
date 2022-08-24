globalThis._importMeta_={url:import.meta.url,env:process.env};import 'file:///Users/danieljackson/git/overcast/node_modules/node-fetch-native/dist/polyfill.mjs';
import { Server } from 'http';
import { tmpdir } from 'os';
import { join } from 'path';
import { mkdirSync } from 'fs';
import { parentPort, threadId } from 'worker_threads';
import { provider, isWindows } from 'file:///Users/danieljackson/git/overcast/node_modules/std-env/dist/index.mjs';
import { eventHandler, defineEventHandler, handleCacheHeaders, createEvent, deleteCookie, createApp, createRouter, lazyEventHandler, useBody, setCookie, getQuery } from 'file:///Users/danieljackson/git/overcast/node_modules/h3/dist/index.mjs';
import { PrismaClient } from 'file:///Users/danieljackson/git/overcast/node_modules/@prisma/client/index.js';
import Joi from 'file:///Users/danieljackson/git/overcast/node_modules/joi/lib/index.js';
import bcrypt from 'file:///Users/danieljackson/git/overcast/node_modules/bcryptjs/index.js';
import Jwt from 'file:///Users/danieljackson/git/overcast/node_modules/jsonwebtoken/index.js';
import { createRenderer } from 'file:///Users/danieljackson/git/overcast/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import devalue from 'file:///Users/danieljackson/git/overcast/node_modules/@nuxt/devalue/dist/devalue.mjs';
import { renderToString } from 'file:///Users/danieljackson/git/overcast/node_modules/vue/server-renderer/index.mjs';
import { parseURL, withQuery, joinURL } from 'file:///Users/danieljackson/git/overcast/node_modules/ufo/dist/index.mjs';
import destr from 'file:///Users/danieljackson/git/overcast/node_modules/destr/dist/index.mjs';
import { snakeCase } from 'file:///Users/danieljackson/git/overcast/node_modules/scule/dist/index.mjs';
import { createFetch as createFetch$1, Headers } from 'file:///Users/danieljackson/git/overcast/node_modules/ohmyfetch/dist/node.mjs';
import { createRouter as createRouter$1 } from 'file:///Users/danieljackson/git/overcast/node_modules/radix3/dist/index.mjs';
import { createCall, createFetch } from 'file:///Users/danieljackson/git/overcast/node_modules/unenv/runtime/fetch/index.mjs';
import { createHooks } from 'file:///Users/danieljackson/git/overcast/node_modules/hookable/dist/index.mjs';
import { hash } from 'file:///Users/danieljackson/git/overcast/node_modules/ohash/dist/index.mjs';
import { createStorage } from 'file:///Users/danieljackson/git/overcast/node_modules/unstorage/dist/index.mjs';
import _unstorage_drivers_fs from 'file:///Users/danieljackson/git/overcast/node_modules/unstorage/dist/drivers/fs.mjs';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const serverAssets = [{"baseName":"server","dir":"/Users/danieljackson/git/overcast/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, _unstorage_drivers_fs({ base: asset.dir }));
}

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets);

storage.mount('root', _unstorage_drivers_fs({"driver":"fs","base":"/Users/danieljackson/git/overcast","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', _unstorage_drivers_fs({"driver":"fs","base":"/Users/danieljackson/git/overcast/server","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', _unstorage_drivers_fs({"driver":"fs","base":"/Users/danieljackson/git/overcast/.nuxt","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', _unstorage_drivers_fs({"driver":"fs","base":"/Users/danieljackson/git/overcast/.nuxt/cache","ignore":["**/node_modules/**","**/.git/**"]}));

function defineRenderHandler$1(handler) {
  return eventHandler(async (event) => {
    if (event.req.url.endsWith("/favicon.ico")) {
      event.res.setHeader("Content-Type", "image/x-icon");
      event.res.end("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
      return;
    }
    const response = await handler(event);
    if (!response) {
      if (!event.res.writableEnded) {
        event.res.statusCode = event.res.statusCode === 200 ? 500 : event.res.statusCode;
        event.res.end("No response returned from render handler: " + event.req.url);
      }
      return;
    }
    const nitroApp = useNitroApp();
    await nitroApp.hooks.callHook("render:response", response, { event });
    if (!event.res.headersSent && response.headers) {
      for (const header in response.headers) {
        event.res.setHeader(header, response.headers[header]);
      }
      if (response.statusCode) {
        event.res.statusCode = response.statusCode;
      }
      if (response.statusMessage) {
        event.res.statusMessage = response.statusMessage;
      }
    }
    if (!event.res.writableEnded) {
      event.res.end(typeof response.body === "string" ? response.body : JSON.stringify(response.body));
    }
  });
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event);
    const headers = event.res.getHeaders();
    headers.Etag = `W/"${hash(body)}"`;
    headers["Last-Modified"] = new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["Cache-Control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["Last-Modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    description: statusCode !== 404 ? `<pre>${stack.map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n")}</pre>` : "",
    data: error.data
  };
  event.res.statusCode = errorObject.statusCode;
  event.res.statusMessage = errorObject.statusMessage;
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const url = withQuery("/__nuxt_error", errorObject);
  const html = await $fetch(url).catch((error2) => {
    console.error("[nitro] Error while generating error response", error2);
    return errorObject.statusMessage;
  });
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const COOKIE_NAME = "ovc-cookie";

const _w4Bw8o = defineEventHandler(async (event) => {
  if (event.req.headers.authentication) {
    try {
      event.context.auth = {
        id: Jwt.verify(
          event.req.headers.authentication,
          process.env.JWT_KEY
        ).id
      };
    } catch (error) {
      event.context.error = error;
      deleteCookie(event, COOKIE_NAME);
      event.res.writeHead(301, { location: "/" });
      event.res.end();
    }
  }
});

const _lazy_JQY1pE = () => Promise.resolve().then(function () { return me_post$1; });
const _lazy_LaOCkg = () => Promise.resolve().then(function () { return register_post$1; });
const _lazy_POuxfr = () => Promise.resolve().then(function () { return login_post$1; });
const _lazy_rLzxqe = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _w4Bw8o, lazy: false, middleware: true, method: undefined },
  { route: '/api/user/me', handler: _lazy_JQY1pE, lazy: true, middleware: false, method: "post" },
  { route: '/api/register', handler: _lazy_LaOCkg, lazy: true, middleware: false, method: "post" },
  { route: '/api/login', handler: _lazy_POuxfr, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_rLzxqe, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_rLzxqe, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(true),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const server = new Server(nitroApp.h3App.nodeHandler);
function getAddress() {
  if (provider === "stackblitz" || process.env.NITRO_NO_UNIX_SOCKET) {
    return "0";
  }
  const socketName = `worker-${process.pid}-${threadId}.sock`;
  if (isWindows) {
    return join("\\\\.\\pipe\\nitro", socketName);
  } else {
    const socketDir = join(tmpdir(), "nitro");
    mkdirSync(socketDir, { recursive: true });
    return join(socketDir, socketName);
  }
}
const listenAddress = getAddress();
server.listen(listenAddress, () => {
  const _address = server.address();
  parentPort.postMessage({
    event: "listen",
    address: typeof _address === "string" ? { socketPath: _address } : { host: "localhost", port: _address.port }
  });
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection]", err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException]", err));
}

let prisma;
if (!prisma) {
  prisma = new PrismaClient();
}
const client = prisma;

const AddUserSchema = Joi.object({
  dob: Joi.date().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required()
});
const DeleteUserSchema = Joi.object({
  email: Joi.string().email().required()
});
const LoginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
class UserDataSource {
  static async HashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
  static async ValidatePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
  static UserAsUserInfo(user) {
    return {
      dob: user.dob,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone
    };
  }
  static GenerateToken(user) {
    const token = Jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: `1m`
    });
    return {
      token
    };
  }
  static ValidateToken(token) {
    const result = Jwt.verify(token.token, process.env.JWT_KEY);
    if (typeof result === "string") {
      console.log(`String:${result}`);
      return;
    }
    const decoded = Jwt.decode(token.token);
    console.log(decoded);
    return void 0;
  }
  static async add(data) {
    const params = await AddUserSchema.validateAsync(data);
    const result = await client.user.create({
      data: {
        dob: params.dob,
        email: params.email,
        first_name: params.first_name,
        last_name: params.last_name,
        phone: params.phone,
        password: await UserDataSource.HashPassword(params.password)
      }
    });
    return result;
  }
  static async delete(data) {
    const params = await DeleteUserSchema.validateAsync(data);
    await client.user.delete({
      where: {
        email: params.email
      }
    });
    return true;
  }
  static async login(data) {
    const params = await LoginUserSchema.validateAsync(data);
    const user = await client.user.findUnique({
      where: { email: params.email }
    });
    if (!user) {
      return void 0;
    }
    if (!await UserDataSource.ValidatePassword(params.password, user.password)) {
      return void 0;
    }
    const token = UserDataSource.GenerateToken(user);
    return token;
  }
}

const me_post = defineEventHandler(async (evt) => {
  const id = evt.context.auth.id;
  const client = new PrismaClient();
  const user = await client.user.findUnique({ where: { id } });
  await client.$disconnect();
  const safe_user = UserDataSource.UserAsUserInfo(user);
  return {
    response: safe_user
  };
});

const me_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': me_post
});

const register_post = defineEventHandler(async (evt) => {
  const body = await useBody(evt);
  const { email, password, confirmPassword, dob, first_name, last_name, phone } = body;
  try {
    await UserDataSource.add({ email, password, confirmPassword, dob, first_name, last_name, phone });
    return { response: "OK" };
  } catch (error) {
    return { error };
  }
});

const register_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': register_post
});

const login_post = defineEventHandler(async (evt) => {
  const body = await useBody(evt);
  const { email, password } = body;
  try {
    const token = await UserDataSource.login({ email, password });
    if (token) {
      setCookie(evt, COOKIE_NAME, token.token);
      console.log(token);
      return { response: "OK" };
    }
    return { error: "Incorrect Email or Password." };
  } catch (error) {
    return { error };
  }
});

const login_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': login_post
});

function buildAssetsURL(...path) {
  return joinURL(publicAssetsURL(), useRuntimeConfig().app.buildAssetsDir, ...path);
}
function publicAssetsURL(...path) {
  const publicBase = useRuntimeConfig().app.cdnURL || useRuntimeConfig().app.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
}

const defineRenderHandler = defineRenderHandler$1;
const getClientManifest = () => import('/Users/danieljackson/git/overcast/.nuxt/dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getServerEntry = () => import('/Users/danieljackson/git/overcast/.nuxt/dist/server/server.mjs').then((r) => r.default || r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return `<div id="__nuxt">${html}</div>`;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const options = {
    manifest,
    renderToString: () => '<div id="__nuxt"></div>',
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig();
    ssrContext.payload = {
      serverRendered: false,
      config: {
        public: config.public,
        app: config.app
      }
    };
    ssrContext.renderMeta = ssrContext.renderMeta ?? (() => ({}));
    return Promise.resolve(result);
  };
  return { renderToString };
});
const renderer = defineRenderHandler(async (event) => {
  const ssrError = event.req.url?.startsWith("/__nuxt_error") ? getQuery(event) : null;
  const url = ssrError?.url || event.req.url;
  const ssrContext = {
    url,
    event,
    req: event.req,
    res: event.res,
    runtimeConfig: useRuntimeConfig(),
    noSSR: !!event.req.headers["x-nuxt-no-ssr"],
    error: !!ssrError,
    nuxt: void 0,
    payload: ssrError ? { error: ssrError } : void 0
  };
  const renderer = ssrContext.noSSR ? await getSPARenderer() : await getSSRRenderer();
  const _rendered = await renderer.renderToString(ssrContext).catch((err) => {
    if (!ssrError) {
      throw err;
    }
  });
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext });
  if (!_rendered) {
    return;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  const renderedMeta = await ssrContext.renderMeta?.() ?? {};
  const htmlContext = {
    htmlAttrs: normalizeChunks([renderedMeta.htmlAttrs]),
    head: normalizeChunks([
      renderedMeta.headTags,
      _rendered.renderResourceHints(),
      _rendered.renderStyles(),
      ssrContext.styles
    ]),
    bodyAttrs: normalizeChunks([renderedMeta.bodyAttrs]),
    bodyPreprend: normalizeChunks([
      renderedMeta.bodyScriptsPrepend,
      ssrContext.teleports?.body
    ]),
    body: [
      _rendered.html
    ],
    bodyAppend: normalizeChunks([
      `<script>window.__NUXT__=${devalue(ssrContext.payload)}<\/script>`,
      _rendered.renderScripts(),
      renderedMeta.bodyScripts
    ])
  };
  const nitroApp = useNitroApp();
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  const response = {
    body: renderHTMLDocument(htmlContext),
    statusCode: event.res.statusCode,
    statusMessage: event.res.statusMessage,
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "X-Powered-By": "Nuxt"
    }
  };
  return response;
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  return chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html>
<html ${joinAttrs(html.htmlAttrs)}>
<head>${joinTags(html.head)}</head>
<body ${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPreprend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body>
</html>`;
}

const renderer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': renderer
});
//# sourceMappingURL=index.mjs.map
