import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Categories, IToDo, toDoState } from '../atoms';

type textType = {
  category: string;
};

const Item = styled.div`
  padding: 8px;
  border-bottom: 1px solid #e9ecef;
  &:last-child {
    border: 0;
  }
`;
const Text = styled.span<textType>`
  margin-right: 8px;
  color: ${(props) => {
    if (props.category === Categories.TO_DO) {
      return 'rosybrown';
    }
    if (props.category === Categories.DOING) {
      return 'royalblue';
    }
  }};
`;
const Button = styled.button`
  cursor: pointer;
  margin-right: 4px;
  padding: 2px 4px;
  border: 1px solid #fff3bf;
  background-color: #fff9db;
  border-radius: 2px;
  &:hover {
    background-color: #ffec99;
  }
`;

function ToDo({ id, text, category }: IToDo) {
  const toDos = useRecoilValue(toDoState);
  console.log('toDo toDos', toDos);

  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((prevToDos) => {
      return prevToDos.map((toDo) =>
        toDo.id === id ? { ...toDo, category: name as any } : toDo
      );
      // const targetIndex = prevToDos.findIndex((toDo) => toDo.id === id);
      // const newToDo = { text, id, category: name as any };
      // return [
      //   ...prevToDos.slice(0, targetIndex),
      //   newToDo,
      //   ...prevToDos.slice(targetIndex + 1),
      // ];
    });
  };
  const deleteToDo = () => {
    const newToDos = toDos.filter((toDo) => toDo.id !== id);
    localStorage.setItem('toDos', JSON.stringify(newToDos));
    setToDos((prevToDos) => prevToDos.filter((toDo) => toDo.id !== id));
  };
  return (
    <Item>
      <Text category={category}>{text}</Text>
      {/* {category !== 'TO_DO' && ( */}
      {category !== Categories.TO_DO && (
        <Button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </Button>
      )}
      {category !== Categories.DOING && (
        <Button name={Categories.DOING} onClick={onClick}>
          Doing
        </Button>
      )}
      {category !== Categories.DONE && (
        <Button name={Categories.DONE} onClick={onClick}>
          ✔
        </Button>
      )}
      <Button onClick={deleteToDo}>❌</Button>
    </Item>
  );
}

export default ToDo;
