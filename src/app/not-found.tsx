import Link from "next/link"

export default function notFound() {
    return (
        <main className="grid min-h-full place-items-center bg-base-100 px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-9xl font-semibold text-primary">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-base-content sm:text-5xl">Página não encontrada</h1>
                <p className="mt-6 text-base leading-7 text-base-content">Desculpe, não conseguimos encontrar a página que você está procurando.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link 
                    href="/" 
                    className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                    Go back home
                 </Link>
                </div>
            </div>
        </main>
    )
}