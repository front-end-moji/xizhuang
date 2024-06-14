import Request from "../utils/request";
let request = new Request().http;

const defaultPostData = {
  // content: "",
  // createOperator: 0,
  // deleteOperator: 0,
  // gmtCreate: "",
  // gmtDelete: "",
  // gmtUpdate: "",
  // id: 0,
  // ids: [],
  // isDelete: false,
  // isSearchLatestPost: 0,
  // status: 0,
  // title: "",
  // topic: "",
  // updateOperator: 0,
  // visibility: "",
};

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
 * 发布帖子
 * @returns
 */
export const publishPostReq = function (data: typeof defaultPostData) {
  return request({
    url: "posts/save",
    method: "POST",
    data: { ...defaultPostData, ...data },
  });
};

/**
 * 获取帖子列表
 * @returns
 */
export const getPostList = function (data: IGetPostListParams) {
  return request({
    url: "posts/page",
    method: "GET",
    data: data,
  });
};

/**
 * 获取帖子详情
 */
export const getPostDetailById = function (data: { id: string }) {
  return request({
    url: `posts/${data.id}`,
    method: "GET",
  });
};

/**
 * 获取帖子主题
 */
export const getPostTopicList = function () {
  return request({
    url: `posttopic/page`,
    method: "GET",
    data: { limit: 10, page: 1 },
  });
};

/**
 * 文件上传oss
 */
export const uploadImgToOss = function (file) {
  return request({
    url: `oss/upload`,
    method: "POST",
    data: { file },
    header: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * 删除帖子
 */
export const deletePost = function (id) {
  return request({
    url: `posts/delete/${id}`,
    method: "POST",
  });
};

export function querySetTopPaymentList() {
  return request({
    url: "topoption/page",
    method: "GET",
  });
}

export function getPayParams({ postId, topOptionId }) {
  return request({
    url: "pay/post",
    method: "POST",
    data: {
      postId,
      topOptionId,
    },
  });
}

// 点赞帖子
export const likePost = function (data) {
  return request({
    url: "postlikes/save",
    method: "POST",
    data,
  });
};

// 取消点赞帖子
export const unlikePost = function (id) {
  return request({
    url: `postlikes/delete/${id}`,
    method: "POST",
  });
};

// 订阅帖子
export const subscribePost = function (data) {
  return request({
    url: "postsubscribe/save",
    method: "POST",
    data,
  });
};

// 取消订阅帖子
export const unsubscribePost = function (id) {
  return request({
    url: `postsubscribe/delete/${id}`,
    method: "POST",
  });
};

// 查询 banner 列表
export const fetchBannerList = function (id) {
  return request({
    url: "banner/list",
    method: "GET",
  });
};

export const queryMyPostList = function () {
  return request({
    url: "user/profile/myPosts",
    method: "GET",
    data: {
      limit: 10000,
      page: 1,
    }
  });
};
