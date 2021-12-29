
const StatisticLine = ({text, value}) => (
    <tr>
        <td><b>{text}</b></td>
        <td>{value}</td>
    </tr>
);

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    if (total === 0) {
        return (
            <p><i>No feedback given yet...</i></p>
        )
    }

    const average = (good - bad) / total;
    const positivePercentage = good / total;

    return (
        <table className="statistics">
            <tbody>
                <StatisticLine text='good' value={good} />
                <StatisticLine text='neutral' value={neutral} />
                <StatisticLine text='bad' value={bad} />
                <StatisticLine text='total' value={total} />
                <StatisticLine text='average' value={average} />
                <StatisticLine text='positive' value={positivePercentage} />
            </tbody>
        </table>
    )
};

export default Statistics;