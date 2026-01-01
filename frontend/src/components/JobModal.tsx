import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Job, JobInput } from "@/types";
import { jobsApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const jobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Description is required"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  job_type: z.string().min(1, "Job type is required"),
  work_policy: z.string().optional(),
  experience_level: z.string().optional(),
  salary_range: z.string().optional(),
});

type JobFormData = z.infer<typeof jobSchema>;

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onSave: (job: Job) => void;
}

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
const workPolicies = ["Remote", "Hybrid", "On-site"];
const experienceLevels = ["Entry Level", "Mid Level", "Senior", "Lead"];
const departments = ["Engineering", "Design", "Product", "Marketing", "Sales", "Operations", "HR", "Finance"];

const JobModal = ({ isOpen, onClose, job, onSave }: JobModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      department: "",
      location: "",
      job_type: "",
      work_policy: "",
      experience_level: "",
      salary_range: "",
    },
  });

  useEffect(() => {
    if (job) {
      form.reset({
        title: job.title,
        description: job.description,
        department: job.department,
        location: job.location,
        job_type: job.job_type,
        work_policy: job.work_policy || "",
        experience_level: job.experience_level || "",
        salary_range: job.salary_range || "",
      });
    } else {
      form.reset({
        title: "",
        description: "",
        department: "",
        location: "",
        job_type: "",
        work_policy: "",
        experience_level: "",
        salary_range: "",
      });
    }
  }, [job, form, isOpen]);

  const onSubmit = async (data: JobFormData) => {
    setIsSubmitting(true);
    try {
      const jobInput: JobInput = {
        title: data.title,
        description: data.description,
        department: data.department,
        location: data.location,
        job_type: data.job_type,
        work_policy: data.work_policy || undefined,
        experience_level: data.experience_level || undefined,
        salary_range: data.salary_range || undefined,
      };

      let savedJob: Job;
      if (job) {
        savedJob = await jobsApi.update(job.id, jobInput);
        toast({ title: "Job updated", description: "The job has been updated successfully." });
      } else {
        savedJob = await jobsApi.create(jobInput);
        toast({ title: "Job created", description: "The job has been created successfully." });
      }
      onSave(savedJob);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save job",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{job ? "Edit Job" : "Add New Job"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Senior Frontend Engineer" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Describe the role and responsibilities..." rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., San Francisco, CA or Remote" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="job_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="work_policy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Policy</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select work policy" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {workPolicies.map((policy) => (
                          <SelectItem key={policy} value={policy}>
                            {policy}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="experience_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salary_range"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Range</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., $100k - $150k" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : job ? "Update Job" : "Create Job"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default JobModal;
