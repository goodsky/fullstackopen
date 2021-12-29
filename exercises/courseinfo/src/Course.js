
const Header = ({ course }) => (
    <h1>{course}</h1>
);

const Content = ({ parts }) => 
    parts.map(part => <Part key={part.id} part={part} />
);

const Part = ({ part }) => (
    <p>
        {part.name} ({part.exercises} exercises)
    </p>
);

const Total = ({ parts }) => (
    // 'Reduce' creates a single value from an enumerable.
    //  If a starting value is not supplied, the first element in the array is used by default.
    //  Since my array is an array of objects... that causes weird behavior. So we explicitly
    //  start our summing from 0.
    <p><b>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b></p>
);

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default Course;