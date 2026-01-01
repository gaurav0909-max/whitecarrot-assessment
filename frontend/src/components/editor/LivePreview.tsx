import { useState, useMemo } from "react";
import { Search, MapPin, Briefcase, Users, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Company, Job } from "@/types";

interface LivePreviewProps {
  company: Company;
  jobs: Job[];
}

export const LivePreview = ({ company, jobs }: LivePreviewProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const uniqueLocations = useMemo(() => {
    return Array.from(new Set(jobs.map((job) => job.location))).filter(Boolean);
  }, [jobs]);

  const uniqueDepartments = useMemo(() => {
    return Array.from(new Set(jobs.map((job) => job.department))).filter(Boolean);
  }, [jobs]);

  const uniqueTypes = useMemo(() => {
    return Array.from(new Set(jobs.map((job) => job.job_type))).filter(Boolean);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = locationFilter === "all" || job.location === locationFilter;
      const matchesDepartment = departmentFilter === "all" || job.department === departmentFilter;
      const matchesType = typeFilter === "all" || job.job_type === typeFilter;
      return matchesSearch && matchesLocation && matchesDepartment && matchesType;
    });
  }, [jobs, searchQuery, locationFilter, departmentFilter, typeFilter]);

  const primaryColor = company.theme?.primary_color || "#3B82F6";
  const secondaryColor = company.theme?.secondary_color || "#10B981";

  return (
    <div className="h-full bg-background border rounded-lg overflow-auto">
      {/* Header */}
      <div
        className="relative h-48 flex items-end"
        style={{
          background: company.theme?.banner_url
            ? `url(${company.theme.banner_url}) center/cover`
            : `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative w-full px-6 pb-6 text-white">
          <div className="flex items-center gap-4 mb-2">
            {company.theme?.logo_url && (
              <img src={company.theme.logo_url} alt={company.name} className="h-16 w-16 bg-white rounded-lg p-2 object-contain" />
            )}
            <div>
              <h1 className="text-3xl font-bold">{company.name || "Your Company"}</h1>
              <p className="text-white/90 mt-1">{company.description || "Join our team and make an impact"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {uniqueDepartments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">
            {filteredJobs.length} {filteredJobs.length === 1 ? "Position" : "Positions"} Available
          </h2>

          {filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">No jobs found</p>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </CardContent>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {job.department}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {job.job_type}
                    </span>
                    {job.work_policy && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {job.work_policy}
                        </span>
                      </>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.experience_level && (
                      <Badge variant="secondary">{job.experience_level}</Badge>
                    )}
                    {job.salary_range && (
                      <Badge variant="outline" style={{ borderColor: primaryColor, color: primaryColor }}>
                        {job.salary_range}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
