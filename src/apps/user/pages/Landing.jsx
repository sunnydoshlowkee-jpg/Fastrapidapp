import { Link } from 'react-router-dom'
import Button from '../../../components/ui/Button'

export default function Landing() {
  return (
    <div className="min-h-screen bg-rapid-dark text-white flex flex-col">
      <header className="flex items-center justify-between px-6 py-5">
        <span className="text-2xl font-bold text-rapid-orange">Rapid</span>
        <div className="flex gap-3">
          <Link to="/app">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">Sign in</Button>
          </Link>
          <Link to="/app">
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-6">
        <h1 className="text-5xl font-extrabold leading-tight max-w-xl">
          Food, groceries & more — <span className="text-rapid-orange">delivered fast</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-sm">
          Order from your favourite restaurants and shops across Africa. Rapid gets it to you.
        </p>
        <Link to="/app">
          <Button size="lg" className="mt-2">Order now</Button>
        </Link>
      </main>

      <footer className="py-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Rapid Technologies
      </footer>
    </div>
  )
}
