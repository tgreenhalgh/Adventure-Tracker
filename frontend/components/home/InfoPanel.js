import styled from 'styled-components';
import { PrimaryLinkBtn } from '../styles/PrimaryLinkBtn';
const InfoPanelWrapper = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 40%;
  padding: 0 5rem;
  background: ${props => props.theme.opacityblack};
  text-transform: capitalize;
  z-index: -10;
  color: ${props => props.theme.white};
`;
const Info = styled.p`
  font-size: 3.2rem;
  margin-bottom: 3.2rem;
  line-height: 4rem;
  &:first-child {
    margin-top: 13rem;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;
const BoldWord = styled.strong`
  font-weight: 600;
`;
const BuyBtn = styled(PrimaryLinkBtn)`
  background: ${props => props.theme.red};
  height: 12rem;
  width: 100%;
  text-transform: capitalize;
  font-size: 5rem;
`;
const InfoPanel = () => (
  <InfoPanelWrapper>
    <Info>
      <BoldWord>Plan</BoldWord> an adventure no matter how big or small
    </Info>
    <Info>
      <BoldWord>Update</BoldWord> Friends and Family on where you are
    </Info>
    <Info>
      <BoldWord>Find</BoldWord> the best routes for your journey
    </Info>
    <BuyBtn href="/billing">Buy Now</BuyBtn>
  </InfoPanelWrapper>
);

export default InfoPanel;
