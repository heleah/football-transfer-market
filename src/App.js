import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import PlayerForm from './PlayerForm';
import PlayerCard from './PlayerCard';
import { saveToLocal, loadFromLocal } from './lib/localStorage';
import TransferCart from './TransferCart';

function App() {
  const [players, setPlayers] = useState(loadFromLocal('Players') ?? []);
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const [transferCart, setTransferCart] = useState(
    loadFromLocal('Players in Cart') ?? []
  );

  useEffect(() => {
    saveToLocal('Players', players);
  }, [players]);

  useEffect(() => {
    saveToLocal('Players in Cart', transferCart);
  }, [transferCart]);

  function editPlayer(player) {
    setPlayerToEdit(player);
  }

  useEffect(() => {
    fetch('http://localhost:4000/players')
      .then((res) => res.json())
      .then((apiPlayers) => setPlayers(apiPlayers))
      .catch((err) => console.error(err));
  }, []);

  function addPlayer(player) {
    fetch('http://localhost:4000/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(player),
    })
      .then((res) => res.json())
      .then((player) => setPlayers([...players, player]))
      .catch((err) => console.error(err));
  }

  function addToTransferCart(player) {
    setTransferCart([...transferCart, player]);
  }

  function updateAndSavePlayer(playerToSaveAndUpdate) {
    const upToDatePlayers = players.filter(
      (player) => player._id !== playerToSaveAndUpdate._id
    );
    fetch('http://localhost:4000/players/' + playerToSaveAndUpdate._id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playerToSaveAndUpdate),
    })
      .then((res) => res.json())
      .then((updatedPlayer) => {
        setPlayers([...upToDatePlayers, updatedPlayer]);
        setPlayerToEdit(null);
      })
      .catch((err) => console.error(err));
  }

  function deletePlayer(playerToDelete) {
    fetch('http://localhost:4000/players/' + playerToDelete._id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.data && response.data._id) {
          const playersToKeep = players.filter(
            (player) => player._id !== response.data._id
          );
          setPlayers(playersToKeep);
        } else {
          console.log('Player not found or already deleted.');
        }
      });
  }

  return (
    <div>
      <header>
        <NavLinkItems exact to='/'>
          <H1>Football Transfer Market</H1>
        </NavLinkItems>
        <NavLinkItems to='/cart'>
          <CartHeadline>
            <Emoji>💸 </Emoji>Cart: {transferCart.length} item(s)
          </CartHeadline>
        </NavLinkItems>
      </header>

      <Switch>
        <Route exact path='/'>
          <Grid>
            <PlayerForm
              onAddPlayer={addPlayer}
              playerToEdit={playerToEdit}
              onUpdateAndSavePlayer={updateAndSavePlayer}
            />
            <PlayerWrapper>
              <H2>Current Players</H2>
              <PlayerContainer>
                {players.map((player, index) => (
                  <PlayerCard
                    key={player.name + index}
                    player={player}
                    onAddToCart={addToTransferCart}
                    onEditPlayer={editPlayer}
                    onDeletePlayer={deletePlayer}
                  />
                ))}
              </PlayerContainer>
            </PlayerWrapper>
          </Grid>
        </Route>
        <Route path='/cart'>
          <TransferCart transferredPlayers={transferCart} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

const NavLinkItems = styled(NavLink)`
  text-decoration: none;
`;

const H1 = styled.h1`
  color: white;
  text-shadow: black 5px 0 8px;
  text-align: center;
  font-style: italic;
`;

const CartHeadline = styled.h2`
  color: white;
  text-shadow: black 5px 0 8px;
  text-align: center;
  font-style: italic;
`;

const Emoji = styled.span`
  background-color: rgba(245, 251, 248, 0.8);
  //box-shadow:
  border-radius: 50%;
`;

const H2 = styled.h2`
  color: #1a3418;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-right: 0;
  padding-right: 0;

  @media (min-width: 576px) {
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
  }
`;

const PlayerWrapper = styled.div`
  background: rgba(245, 251, 248, 0.8);
  padding: 0.5rem;
  border-radius: 10px;
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  @media (min-width: 576px) {
    margin-top: 3rem;
  }
`;
