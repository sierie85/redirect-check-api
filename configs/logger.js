export default {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname,remoteAddress,remotePort",
      },
    },
  },
  production: true,
  test: false,
};
