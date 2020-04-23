//  since multiple forms require validation of inputs, i thought i'd make a module
const validation = {
    // goes through a list of variables and returns whether or not any of the variables passed are empty
    isEmpty: (param) => {
        let isEmpty = false;
        // iterating through list and checking none are empty
        // eslint-disable-next-line
        param.map((item) => {
            if (item === '') isEmpty = true;
        });
        return isEmpty;
    },
    // checking that there are no duplicates within the list
    isUnique: (obj, param) => {
        const names = [];
        let isUnique = true;
        // eslint-disable-next-line
        Object.values(obj).map((id) => names.push(id.name));
        // eslint-disable-next-line
        names.map((name) => {
            console.log(name);
            if (name === param) isUnique = false;
        });
        return isUnique;
    },
    withinRange: (lowerRng, upperRng, param) => {
        // checking that the input is within the input
        return param >= lowerRng && param <= upperRng;
    }
};

export default validation;
