export function getDateDiff(timestamp) {
  if (!timestamp) {
    return "";
  }
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;
  const now = new Date().getTime();
  const diffValue = now - timestamp;
  let result;

  if (diffValue <= 0) return "";

  const yearC = diffValue / year;
  const monthC = diffValue / month;
  const weekC = diffValue / (7 * day);
  const dayC = diffValue / day;
  const hourC = diffValue / hour;
  const minC = diffValue / minute;

  if (yearC >= 1) {
    result = "" + parseInt(yearC) + "年前";
  } else if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }

  return result;
}

export function getPostContentInfo(postContent) {
  let res = {
    text: "",
    images: [],
  };
  if (postContent) {
    try {
      const { text, media } = JSON.parse(postContent);
      res.images = media;
      res.text = text;
    } catch (e) {
      res.images = [];
      res.text = postContent;
    }
  }

  return res;
}
