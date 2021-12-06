import { atom, selector } from 'recoil';

// type categories = 'TO_DO' | 'DOING' | 'DONE';
export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

// toDo가 어떻게 생긴지 알려줄 인터페이스
export interface IToDo {
  id: number;
  text: string;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

// ❓ get localStoage data
// let output = localStorage.getItem('toDos');
// let localData = JSON.parse(output as any);
let output = localStorage.getItem('toDos');
const localData = output ? JSON.parse(output as any) : [];

// TS는 toDos가 IToDo 객체로 이뤄진 배열임을 알음
export const toDoState = atom<IToDo[]>({
  key: 'toDo', // 고유
  // default: [],
  default: localData,
});

// selector는 atom의 output을 변형시키는 도구
export const toDoSelector = selector({
  key: 'toDoSelector',
  // 여기서 return하는 값이 바로 toDoSelector의 value
  // get: (opts) -> ({ get, ... })
  get: ({ get }) => {
    const toDos = get(toDoState); // toDo의 상태를 저장하는 atom
    const category = get(categoryState); // category atom
    // if (category === 'TO_DO')
    //   return toDos.filter((toDo) => toDo.category === 'TO_DO');
    // if (category === 'DOING') return ...
    // sexy and tiny code ><
    return toDos.filter((toDo) => toDo.category === category);
  },
});
