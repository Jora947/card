import React, { useEffect, useState } from "react";
import './App.css';
import RadioButton from "./RadioButton";
import Dropdown from "./Dropdown.js";
import Range from "./Range.js"
import DropDownPeople from "./DropDownPeople";
import { useFetch } from "./hooks/useFetch";
import { getCards, getDevice, getdevice } from "./api/cardApi";
import { Scrollbar } from 'react-scrollbars-custom';
import Tab4 from "./hueta";

function App() {

  const [isShown, setIsShown] = useState(false);
  const [isCurrent, setIsCurrent] = useState(true);
  const [value, setValue] = useState("");
  const [text, setText] = useState("");
  const [isTabOneActive, setIsTabOneActive] = useState(true);
  const [isTabTwoActive, setIsTabTwoActive] = useState(false);
  const [isTabThreeActive, setIsTabThreeActive] = useState(false);

  const [click, setClick] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [card, setCards] = useState([]);
  const [fetchCards, isCard, cardError] = useFetch(async () => {
    const response = await getCards()
    setCards(response.data)
  })
  const [device, setDevice] = useState([]);
  const [fetchDevice, isDevice, DeviceError] = useFetch(async () => {
    const response = await getDevice()
    setDevice(response.data)
  })

  const handleTabOneClick = () => {
    setIsTabOneActive(true);
    setIsTabTwoActive(false);
    setIsTabThreeActive(false);
  }

  const handleTabTwoClick = () => {
    setIsTabTwoActive(true);
    setIsTabOneActive(false);
    setIsTabThreeActive(false);
  };

  const handleTabThreeClick = () => {
    setIsTabThreeActive(true);
    setIsTabOneActive(false);
    setIsTabTwoActive(false);
  };

  useEffect(() => {
    fetchCards()
    fetchDevice()
  }, [])

  const options = [
    card
  ];

  return (
    <div className="App">
      
      <div className="main__content">
        <div className="info__content">
          <div className="tab__name">
            <button
              className="border"
              style={{
                backgroundColor: isTabOneActive ? '#008cfc' : 'white',
              }}
              onClick={handleTabOneClick}
            >
              Tab 1
            </button>
            <button
              className="border"
              style={{
                backgroundColor: isTabTwoActive ? '#008cfc' : 'white',
              }}
              onClick={handleTabTwoClick}
            >
              Tab 2
            </button>
            <button
              className="border"
              style={{
                backgroundColor: isTabThreeActive ? '#008cfc' : 'white',
              }}
              onClick={handleTabThreeClick}
            >
              Tab 3
            </button>
          </div>
          {isTabOneActive && (
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
                      onChange={() => setValue('1')}
                    />
                  </div>
                  <div>
                    <RadioButton
                      label="Kapдpидep2"
                      value={value === '2'}
                      onChange={() => setValue('2')}
                    />
                  </div>
                  <div>
                    <RadioButton
                      label="Kapдpидep3"
                      value={value === '3'}
                      onChange={() => setValue('3')}
                    />
                  </div>
                  <div>
                    <RadioButton
                      label="Kapдpидep4"
                      value={value === '4'}
                      onChange={() => setValue('4')}
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
                  <button className='attach__button' onClick={() => setClick(true)}>Приложить</button>
                </div>
              </div>
              <div className="console__content">
                <div className="console__name">
                  Консоль
                </div>
                <div className="console__place">
                  {(click === true && value === '3' && options.label === "A13B" ? `Kapдpидep${value} читает карту ${text}` : "Неверная карта или кapдpидep")}
                </div>
              </div>
            </div>
          )}
          {isTabTwoActive && (
            <div className="card__info">
              <div className='blue_back'></div>
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
              <Range />
              <button>Задать параметры</button>
              <div className="console__content">
                <div className="console__name">
                  Консоль
                </div>
                <div className="console__place">
                  {(click === true && value === '3' && options.label === "A13B") ? `Kapдpидep${value} читает карту ${text}` : "Неверная карта или кapдpридеп"}
                </div>
              </div>
            </div>
          )}
          {isTabThreeActive && (
             <div className="card__info">
             <div className='blue_back'></div>
             <DropDownPeople/>
           </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
