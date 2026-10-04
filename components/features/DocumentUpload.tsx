'use client';

import React, { useRef, useState } from 'react';
import { cn, formatFileSize } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { trx } from '@/lib/translations';
import type { DocumentRequirement, UploadedDocument } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import {
  Upload, Camera, Trash2, RefreshCw, FileCheck,
  ChevronDown, ChevronUp, File,
} from 'lucide-react';

interface DocumentUploadProps {
  serviceId: string;
  requirement: DocumentRequirement;
}

export function DocumentUpload({ serviceId, requirement }: DocumentUploadProps) {
  const { uploadedDocs, addDocument, removeDocument, language } = useApp();
  const reqName = language === 'ta' ? requirement.nameTa : language === 'hi' ? requirement.nameHi : requirement.name;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExamples, setShowExamples] = useState(false);

  const uploaded = (uploadedDocs[serviceId] ?? []).find(d => d.requirementId === requirement.id);

  const handleFile = async (file: File) => {
    setError(null);
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please choose a PDF, JPG, or PNG file.');
      return;
    }
    if (file.size > requirement.maxSizeMB * 1024 * 1024) {
      setError(`This file is too large. Please choose a file smaller than ${requirement.maxSizeMB} MB.`);
      return;
    }

    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);

      const res = await fetch('/api/upload', { method: 'POST', body: form });

      if (!res.ok) {
        const data = await res.json();
        // 401 means not logged in — still record locally so unauthenticated demo still works
        if (res.status === 401) {
          addDocument(serviceId, makeFallbackDoc(requirement, file));
          return;
        }
        setError(data.error ?? 'Upload failed. Please try again.');
        return;
      }

      const data = await res.json();
      const doc: UploadedDocument = {
        id: `doc-${Date.now()}`,
        requirementId: requirement.id,
        name: requirement.name,
        filename: file.name,
        sizeKB: data.sizeKB,
        uploadedAt: new Date().toISOString(),
        status: 'success',
        url: data.url,
      };
      addDocument(serviceId, doc);
    } catch {
      // Network error — fall back to local record so the UI isn't broken
      addDocument(serviceId, makeFallbackDoc(requirement, file));
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const handleRemove = () => {
    if (uploaded) removeDocument(serviceId, uploaded.id);
  };

  return (
    <div
      className={cn(
        'rounded-xl border-2 p-4 sm:p-5 transition-colors',
        uploaded ? 'border-green-300 bg-green-50/40' : 'border-slate-200 bg-white'
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-slate-900 text-sm sm:text-base">{reqName}</h3>
            {requirement.required ? (
              <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">{trx('Required', language)}</span>
            ) : (
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{trx('Optional', language)}</span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-0.5">{requirement.description}</p>
        </div>
        {uploaded && <FileCheck size={20} className="text-green-600 shrink-0 mt-1" aria-label="Uploaded" />}
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {requirement.accepted.map(fmt => (
          <span key={fmt} className="text-xs font-medium text-slate-600 bg-slate-100 rounded-md px-2 py-0.5">{fmt}</span>
        ))}
        <span className="text-xs text-slate-500">• Max {requirement.maxSizeMB} MB</span>
      </div>

      <button
        type="button"
        onClick={() => setShowExamples(v => !v)}
        className="flex items-center gap-1.5 text-sm font-medium text-gov-600 hover:text-gov-800 mb-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 rounded"
        aria-expanded={showExamples}
      >
        {showExamples ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        {trx('What can I use?', language)}
      </button>

      {showExamples && (
        <div className="mb-3 bg-blue-50 border border-blue-200 rounded-lg p-3 animate-fade-in">
          <p className="text-xs font-semibold text-blue-800 mb-1.5">{trx('Accepted documents:', language)}</p>
          <ul className="space-y-1">
            {requirement.examples.map((ex, i) => (
              <li key={i} className="text-sm text-blue-900 flex items-start gap-2">
                <span className="text-blue-500 mt-0.5" aria-hidden="true">•</span>
                {ex}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <Alert variant="error" className="mb-3">{error}</Alert>}

      {uploaded ? (
        <div className="flex items-center justify-between gap-3 bg-green-100 border border-green-300 rounded-xl p-3">
          <div className="flex items-center gap-2 min-w-0">
            <File size={18} className="text-green-700 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-green-900 truncate">{uploaded.filename}</p>
              <p className="text-xs text-green-700">{formatFileSize(uploaded.sizeKB)} · {trx('Uploaded successfully', language)}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg text-slate-600 hover:bg-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600"
              aria-label={`Replace ${requirement.name}`}
            >
              <RefreshCw size={16} />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 rounded-lg text-red-600 hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
              aria-label={`Remove ${requirement.name}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="md"
            loading={uploading}
            iconLeft={<Upload size={16} />}
            onClick={() => fileInputRef.current?.click()}
            className="flex-1"
            aria-label={`Upload ${requirement.name}`}
          >
            {uploading ? trx('Uploading…', language) : trx('Upload Document', language)}
          </Button>
          <Button
            variant="ghost"
            size="md"
            iconLeft={<Camera size={16} />}
            onClick={() => fileInputRef.current?.click()}
            className="flex-1"
            aria-label={`Take photo for ${reqName}`}
          >
            {trx('Take Photo', language)}
          </Button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={handleChange}
        aria-label={`File input for ${requirement.name}`}
      />
    </div>
  );
}

function makeFallbackDoc(requirement: DocumentRequirement, file: File): UploadedDocument {
  return {
    id: `doc-${Date.now()}`,
    requirementId: requirement.id,
    name: requirement.name,
    filename: file.name,
    sizeKB: Math.round(file.size / 1024),
    uploadedAt: new Date().toISOString(),
    status: 'success',
  };
}
