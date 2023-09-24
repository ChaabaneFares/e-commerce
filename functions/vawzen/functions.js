
export const scrollTrigger = (_ref, f, values, customStart, customEnd, log) => {


    const ref = _ref.current || _ref.target
    if (!ref) return
    const start = top(ref, customStart)
    const end = bottom(ref, customEnd)
    const percentages = []
    const scroll = window.scrollY
    if (log) {
        ref.style.background = "brown"

        console.log(scroll, start, end);
    }

    if (start > scroll && !ref.vawzen) {
        for (let i = 0; values.length > i; i++) {
            percentages.push(values[i][0])
        }
        f(percentages, ref)
        ref.vawzen = true
    } else if (scroll > end && !ref.vawzen) {
        for (let i = 0; values.length > i; i++) {
            percentages.push(values[i][1])
        }
        f(percentages, ref);
        ref.vawzen = true
    }

    if (scroll <= end && start <= scroll) {
        for (let i = 0; values.length > i; i++) {
            percentages.push((((scroll - start) / (end - start)) * ((values[i][1]) - (values[i][0]))) + (values[i][0]))
        }
        f(percentages, ref)
        if (ref.vawzen) {
            ref.vawzen = false
        }
    }
};

// export const scrollEvent = (f) => {

//     return () => {
//         window.addEventListener('scroll', () => {
//             if (Array.isArray(f)) {
//                 for (let i = 0; f.length > i; i++) {
//                     if (f[i]) {
//                         f[i]()
//                     }
//                 }
//             } else {
//                 f()
//             }
//         });
//     }
// }

export const scrollEvent = (setScrollY) => {
    const handleScroll = () => {
        setScrollY(window.scrollY);
    };
    return () => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }
}

export const updateTransform = (setWS, wrapper) => {
    if (!wrapper || !wrapper.length) return
    const factor = 1 // for future adjustments of scroll speed
    const translateY = -window.scrollY * factor;

    if (wrapper[0].current) {
        const contentHeight = wrapper[1].current.clientHeight;
        if ((-(contentHeight - window.innerHeight) - translateY) <= -window.scrollY) {
            wrapper[1].current.style.transform = `translateY(${translateY}px)`;
            wrapper[0].current.style.height = (contentHeight + translateY) + 'px';
        }
    }

    setWS(innerWidth)

};

export const resizeEvent = (setWS, wrapper) => {
    return () => {

        updateTransform(setWS, wrapper);
        window.addEventListener('resize', updateTransform);

        return () => {
            window.removeEventListener('resize', updateTransform);
        };
    }
}

function top(ref, customStart) {

    let dist = distance(ref);
    const height = window.innerHeight / 2
    const clientHeight = ref.clientHeight / 2
    if (customStart) {
        if (Array.isArray(customStart) && customStart.length) {
            if (customStart.length === 1) {
                return dist - (height * (1 - customStart[0]))
            } else if (customStart.length === 2) {
                return dist - (height * (1 - customStart[0])) + (clientHeight * customStart[1])

            } else if (customStart.length === 3) {
                return dist - (height * (1 - customStart[0])) + (clientHeight * customStart[1]) - (customStart[2] / 2)

            }
        } else {
            return dist - (height * (customStart ? (1 - customStart) : 1))
        }
    }

    else return dist - height
}

function bottom(ref, customEnd) {
    let dist = distance(ref)
    const height = window.innerHeight / 2
    const clientHeight = ref.clientHeight / 2

    dist += clientHeight
    if (customEnd) {
        if (Array.isArray(customEnd) && customEnd.length) {
            if (customEnd.length === 1) {
                return dist - (height * customEnd[0])
            } else if (customEnd.length === 2) {
                return dist - (height * customEnd[0]) - (clientHeight * customEnd[1])
            } else if (customEnd.length === 3) {
                return dist - (height * customEnd[0]) - (clientHeight * customEnd[1]) + (customEnd[2] / 2)
            }
        } else {
            return dist - (height * (customEnd ? customEnd : 1))
        }
    }
    else return dist
}

function distance(ref) {
    let distance = 0;
    let currentElement = ref;

    while (currentElement.offsetParent) {
        distance += currentElement.offsetTop;
        currentElement = currentElement.offsetParent;
    }
    return (distance / 2);
}