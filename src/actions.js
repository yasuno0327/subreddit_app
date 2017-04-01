import fetch from 'isomorphic-fetch'

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

export function fetchPosts(subreddit) {
  return (dispatch) {
    dispatch(requestPost(subreddit))

    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(res => res.json())
      .then(json =>
        dispatch(receivePosts(subreddit, json))
      )
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPost(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    } else {
      return Promise.resolve()
    }
  }
}

function requestPost(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function shouldFetchPost(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!post) {
    return true
  } else if (post.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Data.now()
  }
}
