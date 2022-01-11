import { isImage } from "./utils";

export function validateInputs(inputs: NodeListOf<HTMLInputElement>): boolean {
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
        return true;
    }

    return false;
}

function validateInput(input: HTMLInputElement): boolean {
    const val: string | number = input.value;
    const type: string = input.type;
    const realType: string | null = input.getAttribute('data-realtype') ?? null;
    const fileType: string | null = input.getAttribute('data-file-type') ?? null;
    const canBeNull: boolean = input.getAttribute('data-null') === 'true' ? true : false;

    clearHelpText(input);
    if(realType === 'ignore') {
        return true;
    }

    else if(realType === 'text' && isValidText(input, val)) {
        return true;
    }

    else if(realType === 'password' && isValidPassword(input, val)) {
        return true;
    }

    else if(realType === 'email' && isValidText(input, val)) {
        return true
    }

    else if(realType === 'file' && input.files && (canBeNull || isValidFile(input, input.files[0], fileType))) {
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

function isValidFile(input: HTMLInputElement, val: File, fType: string | null) {
    if(val) {
        if(fType === 'img' && isImage(val)) {
            return true;
         }
     
         else {
             addHelpText(input, 'An image is required.');
         }
     
         return false;
    }
}

/* Misc */
export const togglePasswordVisibility = (e: React.MouseEvent, inputId: string) => {
    e.preventDefault();
    
    const input = document.getElementById(inputId)! as HTMLInputElement;
    const target = e.target as HTMLButtonElement;

    if(input.type === 'password') {
        target.style.color = 'var(--txt)';
        input.type = 'text';
    }

    else {
        target.style.color = 'var(--txt-muted)';
        input.type = 'password';
    }
}