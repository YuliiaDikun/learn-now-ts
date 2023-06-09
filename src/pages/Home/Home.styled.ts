import styled from "styled-components";

export const StyledSection = styled.section`
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.yellow};
  @media screen and (min-width: 768px) {
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;

export const MainTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  text-align: center;
`;