import styled from 'styled-components'
export const CheckoutContainer = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
`
export const CheckoutHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`
export const CheckoutBlock = styled.div`
  text-transform: capitalize;
  width: 50%;

  &:last-child {
    width: 8%;
  }

  @media screen and (max-width: 600px) {
    margin-right: 10px;
  }

  span {
    font-size: 20px;
    @media screen and (max-width: 800px) {
      font-size: 13px;
    }
    @media screen and (max-width: 600px) {
      font-size: 10px;
    }
  }
`
export const Total = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
  @media screen and (max-width: 800px) {
    margin-top: 20px;
    font-size: 30px;
  }
`
