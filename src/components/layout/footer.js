export function Footer() {
    return (
        <footer className="border-t border-border bg-card">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
                <div>
                    © {new Date().getFullYear()} Abdelrahman Maher.
                    All rights reserved.
                </div>
                <div className="flex items-center gap-4">
                    {/* <a
                        href="https://www.linkedin.com/in/abdelrahman-maher-098bb0383/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-text transition-colors"
                    >
                        LinkedIn
                    </a> */}
                    <a
                        href="https://github.com/Abdelrahman-maher2000"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-text transition-colors"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}
