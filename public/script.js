var socket = io();
var movingImage = document.getElementById('rope');

var leftPressCount = 0;
var rightPressCount = 0;

socket.on('left', (data) => {
    console.log(data);
})

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        console.log("leftPress");
        leftArrowPressed();
        socket.emit('left')
        socket.emit('updateImagePosition', imagePosition);
    } else if (event.key === 'ArrowRight') {
        console.log("rightPress");
        rightArrowPressed();
        socket.emit('updateImagePosition', imagePosition);
    }
});


    // socket.emit('updateImagePosition', imagePosition);
    socket.on('imagePositionUpdate', function (newPosition){
        imagePosition = newPosition;
        movingImage.style.left = (newPosition) + 'px';
        // console.log("Updated image position: " + newPosition); 
    });

    // socket.on('pressCounts', (counts) => {
    //     leftPressCount = counts.left;
    //     rightPressCount = counts.right;
    //     updateCounters();
    // });

function leftArrowPressed() {
    var currentLeft = parseInt(movingImage.style.left) || 0;
    movingImage.style.left = (currentLeft - 5) + 'px';
    // console.log(movingImage);
    imagePosition = currentLeft - 5;
    socket.emit('updateImagePosition', imagePosition);
    leftPressCount++;
    updateCounters();
    // socket.emit('left-press-count', leftPressCount);
}

function rightArrowPressed() {
    var currentLeft = parseInt(movingImage.style.left) || 0;
    movingImage.style.left = (currentLeft + 5) + 'px';
    // console.log(movingImage);
    imagePosition = currentLeft + 5;
    socket.emit('updateImagePosition', imagePosition);
    rightPressCount++;
    updateCounters();
    // socket.emit('right-press-count', rightPressCount);
}

function updateCounters() {
    document.getElementById('left-press-count').textContent = 'Left Press Count: ' + leftPressCount;
    document.getElementById('right-press-count').textContent = 'Right Press Count: ' + rightPressCount;
}

function showCountComparison() {
    let message;
    if (leftPressCount > rightPressCount) {
        message = 'Left Press Count is higher!';
    } else if (rightPressCount > leftPressCount) {
        message = 'Right Press Count is higher!';
    } else {
        message = 'Left Press Count and Right Press Count are equal.';
    }

    alert(message); 
}
    

//gameover window "submit" winner name 
window.addEventListener('load', ()=> {
    let submit = document.getElementById('submit');
    if (submit){
        document.getElementById('submit').addEventListener('click', ()=>{
            let winner = document.getElementById('winner-fname').value;
            console.log(winner);
            let currentDate = new Date();
            let obj = {"number": winner,
                        "date": currentDate
                        //"score": winnerScore
            };
        let jsonData = JSON.stringify(obj);
    
        fetch('/winner', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body:jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)});
        })
    }
    
    //get leaderboard scores 
    document.getElementById('get-tracker').addEventListener('click', ()=>{
        fetch('/getLeaderboard')
        .then(resp=> resp.json())
        .then(data=> {
            document.getElementById('winner-info').innerHTML = "";
            console.log(data.data);
            for(let i=0; i<data.data.length; i++){
                let string = data.data[i].date + ":" + data.data[i].winner;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('winner-info').appendChild(elt);
            }
                
         })
 
    })
    document.getElementById('compare-counts-button').addEventListener('click', showCountComparison);
});

////////////////////
//Homepage buttons//
///////////////////
window.addEventListener('load', () => {
    console.log("page loaded!");
});

let button = document.getElementById("playbutton");
let sound = document.getElementById("buttonClickSound");

button.addEventListener("click", () => {
    sound.currentTime = 0;
    console.log('someone clicked the button!');
    sound.play();
});

let rulesbutton = document.getElementById("rulesb");
let rulessound = document.getElementById("rulesClickSound");

rulesbutton.addEventListener("click", () => {
    rulessound.currentTime = 0;
    console.log('someone clicked the button!');
    rulessound.play();
});


function openPopup() {
    let popup = document.getElementById('popup');
    popup.style.display = 'block';
}

function closePopup() {
    let popup = document.getElementById('popup');
    popup.style.display = 'none';
}