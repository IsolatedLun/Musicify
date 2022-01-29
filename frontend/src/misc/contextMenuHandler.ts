import { focusElement } from "./utils";

/**
 * @param MouseEvent -> Used to place the menu
 * @param id -> The id of the menu
 * @summary Moves the menu depending on the cursor location
 */
function moveMenu(e: React.MouseEvent, id: string) {
    const contextMenu = document.getElementById(id)! as HTMLElement;

    contextMenu.style.top = e.clientY + 'px';
    contextMenu.style.left = e.clientX + 'px';
    focusElement(id);
}

/**
 * @param MouseEvent -> Used to place the menu
 * @param id -> The id of the menu
 * @summary If the right-clicked el is edtable then the menu is focused
 */
 export const showContextMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    
    const target = e.target as HTMLDivElement;
    if(target.getAttribute('data-editable') === 'true') {
        focusElement(id);
        moveMenu(e, id);
    }
}