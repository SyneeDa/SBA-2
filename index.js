// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
  try {
    // Validate that the AssignmentGroup belongs to the correct course
    if (ag.course_id !== course.id) {
      throw new Error(`Assignment Group ${ag.name} does not belong to Course ${course.name}. Mismatching course_id.`);
    }

    const result = [];

    // Loop through each learner submission
    submissions.forEach(submission => {
      const learnerId = submission.learner_id;
      const assignmentId = submission.assignment_id;
      const score = submission.submission.score;

      // Validate if the assignmentId exists in the AssignmentGroup
      const assignment = ag.assignments.find(a => a.id === assignmentId);
      if (!assignment) {
        throw new Error(`Assignment ID ${assignmentId} does not exist in the Assignment Group ${ag.name}.`);
      }

      const submittedAt = new Date(submission.submission.submitted_at);
      const dueAt = new Date(assignment.due_at);

      // Checking if the submission is late
      let isLate = false;
      if (submittedAt > dueAt) {
        isLate = true;
      } else {
        isLate = false;
      }
      // Use switch to check the score category
      let scoreCategory = "";
      switch (true) {
        case (score >= 450):
          scoreCategory = "Excellent";
          break;
        case (score >= 200):
          scoreCategory = "Good";
          break;
        case (score >= 100):
          scoreCategory = "Average";
          break;
        default:
          scoreCategory = "Needs Improvement";
      }
      if(score < 50){
        console.log(`Learner ${learnerId} has a low score on assignment ${assignmentId}`)};
      // Add learner data to the result array
      result.push({
        learnerId,
        assignmentId,
        score,
        isLate
      });
    });

    return result;

  } catch (error) {
    // Catch any errors and log them
    console.error("Error occurred: ", error.message);
    return []; // Optionally return an empty array or handle the error as needed
  }
}


// Calling the function
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

