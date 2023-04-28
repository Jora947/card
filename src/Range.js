import { useState } from 'react';
import './Range.css';

function Range() {

  const [width, setWidth] = useState(1);

  const changeWidth = (event) => {
    setWidth(event.target.value);
  };


  return (
    <div className='container'>
      <h4>Задать интервал: {width}сек</h4>
      <input
        type='range'
        onChange={changeWidth}
        min={1}
        max={10}
        step={1}
        value={width}
      ></input>
    </div>
  );
}

export default Range;