import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { cn } from '@/lib/utils'; // For conditional class names

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Today' }, // Assuming TodayViewPage is at '/'
  { href: '/browse', label: 'Browse' },
  { href: '/my-texts', label: 'My Texts' },
  { href: '/add', label: 'Add New' },
  { href: '/settings', label: 'Settings' },
];

const NavigationMenu: React.FC = () => {
  console.log("Rendering NavigationMenu");
  const location = useLocation();

  return (
    <nav className="bg-background border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold text-primary">
              AffirmApp
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-4 md:space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                  location.pathname === item.href
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-gray-300 hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {/* Mobile menu button (placeholder) */}
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Implement mobile menu toggle here if needed */}
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu (e.g., Menu from lucide-react) */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on state (placeholder) */}
      {/* <div className="sm:hidden" id="mobile-menu"> ... </div> */}
    </nav>
  );
};

export default NavigationMenu;