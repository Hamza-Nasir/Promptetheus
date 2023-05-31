'use client'

import { useState, useEffect } from 'react'

import { PromptCard } from '.'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {
        data.map((post) => (
          <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={() => {
              handleTagClick(post);
            }}
          />
        ))
      }
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([])

  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');

      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();

  }, [posts])

  const filterPrompts = (searchText) => {

    if (!posts) {
      return posts;
    }

    const regex = new RegExp(searchText, 'i');

    return posts.filter((item) => (
      regex.test(item.creator.username) ||
      regex.test(item.tag) || 
      regex.test(item.prompt)
    ))
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    // Debounce
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);

        setSearchResults(searchResult);

      }, 500)
    )
  }

  const handleTagFilter = (tag) => {

    setSearchText(tag);  

    clearTimeout(searchTimeout);

    // Debounce
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(tag);

        setSearchResults(searchResult);

      }, 500)
    )
  }

  return (
    <section className='feed'>
      <form 
        className='relative w-full flex-center'
      >
        <input 
          type="text" 
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required

          className='search_input peer'
        />

      </form>

      <PromptCardList 
        data={searchResults.length ? searchResults : posts}
        handleTagClick={(post) => {
          
          handleTagFilter(post.tag);
        }}
      />
    </section>
  )
}

export default Feed