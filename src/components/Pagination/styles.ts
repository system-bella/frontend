import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

export const InfoPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${(props) => props.theme.colors.black};

  span,
  small {
    font-size: 16px;
  }

  span {
    margin-right: 10px;
  }

  small {
    padding: 5px;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div > button {
    font-size: 20px;
    padding: 5px;
    margin-left: 30px;
    color: ${(props) => props.theme.colors.black};
    background-color: transparent;
  }
`;
