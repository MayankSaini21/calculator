document.addEventListener('DOMContentLoaded', function() {
    const expression = document.getElementById('expression');
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.dataset.value;

            if (value === '=') {
                try {
                    result.value = evaluateExpression(expression.value);
                } catch (error) {
                    result.value = 'Error';
                }
            } else if (value === 'C') {
                expression.value = '';
                result.value = '';
            } else {
                expression.value += value;
            }
        });
    });

    function evaluateExpression(expr) {
        // Replace constants
        expr = expr.replace(/pi/g, 'Math.PI')
                   .replace(/e/g, 'Math.E');

        // Replace functions
        expr = expr.replace(/sin/g, 'Math.sin')
                   .replace(/cos/g, 'Math.cos')
                   .replace(/tan/g, 'Math.tan')
                   .replace(/asin/g, 'Math.asin')
                   .replace(/acos/g, 'Math.acos')
                   .replace(/atan/g, 'Math.atan')
                   .replace(/log/g, 'Math.log10')
                   .replace(/ln/g, 'Math.log')
                   .replace(/sqrt/g, 'Math.sqrt')
                   .replace(/exp/g, 'Math.exp');

        // Handle power operation
        expr = expr.replace(/\^/g, '**');

        // Evaluate the expression
        return Function('"use strict";return (' + expr + ')')();
    }

    // Keyboard support
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        const validKeys = '0123456789+-*/().^';
        const functionKeys = {
            'Enter': '=',
            'Escape': 'C',
            's': 'sin(',
            'c': 'cos(',
            't': 'tan(',
            'l': 'log(',
            'q': 'sqrt('
        };

        if (validKeys.includes(key)) {
            expression.value += key;
        } else if (key in functionKeys) {
            if (functionKeys[key] === '=') {
                buttons.forEach(button => {
                    if (button.dataset.value === '=') {
                        button.click();
                    }
                });
            } else if (functionKeys[key] === 'C') {
                buttons.forEach(button => {
                    if (button.dataset.value === 'C') {
                        button.click();
                    }
                });
            } else {
                expression.value += functionKeys[key];
            }
        }
    });
});

