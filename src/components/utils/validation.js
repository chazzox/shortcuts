//  since multiple forms require validation of inputs, i thought i'd make a module

const urlRegex = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;

const validation = {
    // goes through a list of variables and returns whether or not any of the variables passed are empty
    isEmpty: (param) => {
        let isEmpty = false;
        // iterating through list and checking none are empty
        param.map((item) => {
            if (item === '' || item === undefined) {
                isEmpty = true;
                return null;
            }
            return null;
        });
        return isEmpty;
    },
    // checking that there are no duplicates within the list
    isUnique: (obj, param) => {
        const names = [];
        let isUnique = true;
        // eslint-disable-next-line
        Object.values(obj).map((id) => names.push(id.name));
        names.map((name) => {
            console.log(name);
            if (name === param) {
                isUnique = false;
                return null;
            }
            return null;
        });
        return isUnique;
    },
    withinRange: (lowerRng, upperRng, param) => {
        // checking that the input is within the input
        return param >= lowerRng && param <= upperRng;
    },
    isURL: (params) => {
        let isValid = true;
        params.map((url) => {
            if (!urlRegex.test(url)) {
                isValid = false;
                return null;
            }
            return null;
        });
        return isValid;
    }
};

export default validation;
