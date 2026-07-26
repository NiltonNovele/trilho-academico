import { Career, Platform, CareerTip } from '../types';

export const careers: Career[] = [
  // Technology Careers (15 roles)
  {
    id: '1',
    title: 'Full Stack Developer',
    description: 'Build complete web applications using both frontend and backend technologies',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'Databases', 'Git', 'Problem Solving', 'Communication'],
    averageSalary: '$75,000 - $120,000',
    salaryRange: '$60,000 - $150,000',
    jobOutlook: 'Excellent (22% growth)',
    category: 'Technology',
    matchScore: 0,
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'freeCodeCamp', url: 'https://freecodecamp.org', type: 'course', price: 'Free' },
      { name: 'The Odin Project', url: 'https://theodinproject.com', type: 'course', price: 'Free' },
      { name: 'Codecademy', url: 'https://codecademy.com', type: 'course', price: '$15.99/month' }
    ]
  },
  {
    id: '2',
    title: 'Data Scientist',
    description: 'Analyze complex data to help organizations make informed decisions using machine learning and statistics',
    requiredSkills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization', 'Critical Thinking', 'Research'],
    averageSalary: '$95,000 - $140,000',
    salaryRange: '$70,000 - $180,000',
    jobOutlook: 'Excellent (35% growth)',
    category: 'Technology',
    matchScore: 0,
    techStack: ['Python', 'R', 'TensorFlow', 'Pandas', 'Jupyter'],
    remoteWork: true,
    entryLevel: false,
    learningPlatforms: [
      { name: 'Coursera Data Science', url: 'https://coursera.org', type: 'course', price: '$49/month' },
      { name: 'Kaggle Learn', url: 'https://kaggle.com/learn', type: 'course', price: 'Free' },
      { name: 'DataCamp', url: 'https://datacamp.com', type: 'course', price: '$25/month' }
    ]
  },
  {
    id: '3',
    title: 'Frontend Developer',
    description: 'Create user interfaces and experiences for web applications using modern frameworks',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'UI/UX Design', 'Responsive Design', 'Problem Solving'],
    averageSalary: '$65,000 - $100,000',
    salaryRange: '$50,000 - $130,000',
    jobOutlook: 'Very Good (13% growth)',
    category: 'Technology',
    matchScore: 0,
    techStack: ['React', 'Vue.js', 'Angular', 'Sass', 'Webpack'],
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Frontend Masters', url: 'https://frontendmasters.com', type: 'course', price: '$39/month' },
      { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', type: 'course', price: 'Free' }
    ]
  },
  {
    id: '4',
    title: 'Backend Developer',
    description: 'Build server-side applications, APIs, and database systems that power web applications',
    requiredSkills: ['Python', 'Java', 'Node.js', 'Databases', 'API Development', 'System Design', 'Problem Solving'],
    averageSalary: '$70,000 - $115,000',
    salaryRange: '$55,000 - $140,000',
    jobOutlook: 'Excellent (22% growth)',
    category: 'Technology',
    matchScore: 0,
    techStack: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Node.js Documentation', url: 'https://nodejs.org', type: 'course', price: 'Free' },
      { name: 'Python.org Tutorial', url: 'https://python.org', type: 'course', price: 'Free' }
    ]
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    description: 'Automate deployment processes and manage infrastructure for software development teams',
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Automation', 'System Administration'],
    averageSalary: '$85,000 - $130,000',
    salaryRange: '$70,000 - $160,000',
    jobOutlook: 'Excellent (25% growth)',
    category: 'Technology',
    matchScore: 0,
    techStack: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'AWS'],
    remoteWork: true,
    entryLevel: false,
    learningPlatforms: [
      { name: 'AWS Training', url: 'https://aws.amazon.com/training', type: 'certification', price: '$150-$300' },
      { name: 'Docker Documentation', url: 'https://docs.docker.com', type: 'course', price: 'Free' }
    ]
  },
  {
    id: '6',
    title: 'Mobile App Developer',
    description: 'Create mobile applications for iOS and Android platforms using native or cross-platform technologies',
    requiredSkills: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Mobile UI Design', 'App Store Optimization'],
    averageSalary: '$70,000 - $110,000',
    salaryRange: '$55,000 - $135,000',
    jobOutlook: 'Very Good (22% growth)',
    category: 'Technology',
    matchScore: 0,
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'React Native Docs', url: 'https://reactnative.dev', type: 'course', price: 'Free' },
      { name: 'Flutter Documentation', url: 'https://flutter.dev', type: 'course', price: 'Free' }
    ]
  },
  {
    id: '7',
    title: 'Cybersecurity Analyst',
    description: 'Protect organizations from cyber threats by monitoring, detecting, and responding to security incidents',
    requiredSkills: ['Network Security', 'Incident Response', 'Risk Assessment', 'Security Tools', 'Compliance', 'Critical Thinking'],
    averageSalary: '$80,000 - $120,000',
    salaryRange: '$60,000 - $150,000',
    jobOutlook: 'Excellent (33% growth)',
    category: 'Technology',
    matchScore: 0,
    techStack: ['SIEM Tools', 'Wireshark', 'Metasploit', 'Nessus', 'Splunk'],
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'CompTIA Security+', url: 'https://comptia.org', type: 'certification', price: '$370' },
      { name: 'Cybrary', url: 'https://cybrary.it', type: 'course', price: 'Free-$59/month' }
    ]
  },
  {
    id: '8',
    title: 'Cloud Architect',
    description: 'Design and implement cloud computing strategies and infrastructure for organizations',
    requiredSkills: ['AWS', 'Azure', 'Google Cloud', 'System Architecture', 'Networking', 'Security', 'Leadership'],
    averageSalary: '$120,000 - $180,000',
    salaryRange: '$100,000 - $220,000',
    jobOutlook: 'Excellent (30% growth)',
    category: 'Technology',
    matchScore: 0,
    techStack: ['AWS', 'Azure', 'Terraform', 'Kubernetes', 'Microservices'],
    remoteWork: true,
    entryLevel: false,
    learningPlatforms: [
      { name: 'AWS Solutions Architect', url: 'https://aws.amazon.com/certification', type: 'certification', price: '$150' },
      { name: 'Azure Architect', url: 'https://docs.microsoft.com/azure', type: 'certification', price: '$165' }
    ]
  },
  {
    id: '9',
    title: 'AI/ML Engineer',
    description: 'Develop and deploy artificial intelligence and machine learning models for real-world applications',
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'Neural Networks', 'Mathematics', 'Research'],
    averageSalary: '$110,000 - $160,000',
    salaryRange: '$90,000 - $200,000',
    jobOutlook: 'Excellent (40% growth)',
    category: 'Technology',
    matchScore: 0,
    techStack: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Jupyter'],
    remoteWork: true,
    entryLevel: false,
    learningPlatforms: [
      { name: 'Fast.ai', url: 'https://fast.ai', type: 'course', price: 'Free' },
      { name: 'Coursera ML Specialization', url: 'https://coursera.org', type: 'course', price: '$49/month' }
    ]
  },
  {
    id: '10',
    title: 'Product Manager',
    description: 'Guide product development from conception to launch, working with cross-functional teams',
    requiredSkills: ['Product Strategy', 'Market Research', 'User Experience', 'Data Analysis', 'Communication', 'Leadership'],
    averageSalary: '$90,000 - $140,000',
    salaryRange: '$70,000 - $180,000',
    jobOutlook: 'Very Good (19% growth)',
    category: 'Technology',
    matchScore: 0,
    remoteWork: true,
    entryLevel: false,
    learningPlatforms: [
      { name: 'Product School', url: 'https://productschool.com', type: 'course', price: '$3,999' },
      { name: 'Coursera Product Management', url: 'https://coursera.org', type: 'course', price: '$49/month' }
    ]
  },
  {
    id: '11',
    title: 'QA Engineer',
    description: 'Ensure software quality through testing, automation, and quality assurance processes',
    requiredSkills: ['Testing Methodologies', 'Automation Tools', 'Bug Tracking', 'Selenium', 'Attention to Detail'],
    averageSalary: '$60,000 - $90,000',
    salaryRange: '$45,000 - $110,000',
    jobOutlook: 'Good (9% growth)',
    category: 'Technology',
    matchScore: 0,
    techStack: ['Selenium', 'Jest', 'Cypress', 'Postman', 'JIRA'],
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Test Automation University', url: 'https://testautomationu.applitools.com', type: 'course', price: 'Free' },
      { name: 'ISTQB Certification', url: 'https://istqb.org', type: 'certification', price: '$250' }
    ]
  },
  {
    id: '12',
    title: 'Database Administrator',
    description: 'Manage and maintain database systems, ensuring data integrity, security, and performance',
    requiredSkills: ['SQL', 'Database Design', 'Performance Tuning', 'Backup & Recovery', 'Security', 'Problem Solving'],
    averageSalary: '$75,000 - $105,000',
    salaryRange: '$60,000 - $130,000',
    jobOutlook: 'Good (8% growth)',
    category: 'Technology',
    matchScore: 0,
    techStack: ['MySQL', 'PostgreSQL', 'Oracle', 'MongoDB', 'Redis'],
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Oracle Certification', url: 'https://education.oracle.com', type: 'certification', price: '$245' },
      { name: 'PostgreSQL Tutorial', url: 'https://postgresql.org', type: 'course', price: 'Free' }
    ]
  },
  {
    id: '13',
    title: 'Systems Administrator',
    description: 'Maintain and configure computer systems, servers, and networks for organizations',
    requiredSkills: ['Linux', 'Windows Server', 'Networking', 'Scripting', 'Troubleshooting', 'System Monitoring'],
    averageSalary: '$65,000 - $95,000',
    salaryRange: '$50,000 - $120,000',
    jobOutlook: 'Good (4% growth)',
    category: 'Technology',
    matchScore: 0,
    techStack: ['Linux', 'Windows Server', 'VMware', 'PowerShell', 'Bash'],
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Linux Academy', url: 'https://linuxacademy.com', type: 'course', price: '$29/month' },
      { name: 'Microsoft Learn', url: 'https://docs.microsoft.com/learn', type: 'course', price: 'Free' }
    ]
  },
  {
    id: '14',
    title: 'Software Architect',
    description: 'Design high-level software structures and make technical decisions for large-scale applications',
    requiredSkills: ['System Design', 'Software Architecture', 'Leadership', 'Multiple Programming Languages', 'Design Patterns'],
    averageSalary: '$130,000 - $180,000',
    salaryRange: '$110,000 - $220,000',
    jobOutlook: 'Excellent (22% growth)',
    category: 'Technology',
    matchScore: 0,
    remoteWork: true,
    entryLevel: false,
    learningPlatforms: [
      { name: 'Software Architecture Courses', url: 'https://coursera.org', type: 'course', price: '$49/month' },
      { name: 'Clean Architecture Book', url: 'https://amazon.com', type: 'course', price: '$30' }
    ]
  },
  {
    id: '15',
    title: 'Technical Writer',
    description: 'Create clear documentation, user guides, and technical content for software products',
    requiredSkills: ['Technical Writing', 'Documentation Tools', 'Communication', 'Research', 'Attention to Detail'],
    averageSalary: '$55,000 - $85,000',
    salaryRange: '$45,000 - $105,000',
    jobOutlook: 'Good (12% growth)',
    category: 'Technology',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Google Technical Writing', url: 'https://developers.google.com/tech-writing', type: 'course', price: 'Free' },
      { name: 'Society for Technical Communication', url: 'https://stc.org', type: 'certification', price: '$400' }
    ]
  },

  // Design Careers (8 roles)
  {
    id: '16',
    title: 'UX/UI Designer',
    description: 'Design user-friendly interfaces and experiences for digital products',
    requiredSkills: ['Design Thinking', 'Figma', 'User Research', 'Prototyping', 'Visual Design', 'Empathy', 'Communication'],
    averageSalary: '$65,000 - $110,000',
    salaryRange: '$50,000 - $140,000',
    jobOutlook: 'Very Good (13% growth)',
    category: 'Design',
    matchScore: 0,
    techStack: ['Figma', 'Adobe Creative Suite', 'Sketch', 'InVision', 'Principle'],
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Google UX Design Certificate', url: 'https://coursera.org', type: 'certification', price: '$49/month' },
      { name: 'Interaction Design Foundation', url: 'https://interaction-design.org', type: 'course', price: '$16/month' }
    ]
  },
  {
    id: '17',
    title: 'Graphic Designer',
    description: 'Create visual content for print and digital media including logos, brochures, and websites',
    requiredSkills: ['Adobe Creative Suite', 'Typography', 'Color Theory', 'Layout Design', 'Brand Identity', 'Creativity'],
    averageSalary: '$45,000 - $70,000',
    salaryRange: '$35,000 - $90,000',
    jobOutlook: 'Good (3% growth)',
    category: 'Design',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Adobe Certified Expert', url: 'https://adobe.com/certification', type: 'certification', price: '$150' },
      { name: 'Skillshare Design', url: 'https://skillshare.com', type: 'course', price: '$14/month' }
    ]
  },
  {
    id: '18',
    title: 'Product Designer',
    description: 'Design end-to-end product experiences from research to final implementation',
    requiredSkills: ['User Research', 'Design Systems', 'Prototyping', 'Visual Design', 'Product Strategy', 'Collaboration'],
    averageSalary: '$75,000 - $120,000',
    salaryRange: '$60,000 - $150,000',
    jobOutlook: 'Excellent (13% growth)',
    category: 'Design',
    matchScore: 0,
    remoteWork: true,
    entryLevel: false,
    learningPlatforms: [
      { name: 'Designlab', url: 'https://designlab.com', type: 'bootcamp', price: '$4,999' },
      { name: 'IDEO Design Kit', url: 'https://designkit.org', type: 'course', price: 'Free' }
    ]
  },
  {
    id: '19',
    title: 'Motion Graphics Designer',
    description: 'Create animated graphics and visual effects for video, web, and interactive media',
    requiredSkills: ['After Effects', 'Cinema 4D', 'Animation Principles', 'Video Editing', 'Storytelling', 'Creativity'],
    averageSalary: '$55,000 - $85,000',
    salaryRange: '$40,000 - $110,000',
    jobOutlook: 'Good (4% growth)',
    category: 'Design',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'School of Motion', url: 'https://schoolofmotion.com', type: 'course', price: '$997-$1,997' },
      { name: 'Adobe After Effects Tutorials', url: 'https://adobe.com', type: 'course', price: 'Free' }
    ]
  },
  {
    id: '20',
    title: 'Web Designer',
    description: 'Design and create visually appealing and functional websites',
    requiredSkills: ['HTML', 'CSS', 'Web Design Principles', 'Responsive Design', 'Adobe Creative Suite', 'User Experience'],
    averageSalary: '$50,000 - $80,000',
    salaryRange: '$40,000 - $100,000',
    jobOutlook: 'Good (8% growth)',
    category: 'Design',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Webflow University', url: 'https://university.webflow.com', type: 'course', price: 'Free' },
      { name: 'Awwwards Courses', url: 'https://awwwards.com', type: 'course', price: '$19-$99' }
    ]
  },
  {
    id: '21',
    title: 'Brand Designer',
    description: 'Develop visual brand identities and ensure consistent brand representation across all media',
    requiredSkills: ['Brand Strategy', 'Logo Design', 'Typography', 'Color Theory', 'Marketing Knowledge', 'Creative Thinking'],
    averageSalary: '$55,000 - $90,000',
    salaryRange: '$45,000 - $115,000',
    jobOutlook: 'Good (3% growth)',
    category: 'Design',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Brand New School', url: 'https://underconsideration.com', type: 'course', price: 'Free' },
      { name: 'Coursera Brand Design', url: 'https://coursera.org', type: 'course', price: '$49/month' }
    ]
  },
  {
    id: '22',
    title: 'Interior Designer',
    description: 'Plan and design interior spaces for residential and commercial properties',
    requiredSkills: ['Space Planning', 'Color Theory', 'CAD Software', 'Project Management', 'Client Communication', 'Creativity'],
    averageSalary: '$50,000 - $75,000',
    salaryRange: '$35,000 - $95,000',
    jobOutlook: 'Good (4% growth)',
    category: 'Design',
    matchScore: 0,
    remoteWork: false,
    entryLevel: true,
    learningPlatforms: [
      { name: 'NCIDQ Certification', url: 'https://ncidq.org', type: 'certification', price: '$695' },
      { name: 'AutoCAD for Interior Design', url: 'https://autodesk.com', type: 'course', price: '$200/month' }
    ]
  },
  {
    id: '23',
    title: 'Game Designer',
    description: 'Design gameplay mechanics, levels, and user experiences for video games',
    requiredSkills: ['Game Design Theory', 'Level Design', 'Scripting', 'Player Psychology', 'Creativity', 'Problem Solving'],
    averageSalary: '$60,000 - $95,000',
    salaryRange: '$45,000 - $120,000',
    jobOutlook: 'Good (3% growth)',
    category: 'Design',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Unity Learn', url: 'https://learn.unity.com', type: 'course', price: 'Free' },
      { name: 'Game Design Workshop', url: 'https://fullsail.edu', type: 'course', price: '$2,000' }
    ]
  },

  // Healthcare Careers (10 roles)
  {
    id: '24',
    title: 'Registered Nurse',
    description: 'Provide patient care and support in hospitals, clinics, and healthcare facilities',
    requiredSkills: ['Patient Care', 'Medical Knowledge', 'Communication', 'Critical Thinking', 'Compassion', 'Attention to Detail'],
    averageSalary: '$70,000 - $85,000',
    salaryRange: '$55,000 - $100,000',
    jobOutlook: 'Excellent (7% growth)',
    category: 'Healthcare',
    matchScore: 0,
    remoteWork: false,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Nursing School Programs', url: 'https://nursing.org', type: 'university', price: '$20,000 - $80,000' },
      { name: 'Khan Academy NCLEX', url: 'https://khanacademy.org', type: 'course', price: 'Free' }
    ]
  },
  {
    id: '25',
    title: 'Physical Therapist',
    description: 'Help patients recover from injuries and improve their physical mobility',
    requiredSkills: ['Anatomy', 'Exercise Physiology', 'Patient Assessment', 'Treatment Planning', 'Communication', 'Empathy'],
    averageSalary: '$85,000 - $95,000',
    salaryRange: '$70,000 - $110,000',
    jobOutlook: 'Excellent (18% growth)',
    category: 'Healthcare',
    matchScore: 0,
    remoteWork: false,
    entryLevel: false,
    learningPlatforms: [
      { name: 'DPT Programs', url: 'https://apta.org', type: 'university', price: '$50,000 - $120,000' },
      { name: 'MedBridge Education', url: 'https://medbridge.com', type: 'course', price: '$299/year' }
    ]
  },
  {
    id: '26',
    title: 'Medical Assistant',
    description: 'Support healthcare providers with clinical and administrative tasks',
    requiredSkills: ['Medical Terminology', 'Patient Care', 'Administrative Skills', 'Communication', 'Organization', 'Multitasking'],
    averageSalary: '$35,000 - $45,000',
    salaryRange: '$28,000 - $55,000',
    jobOutlook: 'Excellent (19% growth)',
    category: 'Healthcare',
    matchScore: 0,
    remoteWork: false,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Medical Assistant Programs', url: 'https://aama-ntl.org', type: 'certification', price: '$1,000 - $5,000' },
      { name: 'Penn Foster Medical Assistant', url: 'https://pennfoster.edu', type: 'course', price: '$2,999' }
    ]
  },
  {
    id: '27',
    title: 'Pharmacist',
    description: 'Dispense medications and provide pharmaceutical care to patients',
    requiredSkills: ['Pharmaceutical Knowledge', 'Patient Counseling', 'Attention to Detail', 'Communication', 'Chemistry', 'Ethics'],
    averageSalary: '$120,000 - $140,000',
    salaryRange: '$100,000 - $165,000',
    jobOutlook: 'Good (-3% growth)',
    category: 'Healthcare',
    matchScore: 0,
    remoteWork: false,
    entryLevel: false,
    learningPlatforms: [
      { name: 'PharmD Programs', url: 'https://aacp.org', type: 'university', price: '$80,000 - $200,000' },
      { name: 'NAPLEX Prep', url: 'https://nabp.pharmacy', type: 'certification', price: '$505' }
    ]
  },
  {
    id: '28',
    title: 'Mental Health Counselor',
    description: 'Provide therapy and counseling services to individuals with mental health challenges',
    requiredSkills: ['Psychology', 'Active Listening', 'Empathy', 'Communication', 'Crisis Intervention', 'Ethics'],
    averageSalary: '$45,000 - $70,000',
    salaryRange: '$35,000 - $85,000',
    jobOutlook: 'Excellent (25% growth)',
    category: 'Healthcare',
    matchScore: 0,
    remoteWork: true,
    entryLevel: false,
    learningPlatforms: [
      { name: 'Master\'s in Counseling', url: 'https://cacrep.org', type: 'university', price: '$30,000 - $80,000' },
      { name: 'LPC Certification', url: 'https://nbcc.org', type: 'certification', price: '$275' }
    ]
  },
  {
    id: '29',
    title: 'Medical Laboratory Technician',
    description: 'Perform laboratory tests and analyze samples to assist in medical diagnosis',
    requiredSkills: ['Laboratory Techniques', 'Attention to Detail', 'Scientific Knowledge', 'Equipment Operation', 'Data Analysis'],
    averageSalary: '$50,000 - $65,000',
    salaryRange: '$40,000 - $80,000',
    jobOutlook: 'Good (7% growth)',
    category: 'Healthcare',
    matchScore: 0,
    remoteWork: false,
    entryLevel: true,
    learningPlatforms: [
      { name: 'MLT Certification Programs', url: 'https://naacls.org', type: 'certification', price: '$5,000 - $15,000' },
      { name: 'ASCP Certification', url: 'https://ascp.org', type: 'certification', price: '$230' }
    ]
  },
  {
    id: '30',
    title: 'Radiologic Technologist',
    description: 'Operate imaging equipment to create diagnostic images for medical purposes',
    requiredSkills: ['Medical Imaging', 'Equipment Operation', 'Patient Care', 'Radiation Safety', 'Attention to Detail'],
    averageSalary: '$55,000 - $70,000',
    salaryRange: '$45,000 - $85,000',
    jobOutlook: 'Good (7% growth)',
    category: 'Healthcare',
    matchScore: 0,
    remoteWork: false,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Radiologic Technology Programs', url: 'https://jrcert.org', type: 'certification', price: '$10,000 - $30,000' },
      { name: 'ARRT Certification', url: 'https://arrt.org', type: 'certification', price: '$200' }
    ]
  },
  {
    id: '31',
    title: 'Occupational Therapist',
    description: 'Help patients develop or recover skills needed for daily living and working',
    requiredSkills: ['Patient Assessment', 'Treatment Planning', 'Adaptive Equipment', 'Communication', 'Problem Solving', 'Empathy'],
    averageSalary: '$80,000 - $95,000',
    salaryRange: '$65,000 - $115,000',
    jobOutlook: 'Excellent (17% growth)',
    category: 'Healthcare',
    matchScore: 0,
    remoteWork: false,
    entryLevel: false,
    learningPlatforms: [
      { name: 'OT Master\'s Programs', url: 'https://aota.org', type: 'university', price: '$40,000 - $100,000' },
      { name: 'NBCOT Certification', url: 'https://nbcot.org', type: 'certification', price: '$540' }
    ]
  },
  {
    id: '32',
    title: 'Dental Hygienist',
    description: 'Provide preventive dental care and educate patients about oral health',
    requiredSkills: ['Dental Procedures', 'Patient Education', 'Attention to Detail', 'Manual Dexterity', 'Communication'],
    averageSalary: '$70,000 - $85,000',
    salaryRange: '$55,000 - $100,000',
    jobOutlook: 'Excellent (6% growth)',
    category: 'Healthcare',
    matchScore: 0,
    remoteWork: false,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Dental Hygiene Programs', url: 'https://adha.org', type: 'certification', price: '$15,000 - $40,000' },
      { name: 'NBDHE Exam Prep', url: 'https://ada.org', type: 'certification', price: '$400' }
    ]
  },
  {
    id: '33',
    title: 'Health Information Technician',
    description: 'Manage and organize health information data in medical records systems',
    requiredSkills: ['Medical Coding', 'Health Information Systems', 'Data Management', 'Attention to Detail', 'Privacy Laws'],
    averageSalary: '$40,000 - $55,000',
    salaryRange: '$30,000 - $70,000',
    jobOutlook: 'Good (8% growth)',
    category: 'Healthcare',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'AHIMA Certification', url: 'https://ahima.org', type: 'certification', price: '$399' },
      { name: 'Medical Coding Programs', url: 'https://aapc.com', type: 'certification', price: '$1,999' }
    ]
  },

  // Business & Finance Careers (10 roles)
  {
    id: '34',
    title: 'Marketing Manager',
    description: 'Develop and execute marketing strategies to promote products and services',
    requiredSkills: ['Marketing Strategy', 'Digital Marketing', 'Analytics', 'Communication', 'Project Management', 'Creativity'],
    averageSalary: '$65,000 - $95,000',
    salaryRange: '$50,000 - $120,000',
    jobOutlook: 'Good (10% growth)',
    category: 'Business',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Google Digital Marketing', url: 'https://skillshop.withgoogle.com', type: 'certification', price: 'Free' },
      { name: 'HubSpot Academy', url: 'https://academy.hubspot.com', type: 'certification', price: 'Free' }
    ]
  },
  {
    id: '35',
    title: 'Financial Analyst',
    description: 'Analyze financial data to help organizations make investment and business decisions',
    requiredSkills: ['Financial Modeling', 'Excel', 'Data Analysis', 'Accounting', 'Communication', 'Critical Thinking'],
    averageSalary: '$60,000 - $85,000',
    salaryRange: '$45,000 - $110,000',
    jobOutlook: 'Good (6% growth)',
    category: 'Business',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'CFA Institute', url: 'https://cfainstitute.org', type: 'certification', price: '$1,000 - $3,000' },
      { name: 'Wall Street Prep', url: 'https://wallstreetprep.com', type: 'course', price: '$499 - $999' }
    ]
  },
  {
    id: '36',
    title: 'Human Resources Manager',
    description: 'Oversee recruitment, employee relations, and organizational development',
    requiredSkills: ['HR Policies', 'Recruitment', 'Employee Relations', 'Communication', 'Leadership', 'Conflict Resolution'],
    averageSalary: '$70,000 - $100,000',
    salaryRange: '$55,000 - $130,000',
    jobOutlook: 'Good (9% growth)',
    category: 'Business',
    matchScore: 0,
    remoteWork: true,
    entryLevel: false,
    learningPlatforms: [
      { name: 'SHRM Certification', url: 'https://shrm.org', type: 'certification', price: '$300 - $400' },
      { name: 'Coursera HR Management', url: 'https://coursera.org', type: 'course', price: '$49/month' }
    ]
  },
  {
    id: '37',
    title: 'Sales Representative',
    description: 'Sell products or services to customers and build client relationships',
    requiredSkills: ['Sales Techniques', 'Communication', 'Relationship Building', 'Negotiation', 'Product Knowledge', 'Persistence'],
    averageSalary: '$45,000 - $75,000',
    salaryRange: '$35,000 - $100,000+',
    jobOutlook: 'Good (4% growth)',
    category: 'Business',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Salesforce Trailhead', url: 'https://trailhead.salesforce.com', type: 'certification', price: 'Free' },
      { name: 'HubSpot Sales Certification', url: 'https://academy.hubspot.com', type: 'certification', price: 'Free' }
    ]
  },
  {
    id: '38',
    title: 'Business Analyst',
    description: 'Analyze business processes and recommend improvements to increase efficiency',
    requiredSkills: ['Business Analysis', 'Process Improvement', 'Data Analysis', 'Communication', 'Problem Solving', 'Documentation'],
    averageSalary: '$65,000 - $90,000',
    salaryRange: '$50,000 - $115,000',
    jobOutlook: 'Good (14% growth)',
    category: 'Business',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'IIBA Certification', url: 'https://iiba.org', type: 'certification', price: '$325' },
      { name: 'Coursera Business Analysis', url: 'https://coursera.org', type: 'course', price: '$49/month' }
    ]
  },
  {
    id: '39',
    title: 'Accountant',
    description: 'Prepare and examine financial records and ensure compliance with regulations',
    requiredSkills: ['Accounting Principles', 'Financial Reporting', 'Tax Preparation', 'Attention to Detail', 'Excel', 'Ethics'],
    averageSalary: '$55,000 - $75,000',
    salaryRange: '$40,000 - $95,000',
    jobOutlook: 'Good (4% growth)',
    category: 'Business',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'CPA Certification', url: 'https://aicpa.org', type: 'certification', price: '$1,000 - $3,000' },
      { name: 'QuickBooks Certification', url: 'https://quickbooks.intuit.com', type: 'certification', price: 'Free' }
    ]
  },
  {
    id: '40',
    title: 'Operations Manager',
    description: 'Oversee daily operations and ensure efficient business processes',
    requiredSkills: ['Operations Management', 'Leadership', 'Process Improvement', 'Project Management', 'Problem Solving', 'Communication'],
    averageSalary: '$75,000 - $105,000',
    salaryRange: '$60,000 - $135,000',
    jobOutlook: 'Good (6% growth)',
    category: 'Business',
    matchScore: 0,
    remoteWork: true,
    entryLevel: false,
    learningPlatforms: [
      { name: 'PMP Certification', url: 'https://pmi.org', type: 'certification', price: '$405 - $555' },
      { name: 'Lean Six Sigma', url: 'https://iassc.org', type: 'certification', price: '$295' }
    ]
  },
  {
    id: '41',
    title: 'Investment Advisor',
    description: 'Provide financial planning and investment advice to clients',
    requiredSkills: ['Financial Planning', 'Investment Knowledge', 'Client Relations', 'Risk Assessment', 'Communication', 'Ethics'],
    averageSalary: '$80,000 - $120,000',
    salaryRange: '$50,000 - $200,000+',
    jobOutlook: 'Good (4% growth)',
    category: 'Business',
    matchScore: 0,
    remoteWork: true,
    entryLevel: false,
    learningPlatforms: [
      { name: 'CFP Certification', url: 'https://cfp.net', type: 'certification', price: '$695' },
      { name: 'Series 7 License', url: 'https://finra.org', type: 'certification', price: '$300' }
    ]
  },
  {
    id: '42',
    title: 'Supply Chain Manager',
    description: 'Coordinate and optimize the flow of goods from suppliers to customers',
    requiredSkills: ['Supply Chain Management', 'Logistics', 'Vendor Relations', 'Data Analysis', 'Problem Solving', 'Negotiation'],
    averageSalary: '$70,000 - $100,000',
    salaryRange: '$55,000 - $130,000',
    jobOutlook: 'Good (4% growth)',
    category: 'Business',
    matchScore: 0,
    remoteWork: true,
    entryLevel: false,
    learningPlatforms: [
      { name: 'APICS Certification', url: 'https://apics.org', type: 'certification', price: '$695' },
      { name: 'MIT Supply Chain', url: 'https://mitxpro.mit.edu', type: 'course', price: '$2,500' }
    ]
  },
  {
    id: '43',
    title: 'Management Consultant',
    description: 'Advise organizations on management and operational improvements',
    requiredSkills: ['Strategic Thinking', 'Problem Solving', 'Communication', 'Data Analysis', 'Project Management', 'Leadership'],
    averageSalary: '$90,000 - $140,000',
    salaryRange: '$70,000 - $200,000+',
    jobOutlook: 'Excellent (14% growth)',
    category: 'Business',
    matchScore: 0,
    remoteWork: true,
    entryLevel: false,
    learningPlatforms: [
      { name: 'McKinsey Academy', url: 'https://mckinsey.com', type: 'course', price: '$1,500' },
      { name: 'Case Interview Prep', url: 'https://caseinterview.com', type: 'course', price: '$200' }
    ]
  },

  // Education Careers (6 roles)
  {
    id: '44',
    title: 'Elementary School Teacher',
    description: 'Educate and nurture young students in foundational academic subjects',
    requiredSkills: ['Teaching', 'Classroom Management', 'Curriculum Development', 'Communication', 'Patience', 'Creativity'],
    averageSalary: '$45,000 - $65,000',
    salaryRange: '$35,000 - $80,000',
    jobOutlook: 'Good (4% growth)',
    category: 'Education',
    matchScore: 0,
    remoteWork: false,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Teacher Education Programs', url: 'https://teach.org', type: 'university', price: '$20,000 - $60,000' },
      { name: 'Coursera Teaching', url: 'https://coursera.org', type: 'course', price: '$49/month' }
    ]
  },
  {
    id: '45',
    title: 'High School Teacher',
    description: 'Teach specific subjects to high school students and prepare them for college or careers',
    requiredSkills: ['Subject Expertise', 'Teaching', 'Classroom Management', 'Communication', 'Mentoring', 'Assessment'],
    averageSalary: '$50,000 - $70,000',
    salaryRange: '$40,000 - $85,000',
    jobOutlook: 'Good (4% growth)',
    category: 'Education',
    matchScore: 0,
    remoteWork: false,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Teaching License Programs', url: 'https://teach.org', type: 'university', price: '$20,000 - $60,000' },
      { name: 'Subject-Specific Certifications', url: 'https://nbpts.org', type: 'certification', price: '$500' }
    ]
  },
  {
    id: '46',
    title: 'Instructional Designer',
    description: 'Create educational content and learning experiences for various audiences',
    requiredSkills: ['Learning Theory', 'Content Creation', 'E-learning Tools', 'Project Management', 'Assessment Design', 'Technology'],
    averageSalary: '$55,000 - $75,000',
    salaryRange: '$45,000 - $90,000',
    jobOutlook: 'Good (6% growth)',
    category: 'Education',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'ATD Certification', url: 'https://td.org', type: 'certification', price: '$1,500 - $3,000' },
      { name: 'Coursera Instructional Design', url: 'https://coursera.org', type: 'course', price: '$49/month' }
    ]
  },
  {
    id: '47',
    title: 'School Counselor',
    description: 'Provide academic, career, and personal counseling to students',
    requiredSkills: ['Counseling', 'Active Listening', 'Empathy', 'Communication', 'Crisis Intervention', 'Student Development'],
    averageSalary: '$50,000 - $70,000',
    salaryRange: '$40,000 - $85,000',
    jobOutlook: 'Good (8% growth)',
    category: 'Education',
    matchScore: 0,
    remoteWork: false,
    entryLevel: false,
    learningPlatforms: [
      { name: 'School Counseling Programs', url: 'https://schoolcounselor.org', type: 'university', price: '$30,000 - $70,000' },
      { name: 'ASCA Certification', url: 'https://schoolcounselor.org', type: 'certification', price: '$200' }
    ]
  },
  {
    id: '48',
    title: 'Corporate Trainer',
    description: 'Design and deliver training programs for employees in corporate settings',
    requiredSkills: ['Training Design', 'Public Speaking', 'Adult Learning', 'Communication', 'Subject Matter Expertise', 'Technology'],
    averageSalary: '$55,000 - $80,000',
    salaryRange: '$45,000 - $100,000',
    jobOutlook: 'Good (9% growth)',
    category: 'Education',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'ATD Certification', url: 'https://td.org', type: 'certification', price: '$1,500' },
      { name: 'Train-the-Trainer Programs', url: 'https://dale-carnegie.com', type: 'course', price: '$2,000' }
    ]
  },
  {
    id: '49',
    title: 'Educational Administrator',
    description: 'Manage educational institutions and oversee academic programs',
    requiredSkills: ['Leadership', 'Educational Policy', 'Budget Management', 'Communication', 'Strategic Planning', 'Problem Solving'],
    averageSalary: '$80,000 - $120,000',
    salaryRange: '$60,000 - $150,000',
    jobOutlook: 'Good (4% growth)',
    category: 'Education',
    matchScore: 0,
    remoteWork: false,
    entryLevel: false,
    learningPlatforms: [
      { name: 'Educational Leadership Programs', url: 'https://aasa.org', type: 'university', price: '$40,000 - $80,000' },
      { name: 'Principal Certification', url: 'https://naesp.org', type: 'certification', price: '$500' }
    ]
  },

  // Engineering Careers (6 roles)
  {
    id: '50',
    title: 'Civil Engineer',
    description: 'Design and oversee construction of infrastructure projects like roads, bridges, and buildings',
    requiredSkills: ['Engineering Design', 'CAD Software', 'Project Management', 'Mathematics', 'Problem Solving', 'Safety Regulations'],
    averageSalary: '$70,000 - $90,000',
    salaryRange: '$55,000 - $115,000',
    jobOutlook: 'Good (8% growth)',
    category: 'Engineering',
    matchScore: 0,
    remoteWork: false,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Engineering Degree Programs', url: 'https://abet.org', type: 'university', price: '$40,000 - $100,000' },
      { name: 'PE License Prep', url: 'https://ncees.org', type: 'certification', price: '$375 - $500' }
    ]
  },
  {
    id: '51',
    title: 'Mechanical Engineer',
    description: 'Design, develop, and test mechanical devices and systems',
    requiredSkills: ['Mechanical Design', 'CAD Software', 'Thermodynamics', 'Materials Science', 'Problem Solving', 'Mathematics'],
    averageSalary: '$75,000 - $95,000',
    salaryRange: '$60,000 - $120,000',
    jobOutlook: 'Good (4% growth)',
    category: 'Engineering',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Mechanical Engineering Programs', url: 'https://asme.org', type: 'university', price: '$40,000 - $100,000' },
      { name: 'SolidWorks Certification', url: 'https://solidworks.com', type: 'certification', price: '$295' }
    ]
  },
  {
    id: '52',
    title: 'Electrical Engineer',
    description: 'Design and develop electrical systems and electronic devices',
    requiredSkills: ['Circuit Design', 'Electronics', 'Programming', 'Mathematics', 'Problem Solving', 'Testing'],
    averageSalary: '$80,000 - $105,000',
    salaryRange: '$65,000 - $130,000',
    jobOutlook: 'Good (3% growth)',
    category: 'Engineering',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Electrical Engineering Programs', url: 'https://ieee.org', type: 'university', price: '$40,000 - $100,000' },
      { name: 'IEEE Certifications', url: 'https://ieee.org', type: 'certification', price: '$400' }
    ]
  },
  {
    id: '53',
    title: 'Chemical Engineer',
    description: 'Apply chemistry and engineering principles to solve problems involving chemicals and materials',
    requiredSkills: ['Chemistry', 'Process Design', 'Safety Protocols', 'Mathematics', 'Problem Solving', 'Research'],
    averageSalary: '$85,000 - $110,000',
    salaryRange: '$70,000 - $140,000',
    jobOutlook: 'Good (4% growth)',
    category: 'Engineering',
    matchScore: 0,
    remoteWork: false,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Chemical Engineering Programs', url: 'https://aiche.org', type: 'university', price: '$40,000 - $100,000' },
      { name: 'Process Safety Certification', url: 'https://aiche.org', type: 'certification', price: '$500' }
    ]
  },
  {
    id: '54',
    title: 'Environmental Engineer',
    description: 'Develop solutions to environmental problems using engineering principles',
    requiredSkills: ['Environmental Science', 'Engineering Design', 'Regulations', 'Data Analysis', 'Problem Solving', 'Sustainability'],
    averageSalary: '$70,000 - $90,000',
    salaryRange: '$55,000 - $115,000',
    jobOutlook: 'Good (4% growth)',
    category: 'Engineering',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Environmental Engineering Programs', url: 'https://aaees.org', type: 'university', price: '$40,000 - $100,000' },
      { name: 'EIT Certification', url: 'https://ncees.org', type: 'certification', price: '$175' }
    ]
  },
  {
    id: '55',
    title: 'Biomedical Engineer',
    description: 'Apply engineering principles to healthcare and medical device development',
    requiredSkills: ['Biomedical Knowledge', 'Engineering Design', 'Medical Devices', 'Research', 'Problem Solving', 'Regulations'],
    averageSalary: '$75,000 - $100,000',
    salaryRange: '$60,000 - $125,000',
    jobOutlook: 'Good (5% growth)',
    category: 'Engineering',
    matchScore: 0,
    remoteWork: true,
    entryLevel: true,
    learningPlatforms: [
      { name: 'Biomedical Engineering Programs', url: 'https://bmes.org', type: 'university', price: '$40,000 - $100,000' },
      { name: 'FDA Regulations Course', url: 'https://fda.gov', type: 'course', price: '$500' }
    ]
  }
];

export const internshipPlatforms = [
  {
    name: 'LinkedIn Jobs',
    description: 'Professional networking platform with extensive job and internship listings',
    url: 'https://linkedin.com/jobs',
    category: 'Professional'
  },
  {
    name: 'Indeed',
    description: 'Large job search engine with filters for internships and entry-level positions',
    url: 'https://indeed.com',
    category: 'General'
  },
  {
    name: 'Glassdoor',
    description: 'Job search with company reviews, salary information, and interview insights',
    url: 'https://glassdoor.com',
    category: 'Professional'
  },
  {
    name: 'AngelList (Wellfound)',
    description: 'Startup-focused platform for tech internships and early-career opportunities',
    url: 'https://wellfound.com',
    category: 'Startups'
  },
  {
    name: 'GitHub Jobs',
    description: 'Tech-focused job board integrated with the developer community',
    url: 'https://jobs.github.com',
    category: 'Tech'
  },
  {
    name: 'Stack Overflow Jobs',
    description: 'Developer-focused job board with technical role listings',
    url: 'https://stackoverflow.com/jobs',
    category: 'Tech'
  },
  {
    name: 'Remote.co',
    description: 'Curated remote job listings across various industries',
    url: 'https://remote.co',
    category: 'Remote'
  },
  {
    name: 'Internships.com',
    description: 'Dedicated platform for internship opportunities across all industries',
    url: 'https://internships.com',
    category: 'Internships'
  },
  {
    name: 'WayUp',
    description: 'Platform specifically designed for college students and recent graduates',
    url: 'https://wayup.com',
    category: 'Students'
  },
  {
    name: 'Handshake',
    description: 'University career services platform with exclusive student opportunities',
    url: 'https://handshake.com',
    category: 'Students'
  },
  {
    name: 'ZipRecruiter',
    description: 'AI-powered job matching platform with mobile-first approach',
    url: 'https://ziprecruiter.com',
    category: 'General'
  },
  {
    name: 'CareerBuilder',
    description: 'Comprehensive job search platform with career resources',
    url: 'https://careerbuilder.com',
    category: 'General'
  }
];

export const careerTips: CareerTip[] = [
  {
    id: '1',
    title: 'Build a Strong GitHub Portfolio',
    content: 'Showcase your coding projects with clean, well-documented repositories. Include a variety of projects that demonstrate different skills and technologies.',
    category: 'Tech Skills',
    date: '2024-01-15',
    techFocused: true
  },
  {
    id: '2',
    title: 'Master the STAR Method for Interviews',
    content: 'Structure your interview responses using Situation, Task, Action, Result. This helps you give concrete examples of your achievements and problem-solving abilities.',
    category: 'Interview Prep',
    date: '2024-01-10',
    techFocused: false
  },
  {
    id: '3',
    title: 'Learn Cloud Computing Fundamentals',
    content: 'Get familiar with AWS, Azure, or Google Cloud basics. Cloud skills are in high demand across all tech roles and can significantly boost your marketability.',
    category: 'Tech Skills',
    date: '2024-01-08',
    techFocused: true
  },
  {
    id: '4',
    title: 'Network Strategically',
    content: 'Attend industry meetups, join professional associations, and engage with professionals on LinkedIn. Quality connections often lead to hidden job opportunities.',
    category: 'Networking',
    date: '2024-01-05',
    techFocused: false
  },
  {
    id: '5',
    title: 'Contribute to Open Source Projects',
    content: 'Start with small contributions to established projects. This demonstrates collaboration skills, code quality, and gives you real-world development experience.',
    category: 'Tech Skills',
    date: '2024-01-03',
    techFocused: true
  },
  {
    id: '6',
    title: 'Develop Your Personal Brand',
    content: 'Create a consistent professional presence across platforms. Share insights, write about your learning journey, and establish yourself as a thought leader in your field.',
    category: 'Branding',
    date: '2024-01-01',
    techFocused: false
  },
  {
    id: '7',
    title: 'Practice System Design',
    content: 'For senior tech roles, study system design principles. Practice designing scalable systems and understand trade-offs between different architectural approaches.',
    category: 'Tech Skills',
    date: '2023-12-28',
    techFocused: true
  },
  {
    id: '8',
    title: 'Stay Updated with Industry Trends',
    content: 'Follow tech blogs, podcasts, and industry leaders. Understanding current trends and emerging technologies shows your passion and commitment to growth.',
    category: 'Learning',
    date: '2023-12-25',
    techFocused: true
  }
];