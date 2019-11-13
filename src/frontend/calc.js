import { numbers, operation, equals, deletes, all_clear, prevElement, currElement } from './env';

export let object = {
    currOperand: '',
    prevOperand: '',
    currElement: '',
    prevElement: '',
    operation: undefined,
}

export function set(calc, currElement, prevElement){
    calc.currElement = currElement;
    calc.prevElement = prevElement;
    clear(calc);
}

export function clear(calc){
    calc.currOperand = '';
    calc.prevOperand = '';
    calc.operation = undefined;
}

export function remove(calc){
    calc.currOperand = calc.currOperand.toString().slice(0, -1);
}

export function append(calc, number){
    if(number === '.' && calc.currOperand.includes('.')) return
    calc.currOperand = calc.currOperand.toString() + number.toString();
}

export function choose_operation(calc, operation){
    if(calc.currOperand === '') return;
    if(calc.prevOperand !== '') {
        compute(calc);
    }
    calc.operation = operation;
    calc.prevOperand = calc.currOperand;
    calc.currOperand = '';
}

export function compute(calc){
    let compute = 0;
    const curr = parseFloat(calc.currOperand);
    const prev = parseFloat(calc.prevOperand);
    // Check if user doesnt enter anything and click equals
    if(isNaN(prev) || isNaN(curr)) return;
    switch (calc.operation){
        case '+':
            compute = prev + curr;
            break;
        case '-':
            compute = prev - curr;
            break;
        case '*':
            compute = prev * curr;
            break;
        case '/':
            compute = prev / curr;
            break;
        default:
            return;
    }

    calc.currOperand = compute;
    calc.operation = undefined;
    calc.prevOperand = '';
}

export function get_display_number(number) {
    const string_number = number.toString();
    const integer_digits = parseFloat(string_number.split('.')[0])
    const decimal_digits = string_number.split('.')[1];

    let integer_display = 0;
    if (isNaN(integer_digits)) {
        integer_display = '';
    } else {
        integer_display = integer_digits.toLocaleString('en', {
        maximumFractionDigits: 0});
    }

    if (decimal_digits != null) {
        return `${integer_display}.${decimal_digits}`
    } else {
        return integer_display;
    }
}

export function update(calc){
    calc.currElement.innerText = get_display_number(calc.currOperand);
    if (calc.operation !== null && calc.operation !== undefined) {
        calc.prevElement.innerText = `${calc.prevOperand} ${calc.operation}`
    } else {
        calc.prevElement.innerText = '';
    }
}
