import { useState } from 'react';
import './Range.css';

function Range(card) {

  const [width, setWidth] = useState(1);
  const [isParamsSet, setIsParamsSet] = useState(false);

  const changeWidth = (event) => {
    setWidth(event.target.value);
  };

  const handleParamsSet = () => {
    setIsParamsSet(true);
  };
  
  console.log(card);

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
      <button style={{width:"20%"}} onClick={handleParamsSet}>Задать параметры</button>
        <div className="console__conten">
          <div className="console__name">
            Консоль
          </div>
          <div className="console__place">{isParamsSet && `Интервал для автоматического поднесение ${width} сек для карт ${JSON.stringify(card.card, null, 2).replace(/\[|\]/g, '')}`}
          </div>
        </div>
    </div>
  );
}

export default Range;
