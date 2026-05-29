import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Media } from "../../lib/database.types";
import { Loader2, Search, Image as ImageIcon, AlertCircle } from "lucide-react";
import {
  createSelectedImageAsset,
  type SelectedImageAsset,
} from "./imageMetadata";

interface MediaPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (asset: SelectedImageAsset) => void;
  currentValue?: string;
}

export default function MediaPickerDialog({
  open,
  onOpenChange,
  onSelect,
  currentValue,
}: MediaPickerDialogProps) {
  const [loading, setLoading] = useState(false);
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setSelectedUrl(currentValue || null);
      setSearchQuery("");
      fetchMedia();
    }
  }, [open, currentValue]);

  const fetchMedia = async () => {
    setLoading(true);
    setFetchError(null);

    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching media:", error);
      setMediaItems([]);
      setSelectedUrl(null);
      setFetchError("Media library could not be loaded. You can still upload a new image or paste a URL in the image field.");
    } else {
      setMediaItems(data || []);
    }

    setLoading(false);
  };

  const isImageMedia = (m: Media) => {
    if (m.mime_type?.startsWith("image/")) {
      return true;
    }

    return /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(m.public_url);
  };

  const filteredMedia = mediaItems.filter((m) => {
    const normalizedSearchQuery = searchQuery.toLowerCase();
    const matchesSearch =
      m.file_name.toLowerCase().includes(normalizedSearchQuery) ||
      m.alt_text?.toLowerCase().includes(normalizedSearchQuery);

    return matchesSearch && isImageMedia(m);
  });

  const selectedMedia = filteredMedia.find((item) => item.public_url === selectedUrl) ?? null;

  const handleConfirm = () => {
    if (!selectedMedia) {
      return;
    }

    onSelect(
      createSelectedImageAsset({
        url: selectedMedia.public_url,
        fileName: selectedMedia.file_name,
        altText: selectedMedia.alt_text,
      }),
    );
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none'
    }}>
      <div
        onClick={() => onOpenChange(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 9998,
          pointerEvents: 'auto'
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 9999,
          background: '#fff',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '768px',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: '24px',
          pointerEvents: 'auto'
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          Browse Media Library
        </h2>

        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search by filename or alt text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '8px 8px 8px 36px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <Loader2 style={{ width: '32px', height: '32px', color: '#9ca3af' }} className="animate-spin" />
            </div>
          ) : fetchError ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#d97706', textAlign: 'center', padding: '24px' }}>
              <AlertCircle style={{ width: '48px', height: '48px', marginBottom: '12px' }} />
              <p style={{ fontSize: '14px' }}>{fetchError}</p>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#9ca3af', textAlign: 'center', padding: '24px' }}>
              <ImageIcon style={{ width: '48px', height: '48px', marginBottom: '12px' }} />
              <p style={{ fontSize: '14px' }}>{searchQuery ? 'No images found matching your search' : 'No images in the library yet'}</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '4px' }}>
              {filteredMedia.map((media) => (
                <button
                  key={media.id}
                  type="button"
                  onClick={() => setSelectedUrl(media.public_url)}
                  style={{
                    position: 'relative',
                    aspectRatio: '1',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: selectedUrl === media.public_url ? '2px solid #3b82f6' : '2px solid transparent',
                    cursor: 'pointer',
                    padding: 0,
                    background: 'none'
                  }}
                >
                  <img
                    src={media.public_url}
                    alt={media.alt_text || media.file_name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', padding: '2px 6px' }}>
                    <p style={{ color: '#fff', fontSize: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>
                      {media.file_name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={() => onOpenChange(false)}
            style={{ padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '14px' }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedMedia}
            style={{ padding: '8px 16px', border: 'none', borderRadius: '6px', background: selectedMedia ? '#111' : '#9ca3af', color: '#fff', cursor: selectedMedia ? 'pointer' : 'not-allowed', fontSize: '14px' }}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
