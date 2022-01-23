/**
 * @param inputs -> A node list of HTMLInputElements[]
 * @returns If the inputs are valid return true else false
 */
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

/**
 * @param input -> An HTMLInputElement
 * @summary Looks at **data-realtype** of the input and validates the value accordingly.
 * - Use **data-file-type** for files.
 * - Use **data-null=true** if the input can be empty.
*/
function validateInput(input: HTMLInputElement): boolean {
    const val: string | number = input.value;
    const realType: string | null = input.getAttribute('data-realtype') ?? null;
    const fileType: string | null = input.getAttribute('data-file-type') ?? null;
    const canBeNull: boolean = input.getAttribute('data-null') === 'true' ? true : false;
    let isNested: boolean = false;

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

/**
 * @param input -> An HTMLInputElement
 * @param type -> What color to highlight: [err, ok, warn]
 * @summary Highlights the input depending on the type.
*/
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

/**
 * @param input -> An HTMLInputElement
 * @param text -> What to display for the user
 * @todo Needs to be the last child of **form__part**
*/
function addHelpText(input: HTMLInputElement, text: string) {
    if(input.parentElement!.classList.contains('form__part')) {
        const p = input.parentElement?.lastChild!;
        p.textContent = text;
    }
}

/**
 * @param input -> An HTMLInputElement
 * @summary Clears the helptext
*/
function clearHelpText(input: HTMLInputElement) {
    let p: ChildNode | null = null;

    if(input.parentElement?.classList.contains('form__part')) {
        p = input.parentElement?.lastChild!;
    }

    if(p) {
        p.textContent = '';
    }
}

/* Validators */

/**
 * @param input -> An HTMLInputElement
 * @param str -> Value of the input
 * @summary Validates the password
*/
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

/**
 * @param input -> An HTMLInputElement
 * @param str -> Value of the input
 * @summary Validates the text
*/
function isValidText(input: HTMLInputElement, str: string) {
    if(str.length > 0) {
        return true;
    }

    else {
        addHelpText(input, 'Must contain atleast 1 character.');
    }

    return false;
}

/**
 * @param input -> An HTMLInputElement
 * @param str -> Value of the input
 * @summary Validates the file
*/
function isValidFile(input: HTMLInputElement, val: File, fType: string | null) {
    if(val) {
        if(fType === 'img') {
            if(isImage(val))
                return true;

            addHelpText(input, 'An image is required.');
         }
     
        else if(fType === 'audio') {
            if(isAudio(val))
                return true
            
            addHelpText(input, 'An auido file is required.')
        }
     
         return false;
    }
}

/* Regex */
export function isImage(file: File): boolean {
    const pattern = /image-*/;

    if(file.type.match(pattern))
        return true;
    return false;
}

export function isAudio(file: File): boolean {
    const pattern = /audio-*/;

    if(file.type.match(pattern))
        return true;
    return false;
}

/* Misc */

/**
 * @param MouseEvent
 * @param inputId -> An HTMLInputElement
 * @summary Toggles the input's type [text/password]
*/
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