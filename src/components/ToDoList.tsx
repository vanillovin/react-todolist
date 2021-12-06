import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Categories, categoryState, toDoSelector, toDoState } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;
const Select = styled.select`
  cursor: pointer;
  border: 1px solid lightgray;
  padding: 5px;
  background-color: transparent;
  margin-bottom: 10px;
  border-radius: 2px;
`;
const List = styled.div`
  width: 550px;
  max-height: 500px;
  border: 1px solid lightgray;
  background-color: white;
  overflow: auto;
  padding: 4px 6px;
  border-radius: 2px;
`;

function ToDoList() {
  // const value = useRecoilValue(toDoState); // == useState -> []
  // const modifierFn = useSetRecoilState(toDoState);
  // toDos => never array type[], setterOrUpdater
  // const toDos = useRecoilValue(toDoState);
  // const selectorOutput = useRecoilValue(toDoSelector);
  // console.log('ToDoList toDos', toDos, 'selectorOutput', selectorOutput);

  // useRecoilValue는 atom이나 selector의 값만 반환함. -State는 값과 더불어 modifier 함수도 제공
  // 이 컴포넌트는 데이터를 render하기만 함. selector가 있으면 데이터에 좀 더 체계화된 방식으로 접근할 수 있음
  // 한 곳에 데이터를 몰아놓고 컴포넌트 안에서 그걸 수정하는 것 대신, atom에 데이터를 모아두고, selector로 데이터를 변형
  // const [toDo, doing, done] = useRecoilValue(toDoSelector); // 2차원배열?!

  // selector에서 배열을 받아오는 덕분에 toDos 배열 하나만 남아서 ToDoList 컴포넌트는 굉장히 작아졌음.
  const toDos = useRecoilValue(toDoSelector);

  // 현재의 값과, 값을 수정하는 함수를 가져오는 훅을 사용. atom 값과 수정하는 modifier 함수 반환
  // 모든 처리는 selector가 다 하는 거임
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    // Typescript가 보기에 option의 value는 그냥 string이라 categories 타입과 같다는 걸 알지 못함
    // event.currentTarget.value as any 별로 좋은 선택이 아니지만 일단 any로 회피. type -> enum
    setCategory(event.currentTarget.value as any); // ..
  };

  console.log('ToDoList toDos', toDos, 'category', category);

  return (
    <>
      <Title>To Dos</Title>
      <CreateToDo />
      <Select value={category} onInput={onInput}>
        {/* 실수할 게 염려되기 때문에 이렇게 string을 쓰는 건 좋지 않음 */}
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </Select>
      <List>
        {toDos.length > 0
          ? toDos.map((toDo) => <ToDo key={toDo.id} {...toDo} />)
          : ':)'}
      </List>
    </>
  );
}

export default ToDoList;

// import { useForm } from 'react-hook-form';
// import { atom, useRecoilState } from 'recoil';

// interface IForm {
//   toDo: string;
// }

// // toDo가 어떻게 생긴지 알려줄 인터페이스
// interface IToDo {
//   id: number;
//   text: string;
//   category: 'TO_DO' | 'DOING' | 'DONE';
// }

// // TS는 toDos가 IToDo 객체로 이뤄진 배열임을 알음
// const toDoState = atom<IToDo[]>({
//   key: 'toDo', // 고유
//   default: [],
// });

// function ToDoList() {
//   // const value = useRecoilValue(toDoState); // useState==uRV(atom) -> []
//   // const modifierFn = useSetRecoilState(toDoState);
//   // toDos => never array type[], setterOrUpdater
//   const [toDos, setToDos] = useRecoilState(toDoState);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<IForm>();
//   const handleValid = ({ toDo }: IForm) => {
//     console.log('handleValid', toDo);
//     setToDos((oldToDos) => [
//       { id: Date.now(), text: toDo, category: 'TO_DO' },
//       ...oldToDos,
//     ]);
//   };
//   console.log('ToDoList toDos', toDos, 'errors', errors);

//   return (
//     <>
//       <h1>To Dos</h1>
//       <form onSubmit={handleSubmit(handleValid)}>
//         <input
//           {...register('toDo', {
//             required: 'Please wrtie a To Do',
//           })}
//           placeholder="Write a to do"
//         />
//         <button onClick={handleSubmit(handleValid)}>Add</button>
//       </form>
//       <ul>
//         {toDos.map((toDo) => (
//           <li key={toDo.id}>{toDo.text}</li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default ToDoList;
