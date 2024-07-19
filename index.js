function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Employee Records Creation from Array of Arrays
  function createEmployeeRecords(arr) {
    return arr.map(function(row) {
      return createEmployeeRecord(row);
    });
  }
  
  // Create TimeIn Event and Update Employee Record
  function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
  
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
  
    return this;
  }
  
  // Create TimeOut Event and Update Employee Record
  function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
  
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
  
    return this;
  }
  
  // Calculate Hours Worked on a Specific Date
  function hoursWorkedOnDate(dateWorked) {
    let timeIn = this.timeInEvents.find(function(event) {
      return event.date === dateWorked;
    });
  
    let timeOut = this.timeOutEvents.find(function(event) {
      return event.date === dateWorked;
    });
  
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Calculate Wages Earned on a Specific Date
  function wagesEarnedOnDate(dateWorked) {
    let hoursWorked = hoursWorkedOnDate.call(this, dateWorked);
    return hoursWorked * this.payPerHour;
  }
  
  // Calculate Total Wages Earned
  function allWagesFor() {
    let datesWorked = this.timeInEvents.map(function(event) {
      return event.date;
    });
  
    let totalWages = datesWorked.reduce(function(memo, date) {
      return memo + wagesEarnedOnDate.call(this, date);
    }.bind(this), 0);
  
    return totalWages;
  }
  
  // Find Employee Record by First Name
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(employee) {
      return employee.firstName === firstName;
    });
  }
  
  // Create Employee Records from CSV Data
  function createEmployeeRecords(srcArray) {
    return srcArray.map(function(row) {
      return createEmployeeRecord(row);
    });
  }
  
  // Calculate Payroll for All Employees
  function calculatePayroll(employees) {
    return employees.reduce(function(total, employee) {
      return total + allWagesFor.call(employee);
    }, 0);
  }           
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

