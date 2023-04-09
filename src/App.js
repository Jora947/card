import React, { useEffect, useState } from "react";
import './App.css';
import RadioButton from "./RadioButton";


function App() {
  const [value, setValue] = useState("");
  const [text, setText] = useState("");
  const [click, setClick] = useState(false);
  const handleClick = () =>{
    setClick(true);
  }
  const handleOneChange = () => {
    setValue('1');
  };
  const handleTwoChange = () => {
    setValue('2');
  };
  const handleThreeChange = () => {
    setValue('3');
  };
  const handleFourChange = () => {
    setValue('4');
  };
  const handleChange = event =>{
    setText(event.target.value)
  }
  console.log(value)
  console.log(text)
  console.log(click)
  return (
    <div className="App">
       <div className="main__content">
        <div className="info__content">
            <div className="tab__name">
                <div className="border">Tab 1</div>
            </div>
            <div className="card__info">
            <div className='blue_back'></div>
                <div className="number__card">
                    <div>Номер карты</div>
                </div>
                <div className="use__card">
                    <div className="cardiler">
                      <div>
                      <RadioButton
                                label="Kapдpидep1"
                                value={value === '1'}
                                onChange={handleOneChange}
                        />
                      </div>
                      <div>
                      <RadioButton
                                label="Kapдpидep2"
                                value={value === '2'}
                                onChange={handleTwoChange}
                        />
                      </div>
                      <div>
                      <RadioButton
                                label="Kapдpидep3"
                                value={value === '3'}
                                onChange={handleThreeChange}
                        />
                      </div>
                      <div>
                      <RadioButton
                                label="Kapдpидep4"
                                value={value === '4'}
                                onChange={handleFourChange}
                        />
                      </div>
                    </div>
                    <div className="name__card">
                        <input className='num_card' type='text' onChange={handleChange} value={text} />
                    </div>
                    <div className="use__button">
                        <button className='attach__button' onClick={handleClick}>Приложить</button>
                    </div>
                </div>
                <div className="console__content">
                    <div className="console__name">
                        Консоль
                    </div>
                    <div className="console__place">
                        {(click === true && value === '3' && text === "A1C2B9") ? `Kapдpидep${value} читает карту ${text}` 
                        : "Неверная карта или кapдpидep"}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
}

export default App;
