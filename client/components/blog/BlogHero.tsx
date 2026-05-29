import type { BlogHeroData } from "@site/lib/cms/publicLoaders";

interface BlogHeroProps {
  hero: BlogHeroData;
}

export default function BlogHero({ hero }: BlogHeroProps) {
  const heroBackgroundImage = hero.backgroundImage || 'https://atzgmwcxbdnswerpqzzi.supabase.co/storage/v1/object/public/media/library/1779351750724-20d0za.webp';

  return (
    <div className="w-full flex items-center justify-center py-[40px] md:py-[100px] pb-[100px] md:pb-[120px] relative overflow-visible" style={{ backgroundImage: `url(${heroBackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1
      }}></div>

      {/* Content */}
      <div className="max-w-[1000px] w-[85%] md:w-[90%] relative z-10 text-center" style={{ paddingTop: '35px' }}>
        <div className="flex flex-col items-center justify-center gap-5 md:gap-6">
          {/* Highlighted Text - large white text on top */}
          {hero.highlightedText && (
            <p className="font-poppins text-[48px] sm:text-[48px] md:text-[96px] font-bold leading-[1.0] text-white max-w-4xl">
              {hero.highlightedText}
            </p>
          )}

          {/* Headline - white uppercase in middle */}
          {hero.headline && (
            <p className="font-poppins text-[18px] md:text-[22px] font-semibold tracking-wider uppercase text-white max-w-[60%] mx-auto text-center">
              {hero.headline}
            </p>
          )}

          {/* H1 Title - small yellow text on bottom */}
          {hero.h1Title && (
            <h1 className="font-poppins text-[14px] md:text-[15px] font-normal tracking-widest uppercase text-brand-accent max-w-[60%] mx-auto text-center" style={{ marginTop: 0 }}>
              {hero.h1Title}
            </h1>
          )}

          {/* Tagline */}
          {hero.tagline && (
            <p className="font-poppins text-[16px] md:text-[18px] text-brand-accent max-w-[700px] mt-2">
              {hero.tagline}
            </p>
          )}

          {/* CTA Button wrapper */}
          {hero.buttonText && (
            <div className="border-2 border-brand-accent p-1 hover:border-black transition-all duration-300 hover:bg-white inline-block max-w-[80vw] md:max-w-none" style={{ marginTop: '30px', marginBottom: '70px' }}>
              {/* CTA Button */}
              <button
                onClick={() => window.location.href = '/contact/'}
                className="font-poppins text-[18px] font-normal uppercase text-black bg-brand-accent px-6 py-3 border-2 border-black hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center gap-3 whitespace-nowrap"
                style={{ width: '100%' }}
              >
                {hero.buttonText}
                <span className="text-xl">›</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
