import styled from 'styled-components';
import { useState } from 'react';

export default function Tags({ tags, onUpdateTags, handleRemoveTag }) {
  const [tag, setTag] = useState('');

  function handleChange(event) {
    setTag(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onUpdateTags(tag);
      setTag('');
    } else if (tag.length === 0 && event.key === 'Backspace') {
      handleRemoveTag(tags.pop());
    }
  }

  return (
    <TagWrapper>
      <label htmlFor="tag_input">Skills</label>
      <TagCloud>
        {tags.map((tag, index) => (
          <span key={index + tag}>
            {tag}{' '}
            <button type="button" onClick={() => handleRemoveTag(tag)}>
              ⓧ
            </button>
          </span>
        ))}
        <input
          type="text"
          name="tag_input"
          value={tag}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type here..."
        />
      </TagCloud>
    </TagWrapper>
  );
}

const TagWrapper = styled.section`
  display: grid;
  font-family: sans-serif;
`;

const TagCloud = styled.article`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  width: 26rem;
  margin: 0.3rem;
  border: 1px solid #270f43;
  border-radius: 8px;
  padding: 0.6rem;

  span {
    position: relative;
    padding: 0.4rem;
    padding-right: 1.4rem;
    border-radius: 10px;
    background-color: lavender;
    color: #270f43;

    button {
      position: absolute;
      top: 0;
      background-color: transparent;
      border: none;
      font-weight: bold;
      cursor: pointer;
    }
  }

  input {
    margin: 0;
    padding: 1rem 0;
    height: 1rem;
    border: none;
    background: none;
    font-size: 0.92rem;
  }

  input:focus {
    outline: none;
  }
`;
