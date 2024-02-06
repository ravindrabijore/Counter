import React, { useState, useEffect, useRef } from 'react'; 

const CounterInView = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  let start = props.start?props.start:0;
  const end = props.end?props.end:100; // Set your desired end value here
  const duration = props.duration?props.duration:2000; // Set animation duration in milliseconds
  let totalSteps = duration / 16; // Number of steps (assuming 60fps)


  const incrementCount = () => {
    const increment = end / totalSteps;
    if (start < end) {
      setCount((prevCount) => prevCount + increment);
      start += increment;
      requestAnimationFrame(incrementCount);
    } else {
      setCount(end);
    }
  };
 
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 1 }); // Trigger when at least 50% of the target is visible

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    if (isVisible) {
        incrementCount();
      }

  }, [isVisible]);

  return (
    <section ref={sectionRef}>
      { isVisible && (
        <div  style={{textAlign:"center"}}  ref={counterRef} >
            <h2  >{Math.floor(count)}</h2>
            <h2  >Projects</h2>
        </div>) }
    </section>
  );
};

export default CounterInView;
