const messages = ['AS I SEE IT, YES', 'ASK AGAIN LATER', 
                  'BETTER NOT TELL YOU NOW',
                  'CANNOT PREDICT NOW',
                  'CONCENTRATE AND ASK AGAIN',
                  'DON\'T COUNT ON IT',
                  'IT IS CERTAIN', 'IT IS DEFINITELY SO',
                  'MOST LIKELY', 'MY REPLY IS NO',
                  'MY SOURCES SAY NO', 'OUTLOOK NOT SO GOOD',
                  'REPLY HAZY, TRY AGAIN',
                  'SIGNS POINT TO YES', 'VERY DOUBTFUL',
                  'WITHOUT A DOUBT', 'YES', 'NO',
                  'YES - DEFINITELY', 'YOU MAY RELY ON IT'];

const distributeMessageInTriangle = () => {
    // Max base length letter count
    const maxBaseLength = 13;

    // Flag to determine if triangle image is inverted
    let inverted = false;

    // Get random message
    const message = messages[Math.floor(Math.random() * messages.length)];

    // Get separated words
    const words = message.split(" ");

    // Calculate number of letters in each of the three rows of the triangle
    let baseLettersMax = Math.floor(message.length * (2 / 3));

    if (baseLettersMax > maxBaseLength) {
        // Limit base length
        baseLettersMax = maxBaseLength;
    }

    const midLettersMax = Math.floor(((message.length - baseLettersMax) * 2) / 3);

    let baseText = '';
    let midText = '';
    let topText = '';

    if (words.length == 1) {
        // Only one word, set in middle
        baseText = ' ';
        midText = words[0];
        topText = ' ';
    } else if (words.length == 2) {
        // Two words
        topText = ' ';

        if (words[0].length > words[1].length) {
            // Invert triangle
            inverted = true;

            // Triangle upside down, so base listed above mid
            baseText = words[0];
            midText = words[1];
        } else {
            // Not inverted
            inverted = false;

            // Base listed below mid, so base should have mid word
            // and mid should have base word
            midText = words[0];
            baseText = words[1];            
        }
    } else if (words.length == 3) {
        // Three words
        if (words[0].length > words[2].length) {
            // Invert triangle
            inverted = true;

            // Base on top of upside down triangle, so first word listed above
            baseText = words[0];
            midText = words[1];
            topText = words[2];
        } else {
            // Not inverted
            inverted = false;

            // Base at bottom, so first word listed above
            topText = words[0];
            midText = words[1];
            baseText = words[2];
        }
    } else {
        let wordIndex = 0;

        // Add text to base of triangle
        do {
            baseText += words[wordIndex];
            wordIndex++;

            if (wordIndex < words.length) {
                if ((baseText.length + words[wordIndex].length + 1) <= baseLettersMax) {
                    baseText += ' ';
                } else {
                    break;
                }
            }

        } while((baseText.length <= baseLettersMax) && (wordIndex < words.length));

        // Add text to middle of triangle
        do {
            midText += words[wordIndex];
            wordIndex++;

            if (wordIndex < words.length) {
                if ((midText.length + words[wordIndex].length + 1) <= midLettersMax) {
                    midText += ' ';
                } else {
                    break;
                }
            }
        } while((midText.length <= midLettersMax) && (wordIndex < words.length));

        // Fix rare case that two words end up on top text
        if (wordIndex === words.length - 2){
            midText += ' ';
            midText += words[wordIndex];
            wordIndex++;
        }

        // Add last word to top row of triangle
        topText += words[wordIndex];

        if (baseText.length > topText.length) {
            // Invert triangle
            inverted = true;
        } else {
            // Not inverted
            inverted = false;

            // Swap text between base and top
            let tempText = baseText;
            baseText = topText;
            topText = tempText;
        }
    }
    
    return {
        base: baseText,
        mid: midText,
        top: topText,
        invert: inverted
    };
}

const createTriangleMessage = () => {
    // Approximated pixels for text widths/height
    const maxBaseWidth = 74;
    const maxMidWidth = 48;
    const maxTopWidth = 22;
    const minSize = 10;

    // Get triangle message properties
    const triangle = distributeMessageInTriangle();

    let triangleImg = document.getElementById('triangle');
    
    // Setup background triangle image
    if (triangle.invert) {
        triangleImg.style.backgroundImage = "url('./imgs/inv_triangle.png')";
    } else {
        triangleImg.style.backgroundImage = "url('./imgs/triangle.png')";
    }

    // Alter the text size until the base, mid and top text
    // fit within the triangle
    let baseSize = alterSize(triangle.base, maxBaseWidth);
    let midSize = alterSize(triangle.mid, maxMidWidth);
    let topSize = alterSize(triangle.top, maxTopWidth);

    if (midSize > baseSize) {
        midSize = baseSize;
    }

    if (topSize > baseSize) {
        topSize = baseSize;
    }

    if (baseSize < minSize) {
        baseSize = minSize;
    }

    if (midSize < minSize) {
        midSize = minSize;
    }

    if (topSize < minSize) {
        topSize = minSize;
    }

    // Setup message on triangle
    let messageLines = document.getElementsByClassName('triMessage');

    if (triangle.invert) {
        messageLines[0].textContent = triangle.base;
        messageLines[0].style.fontSize = baseSize + "px";
        messageLines[1].textContent = triangle.mid;
        messageLines[1].style.fontSize = midSize + "px";
        messageLines[2].textContent = triangle.top;
        messageLines[2].style.fontSize = topSize + "px";
        messageLines[3].textContent = ' ';
        messageLines[3].style.fontSize = "20px";
    } else {
        messageLines[0].textContent = ' ';
        messageLines[0].style.fontSize = "20px";
        messageLines[1].textContent = triangle.top;
        messageLines[1].style.fontSize = topSize + "px";
        messageLines[2].textContent = triangle.mid;
        messageLines[2].style.fontSize = midSize + "px";
        messageLines[3].textContent = triangle.base;
        messageLines[3].style.fontSize = baseSize + "px";      
    }
}

const getPixelWidth = (text, pxSize) => {
    // First, create mock span element
    let mockSpan = document.createElement("span");
    document.body.appendChild(mockSpan);

    // Setup current styling for span
    mockSpan.style.font = "Arial";
    mockSpan.style.fontSize = pxSize + "px";
    mockSpan.style.height = "auto";
    mockSpan.style.width = "auto";
    mockSpan.style.position = "absolute";
    mockSpan.style.whiteSpace = "no-wrap";
    mockSpan.innerHTML = text;

    // Retrieve span's pixel width
    let pixelWidth = Math.ceil(mockSpan.clientWidth);

    console.log(`${pixelWidth}`);
    document.body.removeChild(mockSpan);

    return pixelWidth;
}

const alterSize = (text, maxSize) => {
    // Alter the text size until it
    // fits within the triangle
    let currentSize = 20;
    let width = getPixelWidth(text, currentSize);

    while (width > maxSize) {
        currentSize--;
        width = getPixelWidth(text, currentSize);
    }

    return currentSize;
}