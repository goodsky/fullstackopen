import React from 'react';

import Course from './Course';

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of Web apps',
          exercises: 6,
          id: 0,
        },
        {
          name: 'Introduction to React',
          exercises: 14,
          id: 1,
        },
        {
          name: 'Communicating with server',
          exercises: 20,
          id: 2,
        },
        {
          name: 'Programming a server with NodeJS and Express',
          exercises: 22,
          id: 3,
        },
        {
          name: 'Testing Express servers, user administration',
          exercises: 23,
          id: 4,
        },
        {
          name: 'Testing React apps',
          exercises: 22,
          id: 5,
        },
        {
          name: 'State management with Redux',
          exercises: 21,
          id: 6,
        },
        {
          name: 'React router, custom hooks, styling app with CSS and webpack',
          exercises: 21,
          id: 7,
        },
        {
          name: 'GraphQL',
          exercises: 26,
          id: 8,
        },
      ],
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return(
    <div>
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </div>
  )
};

export default App;
