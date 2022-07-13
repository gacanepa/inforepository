const areInputsEmpty = inputs => Array.isArray(inputs) && inputs.some(input => input.length === 0);

export default areInputsEmpty;
