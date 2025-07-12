import Cube from '@/components/cube';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-headline">
            Indcric 3D Cube
          </h1>
          <p className="text-muted-foreground mt-2">
            Customize each face of the cube and watch it spin.
          </p>
        </header>
        <Cube />
      </div>
    </main>
  );
}
