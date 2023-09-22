
export const scrollTrigger = (ref, f, values, customStart, customEnd, log) => {
    return () => {
        const start = top(ref, customStart)
        const end = bottom(ref, customEnd)
        const percentages = []
        if (log) {
            ref.current.style.background = "red"
            console.log(window.scrollY, start, end);
        }

        if (start > window.scrollY && !ref.current.store) {
            for (let i = 0; values.length > i; i++) {
                percentages.push(values[i][0])
            }
            f(percentages, ref.current)
            ref.current.store = true
        } else if (window.scrollY > end && !ref.current.store) {

            for (let i = 0; values.length > i; i++) {
                percentages.push(values[i][1])
            }
            f(percentages, ref.current);
            ref.current.store = true
        }

        if (window.scrollY <= end && start <= window.scrollY) {
            for (let i = 0; values.length > i; i++) {
                percentages.push((((window.scrollY - start) / (end - start)) * ((values[i][1]) - (values[i][0]))) + (values[i][0]))
            }
            f(percentages, ref.current)
            if (!ref.current.store) {
                ref.current.store = false
            }
        }
    }
};

export const scrollEvent = (f) => {

    return () => {
        window.addEventListener('scroll', () => {
            if (Array.isArray(f)) {
                for (let i = 0; f.length > i; i++) {
                    if (f[i]) {
                        f[i]()
                    }
                }
            } else {
                f()
            }
        });
    }
}

function top(ref, customStart) {

    let dist = distance(ref);

    if (customStart) {
        if (Array.isArray(customStart) && customStart.length) {
            if (customStart.length === 1) {
                return dist - (innerHeight * (1 - customStart[0]))
            } else if (customStart.length === 2) {
                return dist - (innerHeight * (1 - customStart[0])) - customStart[1]
            } else if (customStart.length === 3) {
                return dist - (innerHeight * (1 - customStart[0])) - customStart[1] + (ref.current.clientHeight * customStart[2])
            }
        } else {
            return dist - (innerHeight * (customStart ? (1 - customStart) : 1))
        }
    }

    else return dist - innerHeight
}

function bottom(ref, customEnd) {
    let dist = distance(ref)
    dist += ref.current.clientHeight
    if (customEnd) {
        if (Array.isArray(customEnd) && customEnd.length) {
            if (customEnd.length === 1) {
                return dist - (innerHeight * customEnd[0])
            } else if (customEnd.length === 2) {
                return dist - (innerHeight * customEnd[0]) + customEnd[1]
            } else if (customEnd.length === 3) {
                return dist - (innerHeight * customEnd[0]) + customEnd[1] - (ref.current.clientHeight * customEnd[2])
            }
        } else {
            return dist - (innerHeight * (customEnd ? customEnd : 1))
        }
    }
    else return dist
}

function distance(ref) {
    let distance = 0;
    let currentElement = ref.current;

    while (currentElement.offsetParent) {
        distance += currentElement.offsetTop;
        currentElement = currentElement.offsetParent;
    }
    return distance
}