import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyTheme } from "@/types";

interface BrandingTabProps {
  theme: CompanyTheme;
  onThemeChange: (theme: CompanyTheme) => void;
}

export const BrandingTab = ({ theme, onThemeChange }: BrandingTabProps) => {
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false);
  const [showSecondaryPicker, setShowSecondaryPicker] = useState(false);

  const updateTheme = (field: keyof CompanyTheme, value: string) => {
    onThemeChange({ ...theme, [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Logo</CardTitle>
          <CardDescription>Add your company logo URL</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="logo_url">Logo URL</Label>
            <Input
              id="logo_url"
              type="url"
              placeholder="https://example.com/logo.png"
              value={theme.logo_url || ""}
              onChange={(e) => updateTheme("logo_url", e.target.value)}
            />
            {theme.logo_url && (
              <div className="mt-4 p-4 border rounded-lg bg-muted">
                <img src={theme.logo_url} alt="Logo preview" className="h-16 object-contain" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Banner Image</CardTitle>
          <CardDescription>Add a banner image for your careers page</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="banner_url">Banner URL</Label>
            <Input
              id="banner_url"
              type="url"
              placeholder="https://example.com/banner.jpg"
              value={theme.banner_url || ""}
              onChange={(e) => updateTheme("banner_url", e.target.value)}
            />
            {theme.banner_url && (
              <div className="mt-4 p-4 border rounded-lg bg-muted">
                <img src={theme.banner_url} alt="Banner preview" className="w-full h-32 object-cover rounded" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand Colors</CardTitle>
          <CardDescription>Customize your careers page colors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Primary Color</Label>
            <div className="flex gap-4 items-start">
              <div className="relative">
                <div
                  className="w-24 h-10 rounded border-2 cursor-pointer"
                  style={{ backgroundColor: theme.primary_color || "#3B82F6" }}
                  onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}
                />
                {showPrimaryPicker && (
                  <div className="absolute z-10 mt-2">
                    <div
                      className="fixed inset-0"
                      onClick={() => setShowPrimaryPicker(false)}
                    />
                    <HexColorPicker
                      color={theme.primary_color || "#3B82F6"}
                      onChange={(color) => updateTheme("primary_color", color)}
                    />
                  </div>
                )}
              </div>
              <Input
                type="text"
                placeholder="#3B82F6"
                value={theme.primary_color || ""}
                onChange={(e) => updateTheme("primary_color", e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Secondary Color</Label>
            <div className="flex gap-4 items-start">
              <div className="relative">
                <div
                  className="w-24 h-10 rounded border-2 cursor-pointer"
                  style={{ backgroundColor: theme.secondary_color || "#10B981" }}
                  onClick={() => setShowSecondaryPicker(!showSecondaryPicker)}
                />
                {showSecondaryPicker && (
                  <div className="absolute z-10 mt-2">
                    <div
                      className="fixed inset-0"
                      onClick={() => setShowSecondaryPicker(false)}
                    />
                    <HexColorPicker
                      color={theme.secondary_color || "#10B981"}
                      onChange={(color) => updateTheme("secondary_color", color)}
                    />
                  </div>
                )}
              </div>
              <Input
                type="text"
                placeholder="#10B981"
                value={theme.secondary_color || ""}
                onChange={(e) => updateTheme("secondary_color", e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
