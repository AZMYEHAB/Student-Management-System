# Student Management & Analysis System

نظام إدارة وتحليل نتائج الطلاب

## Project Overview

A console-based JavaScript project that manages a list of students, calculates each student's
average, letter grade and final result, and then runs a **Grace Marks Committee** for struggling
students. The project demonstrates Object-Oriented Programming (classes, objects, constructor),
array methods (`map()`, `filter()`, `reduce()`), conditional statements and logical operators.

All calculations are done in JavaScript and the main output is shown in the **Browser Console**.
The HTML page is only a simple launcher with a **Run Analysis** button.

## Project Features

- `Student` class with a constructor (`id`, `name`, `grades`, `attendance`) that validates exactly 3 grades.
- `calculateAverage()` using `reduce()`.
- `getGrade()` using `if / else` with correct boundary handling.
- `getFinalResult()` using the logical operator `&&`.
- `studentsList` array with 4 realistic students created with `new Student()`.
- Grace Marks Committee pipeline: `filter()` → `map()` → `reduce()`.
- Division-by-zero protection and a clear message when there are no struggling students.
- Grace marks never push an average above 100.
- The original students array is never modified.
- Organized console reports using `console.log()`, `console.table()` and `console.group()`.
- Responsive launcher page; the analysis runs only when the button is clicked (no duplicate output on page load).

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+) — no frameworks, no TypeScript, no external libraries

## Project Structure

```text
Student-Management-System/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── README.md
```

## How to Run

1. Download or clone the project.
2. Open `index.html` in any modern browser (double-click, no server needed).
3. Open the Browser Console (see below).
4. Click **Run Analysis**. Click it again to re-run; the console is cleared before each run.

## How to Open Browser Console

| Browser / OS | Shortcut |
|---|---|
| Chrome / Edge (Windows, Linux) | `F12` or `Ctrl + Shift + J` |
| Chrome / Edge (macOS) | `Cmd + Option + J` |
| Firefox (Windows, Linux) | `Ctrl + Shift + K` |
| Firefox (macOS) | `Cmd + Option + K` |
| Safari (macOS) | Enable *Develop* menu in Settings → Advanced, then `Cmd + Option + C` |

Then choose the **Console** tab.

## Explanation of map(), filter(), reduce()

| Method | What it does | Where it is used |
|---|---|---|
| `filter()` | Returns a **new array** containing only the elements that satisfy a condition. | `getStrugglingStudents()` — keeps students with average from 40 to 49 (inclusive). |
| `map()` | Transforms **every element** and returns a **new array** of the same length. | `applyGraceMarks()` — builds new records with the grace marks added, without touching the originals. |
| `reduce()` | Combines all elements into a **single value** (sum, total, ...). | `calculateAverage()` (sum of grades) and `sumNewAverages()` (sum of new averages). |

## Academic Grading Rules

**Average** = (sum of the 3 grades) ÷ 3, rounded to 2 decimals.

| Letter | Average range |
|---|---|
| A | 90 – 100 |
| B | 80 – < 90 |
| C | 70 – < 80 |
| D | 60 – < 70 |
| E | 50 – < 60 |
| F | < 50 |

**Final result** (both conditions must be true, using `&&`):

- Average ≥ 50 **and** attendance ≥ 75% → **ناجح**
- Otherwise → **يحتاج مراجعة**

## Grace Marks Logic

1. **Extraction (`filter`)** — select students whose average is between 40 and 49, inclusive.
2. **Processing (`map`)** — create new records with `newAverage = min(average + 5, 100)`.
   The original `Student` objects are not modified.
3. **Analysis (`reduce`)** — sum all new averages.
4. **Grace average** — `sum ÷ number of struggling students`, executed only if the count is greater than zero.
   If there are no struggling students, a clear message is printed instead of `NaN` or an error.

Note: grace marks raise the average only. Attendance is still checked, so a student with attendance
below 75% still gets **يحتاج مراجعة** after grace.

## Developer

**Azmy Ehab**
