import { previewImage } from "../misc/utils";

interface AutoStateOptions {
    fileTargetId: string
}

export function useAutoState(e: React.FormEvent<any>, 
    setter: Function, data: Object, type: 'text' | 'string' | 'file', 
    options: AutoStateOptions | null=null) {
    
    const target = e.target as HTMLInputElement;
    if(type === 'text') {
        setter({ ...data, [target.name]: target.value });
    }

    else if(type === 'string') {
        setter(target.value);
    }

    else if(type === 'file' && target.files) {
        setter({ ...data, [target.name]: target.files[0] });

        if(options) {
            if(target.name === 'profile') {
                previewImage(options.fileTargetId, target.files[0], null);
            }
    
            else if(target.name === 'audio') {
                const label = document.getElementById(options.fileTargetId) as HTMLLabelElement;
                label?.setAttribute('data-fname', target.files[0].name)
            }
        }
    }
}