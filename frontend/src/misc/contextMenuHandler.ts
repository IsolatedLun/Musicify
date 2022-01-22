export function moveMenu(e: React.MouseEvent, id: string) {
    const contextMenu = document.getElementById(id)! as HTMLElement;

    contextMenu.style.top = e.clientY + 'px';
    contextMenu.style.left = e.clientX + 'px';
    contextMenu.focus()
}