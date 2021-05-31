import styled from 'styled-components';

export default function PlayerCard({
  player,
  onAddToCart,
  onEditPlayer,
  onDeletePlayer,
}) {
  return (
    <Card>
      <BuyButton onClick={() => onAddToCart(player)}>💸</BuyButton>
      <h3>{player.name}</h3>
      <p>{player.isFree ? 'Free Transfer' : player.price + ' €'}</p>
      <p>{player.club}</p>
      <p>
        {player.position.charAt(0).toUpperCase() + player.position.slice(1)}
      </p>
      <p>
        {player.skills &&
          player.skills.length > 0 &&
          player.skills.map((skill, index) => (
            <span key={index + skill}>⚽️ {skill} </span>
          ))}
      </p>
      <p>
        <a href={`mailto: ${player.email}`}>{player.email}</a>
      </p>
      <button onClick={() => onEditPlayer(player)}>Edit Player</button>
      <button onClick={() => onDeletePlayer(player)}>Delete Player</button>
    </Card>
  );
}

const Card = styled.div`
  background-color: #77be74;
  color: #1a3418;
  border-radius: 10px;
  padding: 0.6rem;
  margin: 0 1rem;
  min-width: calc((100% - 2rem) / 3);
  position: relative;

  @media (min-width: 576px) {
    min-width: calc((100% - 11rem) / 3);
  }

  h3,
  p {
    margin: 0.3rem;
  }

  a {
    color: inherit;
  }
`;

const BuyButton = styled.span`
  position: absolute;
  right: 1rem;
  top: 0.8rem;
  transform: scale(1.8);
  cursor: pointer;
`;
