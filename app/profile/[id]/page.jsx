'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'

import { Profile } from '@/components'

const UserProfile = ({ params }) => {


    const [posts, setPosts] = useState([]);

    const searchParams = useSearchParams();

    const userName = searchParams.get('name');

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${params?.id}/posts`);
    
          const data = await response.json();
        
          setPosts(data);
        }
    
        fetchPosts();
    
      }, [])

   
  return (
    <Profile 
        name={`${userName}'s`}
        desc={`Welcome to ${userName}'s personalized profile page`}
        data={posts}
    />
  )
}

export default UserProfile