import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Search, MapPin, Building2, Briefcase, Home, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Company, Job } from "@/types";
import { companyApi, jobsApi } from "@/services/api";
import { getUniqueDepartments, getUniqueJobTypes, getUniqueLocations } from "@/data/mockData";

const CareersPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("");
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("");

  const locations = getUniqueLocations();
  const departments = getUniqueDepartments();
  const jobTypes = getUniqueJobTypes();

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        const [companyData, jobsData] = await Promise.all([
          companyApi.getBySlug(slug),
          jobsApi.getByCompanySlug(slug),
        ]);
        setCompany(companyData);
        setJobs(jobsData);
      } catch (err: any) {
        setError(err.message || "Failed to load careers page");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = !locationFilter || job.location === locationFilter;
      const matchesDepartment = !departmentFilter || job.department === departmentFilter;
      const matchesJobType = !jobTypeFilter || job.job_type === jobTypeFilter;
      return matchesSearch && matchesLocation && matchesDepartment && matchesJobType;
    });
  }, [jobs, searchQuery, locationFilter, departmentFilter, jobTypeFilter]);

  const activeFiltersCount = [locationFilter, departmentFilter, jobTypeFilter].filter(Boolean).length;

  const clearFilters = () => {
    setSearchQuery("");
    setLocationFilter("");
    setDepartmentFilter("");
    setJobTypeFilter("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-48 mx-auto mb-2" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
          <Skeleton className="h-24 w-full mb-6" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full mb-4" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-xl font-semibold mb-2">Company Not Found</h1>
            <p className="text-muted-foreground">
              {error || "The company you're looking for doesn't exist."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          {company.logo_url ? (
            <img
              src={company.logo_url}
              alt={`${company.name} logo`}
              className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
          )}
          <h1 className="text-3xl font-bold text-foreground mb-1">{company.name}</h1>
          <p className="text-lg text-muted-foreground mb-2">Careers</p>
          {company.description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">{company.description}</p>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Search & Filters */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jobs..."
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                    <X className="w-4 h-4" />
                    Clear {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        {filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No jobs found</h2>
              <p className="text-muted-foreground mb-4">
                {activeFiltersCount > 0 || searchQuery
                  ? "Try adjusting your search or filters"
                  : "Check back soon for new opportunities"}
              </p>
              {(activeFiltersCount > 0 || searchQuery) && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear all filters
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-foreground hover:text-primary transition-colors cursor-pointer mb-2">
                        {job.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.job_type}
                        </span>
                        {job.work_policy && (
                          <span className="flex items-center gap-1">
                            <Home className="w-4 h-4" />
                            {job.work_policy}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground line-clamp-2 mb-3">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.experience_level && (
                          <Badge variant="secondary">{job.experience_level}</Badge>
                        )}
                        {job.salary_range && (
                          <Badge variant="outline">{job.salary_range}</Badge>
                        )}
                      </div>
                    </div>
                    <Button className="shrink-0">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default CareersPage;
