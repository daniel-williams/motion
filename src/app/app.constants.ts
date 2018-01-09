const ENV = process.env.ENV;
const env = {
  debug: 'debug',
  dev: 'dev',
  production: 'production',
  remote: 'remote',
  staging: 'staging',
};

const isDebug = [env.debug].includes(ENV);
const isDev = [env.debug, env.dev, env.remote].includes(ENV);
const isProduction = [env.production, env.staging].includes(ENV);
const isRemote = [env.remote].includes(ENV);
const isStaging = [env.staging].includes(ENV);

const logErrors = isDev;
const logInfo = isDev;
const logRouteChanges = isDev;

export const appConstants = Object.freeze({
  isDebug,
  isDev,
  isProduction,
  isRemote,
  isStaging,
  logErrors,
  logInfo,
  logRouteChanges,
});

console.log('App mode: ', ENV);
