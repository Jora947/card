import React, { useEffect, useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { getIssued } from './api/cardApi';

function Tab4() {
  const [issuedDevices, setIssuedDevices] = useState([]);

  const [fetchIssuedDevices, isIssuedDevices, issuedDevicesError] = useFetch(async () => {
    const response = await getIssued();
    setIssuedDevices(response.data);
  });

  useEffect(() => {
    fetchIssuedDevices();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Сотрудник</th>
            <th>Номер устройства</th>
            <th>Серийный номер</th>
            <th>Дата выдачи</th>
            <th>Тип устройства</th>
          </tr>
        </thead>
        <tbody>
          {issuedDevices.map((device) => (
            <tr key={device.id}>
              <td>{device.personnel}</td>
              <td>{device.device_number}</td>
              <td>{device.device_serial}</td>
              <td>{device.datetime}</td>
              <td>{device.device_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tab4;
