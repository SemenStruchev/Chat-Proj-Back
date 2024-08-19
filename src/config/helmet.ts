import helmet from "helmet";

const helmetConfig = helmet({
  frameguard: {
    action: "deny",
  },

  noSniff: true,
});

export default helmetConfig;
