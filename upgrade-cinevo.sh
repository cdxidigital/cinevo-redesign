#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🚀 Starting CINEVO UI Locked Pack Upgrade..."

# 1. Strip out Clerk
echo "📦 Uninstalling Clerk..."
npm uninstall @clerk/clerk-react

# 2. Scaffold necessary directories
echo "📁 Ensuring directories exist..."
mkdir -p src/lib src/components/cinevo src/components/auth src/routes

# 3. Write Theme Store
echo "✍️ Writing src/lib/cinevo-store.ts..."
cat << 'EOF' > src/lib/cinevo-store.ts
import { create } from 'zustand';

export type ThemeId = 'pulse' | 'noir' | 'violet' | 'ember' | 'sage' | 'day';

interface CinevoStore {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
}

export const useCinevoStore = create<CinevoStore>((set) => ({
  theme: 'pulse',
  setTheme: (id) => {
    if (typeof window !== 'undefined') {
      document.documentElement.dataset.theme = id;
    }
    set({ theme: id });
  },
}));
EOF

# 4. Write Appearance Settings
echo "✍️ Writing src/routes/app.settings.tsx..."
cat << 'EOF' > src/routes/app.settings.tsx
import { useCinevoStore, ThemeId } from '@/lib/cinevo-store';
import { Card } from '@/components/cinevo/Card';
import themes from '../../themes.json'; 

export default function AppearanceSettings() {
  const { theme, setTheme } = useCinevoStore();

  return (
    <section className="space-y-cine-space-4">
      <h2 className="font-display text-xl text-cine-text">Appearance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-cine-space-4">
        {themes.map((t) => (
          <Card 
            key={t.id} 
            className={`cursor-pointer transition-colors border-2 ${
              theme === t.id ? 'border-cine-accent' : 'border-transparent'
            }`}
            onClick={() => setTheme(t.id as ThemeId)}
          >
            <div className="p-cine-space-4 space-y-cine-space-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cine-text">{t.label}</span>
                <div className="w-6 h-6 rounded-cine-control" style={{ backgroundColor: t.accent }} />
              </div>
              <p className="text-sm text-cine-muted">{t.feel}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
EOF

# 5. Write AppNav
echo "✍️ Writing src/components/cinevo/AppNav.tsx..."
cat << 'EOF' > src/components/cinevo/AppNav.tsx
import { Link } from '@tanstack/react-router';
import { Logo } from '@/components/cinevo/Logo';

export function AppNav() {
  return (
    <header className="h-[var(--cine-nav-h)] w-full flex items-center px-cine-space-4 border-b border-cine-border bg-cine-surface">
      <Link to="/app/home" className="flex items-center mr-cine-space-6">
        <Logo className="h-6 text-cine-text" /> 
      </Link>
      
      <nav className="flex items-center gap-cine-space-4 text-sm font-ui font-medium">
        <Link to="/app/home" className="text-cine-muted hover:text-cine-text [&.active]:text-cine-accent">Home</Link>
        <Link to="/app/movies" className="text-cine-muted hover:text-cine-text [&.active]:text-cine-accent">Movies</Link>
        <Link to="/app/shows" className="text-cine-muted hover:text-cine-text [&.active]:text-cine-accent">Series</Link>
        <Link to="/app/library" className="text-cine-muted hover:text-cine-text [&.active]:text-cine-accent">Library</Link>
        <Link to="/app/search" className="text-cine-muted hover:text-cine-text [&.active]:text-cine-accent">Search</Link>
        <Link to="/app/settings" className="text-cine-muted hover:text-cine-text [&.active]:text-cine-accent">Settings</Link>
      </nav>
    </header>
  );
}
EOF

# 6. Write Better Auth Gate
echo "✍️ Writing src/components/auth/SignInGate.tsx..."
cat << 'EOF' > src/components/auth/SignInGate.tsx
import { useSession } from "@/lib/auth-client";
import { Navigate } from "@tanstack/react-router";
import { Skeleton } from "@/components/cinevo/Skeleton";

export function SignInGate({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <Skeleton className="w-full h-[100vh] bg-cine-bg" />;
  }

  if (!session) {
    return <Navigate to="/connect" search={{ redirect: '/app/home' }} />;
  }

  return <>{children}</>;
}
EOF

# 7. Write Template States
echo "✍️ Writing src/components/cinevo/TemplateStates.tsx..."
cat << 'EOF' > src/components/cinevo/TemplateStates.tsx
import { Card } from '@/components/cinevo/Card';
import { Link } from '@tanstack/react-router';

export function EmptyState({ message, actionText, actionTo }: { message: string, actionText: string, actionTo: string }) {
  return (
    <Card className="flex flex-col items-center justify-center p-cine-space-7 text-center bg-cine-surface border-cine-border">
      <p className="text-cine-muted mb-cine-space-4 font-ui">{message}</p>
      <Link to={actionTo} className="text-cine-accent font-bold hover:underline">
        {actionText}
      </Link>
    </Card>
  );
}

export function ErrorState({ error, onRetry }: { error: string, onRetry: () => void }) {
  return (
    <Card className="flex flex-col items-center justify-center p-cine-space-7 text-center border border-cine-danger bg-cine-surface">
      <p className="text-cine-danger mb-cine-space-5 font-ui">{error}</p>
      <div className="flex gap-cine-space-4">
        <button 
          onClick={onRetry} 
          className="bg-cine-danger text-[#041018] px-cine-space-4 py-cine-space-2 rounded-cine-control font-bold"
        >
          Retry
        </button>
        <Link to="/app/home" className="text-cine-muted hover:text-cine-text px-cine-space-4 py-cine-space-2 font-medium">
          Back Home
        </Link>
      </div>
    </Card>
  );
}
EOF

# 8. Verification checks as required by UPGRADE.md
echo "✅ Files generated. Running verification checks..."
npm run lint && npm run typecheck && npm run build

echo "🎉 Upgrade script complete. Don't forget to manually update your src/router.tsx with the legacy redirects!"