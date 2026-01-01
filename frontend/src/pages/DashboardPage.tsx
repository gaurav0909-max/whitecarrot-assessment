import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LogOut, ExternalLink, Save, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { Company, Job, CompanyTheme } from "@/types";
import { jobsApi, companyApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { BrandingTab } from "@/components/editor/BrandingTab";
import { CompanyTab } from "@/components/editor/CompanyTab";
import { JobsTab } from "@/components/editor/JobsTab";
import { LivePreview } from "@/components/editor/LivePreview";

const DashboardPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, company, isLoading: authLoading, logout } = useAuth();
  const { toast } = useToast();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Draft state for live preview
  const [draftCompany, setDraftCompany] = useState<Company | null>(null);
  const [draftJobs, setDraftJobs] = useState<Job[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        const [fetchedJobs, fetchedCompany] = await Promise.all([
          jobsApi.getByCompanySlug(slug),
          companyApi.getBySlug(slug),
        ]);
        setJobs(fetchedJobs);
        setDraftJobs(fetchedJobs);
        setDraftCompany(fetchedCompany);
      } catch {
        toast({ title: "Error", description: "Failed to load data", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };
    if (isAuthenticated) {
      fetchData();
    }
  }, [slug, isAuthenticated, toast]);

  const handleThemeChange = (theme: CompanyTheme) => {
    if (draftCompany) {
      setDraftCompany({ ...draftCompany, theme });
      setHasUnsavedChanges(true);
    }
  };

  const handleCompanyChange = (updates: Partial<Company>) => {
    if (draftCompany) {
      setDraftCompany({ ...draftCompany, ...updates });
      setHasUnsavedChanges(true);
    }
  };

  const handleJobCreate = (job: Job) => {
    setDraftJobs([job, ...draftJobs]);
    setJobs([job, ...jobs]);
  };

  const handleJobUpdate = (updatedJob: Job) => {
    setDraftJobs(draftJobs.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
    setJobs(jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
  };

  const handleJobDelete = async (jobId: number) => {
    try {
      await jobsApi.delete(jobId);
      setDraftJobs(draftJobs.filter((j) => j.id !== jobId));
      setJobs(jobs.filter((j) => j.id !== jobId));
      toast({ title: "Job deleted", description: "The job has been removed." });
    } catch {
      toast({ title: "Error", description: "Failed to delete job", variant: "destructive" });
    }
  };

  const handleSaveChanges = async () => {
    if (!slug || !draftCompany) return;
    setIsSaving(true);
    try {
      // Save company info
      await companyApi.updateInfo(slug, {
        name: draftCompany.name,
        description: draftCompany.description,
      });

      // Save theme
      if (draftCompany.theme) {
        await companyApi.updateTheme(slug, draftCompany.theme);
      }

      setHasUnsavedChanges(false);
      toast({ title: "Changes saved", description: "Your updates have been published." });
    } catch {
      toast({ title: "Error", description: "Failed to save changes", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublish = async () => {
    if (!slug || !draftCompany) return;
    const newStatus = !draftCompany.is_published;
    try {
      await companyApi.togglePublish(slug, newStatus);
      setDraftCompany({ ...draftCompany, is_published: newStatus });
      toast({
        title: newStatus ? "Careers page published" : "Careers page unpublished",
        description: newStatus ? "Your careers page is now live!" : "Your careers page is now hidden.",
      });
    } catch {
      toast({ title: "Error", description: "Failed to update publish status", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-muted p-8">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[600px]" />
          <Skeleton className="h-[600px]" />
        </div>
      </div>
    );
  }

  if (!draftCompany) {
    return <div>Company not found</div>;
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-[1800px] mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">{company?.name || "Company"}</h1>
            <p className="text-sm text-muted-foreground">Careers Editor</p>
          </div>
          <div className="flex items-center gap-2">
            {hasUnsavedChanges && (
              <Button onClick={handleSaveChanges} disabled={isSaving} size="sm">
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            )}
            <Button
              variant={draftCompany.is_published ? "default" : "outline"}
              size="sm"
              onClick={handleTogglePublish}
            >
              {draftCompany.is_published ? (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Published
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Unpublished
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={`/${slug}/careers`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Careers Page
              </a>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Split-Screen Layout */}
      <main className="max-w-[1800px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Editor Tabs */}
          <div className="space-y-4">
            <Tabs defaultValue="branding" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="branding">Branding</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
              </TabsList>

              <TabsContent value="branding" className="mt-4">
                <BrandingTab
                  theme={draftCompany.theme || {}}
                  onThemeChange={handleThemeChange}
                />
              </TabsContent>

              <TabsContent value="company" className="mt-4">
                <CompanyTab
                  company={draftCompany}
                  onCompanyChange={handleCompanyChange}
                />
              </TabsContent>

              <TabsContent value="jobs" className="mt-4">
                <JobsTab
                  jobs={draftJobs}
                  isLoading={false}
                  onJobCreate={handleJobCreate}
                  onJobUpdate={handleJobUpdate}
                  onJobDelete={handleJobDelete}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right: Live Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="mb-2 px-2">
              <p className="text-sm font-medium text-muted-foreground">Live Preview</p>
            </div>
            <div className="h-[800px] overflow-hidden">
              <LivePreview company={draftCompany} jobs={draftJobs} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
