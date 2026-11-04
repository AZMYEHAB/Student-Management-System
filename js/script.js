/**
 * Student Management & Analysis System
 * Console-based project using Vanilla JavaScript (OOP + map / filter / reduce).
 * Developer: Azmy Ehab
 */

"use strict";

/* ==========================================================================
   Configuration constants (single place to change the grading rules)
   ========================================================================== */
const SUBJECTS_COUNT = 3;        // Every student must have exactly 3 grades
const PASS_AVERAGE = 50;         // Minimum average to pass
const MIN_ATTENDANCE = 75;       // Minimum attendance percentage to pass
const GRACE_RANGE_MIN = 40;      // Grace committee: lowest eligible average (inclusive)
const GRACE_RANGE_MAX = 49;      // Grace committee: highest eligible average (inclusive)
const GRACE_MARKS = 5;           // Grace marks added to each eligible student
const MAX_AVERAGE = 100;         // An average can never exceed this value

/* ==========================================================================
   1. Student Class
   ========================================================================== */
class Student {
  /**
   * @param {number} id          Seat number
   * @param {string} name        Student name
   * @param {number[]} grades    Exactly 3 subject grades
   * @param {number} attendance  Attendance percentage (0 - 100)
   */
  constructor(id, name, grades, attendance) {
    // Defensive validation: the assignment requires exactly 3 subjects
    if (!Array.isArray(grades) || grades.length !== SUBJECTS_COUNT) {
      throw new Error(`Student "${name}" must have exactly ${SUBJECTS_COUNT} grades.`);
    }

    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }

  /**
   * Arithmetic mean of the grades.
   * Uses reduce() to sum the grades, then divides by the number of subjects.
   * The result is rounded to 2 decimals to avoid floating-point noise.
   */
  calculateAverage() {
    const total = this.grades.reduce((sum, grade) => sum + grade, 0);
    const average = total / this.grades.length;
    return Math.round(average * 100) / 100;
  }

  /**
   * Converts an average into a letter grade using if / else.
   * A: 90-100 | B: 80-<90 | C: 70-<80 | D: 60-<70 | E: 50-<60 | F: <50
   * @param {number} average
   */
  getGrade(average) {
    if (average >= 90) {
      return "A";
    } else if (average >= 80) {
      return "B";
    } else if (average >= 70) {
      return "C";
    } else if (average >= 60) {
      return "D";
    } else if (average >= 50) {
      return "E";
    } else {
      return "F";
    }
  }

  /**
   * Final result: the student passes only if BOTH conditions are true (&&).
   * - average >= 50
   * - attendance >= 75%
   * An optional average can be passed (used after grace marks are applied).
   */
  getFinalResult(average = this.calculateAverage()) {
    if (average >= PASS_AVERAGE && this.attendance >= MIN_ATTENDANCE) {
      return "ناجح";
    }
    return "يحتاج مراجعة";
  }
}

/* ==========================================================================
   2. University System - main students array (4 students)
   ========================================================================== */
const studentsList = [
  // Passing student with good attendance                         -> avg 91.67
  new Student(1001, "Ahmed Hassan", [92, 88, 95], 90),
  // Struggling (40-49), attendance OK -> passes after grace      -> avg 45
  new Student(1002, "Mona Adel", [45, 42, 48], 85),
  // Struggling, avg 49 but attendance below 75%                  -> avg 49
  new Student(1003, "Omar Khaled", [50, 49, 48], 70),
  // Boundary case: avg exactly 50 and attendance exactly 75%     -> avg 50
  new Student(1004, "Sara Mahmoud", [60, 50, 40], 75),
];

/* ==========================================================================
   3. Grace Marks Committee (pure functions: they never modify the input array)
   ========================================================================== */

/** Extraction with filter(): students whose average is within 40 - 49 (inclusive). */
function getStrugglingStudents(students) {
  return students.filter((student) => {
    const average = student.calculateAverage();
    return average >= GRACE_RANGE_MIN && average <= GRACE_RANGE_MAX;
  });
}

/**
 * Processing with map(): creates NEW records with grace marks added.
 * The original Student objects are never modified; grades are copied.
 * The new average is capped at 100.
 */
function applyGraceMarks(strugglingStudents, graceMarks = GRACE_MARKS) {
  return strugglingStudents.map((student) => {
    const originalAverage = student.calculateAverage();
    const newAverage = Math.min(originalAverage + graceMarks, MAX_AVERAGE);

    return {
      id: student.id,
      name: student.name,
      grades: [...student.grades],          // copy, not a reference
      attendance: student.attendance,
      originalAverage,
      graceMarks,
      newAverage,                           // value after the 100 cap
      newGrade: student.getGrade(newAverage),
      newResult: student.getFinalResult(newAverage),
    };
  });
}

/** Analysis with reduce(): sum of all new averages. */
function sumNewAverages(gracedStudents) {
  return gracedStudents.reduce((sum, student) => sum + student.newAverage, 0);
}

/**
 * Grace Average: total of new averages / number of struggling students.
 * Returns null when there are no struggling students (guards against
 * division by zero and NaN).
 */
function calculateGraceAverage(gracedStudents) {
  if (gracedStudents.length > 0) {
    return sumNewAverages(gracedStudents) / gracedStudents.length;
  }
  return null;
}

/* ==========================================================================
   4. Console Reports
   ========================================================================== */

/** Detailed report for every student. */
function printStudentReports(students) {
  console.group("📋 Student Reports");

  students.forEach((student) => {
    const average = student.calculateAverage();

    console.group(`Student: ${student.name}`);
    console.log(`Student ID   : ${student.id}`);
    console.log(`Student Name : ${student.name}`);
    console.log(`Grades       : ${student.grades.join(", ")}`);
    console.log(`Attendance   : ${student.attendance}%`);
    console.log(`Average      : ${average.toFixed(2)}`);
    console.log(`Letter Grade : ${student.getGrade(average)}`);
    console.log(`Final Result : ${student.getFinalResult()}`);
    console.groupEnd();
  });

  // Compact overview of all students
  console.table(
    students.map((student) => {
      const average = student.calculateAverage();
      return {
        "Student ID": student.id,
        "Student Name": student.name,
        Grades: student.grades.join(", "),
        "Attendance %": student.attendance,
        Average: average.toFixed(2),
        "Letter Grade": student.getGrade(average),
        "Final Result": student.getFinalResult(),
      };
    })
  );

  console.groupEnd();
}

/** Grace committee report (runs the filter -> map -> reduce pipeline). */
function printGraceCommitteeReport(students) {
  console.group("⚖️ Grace Marks Committee");

  // Step 1: filter()
  const struggling = getStrugglingStudents(students);

  // Step 2: map()
  const graced = applyGraceMarks(struggling);

  console.group("1) Struggling students BEFORE grace marks");
  if (struggling.length > 0) {
    console.table(
      struggling.map((student) => ({
        "Student ID": student.id,
        "Student Name": student.name,
        Average: student.calculateAverage().toFixed(2),
        "Attendance %": student.attendance,
      }))
    );
  } else {
    console.log("No struggling students found. / لا يوجد طلاب متعثرون.");
  }
  console.groupEnd();

  // Nothing else to calculate: show a clear message instead of NaN / errors
  if (graced.length === 0) {
    console.log("ℹ️ لا يوجد طلاب متعثرون، لذلك لا توجد درجات رأفة لإضافتها.");
    console.groupEnd();
    return;
  }

  console.group(`2) Students AFTER adding ${GRACE_MARKS} grace marks`);
  console.table(
    graced.map((student) => ({
      "Student ID": student.id,
      "Student Name": student.name,
      "Original Average": student.originalAverage.toFixed(2),
      "Grace Marks": student.graceMarks,
      "New Average": student.newAverage.toFixed(2),
      "New Grade": student.newGrade,
      "New Result": student.newResult,
    }))
  );
  console.groupEnd();

  console.group("3) Average of each student after grace");
  graced.forEach((student) => {
    console.log(`${student.name}: ${student.newAverage.toFixed(2)}`);
  });
  console.groupEnd();

  // Step 3: reduce()
  console.log(`4) Sum of new averages (reduce): ${sumNewAverages(graced).toFixed(2)}`);

  // Grace average (division is protected inside calculateGraceAverage)
  console.log(`5) Grace average of struggling students: ${calculateGraceAverage(graced).toFixed(2)}`);

  console.groupEnd();
}

/* ==========================================================================
   5. Entry point
   ========================================================================== */
function runAnalysis() {
  console.log("🚀 Student Management & Analysis System — Developer: Azmy Ehab");
  printStudentReports(studentsList);
  printGraceCommitteeReport(studentsList);
}

/* ==========================================================================
   6. Browser wiring: nothing runs on page load, only when the button is clicked
   ========================================================================== */
if (typeof document !== "undefined") {
  let runCount = 0;

  document.addEventListener("DOMContentLoaded", () => {
    const runButton = document.getElementById("run-btn");
    const status = document.getElementById("status");

    runButton.addEventListener("click", () => {
      console.clear(); // avoid mixing results of previous runs
      runAnalysis();
      runCount += 1;
      status.textContent = `Analysis completed (run #${runCount}). Open the Console to see the reports.`;
    });
  });
}

// Allow the same file to be tested in Node.js (ignored by the browser)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    Student, studentsList, getStrugglingStudents, applyGraceMarks,
    sumNewAverages, calculateGraceAverage, printGraceCommitteeReport, runAnalysis,
  };
}
