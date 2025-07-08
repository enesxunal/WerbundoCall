'use client';

import { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';

interface Firm {
  id: string;
  name: string;
  prompt: string;
  language: string;
  email: string;
  createdAt: Date;
}

interface Call {
  id: string;
  firmId: string;
  transcript: string;
  audioUrl: string;
  gptResponse: string;
  createdAt: Date;
  firm: Firm;
}

export default function AdminPanel() {
  const [firms, setFirms] = useState<Firm[]>([]);
  const [calls, setCalls] = useState<Call[]>([]);
  const [selectedFirm, setSelectedFirm] = useState<Firm | null>(null);
  const [isAddingFirm, setIsAddingFirm] = useState(false);
  const [newFirm, setNewFirm] = useState({
    name: '',
    prompt: '',
    language: 'tr-TR',
    email: '',
  });

  useEffect(() => {
    fetchFirms();
    fetchCalls();
  }, []);

  const fetchFirms = async () => {
    try {
      const response = await fetch('/api/firms');
      const data = await response.json();
      setFirms(data);
    } catch (error) {
      console.error('Firmalar yüklenemedi:', error);
    }
  };

  const fetchCalls = async () => {
    try {
      const response = await fetch('/api/calls');
      const data = await response.json();
      setCalls(data);
    } catch (error) {
      console.error('Çağrılar yüklenemedi:', error);
    }
  };

  const addFirm = async () => {
    try {
      const response = await fetch('/api/firms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFirm),
      });

      if (response.ok) {
        setNewFirm({ name: '', prompt: '', language: 'tr-TR', email: '' });
        setIsAddingFirm(false);
        fetchFirms();
      }
    } catch (error) {
      console.error('Firma eklenemedi:', error);
    }
  };

  const deleteFirm = async (id: string) => {
    if (!confirm('Bu firmayı silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/firms/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchFirms();
      }
    } catch (error) {
      console.error('Firma silinemedi:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          WerbundoCall Admin Paneli
        </h1>

        {/* Firma Yönetimi */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Firma Yönetimi</h2>
            <button
              onClick={() => setIsAddingFirm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Yeni Firma Ekle
            </button>
          </div>

          {/* Yeni Firma Formu */}
          {isAddingFirm && (
            <div className="bg-gray-50 p-4 rounded mb-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Firma Adı"
                  value={newFirm.name}
                  onChange={(e) => setNewFirm({ ...newFirm, name: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="email"
                  placeholder="E-posta"
                  value={newFirm.email}
                  onChange={(e) => setNewFirm({ ...newFirm, email: e.target.value })}
                  className="border p-2 rounded"
                />
                <select
                  value={newFirm.language}
                  onChange={(e) => setNewFirm({ ...newFirm, language: e.target.value })}
                  className="border p-2 rounded"
                >
                  <option value="tr-TR">Türkçe</option>
                  <option value="en-US">İngilizce</option>
                  <option value="de-DE">Almanca</option>
                </select>
                <textarea
                  placeholder="AI Prompt"
                  value={newFirm.prompt}
                  onChange={(e) => setNewFirm({ ...newFirm, prompt: e.target.value })}
                  className="border p-2 rounded col-span-2"
                  rows={3}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={addFirm}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Kaydet
                </button>
                <button
                  onClick={() => setIsAddingFirm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  İptal
                </button>
              </div>
            </div>
          )}

          {/* Firma Listesi */}
          <div className="space-y-4">
            {firms.map((firm) => (
              <div key={firm.id} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{firm.name}</h3>
                  <p className="text-sm text-gray-600">{firm.email}</p>
                  <p className="text-sm text-gray-500">Dil: {firm.language}</p>
                </div>
                <button
                  onClick={() => deleteFirm(firm.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Çağrı Kayıtları */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Çağrı Kayıtları</h2>
          <div className="space-y-4">
            {calls.map((call) => (
              <div key={call.id} className="border p-4 rounded">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{call.firm.name}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(call.createdAt).toLocaleString('tr-TR')}
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <strong>Müşteri:</strong>
                    <p className="text-sm bg-gray-50 p-2 rounded">{call.transcript}</p>
                  </div>
                  <div>
                    <strong>AI Yanıtı:</strong>
                    <p className="text-sm bg-blue-50 p-2 rounded">{call.gptResponse}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 