// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //apiUrl: 'https://192.168.43.63:8444',
  apiUrl: 'https://localhost:8444',
  secugenUrl : "https://localhost:8443/SGIFPCapture",
  expireTime: 6
};
