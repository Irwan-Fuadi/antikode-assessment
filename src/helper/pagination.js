/*
 * Copyright (c) 2021. Sprout Digital Labs
 */

'Helper strict';
var Helper = function (help) {};

Helper.pagyOffset = function (limit, page) {
  let offset = 0;
  if (page > 1) {
    offset = ((page - 1) * limit);
  }
  return offset;
}
Helper.pagination = function (count, limit, page) {
  const totalPage = Math.ceil(count / limit);
  const pagination = {
    maxPage: totalPage,
    currentPage: page,
    limit: limit,
    count: count
  };
  return pagination
}


module.exports = Helper;
