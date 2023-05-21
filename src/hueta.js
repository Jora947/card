import React, { useEffect, useRef, useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { getCards, getPeople } from './api/cardApi';

function Tab4() {
  const containerRef = useRef(null);

  const [people, setPeople] = useState([])
  const [show, setShow] = useState(false);
  const [block, setBlock] = useState(false);
  const [cards, setCards] = useState([])
  const [text, setText] = useState("Выбрать карту из списка");
  const [dropdownState, setDropdownState] = useState({ open: false });
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  const handleDropdownClick = () => setDropdownState({ 
    open: !dropdownState.open,
    block: false
   });

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setDropdownState({ open: false });
    }
  };

  const chooseItem = (item, item2, index) =>{
    setSelectedItem({ card: item, type: item2});
    setDropdownState({ open: false});
    setSelectedItemIndex(index);
  }

  const [fetchPeople, isPeople, peopleError] = useFetch(async () => {
    const response = await getPeople()
    setPeople(response.data.slice(0, 100));
  })
  const [fetchCards, isCards, cardError] = useFetch(async () => {
    const response = await getCards()
    setCards(response.data.slice(0, 100));
  })

  const issuedInfo = ()=>{
    setShow(!show)
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchPeople();
    fetchCards()
  }, [])
  

  return (
    <div ref={containerRef}>
      <button type="button" className="same_width info-btn" onClick={handleDropdownClick}>
        {selectedItem ? `${selectedItem.card} ${selectedItem.type}` : text}
      </button>
      {dropdownState.open && (
        <div className="dropdown-menu">
          <ul>
            {cards.map((card, index) => 
              <li key={card.card} className="same_width" onClick={() => chooseItem(card.card, card.type, index)}>{`${card.card} ${card.type}`}</li>
            )}
          </ul>
        </div>
      )}
      {selectedItem && selectedItemIndex !== -1 && (
        <div style={{ marginTop: "30px" }}>
            <table>
              <thead>
                <tr>
                  <th>Последнее использование</th>
                  <th>Имя</th>
                  <th>Отчество</th>
                  <th>Фамилия</th>
                  <th>Назначение</th>
                  <th>Номер карты</th>
                  <th>Тип</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{new Date(people[selectedItemIndex].datetime_end).getFullYear() === 2024
            ? new Date(new Date(people[selectedItemIndex].datetime_end).setFullYear(2023)).toLocaleString("ru-RU")
            : new Date(people[selectedItemIndex].datetime_end).toLocaleString("ru-RU")}
                  </td>
                  <td>{people[selectedItemIndex].firstname}</td>
                  <td>{people[selectedItemIndex].middlename}</td>
                  <td>{people[selectedItemIndex].lastname}</td>
                  <td>{people[selectedItemIndex].appointment}</td>
                  <td>{cards[selectedItemIndex].card}</td>
                  <td>{cards[selectedItemIndex].type}</td>
                </tr>
              </tbody>
            </table>
            <Notifications
              cards={cards}
              people={people}
              selectedItemIndex={selectedItemIndex}
              block={block}
              setBlock={setBlock}
            />
      </div>
  )}
      </div>
  );
}

function Notification({ text }) {
  return <div>{text}</div>
}

function Notifications({ cards, people, selectedItemIndex, block, setBlock }) {
  const [notifications, setNotifications] = useState([]);

  const handleBlockClick = () => {
    const notificationText = `Карта под номером ${cards[selectedItemIndex].card} была заблокирована. Владелец ${people[selectedItemIndex].firstname} ${people[selectedItemIndex].middlename} ${people[selectedItemIndex].lastname}`;
    setNotifications([...notifications, notificationText]);
    setBlock(!block);
    };
    
    return (
    <div>
      <button
    onClick={handleBlockClick}
    className="info-btn"
    style={{ backgroundColor: "red", color: "white", border: "none" }}
    >
    Заблокировать карту
    </button>
    <div className="console__content">
  <div className="console__name">
    Консоль
  </div>
  <div className="console__place">
    <div>
    {notifications.map((notification, index) => (
    <Notification key={index} text={notification} />
    ))}
    </div>
  </div>
</div>
    </div>
    );
    }
    
export default Tab4;
    
    