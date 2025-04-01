import React, { useEffect } from "react";
import "./App.css";
const tg = window.Telegram.WebApp;
console.log(tg);
console.log(window);

function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  return (
    <div className="App">
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default App;
