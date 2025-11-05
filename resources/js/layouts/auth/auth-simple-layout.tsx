import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10 relative">
            <div className="w-full max-w-sm z-10 border py-8 px-8 rounded-3xl bg-white shadow">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex w-full items-center justify-center rounded-md">
                                <AppLogoIcon className="w-40 fill-current text-[var(--foreground)] dark:text-white" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
            <div className="absolute bottom-0 h-32 w-full">

                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 40" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
                    </defs>
                    <g className="hero-wave-group">
                        <use href="#gentle-wave" x="48" y="3" fill="#1C4C6F" opacity="0.8"></use>
                        <use href="#gentle-wave" x="48" y="0" fill="#4398BA" opacity="0.7"></use>
                        <use href="#gentle-wave" x="48" y="7" fill="#1C4C6F" opacity="0.8"></use>
                        <use href="#gentle-wave" x="48" y="5" fill="#4398BA" opacity="1"></use>
                    </g>
                </svg>
            </div>
        </div>
    );
}
