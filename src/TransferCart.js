import styled from 'styled-components';

export default function TransferCart({ transferredPlayers }) {
  function getSum() {
    return transferredPlayers.reduce(
      (total, { price = 0 }) => +total + +price,
      0
    );
  }

  return (
    <div>
      <CartWrapper>
        <NameWrapper>
          <h3>Player Name</h3>
          {transferredPlayers.map((player) => (
            <p>{player.name}</p>
          ))}
          <h4>Sum</h4>
        </NameWrapper>
        <PriceWrapper>
          <h3>Player Price</h3>
          {transferredPlayers.map((player) => (
            <p>{player.price} €</p>
          ))}
          <h4>{getSum()} €</h4>
        </PriceWrapper>
      </CartWrapper>
      <LinkWrapper>
        <HomeLink href="/">Back to Home</HomeLink>
      </LinkWrapper>
    </div>
  );
}

const CartWrapper = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 5rem;
  padding: 0.4rem;
  border-radius: 10px;
  background: rgba(245, 251, 248, 0.8);
`;

const NameWrapper = styled.section``;

const PriceWrapper = styled.section`
  text-align: right;
`;

const LinkWrapper = styled.p`
  text-align: right;
  margin-right: 8%;
`;

const HomeLink = styled.a`
  padding: 0.3rem;
  border: 1px solid black;
  border-radius: 10px;
  text-decoration: none;
  background-color: rgba(245, 251, 248, 0.9);
  color: black;
`;
