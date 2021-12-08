import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryState, isDarkAtom, toDoState } from '../atoms';

const Form = styled.form`
  height: 35px;
  display: flex;
  align-items: center;
  margin: 20px 0;
`;
const Input = styled.input<{ isDark: boolean }>`
  width: 200px;
  height: 100%;
  border: none;
  border-bottom: 1px solid lightgray;
  background-color: transparent;
  font-size: 20px;
  outline: none;
  padding: 0 10px;
  ::placeholder {
    color: ${(props) => props.theme.textColor};
  }
`;
const Button = styled.button`
  width: 50px;
  height: 100%;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid lightgray;
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const isDark = useRecoilValue(isDarkAtom);
  const oldToDos = useRecoilValue(toDoState);
  const setToDos = useSetRecoilState(toDoState);
  // 값만 얻고 싶다면 useRecoilValue
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    console.log('handleValid', toDo);
    localStorage.setItem(
      'toDos',
      JSON.stringify([{ id: Date.now(), text: toDo, category }, ...oldToDos])
    );
    setToDos((oldToDos) => [
      { id: Date.now(), text: toDo, category },
      ...oldToDos,
    ]);
    setValue('toDo', '');
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        isDark={isDark}
        {...register('toDo', {
          required: 'Please wrtie a To Do',
        })}
        placeholder="Write a to do"
      />
      <Button onClick={handleSubmit(handleValid)}>➕</Button>
    </Form>
  );
}

export default CreateToDo;
