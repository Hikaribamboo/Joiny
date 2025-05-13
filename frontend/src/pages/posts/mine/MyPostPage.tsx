import { useState, useEffect } from 'react'
import { fetchMyPost } from '@/api/posts/mine/mine'
import type { Post } from '@/types/posts'
import { useNavigate } from 'react-router-dom'

const MyPostPage = () => {
    const [MyPost, setMyPost] = useState<Post[]>([])

    const navigate = useNavigate()
    const getMyPost = async () => {
        try {
        const post: Post[] = await fetchMyPost()
        setMyPost(post)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login")
            console.log("Token not found")
            return;
        }
        getMyPost();
    }, [])

  return (
    <div>
      {MyPost.length === 0 ? (
        <p>ポストはまだありません</p>
      ) : (
        <div>
          <h2>{MyPost[0].goal_title}</h2>
          <p>{MyPost[0].goal_detail}</p>
        </div>
      )}
    </div>
  )
}

export default MyPostPage