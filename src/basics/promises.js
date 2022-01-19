
const returnValue = (value, waitMs) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value);
        }, waitMs);
    });
}

const maybeReturnValue = (value, waitMs) => {
    return  new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomValue = Math.floor(Math.random() * 2);
            if (randomValue === 0) {
                resolve(value);
            } else {
                reject(value);
            }
        }, waitMs);
    });
}

console.log('starting then/catch/finally...');
const whatisthis = returnValue('foo', 1000)
    .then(result => {
        console.log('finished #1', result);
        return maybeReturnValue('foo1', 1000);
    })
    .then(result => {
        console.log('finished #2', result);
        return maybeReturnValue('foo2', 1000);
    })
    .then(result => {
        console.log('finished #3', result);
        return maybeReturnValue('foo3', 1000);
    })
    .catch(err => {
        console.error('error!', err);
    })
    .finally(() => {
        console.log('complete');
    });

console.log('what is this?', whatisthis);
console.log('lets be patient');

(async () => {
    await whatisthis;
    console.log('okay, first attempt is done. now starting async/await.');

    const value1 = await returnValue('foo', 1000);
    console.log('finished #1', value1);

    const value2 = await returnValue('foo1', 1000)
        .then(result => {
            console.log('finished #2 (in then)', result);
            return maybeReturnValue('foo2', 1000);
        });
    console.log('finished #3 (outside then)', value2);

})().catch(err => console.log('Unhandled Error!', err));
