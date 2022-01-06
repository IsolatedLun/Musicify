export function validateInputs(inputs: NodeListOf<HTMLInputElement>) {
    let validAmt = 0;

    for(let i = 0; i < inputs.length; i++) {
        if(!validateInput(inputs[i])) {
            highlightInput(inputs[i], 'err');
        }

        else {
            highlightInput(inputs[i], 'ok');
            validAmt++;
        }
    }

    if(validAmt === inputs.length) {
        alert('nice')
    }
}

function validateInput(input: HTMLInputElement): boolean {
    const val: string | number = input.value;
    const type: string = input.type;

    clearHelpText(input);
    if(type === 'text' && isValidText(input, val)) {
        return true;
    }

    else if(type === 'password' && isValidPassword(input, val)) {
        return true;
    }

    else if(type === 'email' && isValidText(input, val)) {
        return true
    }

    return false;
}

/* Input styling */
function highlightInput(input: HTMLInputElement, type: 'err' | 'ok' | 'warn') {
    if(type === 'ok') {
        input.style.borderColor = 'var(--clr-primary)';
    }

    else if(type === 'warn') {
        input.style.borderColor = 'var(--clr-warn)';
    }

    else if(type === 'err') {
        input.style.borderColor = 'var(--clr-err)';
    }
}

function addHelpText(input: HTMLInputElement, text: string) {
    const p = input.parentElement?.lastChild!;
    p.textContent = text;
}

function clearHelpText(input: HTMLInputElement) {
    const p = input.parentElement?.lastChild!;
    p.textContent = '';
}

/* Validators */
function isValidPassword(input: HTMLInputElement, str: string) {
    if(str.length > 7) {
        if(isNaN(Number(str))) {
            return true;
        }

        else {
            addHelpText(input, 'Must contain characters.');
        }
    }

    else {
        addHelpText(input, 'Must be atleast 7 characters long.');
    }

    return false;
}

function isValidText(input: HTMLInputElement, str: string) {
    if(str.length > 0) {
        return true;
    }

    else {
        addHelpText(input, 'Must contain atleast 1 character.');
    }

    return false;
}