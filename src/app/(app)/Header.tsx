export default function Header({ title }: { title: string }) {
    return (
        <header className="bg-white shadow-sm dark:bg-gray-800 dark:shadow-white/10">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {title}
                </h2>
            </div>
        </header>
    )
}
