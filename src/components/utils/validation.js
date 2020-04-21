//  since multiple forms require validation of inputs, i thought i'd make a module
const validation = {
    // goes through a list of variables and returns whether or not any of the variables passed are empty
    isEmpty: (param) => {
        let isEmpty = false;
        // iterating through list and checking none are empty
        param.map((item) => {
            if (item === '') isEmpty = true;
        });
        return isEmpty;
    },
    // checking that there are no duplicates within the list
    isUnique: (arr, param) => {
        arr.map((name) => {
            if (name === param) return false;
        });
        return true;
    },
    withinRange: (lowerRng, upperRng, param) => {
        // checking that the input is within the input
        return param >= lowerRng && param <= upperRng;
    }
};

export default validation;
