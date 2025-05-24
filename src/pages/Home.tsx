import { Play, Music, Headphones } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';

function Home() {
  return (
    <main className='h-dvh bg-gradient-to-br flex items-center justify-center'>
      <div className='flex flex-col items-center  max-w-md'>
        <div className='relative mb-8'>
          <div className='size-28 bg-gradient-to-b from-violet-500 to-purple-700 rounded-full flex items-center justify-center mx-auto animate-pulse'>
            <Music className='size-16' />
          </div>

          <Headphones
            className='absolute -top-5 -left-20 size-6 text-primary animate-bounce'
            style={{ animationDelay: '0.5s' }}
          />

          <Music
            className='absolute -bottom-5 -right-20 size-6 text-primary animate-bounce'
            style={{ animationDelay: '1s' }}
          />
        </div>

        <Logo />

        <p className='mb-8 text-lg'>Your soundtrack awaits</p>

        <Link
          to={ROUTES.TRACKS}
          className='bg-gradient-to-b from-violet-500 to-purple-700 px-6 py-3 flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300  hover:shadow-primary hover:scale-105 active:scale-95 mx-auto border-none'
        >
          <Play className='size-5' />
          <span>Launch Player</span>
        </Link>

        <div className='flex justify-center space-x-6 mt-12 text-sm text-muted'>
          <Link
            to={ROUTES.TRACKS}
            className='hover:text-primary transition-colors'
          >
            Library
          </Link>
          <span>•</span>
          <Link
            to={ROUTES.TRACKS}
            className='hover:text-primary transition-colors'
          >
            Resent Tracks
          </Link>
          <span>•</span>
          <Link
            to={ROUTES.TRACKS}
            className='hover:text-primary transition-colors'
          >
            Favorites
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;
