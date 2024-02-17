const form = document.querySelector('form');

const display = (bmi) => {
  const result = document.querySelector('.result');
  let group;

  if (bmi >= 30.0) {
    group = 'Obesity';
  } else if (bmi >= 25.0) {
    group = 'Overweight';
  } else if (bmi >= 18.5) {
    group = 'Normal';
  } else {
    group = 'Underweight';
  }

  result.innerText = `${bmi} → ${group}`;
};

const bmiCalculator = (height, weight) => {
  return weight / (height * height).toFixed(1);
};

const formHandler = (event) => {
  event.preventDefault();

  const heightInput = document.querySelector('#height');
  const weightInput = document.querySelector('#weight');

  if (heightInput.value && weightInput.value) {
    const height = heightInput.value / 100;
    const weight = weightInput.value;
    const bmi = bmiCalculator(height, weight);

    display(bmi);
    heightInput.value = '';
    weightInput.value = '';
  }
};
form.addEventListener('submit', formHandler);
