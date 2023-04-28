import React, { useEffect, useState } from "react";
import './App.css';
import RadioButton from "./RadioButton";
import Dropdown from "./Dropdown.js";
import Range from "./Range.js"


function App() {
  
  const options = [
    { value: "A13B", label: "A13B" },
    { value: "A13C", label: "A13C" },
    { value: "A13D", label: "A13D" },
  ];
  const [isShown, setIsShown] = useState(false);
  const [isCurrent, setIsCurrent] = useState(true);
  const [value, setValue] = useState("");
  const [text, setText] = useState("");
  const [click, setClick] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const current = () =>{
    clickCurrent()
    handleClickActive()
  }
  const common = () =>{
    handleClickShow()
    handleClickActive()
  }
  const handleClickShow = () => {
      setIsCurrent(false)
      setIsShown(true)
  };
  const clickCurrent = () =>{
      setIsShown(false)
      setIsCurrent(true)
  }
  const handleClickActive = () => {
    setIsActive(current => !current);
  };
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
  // const handleChange = event =>{
  //   setText(event.target.value)
  // }
  console.log(isCurrent)
  console.log(isShown)
  

  return (
    <div className="App">
       <div className="main__content">
        <div className="info__content">
            <div className="tab__name">
                <button className="border" style={{
                          backgroundColor: isActive ? 'white' : '#008cfc',
                          
                          }}
                          onClick={current}
                >
                          Tab 1</button>
                          <button className="border" style={{
                          backgroundColor: isActive ? '#008cfc' : 'white',
                          
                          }}
                          onClick={common}
                >
                          Tab 2</button>
            </div>
            <div className="card__info">
            <div className='blue_back'></div>
            {isCurrent && (
              <>
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
                    <Dropdown
                      isSearchable
                      isMulti
                      placeHolder=""
                      options={options}
                      onChange={(value) => console.log(value)}
                    />
                    </div>
                    <div className="use__button">
                        <button className='attach__button' onClick={handleClick}>Приложить</button>
                    </div>
                </div>
             </>)}
             {isShown && (
                <>
                <div className="number__card">
                    <div>Автоматическое поднесение карт</div>
                </div>
                <div className="name__cards">
                    <Dropdown
                      isSearchable
                      isMulti
                      placeHolder=""
                      options={options}
                      onChange={(value) => console.log(value)}
                    />
                  </div>
                  <Range/>
                  <button>Задать параметры</button>
                </>
              )}
                <div className="console__content">
                    <div className="console__name">
                        Консоль
                    </div>
                    <div className="console__place">
                        {(click === true && value === '3' && options.label === "A13B") ? `Kapдpидep${value} читает карту ${text}` 
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
