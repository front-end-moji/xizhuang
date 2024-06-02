import Request from "../utils/request";
let request = new Request().http;

export const getSchoolList = function (code) {
  return request({
    url: "school/list",
    method: "get",
    data: {
      code: code,
    },
  });
};

