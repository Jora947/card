import React, { useEffect, useRef, useState } from 'react';


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

      function Notification({ text }) {
        return <div>{text}</div>
      }

export default Notifications
