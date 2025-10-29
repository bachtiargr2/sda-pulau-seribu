import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square items-center justify-center rounded-md">
                <AppLogoIcon className="max-h-14 fill-current text-white dark:text-black" />
            </div>
        </>
    );
}
