import React, { createContext, useContext, useState, useEffect } from 'react';
import { DbProject, DbTask, DbRfi } from '../types/db';
import { SEED_DB_PROJECTS } from '../data/seedDbProjects';

const DB_STORAGE_KEY = 'julkarnaeem_project_db_v1';
const PASSCODE_STORAGE_KEY = 'julkarnaeem_db_passcode';
const DEFAULT_PASSCODE = 'julkar2025';

interface ProjectDbContextType {
  projects: DbProject[];
  getProject: (id: string) => DbProject | undefined;
  addProject: (project: Omit<DbProject, 'createdAt' | 'tasks' | 'rfis'> & Partial<Pick<DbProject, 'createdAt' | 'tasks' | 'rfis'>>) => void;
  updateProject: (id: string, updates: Partial<DbProject>) => void;
  deleteProject: (id: string) => void;
  addTask: (projectId: string, text: string) => void;
  toggleTask: (projectId: string, taskId: string) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  addRfi: (projectId: string, question: string) => void;
  updateRfi: (projectId: string, rfiId: string, updates: Partial<DbRfi>) => void;
  deleteRfi: (projectId: string, rfiId: string) => void;
  resetToSeed: () => void;
  exportJson: () => void;
  importJson: (jsonString: string) => boolean;
  getPasscode: () => string;
  setPasscode: (newPass: string) => void;
}

const ProjectDbContext = createContext<ProjectDbContextType | undefined>(undefined);

export function ProjectDbProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<DbProject[]>(() => {
    try {
      const stored = localStorage.getItem(DB_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load project database from localStorage:', e);
    }
    // Seed on first run
    return SEED_DB_PROJECTS;
  });

  // Sync projects to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save project database to localStorage:', e);
    }
  }, [projects]);

  const getPasscode = (): string => {
    try {
      return localStorage.getItem(PASSCODE_STORAGE_KEY) || DEFAULT_PASSCODE;
    } catch {
      return DEFAULT_PASSCODE;
    }
  };

  const setPasscode = (newPass: string) => {
    try {
      localStorage.setItem(PASSCODE_STORAGE_KEY, newPass);
    } catch (e) {
      console.error('Failed to save passcode:', e);
    }
  };

  const getProject = (id: string): DbProject | undefined => {
    return projects.find((p) => p.id.toLowerCase() === id.toLowerCase());
  };

  const addProject = (projectData: Omit<DbProject, 'createdAt' | 'tasks' | 'rfis'> & Partial<Pick<DbProject, 'createdAt' | 'tasks' | 'rfis'>>) => {
    const newProject: DbProject = {
      ...projectData,
      createdAt: projectData.createdAt || new Date().toISOString(),
      tasks: projectData.tasks || [],
      rfis: projectData.rfis || [],
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const updateProject = (id: string, updates: Partial<DbProject>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id.toLowerCase() === id.toLowerCase() ? { ...p, ...updates } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id.toLowerCase() !== id.toLowerCase()));
  };

  const addTask = (projectId: string, text: string) => {
    const newTask: DbTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      text: text.trim(),
      done: false,
      createdAt: new Date().toISOString(),
    };
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id.toLowerCase() === projectId.toLowerCase()) {
          return { ...p, tasks: [...p.tasks, newTask] };
        }
        return p;
      })
    );
  };

  const toggleTask = (projectId: string, taskId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id.toLowerCase() === projectId.toLowerCase()) {
          return {
            ...p,
            tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
          };
        }
        return p;
      })
    );
  };

  const deleteTask = (projectId: string, taskId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id.toLowerCase() === projectId.toLowerCase()) {
          return {
            ...p,
            tasks: p.tasks.filter((t) => t.id !== taskId),
          };
        }
        return p;
      })
    );
  };

  const addRfi = (projectId: string, question: string) => {
    const newRfi: DbRfi = {
      id: `rfi-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      question: question.trim(),
      answer: '',
      status: 'Open',
      createdAt: new Date().toISOString(),
    };
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id.toLowerCase() === projectId.toLowerCase()) {
          return { ...p, rfis: [...p.rfis, newRfi] };
        }
        return p;
      })
    );
  };

  const updateRfi = (projectId: string, rfiId: string, updates: Partial<DbRfi>) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id.toLowerCase() === projectId.toLowerCase()) {
          return {
            ...p,
            rfis: p.rfis.map((r) => (r.id === rfiId ? { ...r, ...updates } : r)),
          };
        }
        return p;
      })
    );
  };

  const deleteRfi = (projectId: string, rfiId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id.toLowerCase() === projectId.toLowerCase()) {
          return {
            ...p,
            rfis: p.rfis.filter((r) => r.id !== rfiId),
          };
        }
        return p;
      })
    );
  };

  const resetToSeed = () => {
    setProjects(SEED_DB_PROJECTS);
    try {
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(SEED_DB_PROJECTS));
    } catch (e) {
      console.error('Failed to reset project database:', e);
    }
  };

  const exportJson = () => {
    try {
      const dataStr = JSON.stringify(projects, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `julkarnaeem_project_db_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to export projects JSON:', e);
    }
  };

  const importJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Basic schema check
        const valid = parsed.every((p) => p.id && p.title && p.status);
        if (valid) {
          setProjects(parsed);
          localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(parsed));
          return true;
        }
      }
      return false;
    } catch (e) {
      console.error('Failed to import projects JSON:', e);
      return false;
    }
  };

  return (
    <ProjectDbContext.Provider
      value={{
        projects,
        getProject,
        addProject,
        updateProject,
        deleteProject,
        addTask,
        toggleTask,
        deleteTask,
        addRfi,
        updateRfi,
        deleteRfi,
        resetToSeed,
        exportJson,
        importJson,
        getPasscode,
        setPasscode,
      }}
    >
      {children}
    </ProjectDbContext.Provider>
  );
}

export function useProjectDb() {
  const context = useContext(ProjectDbContext);
  if (!context) {
    throw new Error('useProjectDb must be used within a ProjectDbProvider');
  }
  return context;
}
