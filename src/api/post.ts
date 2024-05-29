import Request from "../utils/request";
let request = new Request().http;

const defaultPostData = {
  authorId: 0,
  content: "",
  createOperator: 0,
  deleteOperator: 0,
  gmtCreate: "",
  gmtDelete: "",
  gmtUpdate: "",
  id: 0,
  ids: [],
  isDelete: true,
  isSearchLatestPost: 0,
  status: 0,
  title: "",
  topic: "",
  updateOperator: 0,
  visibility: "",
};

/**
 * 发布帖子
 * @returns
 */
export const publishPostReq = function (data: typeof defaultPostData) {
  return request({
    url: "posts/save",
    method: "POST",
    data: { ...defaultPostData, ...data },
    // token: operate.isToken(),
    token: "e5b18196ae624037b35458b2c32f054a",
  });
};
