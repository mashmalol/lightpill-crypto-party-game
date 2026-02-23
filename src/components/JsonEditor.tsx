import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { LightPillMetadata } from '../types';
import { Download, X } from 'lucide-react';

interface JsonEditorProps {
  isOpen: boolean;
  onClose: () => void;
  pillId: number;
  metadata: LightPillMetadata | null;
}

export function JsonEditor({ isOpen, onClose, pillId, metadata }: JsonEditorProps) {
  const [editedMetadata, setEditedMetadata] = useState<LightPillMetadata | null>(metadata);

  const handleMetadataChange = (field: keyof LightPillMetadata, value: LightPillMetadata[keyof LightPillMetadata]) => {
    if (editedMetadata) {
      setEditedMetadata({
        ...editedMetadata,
        [field]: value,
      });
    }
  };

  const handleAttributeChange = (index: number, field: 'trait_type' | 'value', value: string) => {
    if (editedMetadata) {
      const newAttributes = [...editedMetadata.attributes];
      newAttributes[index] = {
        ...newAttributes[index],
        [field]: value,
      };
      setEditedMetadata({
        ...editedMetadata,
        attributes: newAttributes,
      });
    }
  };

  const handleAddAttribute = () => {
    if (editedMetadata) {
      setEditedMetadata({
        ...editedMetadata,
        attributes: [...editedMetadata.attributes, { trait_type: '', value: '' }],
      });
    }
  };

  const handleRemoveAttribute = (index: number) => {
    if (editedMetadata) {
      const newAttributes = editedMetadata.attributes.filter((_, i) => i !== index);
      setEditedMetadata({
        ...editedMetadata,
        attributes: newAttributes,
      });
    }
  };

  const downloadJson = () => {
    if (editedMetadata) {
      const jsonString = JSON.stringify(editedMetadata, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${String(pillId).padStart(2, '0')}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  if (!editedMetadata) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            Edit Light Pill #{pillId} Metadata
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Edit the JSON metadata for this Light Pill and download the updated file.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Name</label>
            <input
              type="text"
              value={editedMetadata.name}
              onChange={(e) => handleMetadataChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <textarea
              value={editedMetadata.description}
              onChange={(e) => handleMetadataChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 min-h-[100px]"
            />
          </div>

          {/* Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Image URI</label>
            <input
              type="text"
              value={editedMetadata.image}
              onChange={(e) => handleMetadataChange('image', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>

          {/* Background Color */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Background Color</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={editedMetadata.background_color}
                onChange={(e) => handleMetadataChange('background_color', e.target.value)}
                className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
              />
              <div
                className="w-12 h-10 rounded border border-border"
                style={{ backgroundColor: `#${editedMetadata.background_color}` }}
              />
            </div>
          </div>

          {/* Attributes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Attributes</label>
              <Button
                onClick={handleAddAttribute}
                variant="outline"
                size="sm"
                className="bg-foreground/5 border-border hover:bg-foreground/10"
              >
                Add Attribute
              </Button>
            </div>

            <div className="space-y-3">
              {editedMetadata.attributes.map((attr, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Trait Type"
                    value={attr.trait_type}
                    onChange={(e) => handleAttributeChange(index, 'trait_type', e.target.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={attr.value}
                    onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  />
                  <button
                    onClick={() => handleRemoveAttribute(index)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-2 justify-end pt-4 border-t border-border">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-border hover:bg-foreground/5"
          >
            Close
          </Button>
          <Button
            onClick={downloadJson}
            className="bg-foreground text-background hover:bg-foreground/90 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download JSON
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
