import { previewImage } from "../misc/utils";

export interface AutoStateOptions {
    fileTargetId: string;
}

/**
 * @param event -> Input event
 * @param setter -> State updater
 * @param data -> The state itself
 * @param type -> Input type
*/
export function useAutoState(e: React.FormEvent<any>, 
    setter: Function, data: Object, type: string | 'text' | 'singleStr' | 'file', 
    options: AutoStateOptions | null=null) {

    const target = e.target as HTMLInputElement;
    if(type === 'text') {
        setter({ ...data, [target.name]: target.value });
    }

    else if(type === 'singleStr') {
        setter(target.value);
    }

    else if(type === 'file' && target.files) {
        setter({ ...data, [target.name]: target.files[0] });

        if(options) {
            if(target.getAttribute('data-file-type') === 'img') {
                previewImage(options.fileTargetId, target.files[0], null);
            }
    
            else if(target.name === 'audio') {
                const label = document.getElementById(options.fileTargetId) as HTMLLabelElement;
                label?.setAttribute('data-fname', target.files[0].name)
            }
        }
    }
}