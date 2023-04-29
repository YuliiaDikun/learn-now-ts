import { StyledP } from "./SkillsList.styled";
interface ISkillProp {
  skills: string[] | null;
}
const SkillsList: React.FC<ISkillProp> = ({ skills }) => {    
  return (
    <ul>
      {skills?.map((skill, i) => {
        return (
          <li data-key={`${skill}_${i}`} key={`${skill}_${i}`}>
            <StyledP>
              {i + 1}. {skill}
            </StyledP>
          </li>
        );
      })}
    </ul>
  );
};

export default SkillsList;