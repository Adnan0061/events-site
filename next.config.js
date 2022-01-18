const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "EventsList",
        mongodb_password: "AsdF!23$",
        mongodb_clusterName: "cluster0",
        mongodb_database: "EventsListDB-dev",
      },
    };
  }

  return {
    env: {
      mongodb_username: "EventsList",
      mongodb_password: "AsdF!23$",
      mongodb_clusterName: "cluster0",
      mongodb_database: "EventsListDB",
    },
  };
};
