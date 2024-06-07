import Request from "../utils/request";
let request = new Request().http;

// 发表评论
export const saveComment = function (data) {
  return request({
    url: "postreplies/save",
    method: "post",
    data,
  });
};

// 获取评论列表
export const getCommentList = function (data) {
  return request({
    url: "postreplies/page",
    method: "get",
    data,
  });
};
