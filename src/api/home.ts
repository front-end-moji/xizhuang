import Request from "../utils/request";
let request = new Request().http;

interface IGetPostListParams {
  authorId?: string; // 用户id
  content?: string; // 内容信息
  id?: string; // post id
  ids?: string[]; // post ids
  isSearchLatestPost?: 1 | 0; // 是否搜索最新的帖子 1=true
  limit?: number; // 每页多少条
  page?: number; // 分页
  status?: number;
  title?: string;
  topic?: string;
  visibility?: string;
}

/**
 * 获取帖子列表
 * @returns
 */
export const getPostList = function (data: IGetPostListParams) {
  return request({
    url: "/posts/page",
    method: "GET",
    data: data,
    // token: operate.isToken(),
    token: "e5b18196ae624037b35458b2c32f054a",
  });
};
