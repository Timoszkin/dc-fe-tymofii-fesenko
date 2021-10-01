
function convertToBase() {
  function isNumber(n) {
    return typeof n == 'number' && !isNaN(n) && isFinite(n);
  }

  const num = Number(prompt('Введите число'));
  const baseNum = Number(prompt('Введите систему счисления'));
  
  if (!num || !baseNum) {
    console.log("Некорректный ввод! Введите все значения");

    return
  }

  if (!isNumber(num) || !isNumber(baseNum)) {
    console.log("Некорректный ввод! Введите числа")

    return;
  }

  if (baseNum < 2 || baseNum > 32) {
    console.log("Некорректная система счисления!")

    return;
  }

  console.log(baseNum === 10 ? num : num.toString(baseNum))
}

function SumAndDevideNumbers() {
  function isNumber(n) {
    return typeof n == 'number' && !isNaN(n) && isFinite(n);
  }

  const num1 = Number(prompt('Введите первое число')) 
  const num2 = Number(prompt('Введите второе число'))
  

  if (!isNumber(num1)) {
    console.log("Некорректный ввод! Первое число неверно")

    return;
  } else if (!isNumber(num2)) {
    console.log("Некорректный ввод! Второе число неверно")

    return;
  } 
  
  console.log(`Ответ: ${num1 + num2}, ${num1 / num2}`)
  
  return
}
