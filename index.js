// Packages
const fs = require("fs");
const inquirer = require("inquirer");
const generateHTML = require("./src/generateHtmlPage");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

/**
 * @returns the array of all Employee objects
 */

const teamList = [];
const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "Enter the manager's name",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Enter the manager's name!");
        return false;
      }
    },
  },
  {
    type: "number",
    name: "id",
    message: "Enter the manager's employee id",
    validate: (idInput) => {
      if (idInput) {
        return true;
      } else {
        console.log("Please enter a number!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "email",
    message: "Enter the manager's email",
    validate: (emailInput) => {
      if (emailInput) {
        return true;
      } else {
        console.log("Please enter the correct manager's email!");
        return false;
      }
    },
  },
  {
    type: "number",
    name: "officeNumber",
    message: "Enter the manager's office number",
    validate: (officeNumberInput) => {
      if (officeNumberInput) {
        return true;
      } else {
        console.log(
          "Enter a correct answer, the office number should be a number!"
        );
        return false;
      }
    },
  },
];

const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "Enter the engineer's name",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter the engineer's name!");
        return false;
      }
    },
  },
  {
    type: "number",
    name: "id",
    message: "Enter the engineer's employee id",
    validate: (idInput) => {
      if (idInput) {
        return true;
      } else {
        console.log(
          "Please enter a correct answer, the employee id should be a number!"
        );
        return false;
      }
    },
  },
  {
    type: "input",
    name: "email",
    message: "Enter the engineer's email",
    validate: (emailInput) => {
      if (emailInput) {
        return true;
      } else {
        console.log("Please enter the correct engineer's email!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "github",
    message: "Enter the engineer's github username",
    validate: (githubInput) => {
      if (githubInput) {
        return true;
      } else {
        console.log("Please enter the correct engineer's github username!");
        return false;
      }
    },
  },
];

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "Enter the intern's name",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Intern name is required!");
        return false;
      }
    },
  },
  {
    type: "number",
    name: "id",
    message: "Enter the intern's employee id",
    validate: (idInput) => {
      if (idInput) {
        return true;
      } else {
        console.log(
          "Enter a correct answer, the employee id should be a number!"
        );
        return false;
      }
    },
  },
  {
    type: "input",
    name: "email",
    message: "Enter the intern's email",
    validate: (emailInput) => {
      if (emailInput) {
        return true;
      } else {
        console.log("Enter the correct intern's email!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "school",
    message: "Enter the intern's school name",
    validate: (schoolInput) => {
      if (schoolInput) {
        return true;
      } else {
        console.log("Enter the correct intern school's name!");
        return false;
      }
    },
  },
];

// Questions
function questions() {
  inquirer
    .prompt({
      type: "list",
      name: "employeeType",
      message: "Which type of employee would you like to add to the team?",
      choices: ["Manager", "Engineer", "Intern", "I'm Done"],
    })
    .then(({ employeeType }) => {
      if (employeeType === "Manager") {
        inquirer.prompt(managerQuestions).then((data) => {
          const newManager = new Manager(
            data.name,
            data.id,
            data.email,
            data.officeNumber
          );
          teamList.push(newManager);
          questions();
        });
      } else if (employeeType === "Engineer") {
        inquirer.prompt(engineerQuestions).then((templateData) => {
          const newEngineer = new Engineer(
            templateData.name,
            templateData.id,
            templateData.email,
            templateData.github
          );
          teamList.push(newEngineer);
          questions();
        });
      } else if (employeeType === "Intern") {
        inquirer.prompt(internQuestions).then((data) => {
          const newIntern = new Intern(
            data.name,
            data.id,
            data.email,
            data.school
          );
          teamList.push(newIntern);
          questions();
        });
      } else if (employeeType === "I'm Done") {
        const pagehtml = generateHTML(teamList);
        fs.writeFile("./dist/index.html", pagehtml, (err) => {
          if (err) throw new Error(err);

          console.log("Team page created at index.html in the dist folder!");
        });
      }
    });
}

questions();
