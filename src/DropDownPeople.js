import React, { useState, useRef, useEffect } from "react";
import "./Dropdow.css";
import { getIssued, getPeople } from "./api/cardApi";
import { useFetch } from "./hooks/useFetch";

export default function DropDownPeople() {
  
  const containerRef = useRef(null);
  const [people, setPeople] = useState([])
  const [show, setShow] = useState(false);
  const [issued, setIssued] = useState([])
  const [text, setText] = useState("Список сотрудников");
  const [dropdownState, setDropdownState] = useState({ open: false });
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  const handleDropdownClick = () => setDropdownState({ open: !dropdownState.open });

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setDropdownState({ open: false });
    }
  };

  const chooseItem = (item, item2, item3, item4, index) =>{
    console.log("chooseItem", item, item2, item3, item4, index);
    setSelectedItem({ firstname: item, lastname: item2, middlename: item3, people_id: item4 });
    setDropdownState({ open: false});
    setSelectedItemIndex(index);
  }

  const [fetchPeople, isPeople, peopleError] = useFetch(async () => {
    const response = await getPeople()
    setPeople(response.data.slice(0, 100));
  })
  const [fetchIssued, isIssued, issuedError] = useFetch(async () => {
    const response = await getIssued()
    setIssued(response.data.slice(0, 100));
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
    fetchIssued();
  }, [])



  return (
    <div ref={containerRef}>
      <button type="button" className="same_width info-btn" onClick={handleDropdownClick}>
        {selectedItem ? `${selectedItem.firstname} ${selectedItem.lastname} ${selectedItem.middlename}` : text}
      </button>
      {dropdownState.open && (
        <div className="dropdown-menu">
          <ul>
            {people.map((person, index) => 
              <li key={person.id} className="same_width" onClick={() => chooseItem(person.firstname, person.lastname, person.middlename, person.people_id, index)}>{`${person.firstname} ${person.lastname} ${person.middlename}`}</li>
            )}
          </ul>
        </div>
      )}
      {selectedItem && (
        <div style={{ marginTop: "60px" }}>
          <table>
            <thead>
              <tr>
              <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Отдел</th>
            <th>Категория</th>
            <th>Должность</th>
            <th>Нанят</th>
            <th>Мед обследование</th>
          </tr>
        </thead>
        <tbody>
          {people
            .filter(person => person.lastname === selectedItem.lastname)
            .map(person => {
              const date = new Date(person.datetime_begin);
              const formattedDate = date.toLocaleDateString("ru-RU");
              const date1 = new Date(person.medexam_end);
              const formattedDate1 = date1.toLocaleDateString("ru-RU");
              return (
                <tr key={person.people_id}>
                  <td>{person.lastname}</td>
                  <td>{person.firstname}</td>
                  <td>{person.middlename}</td>
                  <td>{person.department}</td>
                  <td>{person.category}</td>
                  <td>{person.appointment}</td>
                  <td>{formattedDate}</td>
                  <td>{formattedDate1}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  )}
  <button onClick={issuedInfo}  className="info-btn">Информация об оборудовании</button>
  {show && selectedItemIndex !== -1 && (
    
  <div style={{ marginTop: "60px" }}>
    <table>
      <thead>
        <tr>
          <th>Тип устройства</th>
          <th>Дата выдачи</th>
          <th>На объекте</th>
          <th>Используется</th>
          <th>Уровень батареи</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{issued[selectedItemIndex].device_type}</td>
          <td>{new Date(issued[selectedItemIndex].datetime).toLocaleString("ru-RU")}</td>
          <td>{issued[selectedItemIndex].in_mine ? 'Да' : 'Нет'}</td>
          <td>{issued[selectedItemIndex].is_out ? 'Да' : 'Нет'}</td>
          <td>{issued[selectedItemIndex].level}</td>
        </tr>
      </tbody>
    </table>
  </div>
)}
</div>
);
}

