# Student Management & Analysis System

> A console-based JavaScript engine that analyzes student results and applies a Grace Marks Committee, built with Object-Oriented Programming and the `map()`, `filter()` and `reduce()` array methods.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-launcher-E34F26?logo=html5&logoColor=white)
![Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)

---

## Table of Contents

1. [Project Title](#1-project-title)
2. [Professional Project Description](#2-professional-project-description)
3. [Project Overview](#3-project-overview)
4. [Assignment Objectives](#4-assignment-objectives)
5. [Core Features](#5-core-features)
6. [Technologies Used](#6-technologies-used)
7. [Complete Project Structure](#7-complete-project-structure)
8. [Student Class Architecture](#8-student-class-architecture)
9. [Constructor Properties](#9-constructor-properties)
10. [Explanation of Every Method](#10-explanation-of-every-method)
11. [Academic Grading Scale](#11-academic-grading-scale)
12. [Final Result Rules](#12-final-result-rules)
13. [Grace Marks Committee Workflow](#13-grace-marks-committee-workflow)
14. [Detailed Explanation of filter(), map(), reduce()](#14-detailed-explanation-of-filter-map-reduce)
15. [Zero-Division Protection](#15-zero-division-protection)
16. [Sample Console Output](#16-sample-console-output)
17. [Installation & Execution Instructions](#17-installation--execution-instructions)
18. [How to Open Browser Developer Console](#18-how-to-open-browser-developer-console)
19. [Test Scenarios](#19-test-scenarios)
20. [Expected Results](#20-expected-results)
21. [Code Quality & Implementation Notes](#21-code-quality--implementation-notes)
22. [Developer Information](#22-developer-information)

---

## 1. Project Title

**Student Management & Analysis System**
(نظام إدارة وتحليل نتائج الطلاب)

---

## 2. Professional Project Description

This project is a lightweight, framework-free analysis engine written in Vanilla JavaScript. It models students as objects, computes their academic average, letter grade and final result, and then runs a *Grace Marks Committee* that identifies struggling students, supports them with additional marks, and reports the new group average.

All output is written to the **Browser Developer Console**. The HTML page exists only to load the script and to explain how to read the results.

---

## 3. Project Overview

| Item | Description |
|---|---|
| Type | University practical assignment (Task 2) |
| Interface | Browser Console (no graphical interface) |
| Paradigm | Object-Oriented Programming + functional array methods |
| Data source | In-memory array `studentsList` (4 students) |
| Language | JavaScript (ES6+) |
| Execution | Runs automatically when `index.html` is opened |

---

## 4. Assignment Objectives

The assignment combines **Classes & Objects** with modern array methods to implement academic business rules:

- Model a student with a `Student` class and a constructor.
- Calculate averages with `reduce()`.
- Convert averages to letter grades with `if / else`.
- Decide the final result with the logical operator `&&`.
- Extract struggling students with `filter()`.
- Apply grace marks with `map()`.
- Analyze the new averages with `reduce()`.
- Protect the grace-average calculation against division by zero.
- Present the complete output in the Browser Console.

---

## 5. Core Features

- `Student` class with a four-property constructor.
- Three academic methods: `calculateAverage()`, `getGrade(average)`, `getFinalResult(average)`.
- Main array `studentsList` containing exactly four `Student` objects.
- Grace Marks Committee built on `filter()` → `map()` → `reduce()`.
- Grace marks are added to the **average**, never to individual subject grades.
- The new average is capped at 100.
- The original students and their grades are never modified.
- Zero-division protection with a clear message when no student is struggling.
- Console reports using `console.log()` and `console.table()`.

---

## 6. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Minimal page that loads `script.js` and shows console instructions |
| JavaScript (ES6+) | Classes, arrow functions, template literals, spread operator, array methods |

No frameworks, no external libraries, no build tools, no backend, no local storage.

---

## 7. Complete Project Structure

```text
Student-Management-System/
│
├── index.html     # Minimal page: title, developer name, console instructions, loads script.js
├── script.js      # Full implementation: Student class, data, grace committee, console reports
└── README.md      # Project documentation
```

---

## 8. Student Class Architecture

```text
Student
├── Properties (set by the constructor)
│   ├── id
│   ├── name
│   ├── grades
│   └── attendance
└── Methods
    ├── calculateAverage()
    ├── getGrade(average)
    └── getFinalResult(average)
```

The grace committee is implemented as standalone helper functions that operate on arrays of students, so the class stays focused on a single student's data and rules:

| Function | Responsibility | Array method |
|---|---|---|
| `getStrugglingStudents(students)` | Extract students with an average from 40 to 49 | `filter()` |
| `applyGraceMarks(students, graceMarks = 5)` | Create new records with grace marks added | `map()` |
| `sumNewAverages(gracedStudents)` | Sum the new averages | `reduce()` |
| `calculateGraceAverage(gracedStudents)` | Compute the group average safely | — |

---

## 9. Constructor Properties

```javascript
constructor(id, name, grades, attendance)
```

| Property | Type | Description |
|---|---|---|
| `id` | `number` | Seat number |
| `name` | `string` | Student name |
| `grades` | `number[]` | Grades of the 3 subjects |
| `attendance` | `number` | Attendance percentage |

---

## 10. Explanation of Every Method

### `calculateAverage()`

Sums the grades with `reduce()` and divides the total by the number of subjects (`this.grades.length`). Returns the arithmetic mean.

```javascript
const total = this.grades.reduce((sum, grade) => sum + grade, 0);
return total / this.grades.length;
```

### `getGrade(average)`

Receives an average and returns a letter grade using an `if / else if / else` chain (see [Academic Grading Scale](#11-academic-grading-scale)).

### `getFinalResult(average)`

Returns `"ناجح"` when **both** conditions are true, otherwise `"يحتاج مراجعة"`. If no argument is passed, it uses the student's own `calculateAverage()`.

```javascript
if (average >= 50 && this.attendance >= 75) {
  return "ناجح";
}
return "يحتاج مراجعة";
```

### `getStrugglingStudents(students)`

Uses `filter()` to keep students whose average is `>= 40` and `<= 49`.

### `applyGraceMarks(students, graceMarks = 5)`

Uses `map()` to return **new objects** containing the student's data, the `originalAverage`, and the `newAverage = Math.min(originalAverage + graceMarks, 100)`.

### `sumNewAverages(gracedStudents)`

Uses `reduce()` to add all `newAverage` values.

### `calculateGraceAverage(gracedStudents)`

Returns the sum divided by the number of struggling students, only when that number is greater than zero; otherwise returns `null`.

---

## 11. Academic Grading Scale

| Letter | Average Range |
|:---:|---|
| **A** | 90 to 100 |
| **B** | 80 to less than 90 |
| **C** | 70 to less than 80 |
| **D** | 60 to less than 70 |
| **E** | 50 to less than 60 |
| **F** | Less than 50 |

Boundaries are inclusive on the lower end: an average of exactly `90` is **A**, and `89.99` is **B**.

---

## 12. Final Result Rules

| Average ≥ 50 | Attendance ≥ 75 | Final Result |
|:---:|:---:|---|
| Yes | Yes | **ناجح** |
| Yes | No | **يحتاج مراجعة** |
| No | Yes | **يحتاج مراجعة** |
| No | No | **يحتاج مراجعة** |

Both conditions are checked together with the logical AND operator (`&&`).

---

## 13. Grace Marks Committee Workflow

```text
studentsList
     │
     ▼  filter()   Extraction  → students with average 40 – 49 (inclusive)
strugglingStudents
     │
     ▼  map()      Processing  → new objects, newAverage = min(average + 5, 100)
gracedStudents
     │
     ▼  reduce()   Analysis    → sum of the new averages
     │
     ▼  guard      if (length > 0) → sum ÷ length   else → message
Grace Average
```

Rules enforced by the code:

- Grace marks (**5**) are added to the **average**, not to each subject.
- The original `studentsList` and the original `grades` arrays are **not modified** (`map()` returns new objects and `grades` is copied).
- The new average is capped with `Math.min(..., 100)`, and the capped value is the one used in the sum and the group average.

---

## 14. Detailed Explanation of filter(), map(), reduce()

| Method | Purpose | Returns | Mutates the original? |
|---|---|---|---|
| `filter()` | Keep only elements that satisfy a condition | New array (same or fewer elements) | No |
| `map()` | Transform every element | New array (same length) | No |
| `reduce()` | Combine all elements into one value | A single value | No |

### `filter()` — Extraction

```javascript
function getStrugglingStudents(students) {
  return students.filter((student) => {
    const average = student.calculateAverage();
    return average >= 40 && average <= 49;
  });
}
```

### `map()` — Processing

```javascript
function applyGraceMarks(students, graceMarks = 5) {
  return students.map((student) => {
    const originalAverage = student.calculateAverage();
    return {
      ...student,
      grades: [...student.grades],
      originalAverage: originalAverage,
      newAverage: Math.min(originalAverage + graceMarks, 100),
    };
  });
}
```

### `reduce()` — Analysis

`reduce()` is used twice in the project:

```javascript
// 1) Sum of a student's grades (inside calculateAverage)
this.grades.reduce((sum, grade) => sum + grade, 0);

// 2) Sum of the new averages after grace marks
gracedStudents.reduce((sum, student) => sum + student.newAverage, 0);
```

---

## 15. Zero-Division Protection

Dividing by an empty array length would produce `NaN`. The project prevents this with a condition that checks the number of struggling students before dividing:

```javascript
function calculateGraceAverage(gracedStudents) {
  if (gracedStudents.length > 0) {
    return sumNewAverages(gracedStudents) / gracedStudents.length;
  }
  return null;
}
```

When there are no struggling students, the console shows a clear message instead of an error or `NaN`:

```text
لا يوجد طلاب متعثرون، لذلك لا توجد درجات رأفة ولا متوسط لحسابه.
```

---

## 16. Sample Console Output

Output produced by the project with the default `studentsList` (the table drawing in browsers looks slightly different but contains the same data):

```text
===== Student Reports =====
Name: Ahmed Hassan | Average: 91.67 | Grade: A | Result: ناجح
Name: Mona Adel | Average: 45.00 | Grade: F | Result: يحتاج مراجعة
Name: Omar Khaled | Average: 49.00 | Grade: F | Result: يحتاج مراجعة
Name: Sara Mahmoud | Average: 50.00 | Grade: E | Result: ناجح
===== Grace Marks Committee =====
Struggling students (before grace marks):
┌─────────┬──────┬───────────────┬────────────────┬────────────┐
│ (index) │ id   │ name          │ grades         │ attendance │
├─────────┼──────┼───────────────┼────────────────┼────────────┤
│ 0       │ 1002 │ 'Mona Adel'   │ [ 45, 42, 48 ] │ 85         │
│ 1       │ 1003 │ 'Omar Khaled' │ [ 50, 49, 48 ] │ 70         │
└─────────┴──────┴───────────────┴────────────────┴────────────┘
Struggling students (after +5 grace marks):
┌─────────┬──────┬───────────────┬────────────────┬────────────┬─────────────────┬────────────┐
│ (index) │ id   │ name          │ grades         │ attendance │ originalAverage │ newAverage │
├─────────┼──────┼───────────────┼────────────────┼────────────┼─────────────────┼────────────┤
│ 0       │ 1002 │ 'Mona Adel'   │ [ 45, 42, 48 ] │ 85         │ 45              │ 50         │
│ 1       │ 1003 │ 'Omar Khaled' │ [ 50, 49, 48 ] │ 70         │ 49              │ 54         │
└─────────┴──────┴───────────────┴────────────────┴────────────┴─────────────────┴────────────┘
Sum of new averages: 104.00
Grace average of struggling students: 52.00
```

---

## 17. Installation & Execution Instructions

No installation, build step or server is required.

1. Download or clone the project.
2. Make sure `index.html` and `script.js` are in the same folder.
3. Open `index.html` in a modern browser (Chrome, Edge, Firefox, Safari).
4. Open the Developer Console (next section).
5. Read the reports. If the console was opened after the page loaded, reload the page (`F5`) to print the output again.

---

## 18. How to Open Browser Developer Console

| Browser | Windows / Linux | macOS |
|---|---|---|
| Google Chrome / Microsoft Edge | `F12` or `Ctrl + Shift + J` | `Cmd + Option + J` |
| Mozilla Firefox | `F12` or `Ctrl + Shift + K` | `Cmd + Option + K` |
| Safari | — | Enable *Develop* menu in Settings → Advanced, then `Cmd + Option + C` |

After opening the developer tools, select the **Console** tab.

---

## 19. Test Scenarios

The project logic was verified with temporary tests that ran outside the project files. They used extra test students that were **not** added to `studentsList`, which still contains exactly four students.

| # | Scenario | Input | What is verified |
|:---:|---|---|---|
| 1 | Average 40 | grades `40, 40, 40`, attendance 90 | Grade `F`, included by `filter()`, new average 45 |
| 2 | Average 49 | grades `49, 49, 49`, attendance 90 | Grade `F`, included by `filter()`, new average 54 |
| 3 | Average 50, attendance 75 | grades `50, 50, 50`, attendance 75 | Grade `E`, result `ناجح`, not struggling |
| 4 | Average 50, attendance below 75 | grades `50, 50, 50`, attendance 74 | Result `يحتاج مراجعة` |
| 5 | No struggling students | averages 90 and 60 | Message printed, no `NaN`, no error |
| 6 | Cap at 100 | average 49 with grace marks 60 | New average is 100, used in sum and group average |
| 7 | Original data unchanged | Real `studentsList` | Students, grades and names unchanged after grace processing |

Additional checks: grade boundaries (`90`, `89.99`, `80`, `79.99`, `70`, `60`, `50`, `49.99`), `studentsList` length equals 4, and each student has exactly 3 grades.

---

## 20. Expected Results

### Default students

| ID | Name | Grades | Attendance | Average | Grade | Final Result |
|:---:|---|---|:---:|:---:|:---:|---|
| 1001 | Ahmed Hassan | 92, 88, 95 | 90 | 91.67 | A | ناجح |
| 1002 | Mona Adel | 45, 42, 48 | 85 | 45.00 | F | يحتاج مراجعة |
| 1003 | Omar Khaled | 50, 49, 48 | 70 | 49.00 | F | يحتاج مراجعة |
| 1004 | Sara Mahmoud | 60, 50, 40 | 75 | 50.00 | E | ناجح |

### Grace Marks Committee

| Name | Original Average | New Average (+5) |
|---|:---:|:---:|
| Mona Adel | 45 | 50 |
| Omar Khaled | 49 | 54 |

| Value | Result |
|---|:---:|
| Sum of new averages | 104 |
| Grace average | 52 |

---

## 21. Code Quality & Implementation Notes

- **Immutability:** `applyGraceMarks()` creates new objects and copies the `grades` array, so the original data is never changed.
- **Single responsibility:** the class holds per-student logic; the committee logic lives in small, separate functions.
- **No magic output:** every printed value is calculated from the data; nothing is hard-coded in the console messages.
- **Readable code:** short English comments, clear names, no duplicated logic.
- **Inclusive range:** the committee range is exactly `40 <= average <= 49`. An average between 49 and 50 (for example 49.5) is outside this literal range, so such a student is not selected.
- **Floating-point averages:** averages are not rounded in the calculation; `toFixed(2)` is used only when printing.
- **Execution:** the analysis runs once each time the page loads; reload the page to run it again.

---

## 22. Developer Information

| | |
|---|---|
| **Developer** | Azmy Ehab |
| **Project** | Student Management & Analysis System |
| **Type** | University assignment — Task 2 |
