import styled from 'styled-components';

export function StyledComponents() {
  return (
    <StyledButton>
      <p>Pöttyök</p>
    </StyledButton>
  );
}

const StyledButton = styled.div`
  border-radius: 600px;
  height: 200px;
  width: 200px;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-style: italic;
  font-weight: bold;
  font-size: 3rem;
  transition: transform 0.5s ease;
  :hover {
    transform: rotate(720deg) scale(2);
  }
`;
