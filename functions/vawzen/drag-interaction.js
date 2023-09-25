
let initialDrag = 0
let prevTranslate = 0
let nextTranslate = 'translateX(0px)';
let position = ''
let prevPosition = ''



function width_counter(element) {
    let acc = 0

    for (let i = 0; element.children.length > i; i++) {
        const clientWidth = element.children[i].clientWidth
        const marginLeft = parseInt(window.getComputedStyle(element.children[i]).marginLeft)
        acc += (clientWidth + (marginLeft))
    }
    return acc
}
const move = (event, currentX) => {
    const nextNumber = extract_num(nextTranslate)
    const element = event.currentTarget;
    let width = width_counter(element);



    if (nextNumber <= 0 && nextNumber >= -width + innerWidth) {

        const multiplier = innerWidth < 680 ? 0.5 : 1
        const deltaX = ((currentX - initialDrag) * multiplier) + prevTranslate
        element.style.transform = nextTranslate

        nextTranslate = `translateX(${deltaX}px)`;
        position = prevPosition
        prevPosition = currentX > initialDrag ? 'left' : 'right'

    }
}

export const handleDrag = (event) => {
    move(event, event.clientX)
};

export const handleTouchMove = (event) => {
    move(event, event.touches[0].clientX)
};

const start = (event, clientX) => {
    event.currentTarget.style.transition = 'none'
    initialDrag = clientX;

    const transform_to_num = extract_num(event.currentTarget.style.transform)
    if (nextTranslate === 'translateX(0px)' && prevTranslate === 0) {
        prevTranslate = transform_to_num
        nextTranslate = `translateX(${transform_to_num}px)`

    } else {
        prevTranslate = transform_to_num
    }
}




export const handleDragStart = (event) => {


    const dragImage = new Image();
    dragImage.src = "/landing/blank.png";

    event.dataTransfer.setDragImage(dragImage, 0, 0);
        start(event, event.clientX)

};
export const handleTouchStart = (event) => {
    start(event, event.touches[0].clientX)
};

const end = (event, clientX) => {
    const container = event.currentTarget
    initialDrag = clientX;
    nextTranslate = container.style.transform
    // const child = container.children[0]
    // const marginLeft = window.getComputedStyle(child).marginLeft;


    const transform_to_num = extract_num(container.style.transform)
    const container_width = width_counter(container)

    const left_transition = transform_to_num > -(innerWidth / 2)
    const right_transition = transform_to_num < -(container_width - (innerWidth * 1.5))
    if (left_transition) {
        container.style.transition = 'none'
        container.style.transform = `translateX(${transform_to_num - (container_width / 3)}px)`
    } else if (right_transition) {
        container.style.transition = 'none'
        container.style.transform = `translateX(${transform_to_num + (container_width / 3)}px)`
    }

    setTimeout(() => {
        const transform = left_transition ? transform_to_num - (container_width / 3) : right_transition ? transform_to_num + (container_width / 3) : transform_to_num
        const childrens = container.children.length
        const margin = extract_num(window.getComputedStyle(container.children[0]).marginLeft)
        const child_without_margin = (container_width / childrens) + (margin * 0.05)
        const child_width_margin = child_without_margin + (margin * 1.1 )
        let tracer = -Math.floor((transform - (position === 'right' ? innerWidth : 0)) / child_without_margin) - 1

        container.style.transition = '0.3s ease-out'
        container.style.transform = `translateX(-${((tracer) * child_without_margin) - (position === 'right' ? innerWidth - child_width_margin : 0)}px)`
    }, 0);


}
export const handleDragEnd = (event) => {
    end(event, event.clientX)
};
export const handleTouchEnd = (event) => {
    end(event, event.changedTouches[0].clientX)
};

export const disableDragShadow = (event) => {
    const img = new Image();
    event.dataTransfer.setDragImage(img, 0, 0);

}







function extract_num(str) {
    const match = str.match(/-?\d+(\.\d+)?(px|vw)/);
    if (match[2] === 'vw') {
        return match ? innerWidth * parseFloat(match[0]) / 100 : 0
    } else {
        return match ? parseFloat(match[0]) : 0
    }
}