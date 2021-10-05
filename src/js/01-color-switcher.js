function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  const bodyColor = getRandomHexColor();
  let timeId = null;
  
  const btnStartNode = document.querySelector('button[data-start]');
  const btnStopNode = document.querySelector('button[data-stop]');
  
  const stopClick = () => {
      clearInterval(timeId);
      document.body.style.backgroundColor = bodyColor;
      btnStartNode.addEventListener('click', startClick);
  };
  
  const startClick = () => {
      btnStartNode.removeEventListener('click', startClick);
      btnStopNode.addEventListener('click', stopClick);
      timeId = setInterval(() => {
          const bodyColor = getRandomHexColor();
          document.body.style.backgroundColor = bodyColor;
      }, 1000);
  }
  
  btnStartNode.addEventListener('click', startClick);