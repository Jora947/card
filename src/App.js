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
import AllAction from "./allActions";

function App() {

  const [isShown, setIsShown] = useState(false);
  const [isCurrent, setIsCurrent] = useState(true);
  const [value, setValue] = useState("");
  const [text, setText] = useState();
  const [isTabOneActive, setIsTabOneActive] = useState(true);
  const [isTabTwoActive, setIsTabTwoActive] = useState(false);
  const [isTabThreeActive, setIsTabThreeActive] = useState(false);
  const [isTabFourActive, setIsTabFourActive] = useState(false);
  const [isTabFiveActive, setIsTabFiveActive] = useState(false);

  const [click, setClick] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [card, setCards] = useState([]);
  const [fetchCards, isCard, cardError] = useFetch(async () => {
    const response = await getCards()
    setCards(response.data.slice(0, 10))
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
    setIsTabFourActive(false)
    setIsTabFiveActive(false);
  }

  const handleTabTwoClick = () => {
    setIsTabTwoActive(true);
    setIsTabOneActive(false);
    setIsTabThreeActive(false);
    setIsTabFourActive(false)
    setIsTabFiveActive(false);
  };

  const handleTabThreeClick = () => {
    setIsTabThreeActive(true);
    setIsTabOneActive(false);
    setIsTabTwoActive(false);
    setIsTabFourActive(false)
    setIsTabFiveActive(false);
  };
  const handleTabFourClick = () => {
    setIsTabThreeActive(false);
    setIsTabOneActive(false);
    setIsTabTwoActive(false);
    setIsTabFiveActive(false);
    setIsTabFourActive(true)
  };
  const handleTabFiveClick = () => {
    setIsTabThreeActive(false);
    setIsTabOneActive(false);
    setIsTabTwoActive(false);
    setIsTabFourActive(false)
    setIsTabFiveActive(true);
  };

  useEffect(() => {
    fetchCards()
    fetchDevice()
  }, [])
  
  console.log(text)
 
 

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
            <button
              className="border"
              style={{
                backgroundColor: isTabFourActive ? '#008cfc' : 'white',
              }}
              onClick={handleTabFourClick}
            >
              Tab 4
            </button>
            <button
              className="border"
              style={{
                backgroundColor: isTabFiveActive ? '#008cfc' : 'white',
              }}
              onClick={handleTabFiveClick}
            >
              Tab 5
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
                    options={card}
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
                {(click === true && value === '3' && card[0].card ? `Kapдpидep${value} читает карту ${card[0].card}` : "Неверная карта или кардpидep")}
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
                  options={card}
                  onChange={(value) => setText(value.map(card => card.card))}
                />
              </div>
              <Range card ={text}/>
            
            </div>
          )}
          {isTabThreeActive && (
             <div className="card__info">
             <div className='blue_back'></div>
             <DropDownPeople/>
           </div>
          )}
          {isTabFourActive && (
            <div className="card__info">
              <div className='blue_back'></div>
              <Tab4/>
            </div>
          )}
          {isTabFiveActive && (
            <div className="card__info">
            <div className='blue_back'></div>
            <AllAction/>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
