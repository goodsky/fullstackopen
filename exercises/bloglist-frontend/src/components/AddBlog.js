import { useState } from 'react';

const AddBlog = ({addBlog}) => {
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

  const handleAddBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };

    await addBlog(newBlog);
    
    setNewBlogTitle('');
    setNewBlogAuthor('');
    setNewBlogUrl('');
  }

  return (
    <form onSubmit={handleAddBlog}>
      <div>
        title:
        <input type="text" value={newBlogTitle} onChange={(event) => setNewBlogTitle(event.target.value)} />
      </div>
      <div>
        author:
        <input type="text" value={newBlogAuthor} onChange={(event) => setNewBlogAuthor(event.target.value)} />
      </div>
      <div>
        url:
        <input type="text" value={newBlogUrl} onChange={(event) => setNewBlogUrl(event.target.value)} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddBlog;
