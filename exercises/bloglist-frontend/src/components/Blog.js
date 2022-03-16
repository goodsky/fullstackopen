import './Blog.css';

import { useState } from 'react';

const Blog = ({blog, incrementLikes}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const blogDetails = (
    <div>
      by {blog.author}<br/>
      {blog.url}<br/>
      likes {blog.likes} <button onClick={incrementLikes}>like</button><br/>
    </div>
  );

  return (
    <div className="blog">
      <u>{blog.title} - {blog.author}</u> <button onClick={toggleIsExpanded}>{isExpanded ? "hide" : "show"}</button>
      {isExpanded ? blogDetails : null}
    </div>
  );
};

export default Blog;