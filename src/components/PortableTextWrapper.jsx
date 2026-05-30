import { PortableText } from "@portabletext/react";
import ReadMore from './ReadMore.jsx';
import { urlFor } from '../lib/sanity'; // Import dari file yang Anda berikan

export default function PortableTextWrapper({ body }) {
  return (
    <PortableText 
      value={body} 
      components={{
        types: {
          bacaJuga: ({ value }) => <ReadMore node={value} />,
          image: ({ value }) => {
            // Gunakan urlFor dari sanity.ts untuk mendapatkan URL yang valid
            const imageUrl = urlFor(value).width(800).url();
            
            if (!imageUrl) return null;

            return (
              <figure className="my-8 w-full flex flex-col items-center">
                <img 
                  src={imageUrl} 
                  alt={value.alt || 'Gambar artikel'} 
                  className="rounded-lg w-full max-w-full h-auto object-contain shadow-sm"
                  loading="lazy"
                />
                {value.alt && (
                  <figcaption className="text-sm text-gray-500 mt-2 italic text-center">
                    {value.alt}
                  </figcaption>
                )}
              </figure>
            );
          }
        },
        block: {
          normal: ({ children }) => <p className="mb-4 leading-relaxed text-gray-800">{children}</p>,
        }
      }} 
    />
  );
}