"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function SuccessContent() {
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');

  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/checkout-session?session_id=${sessionId}`);
        const session = await response.json();
        setMessage('Sua assinatura foi ativada com sucesso!');
      } catch (error) {
        console.error('Error fetching session:', error);
        setMessage('Obrigados pela sua assinatura!');
      }
    };

    fetchSession();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Pagamento Aprovado!
        </h2>
        {message ? (
          <p className="mt-2 text-sm text-gray-600">
            {message}
          </p>
        ) : (
          <div className="flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
            <span className="ml-2 text-sm text-gray-600">Carregando...</span>
          </div>
        )}
        <div className="mt-8">
          <Link href="/dashboard">
            <Button>
              Ir para o Painel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
