const formEl = document.getElementById('form');
const smallEl = document.getElementById('error');
const inputEl = document.getElementById('pangram');
const testListEl = document.getElementById('testList');

generateTestList();
formEl.addEventListener('submit', onSubmit);

testListEl.addEventListener('click', onTestClick);

function generateTestList() {
    const tests = [
        'A quick brown fox jumps over the lazy dog',
        'abcedefghijklmnopqrstuvwxyz',
        'abcedefghijklmnopqrstuvwxy',
        '!@#$%^&*()_+'
    ];

    const fragment = document.createDocumentFragment();
    tests.forEach(test => {
        const listItemEl = document.createElement('li');
        const buttonEl = document.createElement('button');
        listItemEl.appendChild(buttonEl);
        buttonEl.innerText = test;
        fragment.append(listItemEl);
    });
    testListEl.appendChild(fragment);
}

function onTestClick(event) {
    if (event.target.nodeName.toLowerCase() !== 'button') {
        return;
    }
    inputEl.value = event.target.innerText;
}

function onSubmit(event) {
    event.preventDefault();

    const pangramEl = event.target.pangram;

    const missingLetters = getMissingLetters(pangramEl.value);

    if (pangramEl.value === '') {
        showError('Well that certainly isn\'t a pangram...');
    } else if (missingLetters.length) {
        showError(`Missing ${missingLetters.length} letters to be a pangram.\n${missingLetters.join(', ')}`);
    } else {
        showSuccess('PANGRAM');
        alert('form submitted');
    }
}

function showError(message) {
    const formControl = inputEl.parentElement;
    formControl.classList.remove('success');
    formControl.classList.add('error');
    smallEl.innerText = message;
}

function showSuccess(message) {
    const formControl = inputEl.parentElement;
    formControl.classList.add('success');
    formControl.classList.remove('error');
    smallEl.innerText = message;
}

/**
 * Checks if the given string is a 'pangram'.  A valid pangram will return a string of no length.
 * @param string - String to evaluate.
 * @return string[] - An object containing an array of missing letters from the given string
 */
export function getMissingLetters(string) {
    const lettersHash = alphabetHashMap();
    for (const letter of string) {
        delete lettersHash[letter.toLowerCase()];
    }
    return Object.keys(lettersHash);
}

/**
 * @return - A hash map of the alphabet. ex: {a: null, b: null, ...}
 */
export function alphabetHashMap() {
    // The ascii codes for letters a - z are numbers 97 - 122
    const hashMap = {};
    for (let i = 97; i <= 122; i++) {
        hashMap[String.fromCharCode(i)] = null;
    }
    return hashMap;
}

