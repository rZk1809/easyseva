'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Language, AccessibilitySettings, Application, Notification, UploadedDocument } from '@/lib/types';
import { loadFromStorage, saveToStorage } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface AppContextValue {
  language: Language;
  setLanguage: (l: Language) => void;
  accessibility: AccessibilitySettings;
  setAccessibility: (a: Partial<AccessibilitySettings>) => void;
  applications: Application[];
  addApplication: (app: Application) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  refreshApplications: () => Promise<void>;
  notifications: Notification[];
  unreadCount: number;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  refreshNotifications: () => Promise<void>;
  formData: Record<string, Record<string, unknown>>;
  setFormData: (serviceId: string, stepId: string, data: Record<string, unknown>) => void;
  getFormData: (serviceId: string) => Record<string, unknown>;
  clearFormData: (serviceId: string) => void;
  uploadedDocs: Record<string, UploadedDocument[]>;
  addDocument: (serviceId: string, doc: UploadedDocument) => void;
  removeDocument: (serviceId: string, docId: string) => void;
  isDemoMode: boolean;
  setDemoMode: (v: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const defaultAccessibility: AccessibilitySettings = {
  textSize: 'default',
  contrast: 'default',
  reduceMotion: false,
  language: 'en',
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [language, setLanguageState] = useState<Language>('en');
  const [accessibility, setAccessibilityState] = useState<AccessibilitySettings>(defaultAccessibility);
  const [applications, setApplications] = useState<Application[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [formData, setFormDataState] = useState<Record<string, Record<string, unknown>>>({});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, UploadedDocument[]>>({});
  const [isDemoMode, setDemoMode] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted accessibility/language/form settings from localStorage
  useEffect(() => {
    const savedLang = loadFromStorage<Language>('language', 'en');
    const savedA11y = loadFromStorage<AccessibilitySettings>('accessibility', defaultAccessibility);
    const savedForms = loadFromStorage<Record<string, Record<string, unknown>>>('formData', {});
    const savedDocs = loadFromStorage<Record<string, UploadedDocument[]>>('uploadedDocs', {});
    setLanguageState(savedLang);
    setAccessibilityState(savedA11y);
    setFormDataState(savedForms);
    setUploadedDocs(savedDocs);
    setHydrated(true);
  }, []);

  const refreshApplications = useCallback(async () => {
    try {
      const res = await fetch('/api/applications');
      if (!res.ok) return;
      const data = await res.json();
      if (data.applications) setApplications(data.applications);
    } catch { /* ignore network errors */ }
  }, []);

  const refreshNotifications = useCallback(async () => {
    try {
      const res = await fetch('/api/notifications');
      if (!res.ok) return;
      const data = await res.json();
      if (data.notifications) setNotifications(data.notifications);
    } catch { /* ignore network errors */ }
  }, []);

  // Fetch real data when user auth state changes
  useEffect(() => {
    if (!user) {
      setApplications([]);
      setNotifications([]);
      return;
    }
    refreshApplications();
    refreshNotifications();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Apply accessibility classes to document root
  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.classList.remove('text-size-large', 'text-size-xlarge', 'high-contrast');
    if (accessibility.textSize === 'large') root.classList.add('text-size-large');
    if (accessibility.textSize === 'xlarge') root.classList.add('text-size-xlarge');
    if (accessibility.contrast === 'high') root.classList.add('high-contrast');
    root.lang = language;
  }, [accessibility, language, hydrated]);

  const setLanguage = useCallback((l: Language) => {
    setLanguageState(l);
    saveToStorage('language', l);
    setAccessibilityState(prev => {
      const updated = { ...prev, language: l };
      saveToStorage('accessibility', updated);
      return updated;
    });
  }, []);

  const setAccessibility = useCallback((updates: Partial<AccessibilitySettings>) => {
    setAccessibilityState(prev => {
      const updated = { ...prev, ...updates };
      saveToStorage('accessibility', updated);
      return updated;
    });
  }, []);

  const addApplication = useCallback((app: Application) => {
    setApplications(prev => [app, ...prev.filter(a => a.id !== app.id)]);
  }, []);

  const updateApplication = useCallback((id: string, updates: Partial<Application>) => {
    setApplications(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
    fetch('/api/notifications/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    fetch('/api/notifications/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ all: true }),
    });
  }, []);

  const setFormData = useCallback((serviceId: string, stepId: string, data: Record<string, unknown>) => {
    setFormDataState(prev => {
      const current = prev[serviceId] ?? {};
      const updated = { ...prev, [serviceId]: { ...current, [stepId]: data } };
      saveToStorage('formData', updated);
      return updated;
    });
  }, []);

  const getFormData = useCallback((serviceId: string): Record<string, unknown> => {
    return formData[serviceId] ?? {};
  }, [formData]);

  const clearFormData = useCallback((serviceId: string) => {
    setFormDataState(prev => {
      const updated = { ...prev };
      delete updated[serviceId];
      saveToStorage('formData', updated);
      return updated;
    });
  }, []);

  const addDocument = useCallback((serviceId: string, doc: UploadedDocument) => {
    setUploadedDocs(prev => {
      const current = prev[serviceId] ?? [];
      const filtered = current.filter(d => d.requirementId !== doc.requirementId);
      const updated = { ...prev, [serviceId]: [...filtered, doc] };
      saveToStorage('uploadedDocs', updated);
      return updated;
    });
  }, []);

  const removeDocument = useCallback((serviceId: string, docId: string) => {
    setUploadedDocs(prev => {
      const current = prev[serviceId] ?? [];
      const updated = { ...prev, [serviceId]: current.filter(d => d.id !== docId) };
      saveToStorage('uploadedDocs', updated);
      return updated;
    });
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        accessibility,
        setAccessibility,
        applications,
        addApplication,
        updateApplication,
        refreshApplications,
        notifications,
        unreadCount,
        markNotificationRead,
        markAllRead,
        refreshNotifications,
        formData,
        setFormData,
        getFormData,
        clearFormData,
        uploadedDocs,
        addDocument,
        removeDocument,
        isDemoMode,
        setDemoMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
