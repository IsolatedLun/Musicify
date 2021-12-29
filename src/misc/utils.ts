export function animateMixerBars(id: string) {
    const mixers = (document.getElementById(id) as HTMLDivElement).children!

    for(let i = 0; i < mixers.length; i++) {
        setTimeout(() => {
            const mixer = mixers[i] as HTMLDivElement;
            const y: number = Math.random();

            if(y > 0.8) {
                mixer.style.backgroundColor = 'red';
                
            }

            else if(y > 0.55) {
                mixer.style.backgroundColor = 'yellow';
            }

            else {
                mixer.style.backgroundColor = 'green';
            }

            mixer.style.transform = `scaleY(${y})`;
        }, genNum(400))
    }
}

export function genNum(max: number) {
    return Math.floor(Math.random() * max);
}