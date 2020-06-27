export const checkPriceInput = (rule, value, callback) => {
    if (value) {
        if (!checkMatchNumberRegex(value)) {
            callback(new Error('Please input number only!'));
            return;
        }

        let convertedValue = Number(value);

        if (convertedValue >= 0) {
            callback();
            return;
        } else {
            callback(new Error('Price Input must be numeric and can\'t Input negative'));
            return;
        }
    }

    if (rule.required) {
        if (value == null || value === '') {
            callback(new Error('Please enter price!'));
            return;
        }

        if (isNaN(value)) {
            callback(new Error('Input number!'));
            return;
        }

        let convertedValue = Number(value);

        if (convertedValue >= 0) {
            callback();
        } else {
            callback(new Error('Price must be numeric and can\'t Input negative'))
        }
    } else {
        callback();
    }
};

const checkMatchNumberRegex = (value) => {
    return value.toString().match(/^[0-9]*$/)
};