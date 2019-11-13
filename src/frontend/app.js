import * as calc from './calc';
import { numbers, operation, equals, deletes, all_clear, prevElement, currElement } from './env';

calc.set(calc.object, currElement, prevElement);

//12334545
numbers.forEach(button => {
    button.addEventListener('click', () => {
        calc.append(calc.object, button.innerText);
        calc.update(calc.object);
    })
});

// +++***----////
operation.forEach(button => {
    button.addEventListener('click', () => {
        calc.choose_operation(calc.object, button.innerText);
        calc.update(calc.object);
    });
});

// ========
equals.addEventListener('click', button => {
    calc.compute(calc.object);
    calc.update(calc.object);
})

//DELETE
all_clear.addEventListener('click', () => {
    calc.clear(calc.object); 
    calc.update(calc.object);
});

deletes.addEventListener('click', () => {
    calc.remove(calc.object); 
    calc.update(calc.object);
});
