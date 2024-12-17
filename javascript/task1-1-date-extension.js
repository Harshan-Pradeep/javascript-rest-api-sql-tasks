/*
Task 1.1 - Extend JS Date object with a method daysTo() which returns number of complete days between 
any pair of JS date objects

Assumptions:
    1. Only Considered date portion and time portion not considered.
    2. Result should always positive number regardless order of the dates.
    3. Dates are converted to UTC to handle timezone issues.
*/

Date.prototype.daysTo = function (otherDate) {

    // Validate input date is a valid Date object
    if (!(otherDate instanceof Date)) {
        throw new Error("Input must be a valid Date object");
    }

    // Convert both dates into UTC midnight to avoid timezone issues
    const firstDate = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    const secondDate = new Date(Date.UTC(otherDate.getFullYear(), otherDate.getMonth(), otherDate.getDate()));

    // Calculate time difference between two dates in milliseconds
    const timeDiffInMs = secondDate - firstDate;

    // Convert milliseconds time into days
    // Math.abs used ensure positive number of dates avoid negative values
    const daysDiff = Math.abs(Math.floor(timeDiffInMs / (1000 * 60 * 60 * 24)));

    return daysDiff;
}

/*
    Test function to verify the daysTo implementation
    Tests scenarios:
       - Regular dates difference
       - Reverse order dates difference
       - Same dates difference
       - Invalide dates input
*/

function runTestsOfDaysDiff() {

    const d1 = new Date('2024-01-01');
    const d2 = new Date('2024-01-05');

    // Test regular dates difference
    console.log("Test regular dates difference :", d1.daysTo(d2));  // output: 4

    // Test reverse order dates difference
    console.log("Test reverse order dates difference :", d2.daysTo(d1));  // output: 4

    const sameDay1 = new Date('2024-01-01');
    const sameDay2 = new Date('2024-01-01');

    // Test same dates difference
    console.log("Test same dates difference", sameDay1.daysTo(sameDay2));  // output: 0

    // Test invalid dates input
    try {
        console.log("Test invalid dates input :", sameDay1.daysTo("2024-01-05")); // Passing string instead of Date object
    } catch (error) {
        console.log("Error Message  :", error.message);
    }
}

// Execute tests scenarios
runTestsOfDaysDiff();