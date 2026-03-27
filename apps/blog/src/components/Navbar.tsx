import React from 'react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from "@portfolio/ui/components/ui/button";
import { cn } from '@/lib/utils';
import { GraphIcon, ListIcon, Sun, Moon } from '@phosphor-icons/react'; // Swapped icons

export function Navbar() {
    const [open, setOpen] = React.useState(false);
    // Standard theme state (you might want to move this to a ThemeProvider later)
    const [isDark, setIsDark] = React.useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    const links = [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'About', href: '#' },
    ];

    return (
        <header className={cn(
            'sticky top-0 z-50',
            'mx-auto w-full  border shadow',
            'bg-background/95 ',
        )}>
            <nav className="mx-auto flex items-center justify-between p-1.5">
                <div className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 duration-100">
                    <GraphIcon className="size-5" />
                    <p className="font-mono text-base font-bold">Asme</p>
                </div>

                <div className="hidden items-center gap-1 lg:flex">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                            href={link.href}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    {/* Theme Switcher Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="rounded-full"
                    >
                        {isDark ? (
                            <Sun className="size-5 transition-all" weight="bold" />
                        ) : (
                            <Moon className="size-5 transition-all" weight="bold" />
                        )}
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    <Sheet open={open} onOpenChange={setOpen}>
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => setOpen(!open)}
                            className="lg:hidden"
                        >
                            <ListIcon className="size-4" />
                        </Button>
                        <SheetContent
                            className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
                            showClose={false}
                            side="left"
                        >
                            <div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
                                {links.map((link) => (
                                    <a
                                        key={link.label}
                                        className={buttonVariants({
                                            variant: 'ghost',
                                            className: 'justify-start',
                                        })}
                                        href={link.href}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                            <SheetFooter className="flex-col gap-2 p-4">
                                <Button className="w-full">Get Started</Button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
