import Request from "../utils/request";
let request = new Request().http;

export const getSchoolList = function (code) {
  return request({
    url: "wechat/login",
    method: "post",
    data: {
      code: code,
    },
  });
};

