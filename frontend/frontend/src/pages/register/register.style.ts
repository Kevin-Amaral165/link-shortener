// Libraries
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 16px;
  background-color: #f0f2f5;
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 22px;
  };

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  };

  @media (min-width: 768px) {
    max-width: 400px;
    padding: 32px;

    h1 {
      font-size: 26px;
      margin-bottom: 24px;
    };

    form {
      gap: 16px;
    };
  };

  @media (min-width: 1200px) {
    max-width: 450px;
    padding: 40px;

    h1 {
      font-size: 28px;
      margin-bottom: 28px;
    };

    form {
      gap: 18px;
    };
  };
`;