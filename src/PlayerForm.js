import { useEffect, useState } from 'react';
import styled from 'styled-components';
import validatePlayer from './lib/validation';
import Tags from './Tags';

export default function PlayerForm({ onAddPlayer }) {
  const initialPlayerState = {
    name: '',
    price: '',
    freeTransfer: false,
    club: '',
    position: '',
    skills: [],
    email: '',
  };

  const [player, setPlayer] = useState(initialPlayerState);
  const [clubs, setClubs] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/clubs')
      .then((res) => res.json())
      .then((data) => setClubs(data))
      .catch((err) => console.error(err));
  });

  function updatePlayer(event) {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;
    if (event.target.type === 'checkbox') {
      fieldValue = event.target.checked;
    } else if (event.target === 'option') {
      fieldValue = event.target.parent.current.value;
    }

    setPlayer({ ...player, [fieldName]: fieldValue });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (validatePlayer(player)) {
      onAddPlayer(player);
      setPlayer(initialPlayerState);
      setIsError(false);
    } else {
      setIsError(true);
    }
  }

  function updateSkills(newSkill) {
    setPlayer({
      ...player,
      skills: [...player.skills, newSkill.toUpperCase()],
    });
  }

  function removeSkill(skillToRemove) {
    const remaining = player.skills.filter((skill) => skill !== skillToRemove);
    setPlayer({ ...player, skills: [...remaining] });
  }

  return (
    <FormWrapper>
      <Form onSubmit={handleFormSubmit}>
        <H2>Add New Player</H2>
        {isError && <ErrorBox>There is an error in your form.</ErrorBox>}
        <label htmlFor='name'>Player Name</label>
        <input
          type='text'
          name='name'
          value={player.name}
          onChange={updatePlayer}
        />
        <label htmlFor='price'>Transfer Price (in €)</label>
        <input
          type='text'
          name='price'
          value={player.price}
          disabled={player.freeTransfer}
          onChange={updatePlayer}
        />
        <label>
          <input
            type='checkbox'
            name='freeTransfer'
            value={player.freeTransfer}
            disabled={player.price !== ''}
            checked={player.freeTransfer}
            onChange={updatePlayer}
          />
          Free Transfer?
        </label>
        <label htmlFor='club'>Club</label>
        <select name='club' onChange={updatePlayer} value={player.club}>
          <option value=''>-- Please Select --</option>
          {clubs.length > 0 &&
            clubs.map((club) => {
              return (
                <option id={club.id} value={club.name}>
                  {club.name}
                </option>
              );
            })}
        </select>
        <fieldset>
          <legend>Position</legend>
          <RadioButtons>
            <label>
              <input
                type='radio'
                name='position'
                value='striker'
                checked={player.position === 'striker'}
                onChange={updatePlayer}
              />
              Striker
            </label>
            <label>
              <input
                type='radio'
                name='position'
                value='midfield'
                checked={player.position === 'midfield'}
                onChange={updatePlayer}
              />
              Midfield
            </label>
            <label>
              <input
                type='radio'
                name='position'
                value='defence'
                checked={player.position === 'defence'}
                onChange={updatePlayer}
              />
              Defence
            </label>
            <label>
              <input
                type='radio'
                name='position'
                value='goalie'
                checked={player.position === 'goalie'}
                onChange={updatePlayer}
              />
              Goalie
            </label>
          </RadioButtons>
        </fieldset>
        <Tags
          tags={player.skills}
          onUpdateTags={updateSkills}
          handleRemoveTag={removeSkill}
        />
        <label htmlFor='email'>Contact (Email)</label>
        <input
          type='email'
          name='email'
          value={player.email}
          onChange={updatePlayer}
        />
        <Buttons>
          <Button type='reset' onClick={() => setPlayer(initialPlayerState)}>
            Cancel
          </Button>
          <Button type='submit' isAdd>
            Add
          </Button>
        </Buttons>
      </Form>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  background: rgba(245, 251, 248, 0.8);
  padding: 0.8rem 0.4rem;
  border-radius: 10px;
  width: 29rem;
`;

const Form = styled.form`
  display: grid;
  margin: 0 2%;
  width: 10rem;

  label {
    margin-top: 1rem;
  }

  input,
  select {
    margin-top: 0.4rem;
    padding: 0.6rem;
  }

  input[type='checkbox'] {
    margin-top: 0;
  }

  fieldset {
    margin-top: 1.3rem;
    height: 4rem;
  }
`;

const H2 = styled.h2`
  color: #1a3418;
  margin: 0;
`;

const ErrorBox = styled.p`
  margin: 0.6rem 0;
  padding: 0.8rem;
  border-radius: 10px;
  text-align: center;
  background-color: darkred;
  color: mistyrose;
  font-size: 1.1rem;
`;

const RadioButtons = styled.div`
  display: flex;
  justify-content: space-between;

  label {
    margin: 0;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => (props.isAdd ? '#77be74' : '')};
  font-size: 1rem;
  cursor: pointer;
`;
