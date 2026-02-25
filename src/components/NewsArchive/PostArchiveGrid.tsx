import React from 'react'

import { PostCard, type PostCardData } from './PostCard'

type PostArchiveGridProps = {
  posts: PostCardData[]
}

export const PostArchiveGrid: React.FC<PostArchiveGridProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="py-xl text-center">
        <p className="type-display-sm text-brand-gray-med">No posts found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-xl">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
