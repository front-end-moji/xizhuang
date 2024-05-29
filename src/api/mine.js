import Request from "../utils/request";
let request = new Request().http;

export const wechatLogin = function (code) {
  return request({
    url: "wechat/login",
    method: "post",
    data: {
      code: code
    },
    // token: operate.isToken(),
    // token: "e5b18196ae624037b35458b2c32f054a",
  });
};