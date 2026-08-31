export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#292929] bg-[#151515]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4">
        <a href="#about" className="font-serif text-lg font-bold tracking-tight text-[#f4f0e9]">
          PP.
        </a>

        <nav aria-label="Main navigation" className="flex items-center gap-4 sm:gap-6">
          <a href="#about" className="text-xs text-[#9da5b2] transition hover:text-[#f4f0e9] sm:text-sm">About</a>
          <a href="#publications" className="text-xs text-[#9da5b2] transition hover:text-[#f4f0e9] sm:text-sm">Articles</a>
          <a href="#experience" className="text-xs text-[#9da5b2] transition hover:text-[#f4f0e9] sm:text-sm">Experience</a>
          <a href="#events" className="text-xs text-[#9da5b2] transition hover:text-[#f4f0e9] sm:text-sm">Events</a>
          <a href="#contact" className="text-xs text-[#9da5b2] transition hover:text-[#f4f0e9] sm:text-sm">Contact</a>
        </nav> 
      </div>
    </header>
  )
}
