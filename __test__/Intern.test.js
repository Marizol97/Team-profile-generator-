const Employee = require("../lib/Employee");
const Intern = require("../lib/Intern");

test("creates an Intern object", () => {
  const intern = new Intern("Intern1");

  expect(typeof intern).toBe("object");
});

test("gets Intern's school", () => {
  const intern = new Intern("Intern1", "2", "email", "bootcamp");

  expect(intern.school).toBe("bootcamp");
});

test("getRole() returns Intern", () => {
  const intern = new Intern("Intern");

  expect(intern.getRole()).toBe("Intern");
});
