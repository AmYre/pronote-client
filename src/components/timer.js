import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@mantine/core';

const Timer = (date) => {

    const Ref = useRef(null);

    // The state for our timer
    const [timer, setTimer] = useState('00:00:00');
    const [showButton, setshowButton] = useState(false);
    const [showTimer, setshowTimer] = useState(false);

    const startTimer = (e, id) => {

        if (e.getSeconds() < 60)
            e.setSeconds(e.getSeconds() + 1)

        if (e.getSeconds() > 59)
            e.setMinutes(e.getMinutes() + 1)

        if (e.getMinutes() > 59)
            e.setHours(e.getHours() + 1)

        if (e.getHours() == 1)
            id.clearInterval()

        setTimer(e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds())

    }

    const clearTimer = (e) => {

        setTimer('00:00:00');

        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e, id);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        deadline.setSeconds(0);
        deadline.setMinutes(0);
        deadline.setHours(0);
        return deadline;
    }

    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible

    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());
        function getDifferenceInSeconds(date1, date2) {
            const diffInMs = Math.abs(date2 - date1);
            return diffInMs / 1000;

        }
        setInterval(() => {
            const today = new Date(Date.now())
            const dif = getDifferenceInSeconds(date.date, today)
            console.log(dif);
            if (Math.floor(dif) == 0)
                setshowbutton(true);
        }, 1000);
    }, []);

    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    const onClickReset = () => {
        clearTimer(getDeadTime());
    }

    return (
        <div className="App">

            {showButton &&
                <>

                    <Button onClick={onClickReset}>Reset</Button>
                </>
            }
        </div>
    )
}
export default Timer

