import Dashboard from '@/components/Dashboard';
import FocusTimer from '@/components/FocusTimer';
import HabitHeatmap from '@/components/HabitHeatmap';
import CommandPalette from '@/components/CommandPalette';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-12">
      <Navbar />
      <CommandPalette />
      <div className="max-w-4xl mx-auto px-6 pt-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <FocusTimer />
          <HabitHeatmap />
        </div>
        <Dashboard />
      </div>
    </main>
  );
}
