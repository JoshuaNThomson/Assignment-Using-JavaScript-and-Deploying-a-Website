/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?

let cost_per_day_full = 35;
let cost_per_day_half = 20;
let number_of_days_selected = 0;

//These variables will need to be initialized when the page is loaded

// They will need to be reset when the page is reloaded

/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

document.addEventListener('DOMContentLoaded', function() {
    const listItems = document.querySelectorAll('#monday, #tuesday, #wednesday, #thursday, #friday, #half, #full'); 
    const halfButton = document.getElementById('half');
    const fullButton = document.getElementById('full');
    fullButton.style.backgroundColor = '#E5AF42';

    listItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('clicked')) {
                this.classList.remove('clicked');
                this.style.backgroundColor = 'white';
            } else {
                this.classList.add('clicked');
                this.style.backgroundColor = '#E5AF42';
            }
            const newTotalCost = calculateCost();
            document.getElementById('calculated-cost').innerHTML = newTotalCost;
        });
    });

    halfButton.addEventListener('click', function() {
        if (halfButton.classList.contains('clicked')) {
            halfButton.classList.remove('clicked');
            halfButton.style.backgroundColor = 'white';
        } else {
            halfButton.classList.add('clicked');
            halfButton.style.backgroundColor = '#E5AF42';
            fullButton.classList.remove('clicked');
            fullButton.style.backgroundColor = 'white';
        }
    });

    fullButton.addEventListener('click', function() {
        if (fullButton.classList.contains('clicked')) {
            fullButton.classList.remove('clicked');
            fullButton.style.backgroundColor = 'white';
        } else {
            fullButton.classList.add('clicked');
            fullButton.style.backgroundColor = '#E5AF42'; 
            halfButton.classList.remove('clicked');
            halfButton.style.backgroundColor = 'white';
        }
    });
});


/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

const clearButton = document.getElementById('clear-button');

clearButton.addEventListener('click', function() {
    const allDays = document.querySelectorAll('.day-selector .clicked');
    allDays.forEach(day => {
        day.classList.remove('clicked');
        day.style.backgroundColor = 'white';
    });
    number_of_days_selected = 0;
    document.getElementById('calculated-cost').innerHTML = '0';
});

/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.

const halfButton = document.getElementById('half');
const fullButton = document.getElementById('full');

halfButton.addEventListener('click', function() {
    cost_per_day_full = 20;
    halfButton.classList.add('clicked');
    fullButton.classList.remove('clicked');
    const newTotalCost = calculateCost();
    document.getElementById('calculated-cost').innerHTML = newTotalCost;
});

// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

fullButton.addEventListener('click', function() {
    cost_per_day_full = 35;
    fullButton.classList.add('clicked');
    halfButton.classList.remove('clicked');
    const newTotalCost = calculateCost();
    document.getElementById('calculated-cost').innerHTML = newTotalCost;
});




/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function calculateCost() {
    const fullDays = document.querySelectorAll('.day-selector .clicked').length;
    const halfDays = document.querySelectorAll('.day-selector .half').length;
    number_of_days_selected = fullDays + halfDays;

    const totalCost = (fullDays * cost_per_day_full) + (halfDays * cost_per_day_half);

    return totalCost;
}
