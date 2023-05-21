import React, { useEffect, useMemo, useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { getCards, getPeople } from './api/cardApi';
import Notifications from './Notifications';

function AllAction() {
  const [cards, setCards] = useState([]);
  const [people, setPeople] = useState([]);
  const [visibleMenuIndex, setVisibleMenuIndex] = useState(null);
  const [callButton, setCallButton] = useState(false);
  const [text, setText] = useState("")
  const [fetchPeople, isPeople, peopleError] = useFetch(async () => {
    const response = await getPeople();
    setPeople(response.data.slice(0, 12));
  });

  const [fetchCards, isCards, cardError] = useFetch(async () => {
    const response = await getCards();
    setCards(response.data.slice(0, 12));
  });

  useEffect(() => {
    fetchPeople();
    fetchCards();
  }, []);

  const randomNumbers = useMemo(
    () => people.map(() => Math.floor(Math.random() * 5)),
    [people]
  );

  const handleClick = (index) => {
    setVisibleMenuIndex(index === visibleMenuIndex ? null : index);
  };

  const handleViolationReport = (fio) => {
    setText(`Заявлено о нарушении сотрудника ${fio}`)
  };

  return (
    <div>
      <table style={{ display: "block", maxHeight: "180px", overflowY: "auto" }}>
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Имя</th>
            <th>На работе</th>
            <th>Уровень доступа</th>
            <th>Номер карты</th>
          </tr>
        </thead>
        <tbody style={{ overflowY: "scroll" }}>
          {people.map((person, index) => (
            <React.Fragment key={index}>
              <tr>
                <td style={{ cursor: "pointer" }} onClick={() => handleClick(index)}>{person.lastname}</td>
                <td style={{ cursor: "pointer" }} onClick={() => handleClick(index)}>{person.middlename}</td>
                <td style={{ cursor: "pointer" }} onClick={() => handleClick(index)}>{person.firstname}</td>
                <td>{person.medexam_check ? 'Да' : 'Нет'}</td>
                <td>{randomNumbers[index]}</td>
                {cards.length > index ? (
                  <td>{cards[index].card}</td>
                ) : (
                  <td> </td>
                )}
                <td>
                  {cards.length > index && (
                    <button onClick={() => {
                      setCallButton(true);
                      handleViolationReport(`${person.lastname} ${person.firstname} ${person.middlename}`);
                    }}>Заявить о нарушении</button>
                  )}
                </td>
              </tr>
              {visibleMenuIndex === index && (
                <tr>
                <td colSpan="3" style={{ backgroundColor: "#F1F1F1", padding: "10px" }}>
                  <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Таймлог</div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ flex: "1" }}>
                      Вход: 8:46
                    </div>
                    <div style={{ flex: "1" }}>
                      Фойе: 1{randomNumbers[index] + 1}:16
                    </div>
                    <div style={{ flex: "1" }}>
                      Выход: 18:07
                    </div>
                  </div>
                </td>
              </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="console__content">
                <div className="console__name">
                  Консоль
                </div>
                <div className="console__place">
                    {text}
                </div>
              </div>
    </div>
  );
}

export default AllAction;
