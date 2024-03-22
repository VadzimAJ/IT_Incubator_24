import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeWork_w1_1 from './stage_1/week_1/homework/homework-front-main/src/App'; // Путь к компоненту вашего другого проекта

const App = () => {
  return (
    <Router>
      <div>
        {/* Создаем ссылку */}
        <Link to="/home-work-w1-1">Home work_1</Link>
        
        <Routes>
          {/* Маршрут к другому проекту */}
          <Route path="/home-work-w1-1" element={<HomeWork_w1_1 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;