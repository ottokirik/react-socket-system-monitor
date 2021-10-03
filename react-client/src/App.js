import { useEffect, useState } from 'react';

import { Widget } from './components';
import { socket } from './utilites';

function App() {
  const [performanceData, setPerformanceData] = useState({});

  useEffect(() => {
    socket.on('data', (data) => {
      setPerformanceData((prevState) => ({
        ...prevState,
        [data?.macA]: data,
      }));
    });
  }, []);

  return (
    <div>
      {Object.entries(performanceData).map(([key, value]) => (
        <Widget key={key} data={value} />
      ))}
    </div>
  );
}

export default App;
