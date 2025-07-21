import { Logo } from '@/components/ui/logo';
import { ROUTES } from '@/routes/paths';
import { Home, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="h-dvh flex flex-col">
      <header className="p-6 border-b border-border">
        <Logo />
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <section className="relative">
            <div className="text-9xl font-bold text-slate-800 select-none animate-pulse">404</div>
            <div className="absolute inset-0 text-9xl font-bold bg-gradient-to-r from-violet-500 to-purple-700 bg-clip-text text-transparent animate-bounce">
              404
            </div>
          </section>

          <section className="flex justify-center space-x-4 mb-8">
            <div
              className="animate-bounce"
              style={{ animationDelay: '0ms' }}
            >
              <Music className="size-8 text-primary/90" />
            </div>
            <div
              className="animate-bounce"
              style={{ animationDelay: '150ms' }}
            >
              <Music className="size-10 text-primary" />
            </div>
            <div
              className="animate-bounce"
              style={{ animationDelay: '300ms' }}
            >
              <Music className="size-8 text-primary/90" />
            </div>
          </section>

          <div className="flex justify-center">
            <Link
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg font-medium  transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              to={ROUTES.TRACKS}
              replace
            >
              <Home className="size-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="p-6 border-t border-border text-center">
        <p className="text-muted">
          Lost in the music? Don&apos;t worry, every good song has its way back home.
        </p>
      </footer>
    </div>
  );
}

export default NotFound;
