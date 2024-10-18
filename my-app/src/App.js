import styles from './app.modules.css';
import data from './data.json';
import './index.css';
import React, { useState } from 'react';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps] = useState(data.steps); // Извлекаем шаги из JSON файла
    const [activeIndex, setActiveIndex] = useState(0); // Устанавливаем начальный шаг на 0

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала

	// Обработчик для клика "Назад"
	const handleBackClick = () => {
		if (activeIndex > 0) {
		  setActiveIndex(activeIndex - 1);
		}
	  };
	
	  // Обработчик для клика "Далее"
	  const handleNextClick = () => {
		if (activeIndex < steps.length - 1) {
		  setActiveIndex(activeIndex + 1);
		}
	  };
	
	  // Обработчик для "Начать сначала"
	  const handleRestartClick = () => {
		setActiveIndex(0);
	  };

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем

	const isFirstStep = activeIndex === 0;
    const isLastStep = activeIndex === steps.length - 1;

	return (
		<div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles['steps-content']}>
            {/* Выводим контент текущего шага */}
            {steps[activeIndex].content}
          </div>
          <ul className={styles['steps-list']}>
            {steps.map((step, index) => {
              // Определяем классы для каждого элемента
              const itemClasses = [
                styles['steps-item'],
                (index < activeIndex) ? styles.done : '',
                (index === activeIndex) ? styles.active : ''
              ].join(' ');

              return (
                <li key={index} className={itemClasses}>
                  <button
                    className={styles['steps-item-button']}
                    onClick={() => setActiveIndex(index)} // Устанавливаем активный шаг при клике
                  >
                    {index + 1}
                  </button>
                  Шаг {index + 1}
                </li>
              );
            })}
          </ul>
          <div className={styles['buttons-container']}>
            <button
              className={styles.button}
              onClick={handleBackClick}
              disabled={isFirstStep} // Дизактивируем кнопку, если находимся на первом шаге
            >
              Назад
            </button>
            <button
              className={styles.button}
              onClick={isLastStep ? handleRestartClick : handleNextClick}
            >
              {isLastStep ? 'Начать сначала' : 'Далее'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;