import React, { useEffect, useState, useRef } from 'react';

const Timer = () => {
  
const Ref = useRef(null);
  
// The state for our timer
const [timer, setTimer] = useState('00:00:00');



const startTimer = (e ,id) => {

                
     if (e.getSeconds() < 60)
     e.setSeconds(e.getSeconds() +1)

     if (e.getSeconds() > 59)
     e.setMinutes(e.getMinutes()+1 )

     if (e.getMinutes() > 59)
     e.setHours(e.getHours() +1)

     if (e.getHours() == 1)
     id.clearInterval()

     setTimer(e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds())

        // update the timer
        // check if less than 10 then we need to 
        // add '0' at the beginning of the variable
      
}

const clearTimer = (e) => {

    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next    
    setTimer('00:00:00');

    // If you try to remove this line the 
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
        startTimer(e,id);
    }, 1000)
    Ref.current = id;
}

const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if 
    // you entend to add more time
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
        <h2>{timer}</h2>
        <button onClick={onClickReset}>Reset</button>
    </div>
)
}
 export default Timer