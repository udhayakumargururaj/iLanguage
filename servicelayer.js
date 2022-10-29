const { addThirdPartySingular } = require('./mysqlconnector');

const addThirdPartySingularForm = (v) => {

    const verb = v.toLowerCase();

    const verbToInsert = getProcessedVerb(verb);

    addThirdPartySingular({thridpersonpresent: verbToInsert});

    return false;
}

const getProcessedVerb = (verb) => {
    const esForm = ['ch', 'o', 's', 'sh', 'x', 'z'];
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n',
                        'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    const vowels = ['a', 'e', 'i', 'o', 'u']; 

    if (esForm?.some(v => verb.endsWith(v))) {
        return `${verb}es`;
    }

    if(verb.endsWith('y')) {
        if(consonants.includes(verb[verb.length - 2])) {
            return `${verb.substr(0, verb.length - 1)}ies`;
        }

        if(vowels.includes(verb[verb.length - 2])) {
            return `${verb}s`;
        }

    }
    return `${verb}s`;
}

module.exports = { addThirdPartySingularForm }