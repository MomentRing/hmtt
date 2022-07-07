import request from '@/utils/request'

/**
 *获取评论
 * @param {*} param0
 * @returns
 */
export const getCommentList = ({ type, source, offset, limit }) => {
  return request({
    url: '/comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}

/**
 *评论点赞
 * @param {点赞的评论id或回复id} target
 * @returns
 */
export const addLike = (target) => {
  return request({
    method: 'post',
    url: 'comment/likings',
    data: {
      target
    }
  })
}

/**
 *取消点赞
 * @param {要取消点赞的评论id或回复id} target
 * @returns
 */
export const delLike = (target) => {
  return request({
    method: 'DELETE',
    url: `comment/likings/${target}`

  })
}
/**
 *target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
* content 评论内容
*art_id 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @param {*} data
 * @returns
 */
export const addComment = (data) => {
  return request({
    method: 'post',
    url: 'comments',
    data
  })
}
