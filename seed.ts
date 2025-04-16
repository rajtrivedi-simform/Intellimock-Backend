import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.practiceQuestions.deleteMany();

  // Expanded Questions Data (30 Total)
  const questions = [
    // HR Questions
    {
      questionId: `${uuid()}-hr`,
      question: 'Tell me about a time you took initiative at work.',
      type: 'HR',
      skill: 'Leadership',
      level: 'Intermediate (2-5 years)',
    },
    {
      questionId: `${uuid()}-hr`,
      question: 'How do you prioritize tasks when under pressure?',
      type: 'HR',
      skill: 'Time Management',
      level: 'Beginner (0-2 years)',
    },
    {
      questionId: `${uuid()}-hr`,
      question: 'Describe a situation where you resolved a workplace disagreement.',
      type: 'HR',
      skill: 'Conflict Resolution',
      level: 'Advanced (5+ years)',
    },
    {
      questionId: `${uuid()}-hr`,
      question: 'What are your strengths and weaknesses?',
      type: 'HR',
      skill: 'Self-Awareness',
      level: 'Beginner (0-2 years)',
    },
    {
      questionId: `${uuid()}-hr`,
      question: 'Tell me about a time you failed and what you learned from it.',
      type: 'HR',
      skill: 'Resilience',
      level: 'Intermediate (2-5 years)',
    },
    {
      questionId: `${uuid()}-hr`,
      question: 'How do you handle feedback?',
      type: 'HR',
      skill: 'Adaptability',
      level: 'Beginner (0-2 years)',
    },
    {
      questionId: `${uuid()}-hr`,
      question: 'Describe your ideal work environment.',
      type: 'HR',
      skill: 'Work Culture Fit',
      level: 'Intermediate (2-5 years)',
    },
    {
      questionId: `${uuid()}-hr`,
      question: 'How do you stay motivated during repetitive tasks?',
      type: 'HR',
      skill: 'Motivation',
      level: 'Beginner (0-2 years)',
    },
    {
      questionId: `${uuid()}-hr`,
      question: 'Tell me about a time you helped a coworker succeed.',
      type: 'HR',
      skill: 'Teamwork',
      level: 'Intermediate (2-5 years)',
    },
    {
      questionId: `${uuid()}-hr`,
      question: 'What is your approach to handling tight deadlines?',
      type: 'HR',
      skill: 'Stress Management',
      level: 'Advanced (5+ years)',
    },

    // Technical Questions
    {
      questionId: `${uuid()}-technical`,
      question: 'Explain how event loop works in JavaScript.',
      type: 'Technical',
      skill: 'JavaScript',
      level: 'Intermediate (2-5 years)',
    },
    {
      questionId: `${uuid()}-technical`,
      question: 'What are the differences between localStorage and sessionStorage?',
      type: 'Technical',
      skill: 'Web Storage',
      level: 'Beginner (0-2 years)',
    },
    {
      questionId: `${uuid()}-technical`,
      question: 'How would you design a scalable chat application?',
      type: 'Technical',
      skill: 'System Design',
      level: 'Advanced (5+ years)',
    },
    {
      questionId: `${uuid()}-technical`,
      question: 'What are closures in JavaScript?',
      type: 'Technical',
      skill: 'JavaScript',
      level: 'Intermediate (2-5 years)',
    },
    {
      questionId: `${uuid()}-technical`,
      question: 'Explain the SOLID principles of object-oriented design.',
      type: 'Technical',
      skill: 'Software Engineering',
      level: 'Advanced (5+ years)',
    },
    {
      questionId: `${uuid()}-technical`,
      question: 'What is the difference between synchronous and asynchronous programming?',
      type: 'Technical',
      skill: 'Programming Concepts',
      level: 'Beginner (0-2 years)',
    },
    {
      questionId: `${uuid()}-technical`,
      question: 'How would you optimize a slow-running SQL query?',
      type: 'Technical',
      skill: 'Database Optimization',
      level: 'Advanced (5+ years)',
    },
    {
      questionId: `${uuid()}-technical`,
      question: 'What is dependency injection and why is it useful?',
      type: 'Technical',
      skill: 'Software Architecture',
      level: 'Intermediate (2-5 years)',
    },
    {
      questionId: `${uuid()}-technical`,
      question: 'How does a CDN work and why would you use one?',
      type: 'Technical',
      skill: 'Web Performance',
      level: 'Intermediate (2-5 years)',
    },
    {
      questionId: `${uuid()}-technical`,
      question: 'What are web sockets and how are they different from HTTP?',
      type: 'Technical',
      skill: 'Networking',
      level: 'Advanced (5+ years)',
    },

    // Coding Questions
    {
      questionId: `${uuid()}-coding`,
      question: 'Write a Python program to check if a number is prime.',
      type: 'Coding',
      skill: 'Python',
      level: 'Beginner (0-2 years)',
    },
    {
      questionId: `${uuid()}-coding`,
      question: 'Implement a queue using two stacks in Java.',
      type: 'Coding',
      skill: 'Data Structures',
      level: 'Intermediate (2-5 years)',
    },
    {
      questionId: `${uuid()}-coding`,
      question: 'Write a C++ program to detect a cycle in a linked list.',
      type: 'Coding',
      skill: 'Algorithms',
      level: 'Advanced (5+ years)',
    },
    {
      questionId: `${uuid()}-coding`,
      question: 'Write a JavaScript function to flatten a nested array.',
      type: 'Coding',
      skill: 'JavaScript',
      level: 'Intermediate (2-5 years)',
    },
    {
      questionId: `${uuid()}-coding`,
      question: 'Write a Python function to compute the nth Fibonacci number.',
      type: 'Coding',
      skill: 'Recursion',
      level: 'Beginner (0-2 years)',
    },
    {
      questionId: `${uuid()}-coding`,
      question: 'Implement a stack with min() function in constant time.',
      type: 'Coding',
      skill: 'Data Structures',
      level: 'Advanced (5+ years)',
    },
    {
      questionId: `${uuid()}-coding`,
      question: 'Write a program in Java to sort an array using merge sort.',
      type: 'Coding',
      skill: 'Algorithms',
      level: 'Intermediate (2-5 years)',
    },
    {
      questionId: `${uuid()}-coding`,
      question: 'Implement a simple REST API using Node.js and Express.',
      type: 'Coding',
      skill: 'Backend Development',
      level: 'Intermediate (2-5 years)',
    },
    {
      questionId: `${uuid()}-coding`,
      question: 'Write a C++ program to reverse a linked list.',
      type: 'Coding',
      skill: 'C++',
      level: 'Advanced (5+ years)',
    },
    {
      questionId: `${uuid()}-coding`,
      question: 'Write a Python script to read and parse a JSON file.',
      type: 'Coding',
      skill: 'File Handling',
      level: 'Beginner (0-2 years)',
    },
  ];

  // Insert questions into the database
  await prisma.practiceQuestions.createMany({
    data: questions,
  });

  console.log('Practice questions seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
