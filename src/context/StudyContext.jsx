import { createContext, useContext, useState } from 'react';

const StudyContext = createContext();

export function StudyProvider({ children }) {
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  return (
    <StudyContext.Provider value={{ subjects, setSubjects, tasks, setTasks }}>
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  return useContext(StudyContext);
}