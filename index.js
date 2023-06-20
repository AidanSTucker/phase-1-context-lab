// Helper functions

function allWagesFor() {
    const eligibleDates = this.timeInEvents.map(function (e) {
      return e.date;
    });
  
    const payable = eligibleDates.reduce(function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0); // <== Hm, why did we need to add bind() there? We'll discuss soon!
  
    return payable;
  }
  
  // Main functions
  
  function createTimeEntry(dateStamp, type) {
    const [date, hour] = dateStamp.split(" ");
    return {
      type: type,
      hour: parseInt(hour),
      date: date,
    };
  }
  
  function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(dateTime) {
    const [date, hour] = dateTime.split(" ");
    this.timeInEvents.push(createTimeEntry(dateTime, "TimeIn"));
    return this;
  }
  
  function createTimeOutEvent(dateTime) {
    const [date, hour] = dateTime.split(" ");
    this.timeOutEvents.push(createTimeEntry(dateTime, "TimeOut"));
    return this;
  }
  
  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find((event) => event.date === date);
    const timeOut = this.timeOutEvents.find((event) => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((employee) => employee.firstName === firstName);
  }
  
  function calculatePayroll(employeeRecords) {
    let totalPayroll = employeeRecords.reduce((total, employee) => {
      if (
        employee &&
        employee.timeInEvents &&
        employee.timeOutEvents &&
        employee.timeInEvents.length > 0
      ) {
        return total + allWagesFor.call(employee);
      }
      return total;
    }, 0);
  
    return totalPayroll;
  }
  