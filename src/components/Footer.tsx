export function Footer() {
  return (
    <footer className="border-t border-[#292929]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-8 text-xs text-[#737b88] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Pedro Pinto.</p>
        <div className="flex gap-4">
          <a href="#about" className="hover:text-[#f4f0e9]">About</a>
          <a href="#publications" className="hover:text-[#f4f0e9]">Articles</a>
          <a href="#events" className="hover:text-[#f4f0e9]">Events</a>
          <a href="#experience" className="hover:text-[#f4f0e9]">Experience</a>
          <a href="#contact" className="hover:text-[#f4f0e9]">Contact</a>
        </div>
      </div>
    </footer>
  )
}
