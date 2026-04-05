"use client";

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#0b071a]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AuraGuide</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/articles" className="text-sm font-semibold text-purple-400 hover:text-white transition-colors">База Знаний (DB)</Link>
            <Link href="/natal" className="text-sm text-gray-300 hover:text-white transition-colors">Астрология</Link>
            <Link href="/tarot" className="text-sm text-gray-300 hover:text-white transition-colors">Карта Дня</Link>
            <Link href="/hd" className="text-sm text-gray-300 hover:text-white transition-colors">Дизайн Человека</Link>
            <Link href="/matrix" className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500 hover:opacity-80 transition-opacity">МАТРИЦА СУДЬБЫ 🌟</Link>
          </nav>

          <div className="flex items-center border-l border-white/10 pl-6 ml-2">
             <Link href="/dashboard" className="px-4 py-2 text-sm font-bold text-white bg-purple-500/20 hover:bg-purple-500/40 border border-purple-500/30 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                Кабинет
             </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
