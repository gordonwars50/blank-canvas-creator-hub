
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { TeamRole, TEAM_ROLES } from '@/types/team';
import { useTeamManagement } from '@/hooks/useTeamManagement';
import { Mail, UserPlus, Users } from 'lucide-react';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  role: TeamRole;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    addMember,
    sendInvite,
    members
  } = useTeamManagement();
  const [selectedRole, setSelectedRole] = useState<TeamRole>('Script Writer');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      role: 'Script Writer'
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Check if email already exists
      const existingMember = members.find(member => member.email.toLowerCase() === data.email.toLowerCase());
      if (existingMember) {
        form.setError('email', {
          message: 'This email is already associated with a team member'
        });
        setIsSubmitting(false);
        return;
      }

      // Create new team member
      const newMember = addMember({
        name: data.name,
        email: data.email,
        role: selectedRole
      });

      // Send invite (placeholder for future backend integration)
      sendInvite(data.email, selectedRole);
      console.log('Added new team member:', newMember);

      // Reset form and close modal
      form.reset();
      setSelectedRole('Script Writer');
      onClose();

      // TODO: Show success toast notification
      alert(`Successfully added ${data.name} to your team! An invitation email will be sent to ${data.email}.`);
    } catch (error) {
      console.error('Error adding team member:', error);
      alert('There was an error adding the team member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      form.reset();
      setSelectedRole('Script Writer');
      onClose();
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return true;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="border-gray-700 max-w-4xl bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-blue-400" />
            Add Team Member
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Invite a new member to join your team. They'll receive an email invitation to get started.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField 
                control={form.control} 
                name="name" 
                rules={{
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                }} 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        placeholder="Enter full name" 
                        disabled={isSubmitting} 
                        className="border-gray-600 text-white placeholder-gray-400 bg-zinc-900" 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )} 
              />

              <FormField 
                control={form.control} 
                name="email" 
                rules={{
                  required: 'Email is required',
                  validate: validateEmail
                }} 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input 
                          {...field}
                          type="email" 
                          placeholder="Enter email address" 
                          disabled={isSubmitting} 
                          className="border-gray-600 text-white placeholder-gray-400 pl-10 bg-zinc-900" 
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )} 
              />
            </div>

            <div className="space-y-4">
              <Label className="text-gray-300 text-lg font-medium">Default Role</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3">
                {TEAM_ROLES.map(role => (
                  <div 
                    key={role.value} 
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedRole === role.value 
                        ? 'border-blue-500 bg-blue-500/10' 
                        : 'border-gray-600 bg-gray-800/50 hover:bg-gray-800'
                    }`} 
                    onClick={() => setSelectedRole(role.value)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                          selectedRole === role.value 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-400'
                        }`}>
                          {selectedRole === role.value && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <span className="text-white font-medium text-sm">{role.label}</span>
                      </div>
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300 ml-2">
                        {role.value.split(' ').map(word => word.charAt(0)).join('')}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-xs ml-7 leading-relaxed">{role.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose} 
                disabled={isSubmitting} 
                className="border-gray-600 hover:bg-gray-700 text-slate-50"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <Users className="w-4 h-4 mr-2 animate-spin" />
                    Adding Member...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Member
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberModal;
