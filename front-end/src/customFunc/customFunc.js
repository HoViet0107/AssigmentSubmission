import jwt_decode from "jwt-decode";

export function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export function decodedJwt(jwt) {
  const decodedJwt = jwt_decode(jwt);
  return decodedJwt;
}
