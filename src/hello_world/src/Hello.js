
const Hello = (props) => {
    const { person: { name, age }} = props;

    const bornYear = () => new Date().getFullYear() - age;
    
    return (
        <div>
            <p>Hello {name}, you are {age} years old. (<i>So you were probably born in {bornYear()}</i>)</p>
        </div>
    );
};

export default Hello;
