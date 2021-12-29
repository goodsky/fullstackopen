
const History = ({ clickHistory }) => {
    if (clickHistory.length === 0) {
        return (
            <p><i>Press buttons to start the counters!</i></p>
        )
    }
    
    return (
        <p>{clickHistory.join(', ')}</p>
    );
};

export default History;