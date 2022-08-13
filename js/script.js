const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
inputField = document.querySelector("input"),
timerText=document.querySelector(".time b"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord,timer;

const initTimer= maxTime =>{
    clearInterval(timer);
    timer = setInterval(()=>{
        if(maxTime>0){
            maxTime--;//decrement in time
            return timerText.innerText=maxTime;
        }
        clearInterval(timer);
        alert(`Time over! ${correctWord.toLocaleUpperCase()} was correct word`);
        initGame();
    },1000);
    
}

const initGame = () => {
    initTimer(30); //calling inintimer function with passing 30 as maxTime value
    let randomObj = words[Math.floor(Math.random() *words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length-1; i>0; i--) {
        let j=Math.floor(Math.random()*(i+1));//getting random number
        [wordArray[i],wordArray[j]]=[wordArray[j],wordArray[i]];    
    }
    wordText.innerText = wordArray.join("");//passing shuffled word as word text
    hintText.innerText=randomObj.hint; //passing random object 
    correctWord = randomObj.word.toLocaleLowerCase(); // passing random word ot correct word

    inputField.value="";
    inputField.setAttribute("maxlength", correctWord.length)//setting input maxlenght attr value to word length
    // console.log(randomObj);
}
initGame();

const checkWord = ()=>{
    let userWord = inputField.value.toLocaleLowerCase();//getting user value

    if(!userWord) return alert("Please enter a word")//if user didn't enter anything

    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not correct word`);//if user doesn't match with correct word

    alert(`Congrats! ${userWord.toLocaleUpperCase()} is correct word`);//when user type correct word or above both if condition are not satisfied

    initGame();
}

refreshBtn.addEventListener("click",initGame);
checkBtn.addEventListener("click",checkWord)