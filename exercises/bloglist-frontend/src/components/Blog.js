import './Blog.css';

import { useState } from 'react';

const Blog = ({blog, incrementLikes}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const blogDetails = (
    <div>
      <i>by {blog.author}</i><br/>
      <a href={blog.url} target="_blank" rel="noreferrer noopener">{blog.url}</a><br/>
      likes {blog.likes} <button onClick={incrementLikes}>like</button><br/>
    </div>
  );

  return (
    <div className="blog">
      <u>{blog.title}</u> <button onClick={toggleIsExpanded}>{isExpanded ? "hide" : "show"}</button>
      {isExpanded ? blogDetails : null}
    </div>
  );
};

export default Blog;