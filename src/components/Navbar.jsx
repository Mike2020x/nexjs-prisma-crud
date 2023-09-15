import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-slate-900">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <h3 className="font-bold text-3xl">App de Tareas</h3>
                </Link>
                <ul className="flex gap-x-2 text-lg font-bold">
                    <li><Link href="/new" className="text-slate-300 hover:text-slate-200">Nueva</Link></li>
                    <li><Link href="/about" className="text-slate-300 hover:text-slate-200">Acerca</Link></li>

                </ul>
            </div>
        </nav>
    )
}
