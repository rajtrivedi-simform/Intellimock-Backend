export interface codingQuestionObj {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  experience_level: 'Beginner' | 'Junior' | 'Mid' | 'Senior';
  problem_statement: string;
  example_input: string;
  example_output: string;
  hints: string[];
  follow_up_questions: string[];
  expected_skills: string[];
}
