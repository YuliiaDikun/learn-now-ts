import React from 'react';
import SkillsList from '../SkillsList/SkillsList';
import { StyledSkills } from './Skill.styled';
import { ISkillProp } from '../../interfaces/Skills';

const Skill: React.FC<ISkillProp> = ({ skills = null }) => {
  if (!skills)
    return <StyledSkills>Please help us to attract new skills!</StyledSkills>;
  return (
    <div>
      <StyledSkills>Course skills:</StyledSkills>
      <SkillsList skills={skills} />
    </div>
  );
};

export default Skill;
