import styled from 'styled-components';
import { PrimaryLinkBtn } from '../styles/PrimaryLinkBtn';
import { device } from '../../lib/device';

const InfoPanelWrapper = styled.aside`
  display: flex;
  flex-flow: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 40%;
  padding: 0 5rem;
  background: ${props => props.theme.opacityblack};
  text-transform: capitalize;
  z-index: 0;
  color: ${props => props.theme.white};
  @media ${device.tablet} {
    width: 100%;
    padding: 8rem;
  }
  @media ${device.mobileL} {
    width: 100%;
    padding: 3rem;
  }
  @media ${device.mobile} {
    width: 100%;
    padding: 2.5rem;
  }
`;
const Info = styled.p`
  font-size: 3.2rem;
  margin-bottom: 3.2rem;
  line-height: 4rem;
  text-align: center;
  &:first-child {
    margin-top: 13rem;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;
const BoldWord = styled.strong`
  font-weight: 600;
  @media ${device.tablet} {
    display: block;
    text-align: center;
  }
`;
const BuyBtn = styled(PrimaryLinkBtn)`
  display: flex;
  align-self: center;
  background: ${props => props.theme.orange};
  height: 12rem;
  width: 100%;
  text-transform: capitalize;
  font-size: 5rem;
  max-width: 30rem;
  @media ${device.tablet} {
    height: 10rem;
  }
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
    {/* <BuyBtn href="/billing">Buy Now</BuyBtn> */}
  </InfoPanelWrapper>
);

export default InfoPanel;
