import React from "react";

const ResumeContent = () => {

const resumeText = `
Lbuke

I'm a technophile who specializes in Full-Stack Development and DevOps.

Email: contact@lbu.ke | (+44) 7494226499 | Sheffield, England

LinkedIn | GitHub | LeetCode

Education:
TODO

Experience:
TODO

Skills:
TODO

Projects:
TODO

Open-Source:
TODO

Certifications:
TODO

Honors & Awards:
TODO


`;
  
  return (
    <textarea value={resumeText} style={{ width: '100%', height: '100%', fontFamily: 'Arial, sans-serif',
	fontSize: '14px', }} />
  );
};

export default ResumeContent;