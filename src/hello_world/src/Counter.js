
import { useState } from "react";

import Button from './Button';
import Display from './Display';
import History from './History';

const Counter = () => {
    // NB: This is a tutorial showing how to use a state object with multiple properties.
    //     However, since the two click counters are entirely independent, this is a bad
    //     pattern to use in this case. Two separate counters would be more suitable.
    //     https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables
    const [clicks, setClicks] = useState({
        top: 0,
        bottom: 0,
    });

    const [clickHistory, setClickHistory] = useState([]);

    // note: we do not need to use 'setInterval' here, because whenever the counter updates this component is invoked again during the redraw.
    // setTimeout(() => setCounter(counter + 1), 1000);
    
    const updateTopValue = (newValue, opCode) => () => {
        setClickHistory(clickHistory.concat(opCode));
        setClicks({ ...clicks, top: newValue });
    };

    const updateBotValue = (newValue, opCode) => () => {
        setClickHistory(clickHistory.concat(opCode));
        setClicks({ ...clicks, bottom: newValue });
    };

    const handleHistoryRst = () => {
        setClickHistory([]);
    };

    console.log('rendering...', clicks);
    return (
        <div>
            <h2>Top Counter</h2>
            <Display counter={clicks.top} />
            <Button text='- 1' onClick={updateTopValue(clicks.top - 1, 'T-1')} />
            <Button text='reset' onClick={updateTopValue(0, 'Trst')} />
            <Button text='+ 1' onClick={updateTopValue(clicks.top + 1, 'T+1')} />
            
            <h2>Bottom Counter</h2>
            <Display counter={clicks.bottom} />
            <Button text='- 1' onClick={updateBotValue(clicks.top - 1, 'B-1')} />
            <Button text='reset' onClick={updateBotValue(0, 'Brst')} />
            <Button text='+ 1' onClick={updateBotValue(clicks.top + 1, 'B+1')} />

            <h3>Click History</h3>
            <History clickHistory={clickHistory} />
            <Button text='clear history' onClick={handleHistoryRst} />
        </div>
    );
};

export default Counter;