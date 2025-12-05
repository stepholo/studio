import Image from 'next/image';
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loginImage = PlaceHolderImages.find(img => img.id === 'login-illustration');

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">{children}</div>
      </div>
      <div className="hidden bg-muted lg:flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 opacity-50"></div>
        <svg className="absolute inset-0 h-full w-full stroke-gray-900/10 dark:stroke-white/10" fill="none">
          <defs>
            <pattern id="pattern-0d96d24f" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M-3 13 10-3M-3 3 10 13"></path>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" strokeWidth="0" fill="url(#pattern-0d96d24f)"></rect>
        </svg>

        {loginImage && (
          <Image
            src={loginImage.imageUrl}
            alt={loginImage.description}
            width={600}
            height={600}
            className="relative z-10 rounded-xl shadow-2xl"
            data-ai-hint={loginImage.imageHint}
          />
        )}
      </div>
    </div>
  );
}
