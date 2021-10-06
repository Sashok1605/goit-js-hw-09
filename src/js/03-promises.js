import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise ((res, rej) => {
    setTimeout (() => {
  
  if (shouldResolve) 
    // Fulfill
    res ({position,delay})
     else 
    // Reject
    rej({position,delay})
  
  },delay);
  });
};

const form = document.querySelector('.form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const {delay, step, amount} = form.elements;
  console.log(form.elements);
  const inputDelay = Number(delay.value);
  console.log(inputDelay);
  
  const inputStep = Number(step.value);
  const indutAmount = Number(amount.value);
  for (let position = 0; position < indutAmount; position++){
    createPromise(position +1, inputDelay + (inputStep * position)) 
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  };
})


