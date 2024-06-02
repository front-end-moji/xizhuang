import Request from "../utils/request";
let request = new Request().http;

export const wechatLogin = function (code) {
  return request({
    url: "wechat/login",
    method: "post",
    data: {
      code: code,
    },
  });
};

export const updateUser = function (user) {
  return request({
    url: "user/profile/update",
    method: "post",
    data: {
      ...user
    },
  });
};
