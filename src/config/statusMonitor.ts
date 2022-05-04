export const statusMonitorOption = {
  title: "NestJS Status", // Default title
  path: "/status",
  socketPath: "/socket.io", // In case you use a custom path
  port: null, // Defaults to NestJS port
  spans: [
    {
      interval: 1, // Every second
      retention: 60, // Keep 60 datapoints in memory
    },
    {
      interval: 5, // Every 5 seconds
      retention: 60,
    },
    {
      interval: 15, // Every 15 seconds
      retention: 60,
    },
  ],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    heap: true,
    responseTime: true,
    rps: true,
    statusCodes: true,
  },
  ignoreStartsWith: ["/admin"], // paths to ignore for responseTime stats
  healthChecks: [
    {
      protocol: "http",
      host: "localhost",
      path: "/api",
      port: 3080,
    },
    {
      protocol: "http",
      host: "localhost",
      path: "/api/articles",
      port: 3080,
    },
  ],
};
