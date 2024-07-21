import React, { createContext, useReducer, useContext } from 'react';

const StudentStateContext = createContext();
const StudentDispatchContext = createContext();

const studentReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_STUDENT':
      return [...state, action.payload];
    case 'UPDATE_STUDENT':
      return state.map(student =>
        student.id === action.payload.id ? action.payload : student
      );
    case 'DELETE_STUDENT':
      return state.filter(student => student.id !== action.payload);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const StudentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, []);

  return (
    <StudentStateContext.Provider value={state}>
      <StudentDispatchContext.Provider value={dispatch}>
        {children}
      </StudentDispatchContext.Provider>
    </StudentStateContext.Provider>
  );
};

export const useStudentState = () => useContext(StudentStateContext);
export const useStudentDispatch = () => useContext(StudentDispatchContext);
