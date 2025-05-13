import { useState, useEffect } from 'react'
import { fetchPublicPosts } from '@/api/posts/public/public'
import PostCard from './components/PostCard'
import type { Post } from '@/types/posts'

const PublicPostPage = () => {
    const [publicPosts, setPublicPosts] = useState<Post[]>([])

    const getPublicPost = async () => {
        try {
        const posts: Post[] = await fetchPublicPosts()
        setPublicPosts(posts)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        // const token = sessionStorage.getItem("token");
        // if (!token) {
        //     navigate("/login")
        //     return;
        // }
        getPublicPost();
    })

  return (
    <div>
        {publicPosts.map((post, index) => (
            <PostCard 
                key={index}
                post={post} 
            />
        ))}
    </div>
  )
}

export default PublicPostPage