// Define problems
const problems = [
    {
        statement: "Write a function that returns the sum of two numbers.",
        answer: "function add(a, b) { return a + b; }",
        hints: [
            "Remember to use the 'function' keyword to define a function.",
            "You'll need parameters to represent the two numbers you want to add.",
            "Use the '+' operator to add the numbers together."
        ]
    },
    {
        statement: "Write a function that returns the product of two numbers.",
        answer: "function multiply(a, b) { return a * b; }",
        hints: [
            "Define a function named 'multiply' with two parameters.",
            "Use the '*' operator to multiply the numbers."
        ]
    },
    {
        statement: "Write a function that checks if a number is even.",
        answer: "function isEven(num) { return num % 2 === 0; }",
        hints: [
            "Define a function named 'isEven' with one parameter.",
            "Use the '%' operator to check for divisibility by 2."
        ]
    },
    {
        statement: "Write a function that converts Celsius to Fahrenheit.",
        answer: "function celsiusToFahrenheit(celsius) { return (celsius * 9 / 5) + 32; }",
        hints: [
            "Define a function named 'celsiusToFahrenheit' with one parameter.",
            "Use the conversion formula: Fahrenheit = (Celsius * 9/5) + 32."
        ]
    },
    {
        statement: "Write a function that finds the maximum of two numbers.",
        answer: "function max(a, b) { return a > b ? a : b; }",
        hints: [
            "Define a function named 'max' with two parameters.",
            "Use a conditional (ternary) operator to compare the numbers."
        ]
    },
    {
        statement: "Write a function that counts the number of vowels in a string.",
        answer: "function countVowels(str) { return str.match(/[aeiou]/gi).length; }",
        hints: [
            "Define a function named 'countVowels' with one parameter.",
            "Use a regular expression with the 'match' method to find vowels in the string."
        ]
    },
    {
        statement: "Write a function that checks if a string is a palindrome.",
        answer: "function isPalindrome(str) { return str === str.split('').reverse().join(''); }",
        hints: [
            "Define a function named 'isPalindrome' with one parameter.",
            "Use the 'split', 'reverse', and 'join' methods to reverse the string."
        ]
    },
    {
        statement: "Write a function that generates a random number between 1 and 10.",
        answer: "function generateRandomNumber() { return Math.floor(Math.random() * 10) + 1; }",
        hints: [
            "Define a function named 'generateRandomNumber' with no parameters.",
            "Use the 'Math.random()' function to generate a random number."
        ]
    },
    {
        statement: "Write a function that calculates the factorial of a number.",
        answer: "function factorial(num) { if (num === 0 || num === 1) return 1; return num * factorial(num - 1); }",
        hints: [
            "Define a function named 'factorial' with one parameter.",
            "Use recursion to calculate the factorial."
        ]
    },
    {
        statement: "Write a function that checks if a number is prime.",
        answer: "function isPrime(num) { if (num <= 1) return false; for (let i = 2; i <= Math.sqrt(num); i++) { if (num % i === 0) return false; } return true; }",
        hints: [
            "Define a function named 'isPrime' with one parameter.",
            "Iterate from 2 to the square root of the number to check for factors."
        ]
    }
];

// Select elements...
const runBtn = document.getElementById("run-btn");
const hintBtn = document.getElementById("hint-btn");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const feedbackMessage = document.getElementById("feedback-message");
const problemText = document.getElementById("problem-text");

// Initialize variables for problem index and current problem
let currentProblemIndex = 0;
let currentProblem = null;

// Function to load a specific problem
function loadProblem(problemIndex) {
    currentProblemIndex = problemIndex;
    currentProblem = problems[currentProblemIndex];
    problemText.textContent = currentProblem.statement;
}

// Function to submit user code
function submitCode() {
    const userCode = document.getElementById("code-editor").value;
    const isCorrect = checkAnswer(userCode, currentProblem.answer);
    
    if (isCorrect) {
        feedbackMessage.textContent = "Your code is correct!";
        feedbackMessage.style.color = "green";
        nextBtn.style.display = "block"; // Display the Next button
    } else {
        feedbackMessage.textContent = "Your code is incorrect. Try again!";
        feedbackMessage.style.color = "red";
        nextBtn.style.display = "none"; // Hide the Next button if code is incorrect
    }
    
    console.log("Running user code:", userCode);
    console.log("Correct answer:", currentProblem.answer);
    console.log("Is correct:", isCorrect ? "Yes" : "No");
}

// Function to load next problem
function loadNextProblem() {
    feedbackMessage.textContent = ""; // Clear feedback message
    document.getElementById("code-editor").value = ""; // Clear code editor
    nextBtn.style.display = "none"; // Hide the Next button
    currentProblemIndex++;
    if (currentProblemIndex < problems.length) {
        loadProblem(currentProblemIndex);
    } else {
        alert("You have completed all the problems!");
    }
}

// Function to display a hint
function displayHint() {
    console.log("Hint button clicked");
    const hint = currentProblem.hint;
    alert("Hint: " + hint);
}


// Function to check user's code against the correct answer
function checkAnswer(userCode, correctAnswer) {
    // Trim whitespace from user's code and correct answer
    const trimmedUserCode = userCode.trim();
    const trimmedCorrectAnswer = correctAnswer.trim();
    
    // Make comparison case-insensitive
    return trimmedUserCode.toLowerCase() === trimmedCorrectAnswer.toLowerCase();
}

// Event listeners
runBtn.addEventListener("click", submitCode);
hintBtn.addEventListener("click", displayHint);
submitBtn.addEventListener("click", submitCode);
nextBtn.addEventListener("click", loadNextProblem);

// Load the first problem when the page loads
loadProblem(0);
// Define variables for scoring, time limit, levels, hints, and leaderboard
let score = 0;
let timeLimit = 60; // in seconds
let currentLevel = 1;
let hintsAvailable = 3;
let leaderboard = [];

// Function to increment score when a problem is solved
function incrementScore(points) {
    score += points;
}

// Function to start timer for each problem
function startTimer() {
    let timer = setInterval(() => {
        timeLimit--;
        if (timeLimit <= 0) {
            clearInterval(timer);
            // Implement penalty for exceeding time limit
        }
    }, 1000); // Update timer every second
}

// Function to unlock next level
function unlockNextLevel() {
    currentLevel++;
}

// Function to provide hints
function provideHint() {
    if (hintsAvailable > 0) {
        // Provide hint logic
        hintsAvailable--;
    } else {
        // Inform user that no hints are available
    }
}

// Function to update leaderboard
function updateLeaderboard(username) {
    leaderboard.push({ username: username, score: score });
    leaderboard.sort((a, b) => b.score - a.score); // Sort leaderboard by score
}

// Example usage:
incrementScore(10); // Increment score by 10
startTimer(); // Start timer for problem
unlockNextLevel(); // Unlock next level
provideHint(); // Provide hint to user
updateLeaderboard("user123"); // Update leaderboard with user's score
