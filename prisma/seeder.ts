import { PrismaClient } from '@prisma/client';
import { log } from 'console';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const skills = [
    'Python',
    'Django',
    'Docker',
    'GitHub',
    'HTML',
    'Java',
    'Git',
    'Machine Learning',
    'JavaScript',
    'CSS',
    'SQL',
    'React',
    'Node.js',
    'Express',
    'TypeScript',
    'C++',
    'C#',
    'Ruby',
    'Spring Boot',
    'MongoDB',
    'PostgreSQL',
    'REST APIs',
    'GraphQL',
    'Kubernetes',
    'AWS',
    'Azure',
    'Firebase',
    'Linux',
    'Agile',
    'Jenkins',
    'Terraform',
    'Ansible',
    'Flutter',
    'Swift',
    'Objective-C',
    'PHP',
    'Bootstrap',
    'Redux',
    'Sass',
    'Webpack',
    'TensorFlow',
    'PyTorch',
    'Natural Language Processing',
    'Computer Vision',
    'Data Structures',
    'Algorithms',
    'Microservices',
  ];

  for (let index = 0; index < skills.length; index++) {
    const element = skills[index];

    await prisma.skills.create({
      data: {
        skillId: uuid(),
        skillName: element,
        normalisedName: element.toLowerCase(),
      },
    });
  }
}

main()
  .then(async () => {
    log('Seeding Finished');
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    log(error);
    await prisma.$disconnect();
  });
