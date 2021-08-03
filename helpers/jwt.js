const expressJwt = require("express-jwt");
function authJwt() {
  const secret = process.env.SECRET;
  const api = process.env.API_URL;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      `${api}/sladm/registration`,
      `${api}/sladm/login`,
      `${api}/sladm/clientlogin`,
      `${api}/slcl/controllerlistener`,
      `${api}/slman/clientmobilelogin`,
    ],
  });
}

module.exports = authJwt;
