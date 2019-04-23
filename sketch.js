


// var reverb = new Tone.Reverb().toMaster();
// var freeverb = new Tone.Reverb().toMaster();
// freeverb.dampening.value = 1000;
//routing synth through the reverb

// let duoOptions = {
//     vibratoAmount: 0.5,
//     vibratoRate: 5,
//     harmonicity: 1.5,
//     voice0: {
//         volume: -10,
//         portamento: 0,
//         oscillator: {
//             type: sine
//         },
//         filterEnvelope: {
//             attack: 0.01,
//             decay: 0,
//             sustain: 1,
//             release: 0.5
//         },
//         envelope: {
//             attack: 0.01,
//             decay: 0,
//             sustain: 1,
//             release: 0.5
//         }
//     },
//     voice1: {
//         volume: -10,
//         portamento: 0,
//         oscillator: {
//             type: sine
//         },
//         filterEnvelope: {
//             attack: 0.01,
//             decay: 0,
//             sustain: 1,
//             release: 0.5
//         },
//         envelope: {
//             attack: 0.01,
//             decay: 0,
//             sustain: 1,
//             release: 0.5
//         }
//     }
// }

var membrane = new Tone.MembraneSynth().toMaster();
// var synth = new Tone.Synth().toMaster();
var synth = new Tone.Synth().toMaster();
var synth1 = new Tone.AMSynth().toMaster();
var synth2 = new Tone.DuoSynth().toMaster([{vibratoAmount  : 1, harmonicity: 0.5}]);


// let sliderValue
// slider.oninput = function() {
//     sliderValue = this.value;
//   }

membrane.triggerAttackRelease("C3", "1n");


notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
keyD = ['D', 'G', 'C', 'G']

function setup() {

    w = 20
    // numOfValues = 30
    numOfValues = Math.floor(window.innerWidth/w)

    values = new Array(numOfValues)
    for (let i = 0; i < numOfValues; i++) {
        // values[i] = Math.floor(Math.random() * window.innerHeight)
        values[i] = { value: Math.floor(Math.random() * window.innerHeight), isPivot: false, note: `${keyD[Math.floor(Math.random() * 4)]}${Math.floor(Math.random() * 4) +2 }` }
        // values[i] = { value: Math.floor(Math.random() * window.innerHeight), isPivot: false, note: `D${Math.floor(Math.random() * 4) +2 }` }
        // values[i] = { value: Math.floor(Math.random() * window.innerHeight), isPivot: false, note: `${notes[Math.floor(Math.random() * 6)]}${Math.floor(Math.random() * 4) +2 }` }
    }
    // frameRate(30)
    createCanvas(window.innerWidth, window.innerHeight);
    quickSort(values, 0, values.length - 1)
    
}

async function quickSort(arr, start, end) {
    if (start >= end) return

    index = await partition(arr, start, end)
    
    synth.triggerAttackRelease(arr[index].note, "2n")
    // for (let i = 0; i< values.length; i++) {
    //     if (i == index) values[i].isPivot = true;
    //     else values[i].isPivot = false;
    // }
    
    Promise.all([await quickSort(arr, start, index-1),await quickSort(arr, index+1, end)])
        
}


async function partition(arr, start, end) {
    let pivotIndex=start
    let pivotValue = arr[end].value
    for (let i = start; i < end; i++) {
        if (arr[i].value < pivotValue) {
            await swap(arr, i, pivotIndex)
            pivotIndex++
        }
    }
    synth1.triggerAttackRelease(arr[pivotIndex].note, "2n")
    values[pivotIndex].isPivot = true
    await swap(arr, pivotIndex, end)
    return pivotIndex

}



async function swap(arr, index1, index2) {
    let sliderValue = document.getElementById('slider').value
    await sleep(sliderValue)
    synth2.triggerAttackRelease(arr[index1].note, "4n")
    synth1.triggerAttackRelease(arr[index2].note, "4n")
    synth.triggerAttackRelease("D3", "8n");
    await sleep(sliderValue)
    synth2.triggerAttackRelease("G3", "8n");
    // await sleep(140)
    // await sleep(70)
    tmp = arr[index1].value
    arr[index1].value = arr[index2].value
    arr[index2].value = tmp

}



function draw() {
    background(51)
    // let slider = document.getElementById('slider').value
    
    for (let i=0; i<values.length; i++) {
        if (values[i].isPivot) {
            stroke(0)
            fill(0, 255, 0)
            rect(i*w, height-values[i].value, w, values[i].value)

        } else {
            stroke(0)
            fill(0, 240, 255)
            rect(i*w, height-values[i].value, w, values[i].value)
        }
        
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }