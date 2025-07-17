$(document).ready(function () {
	let currentInput = "0";
	let previousInput = null;
	let operator = null;
	let waitNewInput = false;

	function updateDisplay(displayValue) {
		$(".display-input").val(displayValue);
		console.log(waitNewInput);
	}

	// Функция полной очистки калькулятора
	function clear() {
		currentInput = "0";
		operator = null;
		previousInput = null;
		waitNewInput = false;
		updateDisplay(currentInput);
	}

	// Функция очистки текущего ввода без очистки всего калькулятора
	function clearEntry() {
		currentInput = "0";
		waitNewInput = false;
		updateDisplay(currentInput);
	}

	// Функция удаления последнего символа
	function backspace() {
		if (currentInput.length > 1) {
			currentInput = String(currentInput).slice(0, -1);
		} else {
			currentInput = "0";
		}
		updateDisplay(currentInput);
	}

	// Функция ввода чисел в калькулятор
	function inputNumber(num) {
		if (waitNewInput) {
			currentInput = String(num);
			waitNewInput = false;
		} else {
			currentInput = currentInput === "0" ? num : String(currentInput) + String(num);
		}
		updateDisplay(currentInput);
	}

	// Функция ввода оператора в калькулятор
	function inputOperator(op) {
		const inputValue = parseFloat(currentInput);

		if (previousInput === null) {
			previousInput = inputValue;
		}

		operator = op;
		waitNewInput = true;
		updateDisplay(operator);
	}

	// Функция ввода десятичной точки в калькулятор
	function inputDecimal() {
		if (waitNewInput) {
			currentInput = "0.";
			waitNewInput = false;
		} else if (currentInput.indexOf(".") === -1) {
			currentInput += ".";
		}
		updateDisplay(currentInput);
	}

	// Функция для выполнения математических операций
	function calculateNumber() {
		const prev = parseFloat(previousInput);
		const current = parseFloat(currentInput);

		if (Number.isNaN(prev) || Number.isNaN(current)) return current;

		let result;
		switch (operator) {
			case '+':
				result = prev + current;
				break;
			case '-':
				result = prev - current;
				break;
			case '*':
				result = prev * current;
				break;
			case '/':
				result = current !== 0 ? prev / current : 0;
				break;
			default:
				return current;
		}

		return result;
	}

	// Функция для выполнения окончательного вычисления
	function performCalculation() {
		const result = calculateNumber();
		currentInput = String(result);
		previousInput = null;
		operator = null;
		waitNewInput = true;
		updateDisplay(currentInput);
	}



	$('.number').click(function () {
		const value = $(this).data('value');

		if (value === '.') {
			inputDecimal();
		} else {
			inputNumber(value);
		}
	});

	$('.operator').click(function () {
		const value = $(this).data('value');
		const action = $(this).data('action');

		if (action === 'backspace') {
			backspace();
		} else {
			inputOperator(value);
		}
	});

	$('.equals').click(function () {
		performCalculation();
	});

	$('.clear').click(function () {
		const action = $(this).data('action');

		if (action === 'clear') {
			clear();
		} else if (action === 'clearEntry') {
			clearEntry();
		}
	});



	$(document).on('keydown', function (e) {

		if (e.key.startsWith('F') || e.key === 'Space') {
			return false;
		}

		switch (true) {
			case e.key === 'Enter' || e.key === '=':
				performCalculation();
				break;
			case e.key === 'Backspace':
				backspace();
				break;
			case e.key === 'Delete' || e.key === 'Escape':
				clear();
				break;
			case /[0-9]/.test(e.key):
				inputNumber(e.key);
				break;
			case /[+\-*\/]/.test(e.key):
				inputOperator(e.key);
				break;
			case e.key === '.':
				inputDecimal();
		}
	});

	updateDisplay(currentInput);
});
