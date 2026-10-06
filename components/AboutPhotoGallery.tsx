"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { AboutPhoto } from "@/content/site";

export default function AboutPhotoGallery({ photos }: { photos: AboutPhoto[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<AboutPhoto | null>(null);

  const openPhoto = (photo: AboutPhoto) => {
    setSelectedPhoto(photo);
    dialogRef.current?.showModal();
  };

  return (
    <>
      {photos.length > 0 ? (
        <div className="about-photo-grid mt-7">
          {photos.map((photo) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => openPhoto(photo)}
              aria-label={`Enlarge photo: ${photo.alt}`}
              className={`about-photo about-photo--${photo.ratio} group`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="about-photo-caption">
                {photo.caption ?? photo.alt}
                <span aria-hidden="true"> ↗</span>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="about-photo-grid about-photo-grid--empty mt-7" aria-label="Photo gallery">
          {(["portrait", "landscape", "square", "portrait"] as const).map((ratio, index) => (
            <div key={index} className={`about-photo-placeholder about-photo--${ratio}`}>
              <span className="about-photo-placeholder-icon" aria-hidden="true">
                +
              </span>
              <span className="eyebrow">Add a photo</span>
            </div>
          ))}
          <p className="about-photo-help">
            Add personal images to <code>public/about</code> and list them in{" "}
            <code>aboutPhotos</code> in <code>content/site.ts</code>.
          </p>
        </div>
      )}

      <dialog
        ref={dialogRef}
        className="about-photo-dialog"
        aria-label="Enlarged photo"
        onClose={() => setSelectedPhoto(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        {selectedPhoto && (
          <div className="about-photo-dialog-content">
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              className="about-photo-dialog-close"
              aria-label="Close enlarged photo"
            >
              Close <span aria-hidden="true">×</span>
            </button>
            <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              fill
              sizes="min(90vw, 1200px)"
              className="object-contain"
            />
            {selectedPhoto.caption && (
              <p className="about-photo-dialog-caption">{selectedPhoto.caption}</p>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
