// src/components/PortableTextWrapper.jsx
import { PortableText } from "@portabletext/react";
import ReadMore from './ReadMore.jsx';
import { urlFor } from '../lib/sanity'; 

export default function PortableTextWrapper({ body }) {
  return (
    <PortableText 
      value={body} 
      components={{
        types: {
          // Komponen Baca Juga yang sudah ada (Aktif)
          bacaJuga: ({ value }) => <ReadMore node={value} />,
          
          // Komponen Image yang sudah ada (Aktif)
          image: ({ value }) => {
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
        // Format Block (Aktif)
        block: {
          normal: ({ children }) => <p className="mb-4 leading-relaxed text-gray-800">{children}</p>,
          h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>,
        },
        // Format List (Aktif)
        list: {
          bullet: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>,
          number: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>,
        }
      }} 
    />
  );
}