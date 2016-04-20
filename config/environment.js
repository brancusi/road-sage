/* jshint node: true */
// const DEV_HOST = 'http://localhost:3000';
// const PROD_HOST = 'http://api.mlvegankitchen.com';

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'roadsage',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-eval' https://cdn.mxpnl.com  *.googleapis.com *.cloudflare.com *", // Allow scripts from https://cdn.mxpnl.com
    'font-src': "'self' *.gstatic.com *.googleapis.com", // Allow fonts to be loaded from http://fonts.gstatic.com
    'connect-src': "'self' http://localhost:3000 *", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
    'img-src': "'self' data: *.gstatic.com *.googleapis.com",
    'style-src': "'self' 'unsafe-inline' *.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
    'media-src': "'self'"
  }

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'login',
    routeAfterAuthentication: 'route-plans',
    routeIfAlreadyAuthenticated: 'route-plans'
  };

  if (environment === 'development') {
    ENV.apiHost = process.env.DEV_HOST;
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    ENV.apiHost = process.env.DEV_HOST;
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.apiHost = process.env.PROD_HOST;
  }

  return ENV;
};
