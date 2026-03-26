import { useStudy } from '../context/StudyContext';

export function useSubjects() {
  const { subjects, setSubjects } = useStudy();

  function addSubject(subject) {
    setSubjects((prev) => [...prev, { ...subject, id: Date.now(), topics: [] }]);
  }

  function addTopic(subjectId, topicName) {
    if (!topicName.trim()) return;
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === subjectId
          ? { ...s, topics: [...s.topics, { id: Date.now(), name: topicName, status: 'Pending' }] }
          : s
      )
    );
  }

  function toggleTopic(subjectId, topicId) {
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === subjectId
          ? {
              ...s,
              topics: s.topics.map((t) =>
                t.id === topicId
                  ? { ...t, status: t.status === 'Pending' ? 'Done' : 'Pending' }
                  : t
              ),
            }
          : s
      )
    );
  }

  return { subjects, addSubject, addTopic, toggleTopic };
}