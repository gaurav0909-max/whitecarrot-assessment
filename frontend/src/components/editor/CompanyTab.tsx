import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Company } from "@/types";

interface CompanyTabProps {
  company: Company;
  onCompanyChange: (updates: Partial<Company>) => void;
}

export const CompanyTab = ({ company, onCompanyChange }: CompanyTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Update your company details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company_name">Company Name</Label>
            <Input
              id="company_name"
              type="text"
              placeholder="Your Company Name"
              value={company.name || ""}
              onChange={(e) => onCompanyChange({ name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_slug">Company Slug (URL)</Label>
            <Input
              id="company_slug"
              type="text"
              placeholder="your-company"
              value={company.slug || ""}
              disabled
              className="bg-muted"
            />
            <p className="text-sm text-muted-foreground">
              Your careers page: /{company.slug}/careers
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_description">Company Description</Label>
            <Textarea
              id="company_description"
              placeholder="Tell candidates about your company..."
              value={company.description || ""}
              onChange={(e) => onCompanyChange({ description: e.target.value })}
              rows={6}
            />
            <p className="text-sm text-muted-foreground">
              This will be displayed on your careers page header.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
